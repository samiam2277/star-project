/**
 * 时区 / Julian Day 工具
 *
 * 对应文档:docs/content/archetypes/07-ephemeris-integration.md
 *
 * 不依赖第三方时区库:为了让本任务 spike 完成,Caller 直接传 utcOffsetHours。
 * IANA 时区→offset 的查表留给上层(可选用 Intl.DateTimeFormat)。
 *
 * Julian Day 计算委托给 swisseph.julday(),不在这里手写公式。
 */

import { julday as swephJulday } from './ephemeris';

const DAYS_IN_MONTH_NORMAL = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

function isLeapYear(y: number): boolean {
  return (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0;
}

function daysInMonth(year: number, month: number): number {
  if (month === 2) return isLeapYear(year) ? 29 : 28;
  return DAYS_IN_MONTH_NORMAL[month - 1];
}

/**
 * 把本地年/月/日/时/分 + UTC 偏移 → Julian Day (UT)
 *
 * @param year       本地公历年
 * @param month      1-12
 * @param day        1-31
 * @param hour       本地小时(0-23)
 * @param minute     本地分钟(0-59)
 * @param utcOffsetHours  正东 = 正,正西 = 负。北京 = +8,纽约 EST = -5,加州 PST = -8
 */
export function birthToJulianDay(
  year: number,
  month: number,
  day: number,
  hour: number,
  minute: number,
  utcOffsetHours: number,
): number {
  const localHour = hour + minute / 60;
  let utHour = localHour - utcOffsetHours;
  let utYear = year;
  let utMonth = month;
  let utDay = day;

  // 向后跨日(本地很早 + 东时区 → UT 还在前一天)
  while (utHour < 0) {
    utHour += 24;
    utDay -= 1;
    if (utDay < 1) {
      utMonth -= 1;
      if (utMonth < 1) {
        utMonth = 12;
        utYear -= 1;
      }
      utDay = daysInMonth(utYear, utMonth);
    }
  }

  // 向前跨日
  while (utHour >= 24) {
    utHour -= 24;
    utDay += 1;
    if (utDay > daysInMonth(utYear, utMonth)) {
      utDay = 1;
      utMonth += 1;
      if (utMonth > 12) {
        utMonth = 1;
        utYear += 1;
      }
    }
  }

  return swephJulday(utYear, utMonth, utDay, utHour);
}

/** 字符串形式的 birth → JD;支持 time = undefined(按 12:00 noon 处理) */
export function birthStringToJulianDay(
  date: string, // 'YYYY-MM-DD'
  time: string | undefined, // 'HH:mm' or undefined
  utcOffsetHours: number,
): { jd: number; birthTimeKnown: boolean } {
  const parts = date.split('-').map(Number);
  if (parts.length !== 3 || parts.some((n) => Number.isNaN(n))) {
    throw new Error(`Invalid date string: "${date}", expected YYYY-MM-DD`);
  }
  const [y, m, d] = parts;

  let h = 12;
  let mi = 0;
  let birthTimeKnown = false;
  if (time) {
    const tparts = time.split(':').map(Number);
    if (tparts.length < 2 || tparts.some((n) => Number.isNaN(n))) {
      throw new Error(`Invalid time string: "${time}", expected HH:mm`);
    }
    h = tparts[0];
    mi = tparts[1];
    birthTimeKnown = true;
  }

  const jd = birthToJulianDay(y, m, d, h, mi, utcOffsetHours);
  return { jd, birthTimeKnown };
}
