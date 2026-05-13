/**
 * 36×36 组合原型命名引擎
 *
 * 对应文档:docs/content/archetypes/05-combo-naming.md
 * 数据契约:docs/content/archetypes/combo-naming.json
 *
 * 三层架构:
 *   - self  = natalId === annualId (对角线 36 条,独立命名)
 *   - within / cross = 跨原型,用 faction-pair 模板(CC/CL/CT/LC/LL/LT/TC/TL/TT)
 *   - fallback = 数据缺失或未知 pair(defensive)
 */

import type { FactionCode } from './types';

/** 最小化的 archetype 元数据,只取命名所需字段 */
export interface ArchetypeMeta {
  id: string;
  faction: FactionCode;
  nameZh: string;
  nameEn: string;
}

export interface SelfMatchEntry {
  titleZh: string;
  titleEn: string;
  taglineZh: string;
  taglineEn: string;
}

export interface FactionPairEntry {
  pairCode: string;
  natalFaction: FactionCode;
  annualFaction: FactionCode;
  templateZh: string;
  templateEn: string;
  taglineZh: string;
  taglineEn: string;
}

export interface ComboNamingData {
  version: string;
  selfMatch: Record<string, SelfMatchEntry>;
  factionPairs: Record<string, FactionPairEntry>;
}

export interface ComboName {
  mode: 'self' | 'within' | 'cross' | 'fallback';
  pairCode: string; // 'self' | 'CC' | 'CL' | ... | 'fallback'
  titleZh: string;
  titleEn: string;
  taglineZh: string;
  taglineEn: string;
}

/**
 * 主入口:给定 natal/annual archetype ID,产出 ComboName
 */
export function comboName(
  natalId: string,
  annualId: string,
  archetypes: ArchetypeMeta[],
  data: ComboNamingData,
): ComboName {
  // Tier 1: self-match
  if (natalId === annualId) {
    const entry = data.selfMatch[natalId];
    if (!entry) {
      return fallback(natalId, annualId, archetypes);
    }
    return {
      mode: 'self',
      pairCode: 'self',
      titleZh: entry.titleZh,
      titleEn: entry.titleEn,
      taglineZh: entry.taglineZh,
      taglineEn: entry.taglineEn,
    };
  }

  // Tier 2: faction-pair
  const natalArch = archetypes.find((a) => a.id === natalId);
  const annualArch = archetypes.find((a) => a.id === annualId);
  if (!natalArch || !annualArch) {
    return fallback(natalId, annualId, archetypes);
  }

  const pairCode = `${natalArch.faction}${annualArch.faction}`;
  const tmpl = data.factionPairs[pairCode];
  if (!tmpl) {
    return fallback(natalId, annualId, archetypes);
  }

  const mode = natalArch.faction === annualArch.faction ? 'within' : 'cross';
  return {
    mode,
    pairCode,
    titleZh: tmpl.templateZh.replace('{N}', natalArch.nameZh).replace('{A}', annualArch.nameZh),
    titleEn: tmpl.templateEn.replace('{N}', natalArch.nameEn).replace('{A}', annualArch.nameEn),
    taglineZh: tmpl.taglineZh,
    taglineEn: tmpl.taglineEn,
  };
}

/**
 * 兜底:数据缺失或未知 pair
 */
function fallback(
  natalId: string,
  annualId: string,
  archetypes: ArchetypeMeta[],
): ComboName {
  const natalArch = archetypes.find((a) => a.id === natalId);
  const annualArch = archetypes.find((a) => a.id === annualId);
  const natalZh = natalArch?.nameZh ?? natalId;
  const annualZh = annualArch?.nameZh ?? annualId;
  const natalEn = natalArch?.nameEn ?? natalId;
  const annualEn = annualArch?.nameEn ?? annualId;
  return {
    mode: 'fallback',
    pairCode: 'fallback',
    titleZh: `${natalZh} × ${annualZh}`,
    titleEn: `${natalEn} × ${annualEn}`,
    taglineZh: '今年的你是这两种力量的交点',
    taglineEn: 'You stand where two forces meet',
  };
}

/**
 * Node 侧加载 + 基础校验
 */
export function loadComboNamingDataFromFile(filePath: string): ComboNamingData {
  // 使用 require 风格的 fs 仅用于 node 端;浏览器侧应直接 import JSON
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const fs = require('node:fs') as typeof import('node:fs');
  const raw = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  return validateComboNamingData(raw);
}

export function validateComboNamingData(raw: unknown): ComboNamingData {
  if (!raw || typeof raw !== 'object') {
    throw new Error('ComboNamingData: not an object');
  }
  const obj = raw as Record<string, unknown>;
  if (typeof obj.version !== 'string') {
    throw new Error('ComboNamingData: missing version');
  }
  if (!obj.selfMatch || typeof obj.selfMatch !== 'object') {
    throw new Error('ComboNamingData: missing selfMatch');
  }
  if (!obj.factionPairs || typeof obj.factionPairs !== 'object') {
    throw new Error('ComboNamingData: missing factionPairs');
  }

  const selfMatchKeys = Object.keys(obj.selfMatch as object);
  if (selfMatchKeys.length !== 36) {
    throw new Error(`ComboNamingData: selfMatch must have 36 entries, got ${selfMatchKeys.length}`);
  }

  const factionPairKeys = Object.keys(obj.factionPairs as object);
  const expectedPairs = ['CC', 'CL', 'CT', 'LC', 'LL', 'LT', 'TC', 'TL', 'TT'];
  for (const pc of expectedPairs) {
    if (!factionPairKeys.includes(pc)) {
      throw new Error(`ComboNamingData: missing factionPair ${pc}`);
    }
  }

  return obj as unknown as ComboNamingData;
}
