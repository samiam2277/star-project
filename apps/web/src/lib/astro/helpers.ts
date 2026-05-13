/**
 * 占星基础辅助函数 · 元素归类 / 行星聚类 / 相位判定
 *
 * 对应文档:docs/content/archetypes/03-decision-tree.md §3
 */

import type {
  AstroInput,
  Element,
  Planet,
  PlanetPosition,
  ZodiacSign,
  Aspect,
  AspectType,
} from './types';

const SIGN_ELEMENT: Record<ZodiacSign, Element> = {
  Aries: 'fire',
  Leo: 'fire',
  Sagittarius: 'fire',
  Taurus: 'earth',
  Virgo: 'earth',
  Capricorn: 'earth',
  Gemini: 'air',
  Libra: 'air',
  Aquarius: 'air',
  Cancer: 'water',
  Scorpio: 'water',
  Pisces: 'water',
};

export function signToElement(sign: ZodiacSign): Element {
  return SIGN_ELEMENT[sign];
}

const PERSONAL_AND_OUTER_PLANETS: Planet[] = [
  'sun',
  'moon',
  'mercury',
  'venus',
  'mars',
  'jupiter',
  'saturn',
];

function pickPositions(input: AstroInput, planets: Planet[]): PlanetPosition[] {
  const out: PlanetPosition[] = [];
  for (const p of planets) {
    const pos = (input as unknown as Record<Planet, PlanetPosition | undefined>)[p];
    if (pos) out.push(pos);
  }
  return out;
}

/**
 * 元素强势:7 颗行星(日月水金火木土)中 4+ 颗落在同元素
 *
 * 阈值取 4(而非 3),与传统占星 "stellium / element dominance" 共识对齐,
 * 避免随机巧合下的假阳性。
 */
export function elementEmphasis(input: AstroInput, element: Element): boolean {
  const positions = pickPositions(input, PERSONAL_AND_OUTER_PLANETS);
  const count = positions.filter((p) => signToElement(p.sign) === element).length;
  return count >= 4;
}

/**
 * 宫位强势:指定宫位内有 2+ 颗主要行星
 * 仅在 input.birthTimeKnown=true 时有意义
 */
export function houseStrong(input: AstroInput, house: number): boolean {
  if (!input.birthTimeKnown) return false;
  const positions = pickPositions(input, [
    'sun',
    'moon',
    'mercury',
    'venus',
    'mars',
    'jupiter',
    'saturn',
    'uranus',
    'neptune',
    'pluto',
  ]);
  const count = positions.filter((p) => p.house === house).length;
  return count >= 2;
}

/**
 * 合相判定:相位类型为 conjunct,容许度 ≤ 8°(default orb)
 */
export function hasAspect(
  input: AstroInput,
  p1: Planet,
  p2: Planet,
  type: AspectType,
  maxOrb = 8,
): boolean {
  return input.aspects.some(
    (a) =>
      ((a.p1 === p1 && a.p2 === p2) || (a.p1 === p2 && a.p2 === p1)) &&
      a.type === type &&
      a.orb <= maxOrb,
  );
}

const MAJOR_ASPECT_TYPES: AspectType[] = ['conjunct', 'opposition', 'square', 'trine'];

/**
 * 任一 major aspect(conjunct / opposition / square / trine) between two planets,
 * 容许度 ≤ maxOrb (default 10°)。用于外行星(Pluto/Neptune/Uranus)宽泛相位判定。
 */
export function hasMajorAspect(
  input: AstroInput,
  p1: Planet,
  p2: Planet,
  maxOrb = 10,
): boolean {
  return input.aspects.some(
    (a) =>
      ((a.p1 === p1 && a.p2 === p2) || (a.p1 === p2 && a.p2 === p1)) &&
      MAJOR_ASPECT_TYPES.includes(a.type) &&
      a.orb <= maxOrb,
  );
}

/**
 * 外行星与月亮的 major aspect(合/对/刑/拱),容许度 ≤ 12°
 */
export function uranusMajorAspectMoon(input: AstroInput): boolean {
  return hasMajorAspect(input, 'uranus', 'moon', 12);
}

/**
 * "天王任一硬相位 to sun/moon":合 / 对 / 刑,容许度 ≤ 6°
 */
export function uranusHardAspect(input: AstroInput): boolean {
  const hardTypes: AspectType[] = ['conjunct', 'opposition', 'square'];
  return input.aspects.some(
    (a: Aspect) =>
      (a.p1 === 'uranus' || a.p2 === 'uranus') &&
      (a.p1 === 'sun' || a.p1 === 'moon' || a.p2 === 'sun' || a.p2 === 'moon') &&
      hardTypes.includes(a.type) &&
      a.orb <= 6,
  );
}
