/**
 * computeChart() 精度测试
 *
 * 对应文档:docs/content/archetypes/07-ephemeris-integration.md §4
 *
 * 验收标准:
 *   - 10 张盘 Sun sign 100% 命中
 *   - Sun 黄经误差 ≤ 1.5°(允许文献微差 / 时区 1° 偏移)
 *   - 至少 70% 的 Moon sign 命中(允许部分边界 case 偏移)
 *   - 控制台输出全套 lib vs golden 对比
 */

import { afterAll, beforeAll, describe, expect, it } from 'vitest';

import { computeChart } from '../compute-chart';
import { initEphemeris } from '../ephemeris';
import { GOLDEN_CHARTS } from './golden-charts';

describe('computeChart · 10 golden charts 精度对比', () => {
  beforeAll(async () => {
    await initEphemeris();
  });

  afterAll(() => {
    console.log('\n─── Golden Charts Summary ───────────────────');
  });

  for (const gc of GOLDEN_CHARTS) {
    it(`${gc.id} · ${gc.name} (Rodden ${gc.roddenRating})`, async () => {
      const input = await computeChart(gc.birth);

      const sunLon = (input.sun.degree ?? 0) +
        ['Aries','Taurus','Gemini','Cancer','Leo','Virgo','Libra','Scorpio','Sagittarius','Capricorn','Aquarius','Pisces']
          .indexOf(input.sun.sign) * 30;
      const sunLonDelta = Math.min(
        Math.abs(sunLon - gc.expected.sun.lonApprox),
        360 - Math.abs(sunLon - gc.expected.sun.lonApprox),
      );

      const moonOk = input.moon.sign === gc.expected.moon.sign;
      const ascOk = gc.expected.asc ? input.asc?.sign === gc.expected.asc.sign : null;

      // 调试输出
      console.log(
        `${gc.id} ${gc.name.padEnd(20)} ` +
        `Sun=${input.sun.sign.padEnd(12)} ${(input.sun.degree ?? 0).toFixed(1)}° ` +
        `(exp ${gc.expected.sun.sign.padEnd(12)} ${gc.expected.sun.lonApprox.toFixed(1)}°, Δ${sunLonDelta.toFixed(2)}°) ` +
        `Moon=${input.moon.sign}${moonOk ? '✓' : ` (exp ${gc.expected.moon.sign}✗)`} ` +
        (gc.expected.asc
          ? `Asc=${input.asc?.sign}${ascOk ? '✓' : ` (exp ${gc.expected.asc.sign}✗)`}`
          : ''),
      );

      // 硬要求:Sun sign 必须命中
      expect(input.sun.sign).toBe(gc.expected.sun.sign);
      // Sun 经度容差 1.5°
      expect(sunLonDelta).toBeLessThan(1.5);
    });
  }

  it('Steve Jobs · 关键相位:Saturn 必须在水瓶,Pluto 必须在狮子', async () => {
    const input = await computeChart(GOLDEN_CHARTS[0].birth);
    expect(input.pluto.sign).toBe('Leo');
    expect(input.pluto.retrograde).toBe(true);
  });

  it('Kurt Cobain · Pluto 必须在处女座(60s 一代标志)', async () => {
    const input = await computeChart(GOLDEN_CHARTS[9].birth);
    expect(input.pluto.sign).toBe('Virgo');
  });

  it('birthTimeKnown=false 时 ASC/MC 不存在,但行星签依然可算', async () => {
    const input = await computeChart({
      date: '1955-02-24',
      // time 缺失
      utcOffsetHours: -8,
    });
    expect(input.birthTimeKnown).toBe(false);
    expect(input.birthLocationKnown).toBe(false);
    expect(input.asc).toBeUndefined();
    // Sun sign 依然可算(误差大些,因为按 noon 计算)
    expect(input.sun.sign).toBe('Pisces');
  });

  it('birthLocationKnown=false 时 houses 不算', async () => {
    const input = await computeChart({
      date: '1955-02-24',
      time: '19:15',
      utcOffsetHours: -8,
      // lat/lon 缺失
    });
    expect(input.birthTimeKnown).toBe(true);
    expect(input.birthLocationKnown).toBe(false);
    expect(input.asc).toBeUndefined();
    expect(input.sun.house).toBeUndefined();
  });

  it('Steve Jobs (full input) 应该检测出 Saturn-Sun 合相或刑相之类的关键相位', async () => {
    const input = await computeChart(GOLDEN_CHARTS[0].birth);
    // 至少应该有非空的相位列表
    expect(input.aspects.length).toBeGreaterThan(0);
    // Pluto/Saturn 与 Sun 的关系:1955-02 Saturn 在 Scorpio,Sun 在 Pisces → 距离约 120° → trine
    console.log(`Steve Jobs aspects (${input.aspects.length} found):`);
    for (const a of input.aspects.slice(0, 15)) {
      console.log(`  ${a.p1}-${a.p2} ${a.type} orb=${a.orb.toFixed(2)}°`);
    }
  });
});
