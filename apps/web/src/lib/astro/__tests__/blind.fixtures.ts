/**
 * 25 张名人星盘盲测数据集
 *
 * 对应文档:docs/content/archetypes/04-validation-blindtest.md
 *
 * **数据来源声明**
 * - Sun sign:基于公开生日(维基百科 / AstroDataBank),高置信
 * - Moon / Asc:从公开盘面查阅,置信度取决于 Rodden Rating
 *   - AA = 出生证记录,极高置信
 *   - A  = 当事人或亲属陈述,高置信
 *   - B  = 传记 / 个人陈述,中等
 *   - C  = 来源不一致 / 仅推测
 *   - DD = 数据有争议,低置信
 * - 行星宫位 / 相位:未现算,仅在 `notes` 标记的高置信案例中编码,其余用 fixtures.ts 默认散布
 *
 * **关于 expected**
 * - `expected.primary`:作者基于人物公开形象 + 36 原型语义的手工指认
 * - `expected.alternatives`:可接受备选(top-3 内命中即视为 hit)
 * - `expected.faction`:从 primary archetypeId 派生(第一位字母)
 * - 「intuition 与 rule 可能不一致」的案例已在 `notes` 标注
 *
 * 不是 ground truth,而是 best-effort manual labels(用于检验决策树的"直觉吻合度")
 */

import type { AstroInput } from '../types';
import type { BirthData } from '../compute/compute-chart';
import { buildInput } from './fixtures';

export interface BlindCase {
  id: string;
  name: string;
  nameZh?: string;
  birth: { date: string; tz?: string; place?: string };
  roddenRating: 'AA' | 'A' | 'B' | 'C' | 'DD';
  input: AstroInput;
  /**
   * 出生地数据(若可考)。提供时,blind.test.ts 的「After Ephemeris」段
   * 会用 computeChart(birthData) 替换 input 跑第二轮。
   * 时间未知的盘留 undefined(回退到手工 input)。
   */
  birthData?: BirthData;
  expected: {
    primary: string;
    alternatives?: string[];
    faction: 'C' | 'L' | 'T';
  };
  rationale: string;
  notes?: string;
}

export const BLIND_CASES: BlindCase[] = [
  // ===========  C 创造系  ===========

  {
    id: 'BC-01',
    name: 'Steve Jobs',
    nameZh: '史蒂夫·乔布斯',
    birth: { date: '1955-02-24 19:15', tz: 'PST', place: 'San Francisco' },
    roddenRating: 'AA',
    input: buildInput({
      sun: { sign: 'Pisces', house: 7 },
      moon: { sign: 'Aries', house: 8 },
      asc: { sign: 'Virgo' },
      mercury: { sign: 'Aquarius', house: 6 },
      venus: { sign: 'Aries', house: 8 },
      mars: { sign: 'Aries', house: 8 },
    }),
    expected: { primary: 'C10', alternatives: ['L01', 'C02'], faction: 'C' },
    rationale: '双鱼太阳的视觉直觉 + 处女上升的执行精度,把"美固化在物里"。',
    notes: '内行星 estimate',
  },

  {
    id: 'BC-02',
    name: 'Elon Musk',
    nameZh: '埃隆·马斯克',
    birth: { date: '1971-06-28 07:30', tz: 'SAST', place: 'Pretoria' },
    roddenRating: 'A',
    input: buildInput({
      sun: { sign: 'Cancer', house: 11 },
      moon: { sign: 'Virgo', house: 1 },
      asc: { sign: 'Leo' },
      mars: { sign: 'Aquarius' },
    }),
    expected: { primary: 'C12', alternatives: ['L05', 'C07'], faction: 'C' },
    rationale: '巨蟹太阳的乡愁 + 狮子上升的舞台心 = 用商业实现孩子气大梦的远望者。',
    notes: 'Sun Cancer 强信号,引擎可能优先 L-faction',
  },

  {
    id: 'BC-03',
    name: 'Walt Disney',
    nameZh: '华特·迪士尼',
    birth: { date: '1901-12-05 00:35', tz: 'CST', place: 'Chicago' },
    roddenRating: 'AA',
    input: buildInput({
      sun: { sign: 'Sagittarius', house: 2 },
      moon: { sign: 'Libra', house: 12 },
      asc: { sign: 'Virgo' },
      jupiter: { sign: 'Capricorn' },
    }),
    expected: { primary: 'C08', alternatives: ['C12', 'L04'], faction: 'C' },
    rationale: '射手太阳的远方愿景 + 天秤月的美感 = 在路上才找到家的远征者(造梦版)。',
  },

  {
    id: 'BC-05',
    name: 'Pablo Picasso',
    nameZh: '帕勃罗·毕加索',
    birth: { date: '1881-10-25 23:15', tz: 'WET', place: 'Málaga' },
    roddenRating: 'AA',
    input: buildInput({
      sun: { sign: 'Scorpio', house: 4 },
      moon: { sign: 'Sagittarius', house: 5 },
      asc: { sign: 'Virgo' },
      mars: { sign: 'Leo', house: 1 },
    }),
    expected: { primary: 'C09', alternatives: ['T01', 'T03'], faction: 'C' },
    rationale: '天蝎太阳的深渊视野 + 火星狮子的舞台 + 不断推翻自己 = 重铸者。',
    notes: 'Sun Scorpio + Mars Leo 双信号,理论上 C09 应该命中',
  },

  {
    id: 'BC-06',
    name: 'Madonna',
    nameZh: '麦当娜',
    birth: { date: '1958-08-16 07:05', tz: 'EST', place: 'Bay City MI' },
    roddenRating: 'AA',
    input: buildInput({
      sun: { sign: 'Leo', house: 12 },
      moon: { sign: 'Virgo', house: 1 },
      asc: { sign: 'Virgo' },
      mars: { sign: 'Taurus' },
    }),
    expected: { primary: 'C03', alternatives: ['C04', 'T05'], faction: 'C' },
    rationale: '狮子太阳的征服欲 + 处女上升的纪律 = 把自己当作号召旗的号召者。',
  },

  {
    id: 'BC-07',
    name: 'Beyoncé',
    nameZh: '碧昂丝',
    birth: { date: '1981-09-04 22:00', tz: 'CST', place: 'Houston' },
    roddenRating: 'B',
    input: buildInput({
      sun: { sign: 'Virgo' },
      moon: { sign: 'Scorpio' },
      asc: { sign: 'Taurus' },
      mars: { sign: 'Virgo' },
    }),
    expected: { primary: 'C06', alternatives: ['L04', 'C09'], faction: 'C' },
    rationale: '处女太阳与火星的精度 + 天蝎月的深度 = 在毫米差里见神的雕琢师。',
    notes: 'Asc estimate',
  },

  {
    id: 'BC-08',
    name: 'Lady Gaga',
    nameZh: '嘎嘎小姐',
    birth: { date: '1986-03-28 20:25', tz: 'EST', place: 'NYC' },
    roddenRating: 'A',
    input: buildInput({
      sun: { sign: 'Aries' },
      moon: { sign: 'Scorpio' },
      asc: { sign: 'Scorpio' },
      mars: { sign: 'Capricorn' },
    }),
    expected: { primary: 'C01', alternatives: ['C03', 'T01'], faction: 'C' },
    rationale: '白羊太阳的开荒勇气 + 天蝎月与上升的深度 = 用震撼力拓荒。',
  },

  {
    id: 'BC-12',
    name: 'Oprah Winfrey',
    nameZh: '奥普拉',
    birth: { date: '1954-01-29 04:30', tz: 'CST', place: 'Kosciusko MS' },
    roddenRating: 'A',
    input: buildInput({
      sun: { sign: 'Aquarius', house: 4 },
      moon: { sign: 'Sagittarius', house: 1 },
      asc: { sign: 'Sagittarius' },
      jupiter: { sign: 'Gemini' },
    }),
    expected: { primary: 'C11', alternatives: ['L02', 'T02'], faction: 'C' },
    rationale: '水瓶太阳的革新 + 射手月与上升的广博 = 让人第一次看见自己的开蒙者。',
    notes: '直觉更像 L-faction,但 C11 占星特征命中度更高',
  },

  {
    id: 'BC-21',
    name: 'Vincent van Gogh',
    nameZh: '梵高',
    birth: { date: '1853-03-30 11:00', tz: 'LMT', place: 'Zundert' },
    roddenRating: 'A',
    input: buildInput({
      sun: { sign: 'Aries' },
      moon: { sign: 'Sagittarius' },
      asc: { sign: 'Cancer' },
      mars: { sign: 'Pisces' },
    }),
    expected: { primary: 'C01', alternatives: ['T10', 'C10'], faction: 'C' },
    rationale: '白羊太阳的开荒 + 射手月的远方 = 拓荒者(在画布上)。',
    notes: '其内核也有强 T-faction 蜕变痛苦',
  },

  // ===========  L 链接系  ===========

  {
    id: 'BC-09',
    name: 'John Lennon',
    nameZh: '约翰·列侬',
    birth: { date: '1940-10-09 18:30', tz: 'BST', place: 'Liverpool' },
    roddenRating: 'AA',
    input: buildInput({
      sun: { sign: 'Libra', house: 6 },
      moon: { sign: 'Aquarius', house: 10 },
      asc: { sign: 'Aries' },
      mercury: { sign: 'Libra', house: 6 },
    }),
    expected: { primary: 'L02', alternatives: ['L07', 'L12'], faction: 'L' },
    rationale: '天秤太阳与水星 + 水瓶月的乌托邦 = 让一切回到平衡的调律师。',
  },

  {
    id: 'BC-10',
    name: 'Princess Diana',
    nameZh: '戴安娜王妃',
    birth: { date: '1961-07-01 19:45', tz: 'BST', place: 'Sandringham' },
    roddenRating: 'A',
    input: buildInput({
      sun: { sign: 'Cancer', house: 7 },
      moon: { sign: 'Aquarius', house: 2 },
      asc: { sign: 'Sagittarius' },
      venus: { sign: 'Taurus' },
    }),
    expected: { primary: 'L05', alternatives: ['L09', 'L07'], faction: 'L' },
    rationale: '巨蟹太阳的母性 + 射手上升的国际视野 = 用安静的方式护着众人的守护者。',
  },

  {
    id: 'BC-11',
    name: 'Audrey Hepburn',
    nameZh: '奥黛丽·赫本',
    birth: { date: '1929-05-04 03:00', tz: 'CET', place: 'Brussels' },
    roddenRating: 'AA',
    input: buildInput({
      sun: { sign: 'Taurus', house: 1 },
      moon: { sign: 'Pisces', house: 11 },
      asc: { sign: 'Pisces' },
      venus: { sign: 'Aries' },
    }),
    expected: { primary: 'L11', alternatives: ['L01', 'L06'], faction: 'L' },
    rationale: '金牛太阳的稳定 + 双鱼月与上升的悲悯 = 把不同的人拥抱进同一家的拥抱者。',
  },

  {
    id: 'BC-13',
    name: 'Mother Teresa',
    nameZh: '特蕾莎修女',
    birth: { date: '1910-08-26 13:25', tz: 'CET', place: 'Skopje' },
    roddenRating: 'AA',
    input: buildInput({
      sun: { sign: 'Virgo', house: 11 },
      moon: { sign: 'Taurus', house: 7 },
      asc: { sign: 'Libra' },
      mars: { sign: 'Leo' },
    }),
    expected: { primary: 'L06', alternatives: ['L05', 'L09'], faction: 'L' },
    rationale: '处女太阳的服务 + 金牛月的踏实 + 天秤上升的关系 = 听懂没说出的话的聆听者。',
    notes: 'L06 占星签名要求 Moon Pisces,而她是 Taurus,可能 Asc Libra 触发 L02',
  },

  {
    id: 'BC-14',
    name: 'Paul McCartney',
    nameZh: '保罗·麦卡特尼',
    birth: { date: '1942-06-18 14:00', tz: 'BST', place: 'Liverpool' },
    roddenRating: 'A',
    input: buildInput({
      sun: { sign: 'Gemini', house: 10 },
      moon: { sign: 'Leo', house: 12 },
      asc: { sign: 'Libra' },
      mercury: { sign: 'Gemini', house: 10 },
    }),
    expected: { primary: 'L10', alternatives: ['L03', 'L04'], faction: 'L' },
    rationale: '双子太阳与水星 + 狮子月的舞台 = 让信息长出关系的串联者。',
  },

  {
    id: 'BC-15',
    name: 'Mahatma Gandhi',
    nameZh: '甘地',
    birth: { date: '1869-10-02 07:11', tz: 'LMT', place: 'Porbandar' },
    roddenRating: 'A',
    input: buildInput({
      sun: { sign: 'Libra' },
      moon: { sign: 'Leo' },
      asc: { sign: 'Libra' },
      mercury: { sign: 'Libra' },
    }),
    expected: { primary: 'L02', alternatives: ['L12', 'L07'], faction: 'L' },
    rationale: '天秤太阳/水星与上升 + 狮子月的领导力 = 让一切回到平衡的调律师。',
  },

  {
    id: 'BC-16',
    name: 'Mr. Rogers (Fred Rogers)',
    nameZh: '罗杰斯先生',
    birth: { date: '1928-03-20 12:00', tz: 'EST', place: 'Latrobe PA' },
    roddenRating: 'DD',
    input: buildInput({
      sun: { sign: 'Pisces' },
      moon: { sign: 'Pisces' },
      birthTimeKnown: false,
    }),
    expected: { primary: 'L01', alternatives: ['L07', 'L09'], faction: 'L' },
    rationale: '双鱼太阳的悲悯,儿童电视的温柔陪伴 = 在梦与现实间搭线的织梦人。',
    notes: 'Moon/Asc 完全 estimate;L1 降级测试',
  },

  {
    id: 'BC-19',
    name: 'Frida Kahlo',
    nameZh: '弗里达·卡罗',
    birth: { date: '1907-07-06 08:30', tz: 'CST', place: 'Coyoacán' },
    roddenRating: 'AA',
    input: buildInput({
      sun: { sign: 'Cancer', house: 11 },
      moon: { sign: 'Taurus', house: 9 },
      asc: { sign: 'Leo' },
    }),
    expected: { primary: 'L09', alternatives: ['T10', 'T05'], faction: 'L' },
    rationale: '巨蟹太阳 + 狮子上升 = 慰藉者(虽然她的人生更像 T-faction 蜕变)。',
    notes: '直觉 T-faction,但 Cancer sun 主导规则倾向 L',
  },

  {
    id: 'BC-23',
    name: '张爱玲',
    nameZh: '张爱玲',
    birth: { date: '1920-09-30 07:00', tz: 'CST', place: 'Shanghai' },
    roddenRating: 'A',
    input: buildInput({
      sun: { sign: 'Libra' },
      moon: { sign: 'Pisces' },
      asc: { sign: 'Libra' },
    }),
    expected: { primary: 'L02', alternatives: ['L07', 'T05'], faction: 'L' },
    rationale: '天秤太阳与上升 + 双鱼月的悲悯文字 = 在文字中调律的调律师。',
    notes: 'Moon estimate;其文学内核也有强 T-faction 转化',
  },

  // ===========  T 转化系  ===========

  {
    id: 'BC-04',
    name: 'Marie Curie',
    nameZh: '居里夫人',
    birth: { date: '1867-11-07 18:00', tz: 'LMT', place: 'Warsaw' },
    roddenRating: 'C',
    input: buildInput({
      sun: { sign: 'Scorpio' },
      moon: { sign: 'Pisces' },
      birthTimeKnown: false,
    }),
    expected: { primary: 'T03', alternatives: ['T04', 'T01'], faction: 'T' },
    rationale: '天蝎太阳 + 双鱼月 = 用水的智慧炼出金的物质的炼金师(科学版)。',
    notes: 'T03 需 Pluto conj Sun;1867 年 Pluto 在金牛,不合相,可能落 T01',
  },

  {
    id: 'BC-17',
    name: 'Carl Jung',
    nameZh: '卡尔·荣格',
    birth: { date: '1875-07-26 19:32', tz: 'CET', place: 'Kesswil' },
    roddenRating: 'AA',
    input: buildInput({
      sun: { sign: 'Leo', house: 7 },
      moon: { sign: 'Taurus', house: 4 },
      asc: { sign: 'Aquarius' },
      saturn: { sign: 'Aquarius' },
    }),
    expected: { primary: 'T09', alternatives: ['T02', 'C03'], faction: 'T' },
    rationale: '狮子太阳照亮无意识 + 水瓶上升的革新 = 在闪电里看见全图的启示者。',
    notes: 'Leo sun 主导,引擎可能 fire C03 而非 T09',
  },

  {
    id: 'BC-18',
    name: 'Sigmund Freud',
    nameZh: '弗洛伊德',
    birth: { date: '1856-05-06 18:30', tz: 'LMT', place: 'Freiberg' },
    roddenRating: 'AA',
    input: buildInput({
      sun: { sign: 'Taurus', house: 7 },
      moon: { sign: 'Gemini', house: 8 },
      asc: { sign: 'Scorpio' },
    }),
    expected: { primary: 'T11', alternatives: ['T04', 'C02'], faction: 'T' },
    rationale: '金牛太阳的固执 + 天蝎上升 + 月在8宫 = 掘到无意识最底层的掘井者。',
    notes: '金牛 sun 可能优先 fire C02',
  },

  {
    id: 'BC-20',
    name: 'Nikola Tesla',
    nameZh: '尼古拉·特斯拉',
    birth: { date: '1856-07-10 00:00', tz: 'LMT', place: 'Smiljan' },
    roddenRating: 'C',
    input: buildInput({
      sun: { sign: 'Cancer' },
      moon: { sign: 'Virgo' },
      birthTimeKnown: false,
    }),
    expected: { primary: 'T09', alternatives: ['C07', 'T11'], faction: 'T' },
    rationale: '孤独发明家 + 天王启示式直觉 = 启示者。',
    notes: 'Cancer sun 可能强 fire L05;L1 降级测试',
  },

  {
    id: 'BC-22',
    name: 'Kurt Cobain',
    nameZh: '库尔特·柯本',
    birth: { date: '1967-02-20 19:38', tz: 'PST', place: 'Aberdeen WA' },
    roddenRating: 'AA',
    input: buildInput({
      sun: { sign: 'Pisces', house: 8 },
      moon: { sign: 'Cancer', house: 12 },
      asc: { sign: 'Leo' },
      pluto: { sign: 'Virgo', house: 1 },
    }),
    expected: { primary: 'T10', alternatives: ['L01', 'L09'], faction: 'T' },
    rationale: '双鱼太阳在 8 宫的脆 + 巨蟹月在 12 宫的水深 = 把走丢的灵魂叫回来的招魂者。',
  },

  {
    id: 'BC-24',
    name: '王菲',
    nameZh: '王菲',
    birth: { date: '1969-08-08 23:14', tz: 'CST', place: 'Beijing' },
    roddenRating: 'DD',
    input: buildInput({
      sun: { sign: 'Leo' },
      moon: { sign: 'Capricorn' },
      birthTimeKnown: false,
    }),
    expected: { primary: 'T09', alternatives: ['C03', 'T08'], faction: 'T' },
    rationale: '狮子太阳冷漠化 + 摩羯月的修行感 = 在闪电里看见全图的启示者。',
    notes: 'Sun Leo 强,引擎极可能 fire C03',
  },

  {
    id: 'BC-25',
    name: 'Björk',
    nameZh: '比约克',
    birth: { date: '1965-11-21 07:50', tz: 'GMT', place: 'Reykjavík' },
    roddenRating: 'A',
    input: buildInput({
      sun: { sign: 'Scorpio' },
      moon: { sign: 'Scorpio' },
      asc: { sign: 'Sagittarius' },
    }),
    expected: { primary: 'T01', alternatives: ['T03', 'C09'], faction: 'T' },
    rationale: '天蝎太阳 + 月 = 把声音当作深海的深潜者。',
  },
];

/**
 * BLIND_BIRTH_DATA · 用于 After-Ephemeris 重跑
 *
 * key = BlindCase.id;value = 该盘的出生数据。
 * 时间不可考的 case 略去 `time` 字段(computeChart 内部 → birthTimeKnown=false)。
 *
 * UTC offset 处理:
 *   - LMT(本地平均时):offset = lon / 15(度→小时)
 *   - Standard time:按当时该地区的法定时区,DST 自行判断
 *   - BST 1940 wartime:1940-10-09 已退出 BDST(10/6 结束),回到 BST = +1
 *   - BDST 1942:战时双夏令时,夏季 = +2
 *   - 1986-03-28 在 EST(美国 DST 1986 起 4/27)
 *   - 1986 前 EST → 1958 Madonna,1958 Michigan 实际未行 DST(到 1966 才统一)→ EST -5
 *
 * 整体仍属 best-effort:若某盘的 time/offset 错,反映为 After 结果偏移,不影响 Before。
 */
export const BLIND_BIRTH_DATA: Record<string, BirthData> = {
  'BC-01': {
    date: '1955-02-24',
    time: '19:15',
    utcOffsetHours: -8,
    lat: 37.7749,
    lon: -122.4194,
  },
  'BC-02': {
    date: '1971-06-28',
    time: '07:30',
    utcOffsetHours: 2,
    lat: -25.7479,
    lon: 28.2293,
  },
  'BC-03': {
    date: '1901-12-05',
    time: '00:35',
    utcOffsetHours: -6,
    lat: 41.8781,
    lon: -87.6298,
  },
  'BC-04': {
    // 时间不可考 → 不传 time
    date: '1867-11-07',
    utcOffsetHours: 21.0 / 15,
    lat: 52.23,
    lon: 21.01,
  },
  'BC-05': {
    date: '1881-10-25',
    time: '23:15',
    utcOffsetHours: -4.42 / 15,
    lat: 36.72,
    lon: -4.42,
  },
  'BC-06': {
    date: '1958-08-16',
    time: '07:05',
    utcOffsetHours: -5,
    lat: 43.5944,
    lon: -83.8889,
  },
  'BC-07': {
    date: '1981-09-04',
    time: '22:00',
    utcOffsetHours: -5, // CDT in Sep
    lat: 29.7604,
    lon: -95.3698,
  },
  'BC-08': {
    date: '1986-03-28',
    time: '20:25',
    utcOffsetHours: -5, // EST (DST 4/27 begin)
    lat: 40.7128,
    lon: -74.006,
  },
  'BC-09': {
    date: '1940-10-09',
    time: '18:30',
    utcOffsetHours: 1, // BST (BDST ended 10/6/1940)
    lat: 53.4084,
    lon: -2.9916,
  },
  'BC-10': {
    date: '1961-07-01',
    time: '19:45',
    utcOffsetHours: 1,
    lat: 52.8333,
    lon: 0.5,
  },
  'BC-11': {
    date: '1929-05-04',
    time: '03:00',
    utcOffsetHours: 1, // CET, no DST 1929
    lat: 50.85,
    lon: 4.35,
  },
  'BC-12': {
    date: '1954-01-29',
    time: '04:30',
    utcOffsetHours: -6,
    lat: 33.06,
    lon: -89.59,
  },
  'BC-13': {
    date: '1910-08-26',
    time: '13:25',
    utcOffsetHours: 1, // CET
    lat: 41.99,
    lon: 21.43,
  },
  'BC-14': {
    date: '1942-06-18',
    time: '14:00',
    utcOffsetHours: 2, // BDST in June 1942
    lat: 53.4084,
    lon: -2.9916,
  },
  'BC-15': {
    date: '1869-10-02',
    time: '07:11',
    utcOffsetHours: 69.6 / 15,
    lat: 21.6422,
    lon: 69.6093,
  },
  'BC-16': {
    // DD rating, time uncertain
    date: '1928-03-20',
    utcOffsetHours: -5,
    lat: 40.3215,
    lon: -79.3792,
  },
  'BC-17': {
    date: '1875-07-26',
    time: '19:32',
    utcOffsetHours: 9.322 / 15,
    lat: 47.6,
    lon: 9.322,
  },
  'BC-18': {
    date: '1856-05-06',
    time: '18:30',
    utcOffsetHours: 18.15 / 15,
    lat: 49.64,
    lon: 18.15,
  },
  'BC-19': {
    date: '1907-07-06',
    time: '08:30',
    utcOffsetHours: -6.611, // LMT Coyoacán
    lat: 19.35,
    lon: -99.16,
  },
  'BC-20': {
    // C rating, time uncertain
    date: '1856-07-10',
    utcOffsetHours: 15.32 / 15,
    lat: 44.6,
    lon: 15.32,
  },
  'BC-21': {
    date: '1853-03-30',
    time: '11:00',
    utcOffsetHours: 4.66 / 15,
    lat: 51.46,
    lon: 4.66,
  },
  'BC-22': {
    date: '1967-02-20',
    time: '19:38',
    utcOffsetHours: -8,
    lat: 46.975,
    lon: -123.815,
  },
  'BC-23': {
    date: '1920-09-30',
    time: '07:00',
    utcOffsetHours: 8,
    lat: 31.23,
    lon: 121.47,
  },
  'BC-24': {
    // DD rating, time uncertain
    date: '1969-08-08',
    utcOffsetHours: 8,
    lat: 39.9,
    lon: 116.4,
  },
  'BC-25': {
    date: '1965-11-21',
    time: '07:50',
    utcOffsetHours: 0, // GMT Iceland
    lat: 64.13,
    lon: -21.94,
  },
};

// 把 birthData 反射回 BlindCase(BLIND_CASES 已 frozen 的元素属性可写,无需重新构造)
for (const c of BLIND_CASES) {
  if (BLIND_BIRTH_DATA[c.id]) {
    c.birthData = BLIND_BIRTH_DATA[c.id];
  }
}
