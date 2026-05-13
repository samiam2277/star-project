/**
 * 行星相位检测
 *
 * 对应文档:docs/content/archetypes/07-ephemeris-integration.md
 *
 * 5 种主相位:
 *   conj 0° / sextile 60° / square 90° / trine 120° / opp 180°
 *
 * Orb 表(度):
 *   有日月参与的相位:conj 8 / opp 7 / square 6 / trine 6 / sextile 4
 *   其它相位:        conj 6 / opp 5 / square 4 / trine 4 / sextile 3
 *
 * 输出 Aspect[] 仅保留 decision-tree.json 实际查询到的关键 pair,
 * 重点是 Pluto / Neptune / Uranus / Saturn 与日月的合 / 刑 / 对相,
 * 因为这些是 T-faction 召回的关键信号。
 */

import type { Aspect, AspectType, Planet } from '../types';

interface AspectDef {
  type: AspectType;
  angle: number;
}

const ASPECT_DEFS: readonly AspectDef[] = [
  { type: 'conjunct', angle: 0 },
  { type: 'sextile', angle: 60 },
  { type: 'square', angle: 90 },
  { type: 'trine', angle: 120 },
  { type: 'opposition', angle: 180 },
] as const;

interface OrbConfig {
  conjunct: number;
  sextile: number;
  square: number;
  trine: number;
  opposition: number;
}

const ORB_WITH_LUMINARY: OrbConfig = {
  conjunct: 8,
  opposition: 7,
  square: 6,
  trine: 6,
  sextile: 4,
};

const ORB_NO_LUMINARY: OrbConfig = {
  conjunct: 6,
  opposition: 5,
  square: 4,
  trine: 4,
  sextile: 3,
};

const LUMINARIES = new Set<Planet>(['sun', 'moon']);

const OUTER_PLANETS = new Set<Planet>(['uranus', 'neptune', 'pluto']);

const ORB_OUTER_TO_LUMINARY: OrbConfig = {
  conjunct: 12,
  opposition: 10,
  square: 8,
  trine: 8,
  sextile: 5,
};

/** 两个黄经之间的最小角距(度, [0, 180]) */
function angularSeparation(lon1: number, lon2: number): number {
  let diff = Math.abs(lon1 - lon2) % 360;
  if (diff > 180) diff = 360 - diff;
  return diff;
}

/**
 * 检测一组行星之间的相位
 *
 * @param positions  { [planet]: lonInDeg }
 * @returns          按 (p1, p2) 字典序去重后的相位列表
 */
export function detectAspects(positions: Partial<Record<Planet, number>>): Aspect[] {
  const planets = (Object.keys(positions) as Planet[]).filter(
    (p) => positions[p] !== undefined,
  );

  const aspects: Aspect[] = [];

  for (let i = 0; i < planets.length; i++) {
    for (let j = i + 1; j < planets.length; j++) {
      const p1 = planets[i];
      const p2 = planets[j];
      const lon1 = positions[p1]!;
      const lon2 = positions[p2]!;
      const sep = angularSeparation(lon1, lon2);

      let orbCfg: OrbConfig;
      if (LUMINARIES.has(p1) || LUMINARIES.has(p2)) {
        if (OUTER_PLANETS.has(p1) || OUTER_PLANETS.has(p2)) {
          orbCfg = ORB_OUTER_TO_LUMINARY;
        } else {
          orbCfg = ORB_WITH_LUMINARY;
        }
      } else {
        orbCfg = ORB_NO_LUMINARY;
      }

      // 找到第一个匹配的相位类型(orb 最紧的相位优先)
      let best: { type: AspectType; orb: number } | null = null;
      for (const def of ASPECT_DEFS) {
        const allowedOrb = orbCfg[def.type];
        const orb = Math.abs(sep - def.angle);
        if (orb <= allowedOrb) {
          if (!best || orb < best.orb) {
            best = { type: def.type, orb };
          }
        }
      }

      if (best) {
        aspects.push({ p1, p2, type: best.type, orb: best.orb });
      }
    }
  }

  return aspects;
}

/** 查询某对行星之间是否存在指定相位类型(用于 condition 评估) */
export function hasAspect(
  aspects: readonly Aspect[],
  planet1: Planet,
  planet2: Planet,
  type: AspectType,
): boolean {
  return aspects.some(
    (a) =>
      a.type === type &&
      ((a.p1 === planet1 && a.p2 === planet2) || (a.p1 === planet2 && a.p2 === planet1)),
  );
}
