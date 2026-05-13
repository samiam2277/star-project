/**
 * Golden Charts · 10 张已知出生数据的名人盘 ground truth
 *
 * 对应文档:docs/content/archetypes/07-ephemeris-integration.md §4
 *
 * 数据来源:AstroDataBank.com (Rodden Rating ≥ A) + 维基百科
 *
 * 用途:验证 computeChart() 的端到端精度,精度容差 ±1° 黄经。
 *      Sun sign 必须 100% 匹配;Moon sign 在 birth time AA/A 等级时必须匹配;
 *      Asc 在 birth time AA 等级时必须 sign-level 匹配。
 */

import type { ZodiacSign } from '../../types';
import type { BirthData } from '../compute-chart';

export interface GoldenChart {
  id: string;
  name: string;
  roddenRating: 'AA' | 'A';
  birth: BirthData;
  /** 期望值。lon 都是黄经度;sign 必须精确;degree 是 sign 内度数(0-30) */
  expected: {
    sun: { sign: ZodiacSign; lonApprox: number };
    moon: { sign: ZodiacSign; lonApprox?: number };
    asc?: { sign: ZodiacSign; lonApprox?: number };
    mc?: { sign: ZodiacSign };
    pluto?: { sign: ZodiacSign; retrograde?: boolean };
    /** 关键相位检查(可选) */
    aspects?: Array<{
      p1: 'sun' | 'moon' | 'mercury' | 'venus' | 'mars' | 'jupiter' | 'saturn' | 'uranus' | 'neptune' | 'pluto';
      p2: 'sun' | 'moon' | 'mercury' | 'venus' | 'mars' | 'jupiter' | 'saturn' | 'uranus' | 'neptune' | 'pluto';
      type: 'conjunct' | 'opposition' | 'square' | 'trine' | 'sextile';
    }>;
  };
  notes?: string;
}

/**
 * UTC 偏移说明:caller 需自行处理 DST。
 * BST(British Summer Time): UTC+1
 * BDST(British Double Summer Time, 1940-1945): UTC+2(主要在 5-10 月)
 * 1940-10-09 已回到 BST(BDST 在 10/6 结束),所以用 +1
 */
export const GOLDEN_CHARTS: GoldenChart[] = [
  {
    id: 'GC-01',
    name: 'Steve Jobs',
    roddenRating: 'AA',
    birth: {
      date: '1955-02-24',
      time: '19:15',
      utcOffsetHours: -8, // PST, no DST in Feb
      lat: 37.7749,
      lon: -122.4194,
    },
    expected: {
      sun: { sign: 'Pisces', lonApprox: 335.75 },
      moon: { sign: 'Aries', lonApprox: 7.75 },
      asc: { sign: 'Virgo' },
      pluto: { sign: 'Leo', retrograde: true },
    },
    notes: 'spike test 已验证 Sun 335.75 / Moon 7.75 / Pluto 145.3°(25° Leo) / Asc 172° (22° Virgo)',
  },

  {
    id: 'GC-02',
    name: 'John Lennon',
    roddenRating: 'AA',
    birth: {
      date: '1940-10-09',
      time: '18:30',
      utcOffsetHours: 1, // BST (BDST ended 1940-10-06)
      lat: 53.4084,
      lon: -2.9916,
    },
    expected: {
      sun: { sign: 'Libra', lonApprox: 196.5 }, // 16° Libra
      moon: { sign: 'Aquarius', lonApprox: 303 }, // ~3° Aquarius
      asc: { sign: 'Aries' },
    },
  },

  {
    id: 'GC-03',
    name: 'Madonna',
    roddenRating: 'AA',
    birth: {
      date: '1958-08-16',
      time: '07:05',
      utcOffsetHours: -5, // EST per AstroDataBank (DST was in effect but recorded as EST)
      lat: 43.5944,
      lon: -83.8889,
    },
    expected: {
      sun: { sign: 'Leo', lonApprox: 143 }, // ~23° Leo
      moon: { sign: 'Virgo' },
      asc: { sign: 'Virgo' },
    },
    notes: 'EST recorded; if EDT (-4) is actually correct, ASC may shift sign',
  },

  {
    id: 'GC-04',
    name: 'Princess Diana',
    roddenRating: 'A',
    birth: {
      date: '1961-07-01',
      time: '19:45',
      utcOffsetHours: 1, // BST
      lat: 52.8333,
      lon: 0.5,
    },
    expected: {
      sun: { sign: 'Cancer', lonApprox: 99 }, // ~9° Cancer
      moon: { sign: 'Aquarius' },
      asc: { sign: 'Sagittarius' },
    },
  },

  {
    id: 'GC-05',
    name: 'Carl Jung',
    roddenRating: 'AA',
    birth: {
      date: '1875-07-26',
      time: '19:32',
      utcOffsetHours: 9.322 / 15, // LMT for Kesswil, 9.322°E → +0.621h
      lat: 47.6,
      lon: 9.322,
    },
    expected: {
      sun: { sign: 'Leo', lonApprox: 123 }, // ~3° Leo
      moon: { sign: 'Taurus' },
      asc: { sign: 'Aquarius' },
    },
  },

  {
    id: 'GC-06',
    name: 'Vincent van Gogh',
    roddenRating: 'A',
    birth: {
      date: '1853-03-30',
      time: '11:00',
      utcOffsetHours: 4.66 / 15, // LMT Zundert, 4.66°E → +0.31h
      lat: 51.46,
      lon: 4.66,
    },
    expected: {
      sun: { sign: 'Aries', lonApprox: 9 }, // ~9° Aries
      moon: { sign: 'Sagittarius' },
    },
    notes: 'Asc 在不同来源差异较大 (Cancer / Gemini),不强制要求',
  },

  {
    id: 'GC-07',
    name: 'Pablo Picasso',
    roddenRating: 'AA',
    birth: {
      date: '1881-10-25',
      time: '23:15',
      utcOffsetHours: -4.42 / 15, // WET ~ -4.42°/15 → -0.295h(Málaga 西经 4.42°)
      lat: 36.72,
      lon: -4.42,
    },
    expected: {
      sun: { sign: 'Scorpio', lonApprox: 212.5 }, // ~2.5° Scorpio
      moon: { sign: 'Sagittarius' },
      asc: { sign: 'Virgo' },
    },
    notes: '盘面文献注 23:15 LMT 当地;Spain 1881 用 LMT',
  },

  {
    id: 'GC-08',
    name: 'Walt Disney',
    roddenRating: 'AA',
    birth: {
      date: '1901-12-05',
      time: '00:35',
      utcOffsetHours: -6, // CST Chicago
      lat: 41.9,
      lon: -87.65,
    },
    expected: {
      sun: { sign: 'Sagittarius', lonApprox: 252.5 }, // ~12.5° Sagittarius
      moon: { sign: 'Libra' },
      asc: { sign: 'Virgo' },
    },
  },

  {
    id: 'GC-09',
    name: 'Frida Kahlo',
    roddenRating: 'AA',
    birth: {
      date: '1907-07-06',
      time: '08:30',
      utcOffsetHours: -6.611, // LMT Coyoacán, -99.16°/15
      lat: 19.35,
      lon: -99.16,
    },
    expected: {
      sun: { sign: 'Cancer', lonApprox: 103.5 }, // ~13.5° Cancer
      moon: { sign: 'Taurus' },
      asc: { sign: 'Leo' },
    },
  },

  {
    id: 'GC-10',
    name: 'Kurt Cobain',
    roddenRating: 'AA',
    birth: {
      date: '1967-02-20',
      time: '19:38',
      utcOffsetHours: -8, // PST, no DST in Feb
      lat: 46.975,
      lon: -123.815,
    },
    expected: {
      sun: { sign: 'Pisces', lonApprox: 331.5 }, // ~1.5° Pisces
      moon: { sign: 'Cancer' },
      asc: { sign: 'Leo' },
      pluto: { sign: 'Virgo' },
    },
  },
];
