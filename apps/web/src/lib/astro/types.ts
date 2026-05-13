/**
 * 占星原型映射 · 类型定义
 *
 * 对应文档:docs/content/archetypes/03-decision-tree.md §2-§3
 */

export type ZodiacSign =
  | 'Aries'
  | 'Taurus'
  | 'Gemini'
  | 'Cancer'
  | 'Leo'
  | 'Virgo'
  | 'Libra'
  | 'Scorpio'
  | 'Sagittarius'
  | 'Capricorn'
  | 'Aquarius'
  | 'Pisces';

export type Element = 'fire' | 'earth' | 'air' | 'water';

export type Planet =
  | 'sun'
  | 'moon'
  | 'mercury'
  | 'venus'
  | 'mars'
  | 'jupiter'
  | 'saturn'
  | 'uranus'
  | 'neptune'
  | 'pluto'
  | 'chiron'
  | 'northNode'
  | 'southNode'
  | 'asc'
  | 'mc';

export type AspectType = 'conjunct' | 'opposition' | 'square' | 'trine' | 'sextile';

export type FactionCode = 'C' | 'L' | 'T';

export interface PlanetPosition {
  sign: ZodiacSign;
  house?: number;
  degree?: number;
  retrograde?: boolean;
}

export interface Aspect {
  p1: Planet;
  p2: Planet;
  type: AspectType;
  orb: number;
}

export interface AstroInput {
  sun: PlanetPosition;
  moon: PlanetPosition;
  asc?: PlanetPosition;
  mc?: PlanetPosition;
  mercury: PlanetPosition;
  venus: PlanetPosition;
  mars: PlanetPosition;
  jupiter: PlanetPosition;
  saturn: PlanetPosition;
  uranus: PlanetPosition;
  neptune: PlanetPosition;
  pluto: PlanetPosition;
  northNode: PlanetPosition;
  chiron?: PlanetPosition;
  aspects: Aspect[];
  birthTimeKnown: boolean;
  birthLocationKnown: boolean;
}

export type RuleType =
  | 'primary'
  | 'secondary'
  | 'aspect'
  | 'house'
  | 'exclusion'
  | 'fallback';

export interface Condition {
  sunSign?: ZodiacSign[];
  moonSign?: ZodiacSign[];
  ascSign?: ZodiacSign[];
  mercurySign?: ZodiacSign[];
  venusSign?: ZodiacSign[];
  marsSign?: ZodiacSign[];
  saturnSign?: ZodiacSign[];
  northNodeSign?: ZodiacSign[];

  sunHouse?: number[];
  moonHouse?: number[];
  marsHouse?: number[];
  venusHouse?: number[];
  mercuryHouse?: number[];
  northNodeHouse?: number[];

  house3Strong?: boolean;
  house4Strong?: boolean;
  house5Strong?: boolean;
  house7Strong?: boolean;
  house8Strong?: boolean;
  house9Strong?: boolean;
  house10Strong?: boolean;
  house11Strong?: boolean;
  house12Strong?: boolean;

  plutoConjunctSun?: boolean;
  plutoConjunctMoon?: boolean;
  neptuneConjunctSun?: boolean;
  neptuneConjunctMoon?: boolean;
  saturnConjunctSun?: boolean;
  saturnSquareSun?: boolean;
  uranusConjunctSun?: boolean;
  uranusAspect?: boolean;

  plutoMajorAspectSun?: boolean;
  plutoMajorAspectMoon?: boolean;
  neptuneMajorAspectSun?: boolean;
  uranusMajorAspectSun?: boolean;
  uranusMajorAspectMoon?: boolean;

  sunElement?: Element[];
  fireEmphasis?: boolean;
  waterEmphasis?: boolean;
  airEmphasis?: boolean;
  earthEmphasis?: boolean;
}

export interface ArchetypeRule {
  id: string;
  archetypeId: string;
  type: RuleType;
  weight: number;
  requiresBirthTime?: boolean;
  conditions: Condition;
  description?: string;
}

export interface Thresholds {
  highConfidence: number;
  midConfidence: number;
  lowConfidence: number;
  topGapForHigh: number;
  topGapForMid: number;
}

export interface FactionFallbackRule {
  sunElement: Element[];
  moonElement: Element[];
  faction: FactionCode;
  preferredSubThemes: number[];
}

export interface DecisionTree {
  version: string;
  createdAt: string;
  schema: string;
  thresholds: Thresholds;
  factionFallback: {
    rules: FactionFallbackRule[];
  };
  rules: ArchetypeRule[];
}

export interface MatchCandidate {
  archetypeId: string;
  score: number;
  matchedRules: ArchetypeRule[];
}

export type Confidence = 'high' | 'mid' | 'low';

export interface MatchResult {
  primary: MatchCandidate;
  secondary: MatchCandidate[];
  confidence: Confidence;
  fellThroughToFallback: boolean;
}
