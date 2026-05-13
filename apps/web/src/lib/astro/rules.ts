/**
 * 决策树规则加载器
 *
 * 运行时:推荐用打包器的 JSON import:
 *   import tree from '@/data/decision-tree.json' assert { type: 'json' };
 *
 * Node 测试环境:用 loadDecisionTreeFromFile 从磁盘读
 */

import { readFileSync } from 'node:fs';
import type { DecisionTree } from './types';

/**
 * 校验 raw 数据形状,返回类型安全的 DecisionTree
 * 任何字段缺失或非法时抛错,便于早期发现规则集错误
 */
export function validateDecisionTree(raw: unknown): DecisionTree {
  if (!raw || typeof raw !== 'object') {
    throw new Error('DecisionTree must be an object');
  }
  const t = raw as Partial<DecisionTree>;

  if (!t.version) throw new Error('DecisionTree.version missing');
  if (!t.thresholds) throw new Error('DecisionTree.thresholds missing');
  if (!t.rules || !Array.isArray(t.rules)) {
    throw new Error('DecisionTree.rules must be an array');
  }
  if (!t.factionFallback?.rules || !Array.isArray(t.factionFallback.rules)) {
    throw new Error('DecisionTree.factionFallback.rules must be an array');
  }

  // 规则 ID 唯一性
  const seen = new Set<string>();
  for (const r of t.rules) {
    if (!r.id) throw new Error('Rule missing id');
    if (seen.has(r.id)) throw new Error(`Duplicate rule id: ${r.id}`);
    seen.add(r.id);
    if (!r.archetypeId) throw new Error(`Rule ${r.id} missing archetypeId`);
    if (typeof r.weight !== 'number') {
      throw new Error(`Rule ${r.id} weight must be number`);
    }
    if (!r.conditions || typeof r.conditions !== 'object') {
      throw new Error(`Rule ${r.id} missing conditions object`);
    }
  }

  return t as DecisionTree;
}

/**
 * Node 环境从文件加载 + 校验
 */
export function loadDecisionTreeFromFile(path: string): DecisionTree {
  const raw = JSON.parse(readFileSync(path, 'utf-8'));
  return validateDecisionTree(raw);
}
