/**
 * 黄道经度 → 星座 / 宫位映射
 *
 * 对应文档:docs/content/archetypes/07-ephemeris-integration.md
 *
 * 黄经 lon ∈ [0, 360) — 0° 即 Aries 0°,逆时针每 30° 一宫。
 * 宫位 cusps[0..11] — 1宫起点 ... 12宫起点(顺时针读盘但黄经逆时针)。
 */

import type { ZodiacSign } from '../types';

const SIGNS: readonly ZodiacSign[] = [
  'Aries',
  'Taurus',
  'Gemini',
  'Cancer',
  'Leo',
  'Virgo',
  'Libra',
  'Scorpio',
  'Sagittarius',
  'Capricorn',
  'Aquarius',
  'Pisces',
] as const;

/** 把黄经度归一到 [0, 360) */
export function normalizeLon(lon: number): number {
  return ((lon % 360) + 360) % 360;
}

/** 黄经 → 星座 */
export function signOf(lon: number): ZodiacSign {
  const n = normalizeLon(lon);
  return SIGNS[Math.floor(n / 30)];
}

/** 黄经在所属星座里的度数(0-30) */
export function degreeInSign(lon: number): number {
  const n = normalizeLon(lon);
  return n % 30;
}

/**
 * 黄经 → 宫位 (1-12)
 *
 * cusps[i] = 第 (i+1) 宫的起始黄经(度)。
 * 第 k 宫的范围 = [cusps[k-1], cusps[k % 12])
 * 处理 360° 环绕:若 cusps[k] < cusps[k-1],跨越 0° 边界。
 */
export function houseOf(lon: number, cusps: readonly number[]): number {
  if (cusps.length !== 12) {
    throw new Error(`houseOf expects 12 cusps, got ${cusps.length}`);
  }
  const n = normalizeLon(lon);
  for (let i = 0; i < 12; i++) {
    const start = normalizeLon(cusps[i]);
    const end = normalizeLon(cusps[(i + 1) % 12]);
    // 不跨 0° 边界
    if (start <= end) {
      if (n >= start && n < end) return i + 1;
    } else {
      // 跨 0° 边界(如 cusps[11]=345°,cusps[0]=15°)
      if (n >= start || n < end) return i + 1;
    }
  }
  // 理论上不应到这里
  return 1;
}
