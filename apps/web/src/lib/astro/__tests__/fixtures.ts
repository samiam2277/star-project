/**
 * 测试用例构建辅助:把简化的描述还原成完整 AstroInput
 *
 * 真实场景下 AstroInput 由 swiss-ephemeris 计算给出。
 * 在测试里我们手工构造,只填写关键字段,其余用 zodiac default 占位。
 *
 * 默认行星分布原则:把未指定的行星散布在不同元素,避免人造的 element emphasis。
 *   mercury → sun.sign(水星总在太阳附近)
 *   venus → sun.sign(金星常在太阳附近)
 *   mars → Aries(火)
 *   jupiter → Capricorn(土)
 *   saturn → Libra(风)
 *   uranus → Cancer(水)
 *   neptune → Cancer(水)
 *   pluto → Capricorn(土)
 *   northNode → Pisces(水)
 */

import type { AstroInput, Aspect, AspectType, Planet, PlanetPosition, ZodiacSign } from '../types';

interface BuildArgs {
  sun: { sign: ZodiacSign; house?: number };
  moon: { sign: ZodiacSign; house?: number };
  asc?: { sign: ZodiacSign };
  mercury?: { sign: ZodiacSign; house?: number };
  venus?: { sign: ZodiacSign; house?: number };
  mars?: { sign: ZodiacSign; house?: number };
  jupiter?: { sign: ZodiacSign; house?: number };
  saturn?: { sign: ZodiacSign; house?: number };
  uranus?: { sign: ZodiacSign; house?: number };
  neptune?: { sign: ZodiacSign; house?: number };
  pluto?: { sign: ZodiacSign; house?: number };
  northNode?: { sign: ZodiacSign; house?: number };
  aspects?: Array<{ p1: Planet; p2: Planet; type: AspectType; orb?: number }>;
  birthTimeKnown?: boolean;
  birthLocationKnown?: boolean;
}

const PLANET_DEFAULT: Record<
  Exclude<Planet, 'sun' | 'moon' | 'mercury' | 'venus' | 'chiron' | 'southNode' | 'asc' | 'mc'>,
  ZodiacSign
> = {
  mars: 'Gemini', // air,避免 fire/water/earth 人造 emphasis
  jupiter: 'Gemini', // air
  saturn: 'Libra', // air
  uranus: 'Aquarius', // air
  neptune: 'Aquarius', // air
  pluto: 'Aquarius', // air
  northNode: 'Aquarius', // air
};

function pos(sign: ZodiacSign, house?: number): PlanetPosition {
  return { sign, house };
}

export function buildInput(args: BuildArgs): AstroInput {
  const birthTimeKnown = args.birthTimeKnown ?? args.asc !== undefined;
  const birthLocationKnown = args.birthLocationKnown ?? birthTimeKnown;

  const aspects: Aspect[] = (args.aspects ?? []).map((a) => ({
    p1: a.p1,
    p2: a.p2,
    type: a.type,
    orb: a.orb ?? 3,
  }));

  return {
    sun: pos(args.sun.sign, args.sun.house),
    moon: pos(args.moon.sign, args.moon.house),
    asc: args.asc ? pos(args.asc.sign) : undefined,
    mercury: pos(args.mercury?.sign ?? args.sun.sign, args.mercury?.house),
    venus: pos(args.venus?.sign ?? args.sun.sign, args.venus?.house),
    mars: pos(args.mars?.sign ?? PLANET_DEFAULT.mars, args.mars?.house),
    jupiter: pos(args.jupiter?.sign ?? PLANET_DEFAULT.jupiter, args.jupiter?.house),
    saturn: pos(args.saturn?.sign ?? PLANET_DEFAULT.saturn, args.saturn?.house),
    uranus: pos(args.uranus?.sign ?? PLANET_DEFAULT.uranus, args.uranus?.house),
    neptune: pos(args.neptune?.sign ?? PLANET_DEFAULT.neptune, args.neptune?.house),
    pluto: pos(args.pluto?.sign ?? PLANET_DEFAULT.pluto, args.pluto?.house),
    northNode: pos(args.northNode?.sign ?? PLANET_DEFAULT.northNode, args.northNode?.house),
    aspects,
    birthTimeKnown,
    birthLocationKnown,
  };
}
