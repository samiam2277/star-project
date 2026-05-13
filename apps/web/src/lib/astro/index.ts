/**
 * 占星原型映射引擎 · 公共 API
 *
 * 使用:
 *   import { matchArchetypes, loadDecisionTreeFromFile } from '@/lib/astro';
 *   const tree = loadDecisionTreeFromFile('path/to/decision-tree.json');
 *   const result = matchArchetypes(astroInput, tree);
 */

export { matchArchetypes, deriveConfidence } from './match';
export { validateDecisionTree, loadDecisionTreeFromFile } from './rules';
export { matchesAllConditions } from './condition-matcher';
export {
  elementEmphasis,
  houseStrong,
  hasAspect,
  signToElement,
  uranusHardAspect,
} from './helpers';
export {
  comboName,
  loadComboNamingDataFromFile,
  validateComboNamingData,
} from './naming';
export {
  computeChart,
  type BirthData,
} from './compute/compute-chart';
export { initEphemeris } from './compute/ephemeris';
export { signOf, houseOf, degreeInSign, normalizeLon } from './compute/assign';
export { detectAspects, hasAspect as hasAspectByList } from './compute/aspects';
export { hasMajorAspect } from './helpers';

export type * from './types';
export type {
  ArchetypeMeta,
  ComboName,
  ComboNamingData,
  SelfMatchEntry,
  FactionPairEntry,
} from './naming';
