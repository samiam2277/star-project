/**
 * naming.ts 测试 · self / within / cross / fallback 四分支
 *
 * 对应文档:docs/content/archetypes/05-combo-naming.md
 */

import { describe, expect, it } from 'vitest';
import path from 'node:path';
import fs from 'node:fs';
import {
  comboName,
  loadComboNamingDataFromFile,
  validateComboNamingData,
  type ArchetypeMeta,
  type ComboNamingData,
} from '../naming';

const COMBO_PATH = path.resolve(
  __dirname,
  '../../../../../../docs/content/archetypes/combo-naming.json',
);
const ARCHETYPES_PATH = path.resolve(
  __dirname,
  '../../../../../../docs/content/archetypes/archetypes.json',
);

const comboData: ComboNamingData = loadComboNamingDataFromFile(COMBO_PATH);
const archetypes: ArchetypeMeta[] = JSON.parse(fs.readFileSync(ARCHETYPES_PATH, 'utf-8'));

describe('comboName — self-match (Tier 1)', () => {
  it('C01 × C01 → 拓荒共振', () => {
    const r = comboName('C01', 'C01', archetypes, comboData);
    expect(r.mode).toBe('self');
    expect(r.pairCode).toBe('self');
    expect(r.titleZh).toBe('拓荒共振');
    expect(r.titleEn).toBe('Trail Echo');
    expect(r.taglineZh).toContain('开荒');
  });

  it('T01 × T01 → 再下一潜', () => {
    const r = comboName('T01', 'T01', archetypes, comboData);
    expect(r.mode).toBe('self');
    expect(r.titleZh).toBe('再下一潜');
    expect(r.titleEn).toBe('Deeper Dive');
  });

  it('L09 × L09 → 慰藉之年', () => {
    const r = comboName('L09', 'L09', archetypes, comboData);
    expect(r.mode).toBe('self');
    expect(r.titleZh).toBe('慰藉之年');
  });

  it('每个 archetypeId 都有 selfMatch 条目', () => {
    const ids: string[] = [];
    (['C', 'L', 'T'] as const).forEach((f) =>
      Array.from({ length: 12 }, (_, i) => i + 1).forEach((i) =>
        ids.push(`${f}${String(i).padStart(2, '0')}`),
      ),
    );
    for (const id of ids) {
      const r = comboName(id, id, archetypes, comboData);
      expect(r.mode).toBe('self');
      expect(r.titleZh.length).toBeGreaterThan(0);
      expect(r.titleEn.length).toBeGreaterThan(0);
      expect(r.taglineZh.length).toBeGreaterThan(0);
      expect(r.taglineEn.length).toBeGreaterThan(0);
    }
  });
});

describe('comboName — within-faction (Tier 2)', () => {
  it('C01 × C09 → CC pair', () => {
    const r = comboName('C01', 'C09', archetypes, comboData);
    expect(r.mode).toBe('within');
    expect(r.pairCode).toBe('CC');
    expect(r.titleZh).toBe('拓荒者・转向重铸者');
    expect(r.titleEn).toBe('Trailblazer into Reshaper');
    expect(r.taglineZh).toContain('创造');
  });

  it('L02 × L07 → LL pair', () => {
    const r = comboName('L02', 'L07', archetypes, comboData);
    expect(r.mode).toBe('within');
    expect(r.pairCode).toBe('LL');
    expect(r.titleZh).toBe('调律师的共鸣者季');
  });

  it('T01 × T03 → TT pair', () => {
    const r = comboName('T01', 'T03', archetypes, comboData);
    expect(r.mode).toBe('within');
    expect(r.pairCode).toBe('TT');
    expect(r.titleZh).toBe('深潜者・通向炼金师');
    expect(r.titleEn).toBe('Deep Diver toward Alchemist');
  });
});

describe('comboName — cross-faction (Tier 2)', () => {
  it('C01 × L05 → CL pair', () => {
    const r = comboName('C01', 'L05', archetypes, comboData);
    expect(r.mode).toBe('cross');
    expect(r.pairCode).toBe('CL');
    expect(r.titleZh).toBe('拓荒者的守护者章');
    expect(r.titleEn).toBe('The Guardian chapter of Trailblazer');
  });

  it('C01 × T01 → CT pair', () => {
    const r = comboName('C01', 'T01', archetypes, comboData);
    expect(r.mode).toBe('cross');
    expect(r.pairCode).toBe('CT');
    expect(r.titleZh).toBe('拓荒者・在深潜者里');
    expect(r.titleEn).toBe('Trailblazer inside Deep Diver');
  });

  it('L05 × C01 → LC pair (顺序与 CL 不同)', () => {
    const r = comboName('L05', 'C01', archetypes, comboData);
    expect(r.mode).toBe('cross');
    expect(r.pairCode).toBe('LC');
    expect(r.titleZh).toBe('守护者之中起拓荒者');
    expect(r.titleEn).toBe('Trailblazer rising in Guardian');
  });

  it('L09 × T10 → LT pair', () => {
    const r = comboName('L09', 'T10', archetypes, comboData);
    expect(r.mode).toBe('cross');
    expect(r.pairCode).toBe('LT');
    expect(r.titleZh).toBe('慰藉者里的招魂者');
  });

  it('T01 × C07 → TC pair', () => {
    const r = comboName('T01', 'C07', archetypes, comboData);
    expect(r.mode).toBe('cross');
    expect(r.pairCode).toBe('TC');
    expect(r.titleZh).toBe('深潜者之后的构形者');
    expect(r.titleEn).toBe('Shaper after Deep Diver');
  });

  it('T07 × L02 → TL pair', () => {
    const r = comboName('T07', 'L02', archetypes, comboData);
    expect(r.mode).toBe('cross');
    expect(r.pairCode).toBe('TL');
    expect(r.titleZh).toBe('淬火者寻得调律师');
  });
});

describe('comboName — fallback (Tier 3)', () => {
  it('unknown natalId → fallback', () => {
    const r = comboName('XXX', 'C01', archetypes, comboData);
    expect(r.mode).toBe('fallback');
    expect(r.pairCode).toBe('fallback');
    expect(r.titleZh).toContain('×');
  });

  it('unknown annualId → fallback', () => {
    const r = comboName('C01', 'XXX', archetypes, comboData);
    expect(r.mode).toBe('fallback');
  });

  it('fallback when missing factionPair entry', () => {
    // 构造一个缺失某 pair 的精简 data
    const incomplete: ComboNamingData = {
      version: '0.0.0',
      selfMatch: { ...comboData.selfMatch },
      factionPairs: {}, // 全部缺失
    };
    const r = comboName('C01', 'C09', archetypes, incomplete);
    expect(r.mode).toBe('fallback');
  });
});

describe('comboName — 确定性 + 全矩阵覆盖', () => {
  it('1296 个组合全部不抛错,且每个都有非空 title/tagline', () => {
    const ids: string[] = [];
    (['C', 'L', 'T'] as const).forEach((f) =>
      Array.from({ length: 12 }, (_, i) => i + 1).forEach((i) =>
        ids.push(`${f}${String(i).padStart(2, '0')}`),
      ),
    );
    let count = 0;
    let selfCount = 0;
    let withinCount = 0;
    let crossCount = 0;
    for (const n of ids) {
      for (const a of ids) {
        const r = comboName(n, a, archetypes, comboData);
        count += 1;
        if (r.mode === 'self') selfCount += 1;
        else if (r.mode === 'within') withinCount += 1;
        else if (r.mode === 'cross') crossCount += 1;
        expect(r.titleZh.length).toBeGreaterThan(0);
        expect(r.titleEn.length).toBeGreaterThan(0);
        expect(r.taglineZh.length).toBeGreaterThan(0);
        expect(r.taglineEn.length).toBeGreaterThan(0);
      }
    }
    expect(count).toBe(1296);
    expect(selfCount).toBe(36);
    // within = 同 faction 不同 archetype = 3 × (12*11) = 396
    expect(withinCount).toBe(396);
    // cross = 跨 faction = 3 × (24 × 12) = 864
    expect(crossCount).toBe(864);
  });

  it('同样 input 多次调用产出相同结果(确定性)', () => {
    const r1 = comboName('C01', 'L05', archetypes, comboData);
    const r2 = comboName('C01', 'L05', archetypes, comboData);
    expect(r1).toEqual(r2);
  });
});

describe('validateComboNamingData', () => {
  it('reject non-object', () => {
    expect(() => validateComboNamingData(null)).toThrow();
    expect(() => validateComboNamingData(42)).toThrow();
  });

  it('reject missing version', () => {
    expect(() => validateComboNamingData({ selfMatch: {}, factionPairs: {} })).toThrow(/version/);
  });

  it('reject selfMatch count !== 36', () => {
    expect(() =>
      validateComboNamingData({ version: '1', selfMatch: { C01: {} }, factionPairs: {} }),
    ).toThrow(/36/);
  });

  it('reject missing factionPair', () => {
    const sm: Record<string, unknown> = {};
    (['C', 'L', 'T'] as const).forEach((f) =>
      Array.from({ length: 12 }, (_, i) => i + 1).forEach((i) => {
        sm[`${f}${String(i).padStart(2, '0')}`] = {
          titleZh: 'x',
          titleEn: 'x',
          taglineZh: 'x',
          taglineEn: 'x',
        };
      }),
    );
    expect(() =>
      validateComboNamingData({
        version: '1',
        selfMatch: sm,
        factionPairs: { CC: {}, LL: {}, TT: {}, CL: {}, CT: {}, LC: {}, LT: {}, TC: {} }, // missing TL
      }),
    ).toThrow(/TL/);
  });

  it('accept well-formed data', () => {
    expect(() => validateComboNamingData(comboData)).not.toThrow();
  });
});
