/**
 * Placidus 宫位计算 · WASM 包装
 *
 * 对应文档:docs/content/archetypes/07-ephemeris-integration.md
 *
 * Placidus 是项目默认宫制(与 decision-tree.json 的 houseN 规则保持一致)。
 * 高纬度(|lat| > 66°)Placidus 退化,自动退到 Whole Sign(整宫制)+ 警告 flag。
 */

import { getRuntime } from './ephemeris';
import { normalizeLon } from './assign';

export interface HouseResult {
  /** cusps[0..11] = 第 1 宫起点 ... 第 12 宫起点(度,黄经) */
  cusps: number[];
  asc: number; // 上升点 (1 宫起点黄经)
  mc: number; // 中天 (10 宫起点黄经)
  system: 'placidus' | 'wholeSign';
  highLatitudeFallback: boolean;
}

const HIGH_LAT_THRESHOLD = 66.0;

/**
 * Placidus 宫位(高纬度 fallback 到 Whole Sign)
 *
 * @param jdUt      Julian Day (UT)
 * @param geoLat    地理纬度(北 +,南 -)
 * @param geoLon    地理经度(东 +,西 -)
 */
export function houses(
  jdUt: number,
  geoLat: number,
  geoLon: number,
): HouseResult {
  const runtime = getRuntime();

  // 高纬度 fallback:先用 Placidus 拿 ASC/MC,但 cusps 改用 Whole Sign
  const highLat = Math.abs(geoLat) > HIGH_LAT_THRESHOLD;

  // 即使高纬,先用 Placidus 拿正确的 ASC / MC(它们在高纬仍有定义)
  const result = runtime.houses(jdUt, geoLat, geoLon, 'P');
  const ascmc = result.ascmc;
  const ascRaw = ascmc[0];
  const mcRaw = ascmc[1];
  const asc = normalizeLon(ascRaw);
  const mc = normalizeLon(mcRaw);

  if (highLat) {
    // Whole Sign: 1 宫起点 = ASC 所在整宫的起点
    const ascSignStart = Math.floor(asc / 30) * 30;
    const cusps: number[] = [];
    for (let i = 0; i < 12; i++) {
      cusps.push(normalizeLon(ascSignStart + i * 30));
    }
    return { cusps, asc, mc, system: 'wholeSign', highLatitudeFallback: true };
  }

  // 一般情形:cusps[1..12] 是 swisseph 风格,索引 0 通常未用
  const raw = result.cusps;
  const cusps: number[] = [];
  for (let i = 1; i <= 12; i++) {
    cusps.push(normalizeLon(raw[i]));
  }

  return { cusps, asc, mc, system: 'placidus', highLatitudeFallback: false };
}
