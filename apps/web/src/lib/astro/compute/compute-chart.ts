/**
 * 总入口:出生数据 → AstroInput
 *
 * 对应文档:docs/content/archetypes/07-ephemeris-integration.md
 *
 * 调用流程:
 *   1. await initEphemeris()
 *   2. birthData → JD UT(via tz.ts)
 *   3. JD → 行星位置(via ephemeris.ts)
 *   4. JD + (lat, lon) → 宫位 cusps + ASC + MC(via houses.ts;可选)
 *   5. 黄经 → sign / house(via assign.ts)
 *   6. 行星集合 → 相位(via aspects.ts)
 *   7. 组装为 AstroInput
 *
 * 缺失数据的处理:
 *   - birthTime 未知 → 默认 noon(12:00 local) + birthTimeKnown=false
 *   - lat/lon 未知    → 不计算 houses,ASC/MC 留 undefined + birthLocationKnown=false
 */

import type { AstroInput, Planet, PlanetPosition } from '../types';
import { initEphemeris, planetPositions, type EphemerisPlanet } from './ephemeris';
import { birthStringToJulianDay } from './tz';
import { houses } from './houses';
import { degreeInSign, houseOf, signOf } from './assign';
import { detectAspects } from './aspects';

export interface BirthData {
  /** 出生日期 'YYYY-MM-DD'(本地公历) */
  date: string;
  /** 出生时间 'HH:mm'(本地);undefined 时按 12:00 处理,且 birthTimeKnown=false */
  time?: string;
  /**
   * UTC 偏移(小时)。东 = 正,西 = 负。北京 +8 / 加州 PST -8。
   * 注意 caller 需要自行处理 DST(夏令时):比如纽约夏令时给 -4,冬令 -5。
   */
  utcOffsetHours: number;
  /** 出生地纬度(北 +, 南 -),可选 */
  lat?: number;
  /** 出生地经度(东 +, 西 -),可选 */
  lon?: number;
}

/**
 * 计算本命盘 AstroInput(异步:首次会 init WASM)
 */
export async function computeChart(birth: BirthData): Promise<AstroInput> {
  await initEphemeris();

  const { jd, birthTimeKnown } = birthStringToJulianDay(
    birth.date,
    birth.time,
    birth.utcOffsetHours,
  );

  const planets = planetPositions(jd);

  // 是否能算宫位:需要 lat + lon + 出生时间
  const canComputeHouses =
    birth.lat !== undefined && birth.lon !== undefined && birthTimeKnown;
  const birthLocationKnown =
    birth.lat !== undefined && birth.lon !== undefined;

  let cusps: readonly number[] | null = null;
  let ascLon: number | null = null;
  let mcLon: number | null = null;

  if (canComputeHouses) {
    const h = houses(jd, birth.lat!, birth.lon!);
    cusps = h.cusps;
    ascLon = h.asc;
    mcLon = h.mc;
  }

  // 黄经表(用于相位检测)
  const lons: Partial<Record<Planet, number>> = {};
  const positionFor = (planet: EphemerisPlanet): PlanetPosition => {
    const p = planets[planet];
    lons[planet] = p.lon;
    return {
      sign: signOf(p.lon),
      house: cusps ? houseOf(p.lon, cusps) : undefined,
      degree: degreeInSign(p.lon),
      retrograde: p.retrograde,
    };
  };

  const input: AstroInput = {
    sun: positionFor('sun'),
    moon: positionFor('moon'),
    mercury: positionFor('mercury'),
    venus: positionFor('venus'),
    mars: positionFor('mars'),
    jupiter: positionFor('jupiter'),
    saturn: positionFor('saturn'),
    uranus: positionFor('uranus'),
    neptune: positionFor('neptune'),
    pluto: positionFor('pluto'),
    northNode: positionFor('northNode'),
    aspects: [],
    birthTimeKnown,
    birthLocationKnown,
  };

  if (ascLon !== null) {
    input.asc = {
      sign: signOf(ascLon),
      degree: degreeInSign(ascLon),
    };
    lons.asc = ascLon;
  }
  if (mcLon !== null) {
    input.mc = {
      sign: signOf(mcLon),
      degree: degreeInSign(mcLon),
    };
    lons.mc = mcLon;
  }

  input.aspects = detectAspects(lons);

  return input;
}
