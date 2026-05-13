/**
 * 36 原型映射 · 评分引擎
 *
 * 对应文档:docs/content/archetypes/03-decision-tree.md §4-§6
 *
 *   matchArchetypes(input, tree) →
 *     { primary, secondary[], confidence, fellThroughToFallback }
 */

import type {
  ArchetypeRule,
  AstroInput,
  Confidence,
  DecisionTree,
  Element,
  FactionCode,
  MatchCandidate,
  MatchResult,
  Thresholds,
} from './types';
import { matchesAllConditions } from './condition-matcher';
import { signToElement } from './helpers';

/**
 * 主入口
 */
export function matchArchetypes(input: AstroInput, tree: DecisionTree): MatchResult {
  const scores = new Map<string, number>();
  const matched = new Map<string, ArchetypeRule[]>();

  for (const rule of tree.rules) {
    // 数据可用性检查
    if (rule.requiresBirthTime && !input.birthTimeKnown) continue;

    // 条件匹配(AND)
    if (!matchesAllConditions(input, rule.conditions)) continue;

    // 累加权重
    scores.set(rule.archetypeId, (scores.get(rule.archetypeId) ?? 0) + rule.weight);

    const list = matched.get(rule.archetypeId) ?? [];
    list.push(rule);
    matched.set(rule.archetypeId, list);
  }

  // 按得分降序,丢弃负分
  const ranked = [...scores.entries()]
    .filter(([, s]) => s > 0)
    .sort((a, b) => b[1] - a[1]);

  // 兜底:无任何正分命中 → 按 faction fallback 矩阵分配
  if (ranked.length === 0 || ranked[0][1] < tree.thresholds.lowConfidence) {
    return buildFallbackResult(input, tree);
  }

  const top = ranked[0];
  const second = ranked[1];

  const primary: MatchCandidate = {
    archetypeId: top[0],
    score: top[1],
    matchedRules: matched.get(top[0]) ?? [],
  };

  const secondary: MatchCandidate[] = ranked.slice(1, 3).map(([id, score]) => ({
    archetypeId: id,
    score,
    matchedRules: matched.get(id) ?? [],
  }));

  const confidence = deriveConfidence(
    top[1],
    second?.[1] ?? 0,
    input.birthTimeKnown,
    tree.thresholds,
  );

  return {
    primary,
    secondary,
    confidence,
    fellThroughToFallback: false,
  };
}

/**
 * 置信度判定 — 对应 03-decision-tree.md §4
 */
export function deriveConfidence(
  topScore: number,
  secondScore: number,
  birthTimeKnown: boolean,
  t: Thresholds,
): Confidence {
  const gap = topScore - secondScore;

  // High: 分数充足 + 与次名差距大 + 有时辰
  if (birthTimeKnown && topScore >= t.highConfidence && gap >= t.topGapForHigh) {
    return 'high';
  }

  // High alt: 强 P1 命中(≥90) + 无强力竞争对手(< 40)
  if (topScore >= 90 && secondScore < 40) {
    return 'high';
  }

  // Mid: 分数 OK + 有明显领先
  if (topScore >= t.midConfidence && gap >= t.topGapForMid) {
    return 'mid';
  }

  // Mid alt: 无时辰但 top 仍有体面分数
  if (topScore >= 70 && !birthTimeKnown) {
    return 'mid';
  }

  return 'low';
}

/**
 * 兜底矩阵:按 sun×moon 元素决定 faction 与候选 subTheme
 */
function buildFallbackResult(input: AstroInput, tree: DecisionTree): MatchResult {
  const sunElem = signToElement(input.sun.sign);
  const moonElem = signToElement(input.moon.sign);

  // 查找 fallback 矩阵
  const rule = tree.factionFallback.rules.find(
    (r) => r.sunElement.includes(sunElem) && r.moonElement.includes(moonElem),
  );

  // 兜底的兜底:按 sunElement 选 faction
  const faction: FactionCode = rule?.faction ?? defaultFactionForElement(sunElem);
  const subThemes = rule?.preferredSubThemes ?? [1];

  // 构造候选(只用 ID;实际客户端会再 join archetypes.json 拿名字)
  const primary: MatchCandidate = {
    archetypeId: `${faction}${String(subThemes[0]).padStart(2, '0')}`,
    score: 0,
    matchedRules: [],
  };

  const secondary: MatchCandidate[] = subThemes.slice(1, 3).map((idx) => ({
    archetypeId: `${faction}${String(idx).padStart(2, '0')}`,
    score: 0,
    matchedRules: [],
  }));

  return {
    primary,
    secondary,
    confidence: 'low',
    fellThroughToFallback: true,
  };
}

function defaultFactionForElement(elem: Element): FactionCode {
  if (elem === 'water') return 'T';
  if (elem === 'fire' || elem === 'earth') return 'C';
  return 'L';
}
