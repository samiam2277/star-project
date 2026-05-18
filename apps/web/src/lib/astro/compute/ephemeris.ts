/**
 * Swiss Ephemeris WASM 适配层 · 单例管理 + 行星位置
 *
 * 对应文档:docs/content/archetypes/07-ephemeris-integration.md
 *
 * 设计:
 *   - 全局单例(SwissEph WASM 实例化代价高,且文件描述符要复用)
 *   - 仅在首次 initEphemeris() 时加载 WASM,后续调用直接复用
 *   - 输出原始黄经/速度;不做 sign / house 映射(交给 assign.ts)
 */

import SwissEph from 'swisseph-wasm';

import type { Planet } from '../types';

/** 行星原始位置(黄经度 / 速度 / 逆行) */
export interface PlanetCoord {
  lon: number; // 黄经 [0, 360)
  lat: number; // 黄纬
  dist: number; // 距离(AU)
  speed: number; // 黄经速度(度/日)
  retrograde: boolean; // speed < 0
}

/** 我们用到的所有行星 + 月交点 */
export type EphemerisPlanet = Exclude<
  Planet,
  'chiron' | 'southNode' | 'asc' | 'mc'
>;

interface SwephRuntime {
  initSwissEph(): Promise<void>;
  julday(year: number, month: number, day: number, hour: number): number;
  calc_ut(jd: number, planet: number, flags: number): Float64Array;
  houses(jd: number, lat: number, lon: number, hsys: string): {
    cusps: Float64Array;
    ascmc: Float64Array;
  };
  close?: () => void;
  SE_SUN: number;
  SE_MOON: number;
  SE_MERCURY: number;
  SE_VENUS: number;
  SE_MARS: number;
  SE_JUPITER: number;
  SE_SATURN: number;
  SE_URANUS: number;
  SE_NEPTUNE: number;
  SE_PLUTO: number;
  SE_MEAN_NODE: number;
  SE_TRUE_NODE: number;
  SEFLG_SWIEPH: number;
  SEFLG_SPEED: number;
  SEFLG_MOSEPH: number;
}

let runtime: SwephRuntime | null = null;
let initPromise: Promise<SwephRuntime> | null = null;

/**
 * 初始化 WASM Swiss Ephemeris 单例。
 * 幂等:重复调用会复用同一实例。
 *
 * 浏览器端:WASM/.data 从 /wasm/ 路径加载(public 目录)。
 * Node 端:使用 swisseph-wasm 内置路径。
 */
export async function initEphemeris(): Promise<SwephRuntime> {
  if (runtime) return runtime;
  if (initPromise) return initPromise;

  initPromise = (async () => {
    const SweCtor = SwissEph as unknown as new () => SwephRuntime;
    const instance = new SweCtor();

    if (typeof window !== 'undefined') {
      // 浏览器端:动态 import 底层 WASM 模块,传入 locateFile 指向 public/wasm/
      const WasmMod = await import('./wasm-core.js');
      const WasmSwissEph = WasmMod.default;
      const moduleConfig = {
        locateFile: (path: string) => `/wasm/${path}`,
      };
      (instance as any).SweModule = await WasmSwissEph(moduleConfig);
      if (!(instance as any).SweModule.HEAP32) {
        (instance as any).SweModule.HEAP32 = new Int32Array(
          (instance as any).SweModule.HEAPF64.buffer,
        );
      }
      (instance as any).SweModule.ccall(
        'swe_set_ephe_path',
        'string',
        ['string'],
        ['sweph'],
      );
    } else {
      await instance.initSwissEph();
    }

    runtime = instance;
    return instance;
  })();

  return initPromise;
}

/** 计算 Julian Day(UT)— 包装 swe.julday */
export function julday(
  year: number,
  month: number,
  day: number,
  hourUT: number,
): number {
  if (!runtime) throw new Error('initEphemeris() must be awaited before julday()');
  return runtime.julday(year, month, day, hourUT);
}

/**
 * 计算给定 JD UT 下所有主要行星的位置
 * 使用 SWIEPH(高精度,需 .data 文件)+ SPEED(用于检测逆行)
 */
export function planetPositions(jdUt: number): Record<EphemerisPlanet, PlanetCoord> {
  if (!runtime) throw new Error('initEphemeris() must be awaited before planetPositions()');
  const FLAG = runtime.SEFLG_SWIEPH | runtime.SEFLG_SPEED;

  const get = (id: number): PlanetCoord => {
    const p = runtime!.calc_ut(jdUt, id, FLAG);
    return {
      lon: ((p[0] % 360) + 360) % 360,
      lat: p[1],
      dist: p[2],
      speed: p[3],
      retrograde: p[3] < 0,
    };
  };

  return {
    sun: get(runtime.SE_SUN),
    moon: get(runtime.SE_MOON),
    mercury: get(runtime.SE_MERCURY),
    venus: get(runtime.SE_VENUS),
    mars: get(runtime.SE_MARS),
    jupiter: get(runtime.SE_JUPITER),
    saturn: get(runtime.SE_SATURN),
    uranus: get(runtime.SE_URANUS),
    neptune: get(runtime.SE_NEPTUNE),
    pluto: get(runtime.SE_PLUTO),
    northNode: get(runtime.SE_MEAN_NODE),
  };
}

/** 暴露 runtime 给 houses.ts(同模块层级,内部使用) */
export function getRuntime(): SwephRuntime {
  if (!runtime) throw new Error('initEphemeris() must be awaited first');
  return runtime;
}
