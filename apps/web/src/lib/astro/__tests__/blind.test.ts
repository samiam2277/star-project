/**
 * 25 张名人星盘盲测 · 报告式
 *
 * 对应文档:docs/content/archetypes/04-validation-blindtest.md
 *
 * **不做硬断言**(per 用户决策"报告为主"),仅:
 *   - 唯一硬断言:`expect(r).toBeDefined()`(引擎不能炸)
 *   - 输出表格行 + 末尾汇总打印 metric
 *
 * 运行:
 *   cd apps/web
 *   npx vitest run src/lib/astro/__tests__/blind.test.ts
 */

import { beforeAll, describe, expect, it } from 'vitest';
import path from 'node:path';
import { loadDecisionTreeFromFile } from '../rules';
import { matchArchetypes } from '../match';
import { BLIND_CASES, type BlindCase } from './blind.fixtures';
import { computeChart } from '../compute/compute-chart';
import { initEphemeris } from '../compute/ephemeris';
import type { AstroInput, MatchResult } from '../types';

const TREE_PATH = path.resolve(
  __dirname,
  '../../../../../../docs/content/archetypes/decision-tree.json',
);
const tree = loadDecisionTreeFromFile(TREE_PATH);

function factionOf(archetypeId: string): 'C' | 'L' | 'T' | '?' {
  const first = archetypeId.charAt(0);
  if (first === 'C' || first === 'L' || first === 'T') return first;
  return '?';
}

function topN(r: MatchResult, n: number): string[] {
  const ids = [r.primary.archetypeId];
  for (const s of r.secondary.slice(0, n - 1)) ids.push(s.archetypeId);
  return ids;
}

interface CaseResult {
  case: BlindCase;
  result: MatchResult;
  top1Hit: boolean;
  top3Hit: boolean;
  factionHit: boolean;
  ranking: 1 | 2 | 3 | null; // expected primary 在 top-N 的位置;null = 未命中 top-3
}

function evaluate(c: BlindCase, r: MatchResult): CaseResult {
  const expectedPrimary = c.expected.primary;
  const accepted = [expectedPrimary, ...(c.expected.alternatives ?? [])];
  const top3 = topN(r, 3);

  const top1Hit = top3[0] === expectedPrimary;
  const top3Hit = top3.some((id) => accepted.includes(id));
  const factionHit = factionOf(r.primary.archetypeId) === c.expected.faction;

  let ranking: 1 | 2 | 3 | null = null;
  if (top3[0] === expectedPrimary) ranking = 1;
  else if (top3[1] === expectedPrimary) ranking = 2;
  else if (top3[2] === expectedPrimary) ranking = 3;

  return { case: c, result: r, top1Hit, top3Hit, factionHit, ranking };
}

const allResults: CaseResult[] = [];

describe('blind chart validation — 25 celebrity charts', () => {
  it.each(BLIND_CASES)('$id $name → engine output', (c) => {
    const r = matchArchetypes(c.input, tree);

    // 唯一硬断言:不炸
    expect(r).toBeDefined();
    expect(r.primary).toBeDefined();
    expect(r.primary.archetypeId).toMatch(/^[CLT](0[1-9]|1[0-2])$/);

    const evalRes = evaluate(c, r);
    allResults.push(evalRes);

    const top3 = topN(r, 3).join(' / ');
    const expectMark = c.expected.primary;
    const alts = c.expected.alternatives?.join(',') ?? '';
    const flags = [
      evalRes.top1Hit ? 'T1✓' : '   ',
      evalRes.top3Hit ? 'T3✓' : '   ',
      evalRes.factionHit ? 'F✓' : 'F✗',
    ].join(' ');
    const score = `${r.primary.score}`;

    // eslint-disable-next-line no-console
    console.log(
      `${c.id} ${c.name.padEnd(22)} | expect ${expectMark}(${alts.padEnd(7)}) | top3=${top3.padEnd(15)} | conf=${r.confidence.padEnd(4)} | score=${score.padEnd(4)} | ${flags}`,
    );
  });
});

describe('blind chart validation — summary metrics', () => {
  it('aggregate hit-rates', () => {
    expect(allResults.length).toBe(BLIND_CASES.length);

    const n = allResults.length;
    const top1 = allResults.filter((r) => r.top1Hit).length;
    const top3 = allResults.filter((r) => r.top3Hit).length;
    const faction = allResults.filter((r) => r.factionHit).length;

    const confDist: Record<string, number> = { high: 0, mid: 0, low: 0 };
    for (const r of allResults) confDist[r.result.confidence] = (confDist[r.result.confidence] ?? 0) + 1;

    const factionBreakdown: Record<'C' | 'L' | 'T', { total: number; t1: number; t3: number; f: number }> = {
      C: { total: 0, t1: 0, t3: 0, f: 0 },
      L: { total: 0, t1: 0, t3: 0, f: 0 },
      T: { total: 0, t1: 0, t3: 0, f: 0 },
    };
    for (const r of allResults) {
      const fact = r.case.expected.faction;
      factionBreakdown[fact].total += 1;
      if (r.top1Hit) factionBreakdown[fact].t1 += 1;
      if (r.top3Hit) factionBreakdown[fact].t3 += 1;
      if (r.factionHit) factionBreakdown[fact].f += 1;
    }

    // 覆盖盲点:36 原型中哪些从未作为 primary 出现?
    const primarySet = new Set(allResults.map((r) => r.result.primary.archetypeId));
    const allIds: string[] = [];
    (['C', 'L', 'T'] as const).forEach((f) =>
      Array.from({ length: 12 }, (_, i) => i + 1).forEach((i) =>
        allIds.push(`${f}${String(i).padStart(2, '0')}`),
      ),
    );
    const never = allIds.filter((id) => !primarySet.has(id));

    const pct = (k: number, total = n) => `${((k / total) * 100).toFixed(1)}%`;
    const lines = [
      '',
      '====================================================',
      '          BLIND CHART VALIDATION SUMMARY',
      '====================================================',
      `Total cases:           ${n}`,
      `Top-1 hit rate:        ${top1}/${n} = ${pct(top1)}`,
      `Top-3 hit rate:        ${top3}/${n} = ${pct(top3)}`,
      `Same-faction hit rate: ${faction}/${n} = ${pct(faction)}`,
      '',
      'Confidence distribution:',
      `  high: ${confDist.high} (${pct(confDist.high ?? 0)})`,
      `  mid:  ${confDist.mid}  (${pct(confDist.mid ?? 0)})`,
      `  low:  ${confDist.low}  (${pct(confDist.low ?? 0)})`,
      '',
      'Per-faction breakdown:',
    ];
    (['C', 'L', 'T'] as const).forEach((f) => {
      const b = factionBreakdown[f];
      if (b.total === 0) return;
      lines.push(
        `  ${f}: ${b.total} cases | T1=${b.t1}/${b.total} (${pct(b.t1, b.total)}) | T3=${b.t3}/${b.total} (${pct(b.t3, b.total)}) | F=${b.f}/${b.total} (${pct(b.f, b.total)})`,
      );
    });
    lines.push('');
    lines.push(`Coverage gap — never appeared as primary (${never.length}/36):`);
    if (never.length === 0) lines.push('  (none — full coverage)');
    else lines.push('  ' + never.join(' '));
    lines.push('====================================================');
    lines.push('');

    // eslint-disable-next-line no-console
    console.log(lines.join('\n'));

    // 至少要有点合理的命中(faction hit rate ≥ 33% 即超随机基线)
    expect(faction).toBeGreaterThanOrEqual(Math.floor(n / 3));
  });
});

// =================================================================
//                  After Ephemeris — 重跑(真实星历)
// =================================================================

const afterResults: CaseResult[] = [];
const computedInputs = new Map<string, AstroInput>();

describe('blind chart validation — After Ephemeris (computed from birth data)', () => {
  beforeAll(async () => {
    await initEphemeris();
    const targets = BLIND_CASES.filter((c) => c.birthData);
    const computed = await Promise.all(
      targets.map(async (c) => ({
        id: c.id,
        input: await computeChart(c.birthData!),
      })),
    );
    for (const { id, input } of computed) {
      computedInputs.set(id, input);
    }
  });

  it.each(BLIND_CASES)('$id $name → engine output (ephemeris)', (c) => {
    const input = computedInputs.get(c.id) ?? c.input;
    const r = matchArchetypes(input, tree);

    expect(r).toBeDefined();
    expect(r.primary).toBeDefined();
    expect(r.primary.archetypeId).toMatch(/^[CLT](0[1-9]|1[0-2])$/);

    const evalRes = evaluate(c, r);
    afterResults.push(evalRes);

    const usingEphemeris = computedInputs.has(c.id);
    const top3 = topN(r, 3).join(' / ');
    const expectMark = c.expected.primary;
    const alts = c.expected.alternatives?.join(',') ?? '';
    const flags = [
      evalRes.top1Hit ? 'T1✓' : '   ',
      evalRes.top3Hit ? 'T3✓' : '   ',
      evalRes.factionHit ? 'F✓' : 'F✗',
    ].join(' ');
    const score = `${r.primary.score}`;
    const tag = usingEphemeris ? 'EPH' : 'MAN';

    // eslint-disable-next-line no-console
    console.log(
      `[${tag}] ${c.id} ${c.name.padEnd(22)} | expect ${expectMark}(${alts.padEnd(7)}) | top3=${top3.padEnd(15)} | conf=${r.confidence.padEnd(4)} | score=${score.padEnd(4)} | ${flags}`,
    );
  });
});

describe('blind chart validation — Before vs After ephemeris comparison', () => {
  it('aggregate delta', () => {
    expect(allResults.length).toBe(BLIND_CASES.length);
    expect(afterResults.length).toBe(BLIND_CASES.length);

    const stat = (results: CaseResult[]) => {
      const n = results.length;
      const top1 = results.filter((r) => r.top1Hit).length;
      const top3 = results.filter((r) => r.top3Hit).length;
      const faction = results.filter((r) => r.factionHit).length;
      const fb: Record<'C' | 'L' | 'T', { total: number; t1: number; t3: number; f: number }> = {
        C: { total: 0, t1: 0, t3: 0, f: 0 },
        L: { total: 0, t1: 0, t3: 0, f: 0 },
        T: { total: 0, t1: 0, t3: 0, f: 0 },
      };
      for (const r of results) {
        const fact = r.case.expected.faction;
        fb[fact].total += 1;
        if (r.top1Hit) fb[fact].t1 += 1;
        if (r.top3Hit) fb[fact].t3 += 1;
        if (r.factionHit) fb[fact].f += 1;
      }
      return { n, top1, top3, faction, fb };
    };

    const before = stat(allResults);
    const after = stat(afterResults);

    const pct = (k: number, total: number) =>
      total === 0 ? '  0.0%' : `${((k / total) * 100).toFixed(1).padStart(5)}%`;
    const delta = (a: number, b: number, total: number) => {
      if (total === 0) return ' 0.0%';
      const d = ((a - b) / total) * 100;
      const sign = d > 0 ? '+' : d < 0 ? '' : ' ';
      return `${sign}${d.toFixed(1)}%`;
    };

    const lines: string[] = [
      '',
      '======================================================',
      '       EPHEMERIS BEFORE / AFTER COMPARISON',
      '======================================================',
      `n = ${before.n}, ephemeris-computed = ${computedInputs.size}`,
      '',
      '              Before(manual)    After(ephemeris)    Δ',
      `T1 hit        ${pct(before.top1, before.n)}             ${pct(after.top1, after.n)}             ${delta(after.top1, before.top1, before.n)}`,
      `T3 hit        ${pct(before.top3, before.n)}             ${pct(after.top3, after.n)}             ${delta(after.top3, before.top3, before.n)}`,
      `Faction hit   ${pct(before.faction, before.n)}             ${pct(after.faction, after.n)}             ${delta(after.faction, before.faction, before.n)}`,
      '',
      'Per-faction T1 hit rate:',
    ];

    (['C', 'L', 'T'] as const).forEach((f) => {
      const b = before.fb[f];
      const a = after.fb[f];
      if (b.total === 0) return;
      lines.push(
        `  ${f}: total=${b.total} | Before T1=${b.t1}/${b.total} (${pct(b.t1, b.total)}) | After T1=${a.t1}/${b.total} (${pct(a.t1, b.total)}) | Δ ${delta(a.t1, b.t1, b.total)}`,
      );
    });

    lines.push('');
    lines.push('Per-case ranking change (Before → After):');
    let changedCount = 0;
    for (let i = 0; i < allResults.length; i++) {
      const b = allResults[i];
      const a = afterResults[i];
      const beforeId = b.result.primary.archetypeId;
      const afterId = a.result.primary.archetypeId;
      const beforeRank = b.ranking ?? '-';
      const afterRank = a.ranking ?? '-';
      if (beforeId === afterId && beforeRank === afterRank) continue;
      changedCount += 1;
      let mark = '·';
      if (a.top1Hit && !b.top1Hit) mark = '↑↑';
      else if (b.top1Hit && !a.top1Hit) mark = '↓↓';
      else if (a.top3Hit && !b.top3Hit) mark = '↑';
      else if (b.top3Hit && !a.top3Hit) mark = '↓';
      lines.push(
        `  ${mark}  ${b.case.id} ${b.case.name.padEnd(22)} | expect ${b.case.expected.primary} | Before=${beforeId}(rank ${beforeRank}) → After=${afterId}(rank ${afterRank})`,
      );
    }
    if (changedCount === 0) lines.push('  (no changes — ephemeris produced same primary for all)');

    // Coverage gap change
    const beforePrimaries = new Set(allResults.map((r) => r.result.primary.archetypeId));
    const afterPrimaries = new Set(afterResults.map((r) => r.result.primary.archetypeId));
    const allIds: string[] = [];
    (['C', 'L', 'T'] as const).forEach((f) =>
      Array.from({ length: 12 }, (_, i) => i + 1).forEach((i) =>
        allIds.push(`${f}${String(i).padStart(2, '0')}`),
      ),
    );
    const beforeNever = allIds.filter((id) => !beforePrimaries.has(id));
    const afterNever = allIds.filter((id) => !afterPrimaries.has(id));
    lines.push('');
    lines.push(
      `Coverage gap: Before ${beforeNever.length}/36 never appeared → After ${afterNever.length}/36`,
    );
    const newlyCovered = beforeNever.filter((id) => !afterNever.includes(id));
    const newlyLost = afterNever.filter((id) => !beforeNever.includes(id));
    if (newlyCovered.length > 0) lines.push(`  newly covered: ${newlyCovered.join(' ')}`);
    if (newlyLost.length > 0) lines.push(`  newly lost:    ${newlyLost.join(' ')}`);

    lines.push('======================================================');
    lines.push('');

    // eslint-disable-next-line no-console
    console.log(lines.join('\n'));

    // Regression guard: T-faction T1 must not regress
    expect(after.fb.T.t1).toBeGreaterThanOrEqual(before.fb.T.t1);
  });
});
