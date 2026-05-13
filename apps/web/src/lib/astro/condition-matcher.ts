/**
 * 条件匹配引擎
 *
 * 给定 AstroInput + Condition,判断 Condition 是否全部满足。
 * 多字段之间 AND,数组字段内 OR。
 *
 * 对应文档:docs/content/archetypes/03-decision-tree.md §3
 */

import type { AstroInput, Condition } from './types';
import {
  elementEmphasis,
  hasAspect,
  hasMajorAspect,
  houseStrong,
  signToElement,
  uranusHardAspect,
  uranusMajorAspectMoon,
} from './helpers';

type CheckFn = (input: AstroInput, value: unknown) => boolean;

const SIGN_CHECKS: Record<string, (input: AstroInput) => string | undefined> = {
  sunSign: (i) => i.sun.sign,
  moonSign: (i) => i.moon.sign,
  ascSign: (i) => i.asc?.sign,
  mercurySign: (i) => i.mercury.sign,
  venusSign: (i) => i.venus.sign,
  marsSign: (i) => i.mars.sign,
  saturnSign: (i) => i.saturn.sign,
  northNodeSign: (i) => i.northNode.sign,
};

const HOUSE_CHECKS: Record<string, (input: AstroInput) => number | undefined> = {
  sunHouse: (i) => i.sun.house,
  moonHouse: (i) => i.moon.house,
  marsHouse: (i) => i.mars.house,
  venusHouse: (i) => i.venus.house,
  mercuryHouse: (i) => i.mercury.house,
  northNodeHouse: (i) => i.northNode.house,
};

const HOUSE_STRONG_CHECKS: Record<string, number> = {
  house3Strong: 3,
  house4Strong: 4,
  house5Strong: 5,
  house7Strong: 7,
  house8Strong: 8,
  house9Strong: 9,
  house10Strong: 10,
  house11Strong: 11,
  house12Strong: 12,
};

const ASPECT_CHECKS: Record<string, (input: AstroInput) => boolean> = {
  plutoConjunctSun: (i) => hasAspect(i, 'pluto', 'sun', 'conjunct', 12),
  plutoConjunctMoon: (i) => hasAspect(i, 'pluto', 'moon', 'conjunct', 12),
  neptuneConjunctSun: (i) => hasAspect(i, 'neptune', 'sun', 'conjunct', 12),
  neptuneConjunctMoon: (i) => hasAspect(i, 'neptune', 'moon', 'conjunct', 12),
  saturnConjunctSun: (i) => hasAspect(i, 'saturn', 'sun', 'conjunct'),
  saturnSquareSun: (i) => hasAspect(i, 'saturn', 'sun', 'square'),
  uranusConjunctSun: (i) => hasAspect(i, 'uranus', 'sun', 'conjunct', 12),
  uranusAspect: (i) => uranusHardAspect(i),
  plutoMajorAspectSun: (i) => hasMajorAspect(i, 'pluto', 'sun', 12),
  plutoMajorAspectMoon: (i) => hasMajorAspect(i, 'pluto', 'moon', 12),
  neptuneMajorAspectSun: (i) => hasMajorAspect(i, 'neptune', 'sun', 12),
  uranusMajorAspectSun: (i) => hasMajorAspect(i, 'uranus', 'sun', 12),
  uranusMajorAspectMoon: (i) => uranusMajorAspectMoon(i),
};

const ELEMENT_EMPHASIS_CHECKS: Record<string, 'fire' | 'earth' | 'air' | 'water'> = {
  fireEmphasis: 'fire',
  earthEmphasis: 'earth',
  airEmphasis: 'air',
  waterEmphasis: 'water',
};

/**
 * 主入口:判断 Condition 是否全部满足
 */
export function matchesAllConditions(input: AstroInput, cond: Condition): boolean {
  for (const [key, value] of Object.entries(cond)) {
    if (value === undefined || value === null) continue;
    if (!matchesField(input, key, value)) return false;
  }
  return true;
}

function matchesField(input: AstroInput, key: string, value: unknown): boolean {
  // 星座类条件:数组 OR 匹配
  if (key in SIGN_CHECKS) {
    const actual = SIGN_CHECKS[key](input);
    if (!actual) return false;
    return (value as string[]).includes(actual);
  }

  // 宫位类条件:行星所在宫位是否在指定列表中
  if (key in HOUSE_CHECKS) {
    if (!input.birthTimeKnown) return false;
    const actual = HOUSE_CHECKS[key](input);
    if (actual === undefined) return false;
    return (value as number[]).includes(actual);
  }

  // 宫位强势条件
  if (key in HOUSE_STRONG_CHECKS) {
    if (value !== true) return true; // 仅当 value=true 时检查;false/undefined 视为不约束
    return houseStrong(input, HOUSE_STRONG_CHECKS[key]);
  }

  // 相位条件
  if (key in ASPECT_CHECKS) {
    if (value !== true) return true;
    return ASPECT_CHECKS[key](input);
  }

  // 元素强势
  if (key in ELEMENT_EMPHASIS_CHECKS) {
    if (value !== true) return true;
    return elementEmphasis(input, ELEMENT_EMPHASIS_CHECKS[key]);
  }

  // sunElement: 太阳所在星座的元素是否在指定列表
  if (key === 'sunElement') {
    const elem = signToElement(input.sun.sign);
    return (value as string[]).includes(elem);
  }

  // 兜底:未知字段,视为不约束(防止旧规则破坏新引擎)
  return true;
}

// 抑制 ts unused 警告
void (null as unknown as CheckFn);
