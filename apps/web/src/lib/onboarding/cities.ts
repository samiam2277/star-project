export interface City {
  id: string;
  nameZh: string;
  nameEn: string;
  lat: number;
  lon: number;
  utcOffsetHours: number;
}

// MVP 硬编码 30+ 常用城市（含 lat/lon/标准时区）
// DST 标注在文案中说明，MVP 不做自动 DST 切换
export const cities: readonly City[] = [
  // 中国大陆
  { id: 'beijing', nameZh: '北京', nameEn: 'Beijing', lat: 39.9042, lon: 116.4074, utcOffsetHours: 8 },
  { id: 'shanghai', nameZh: '上海', nameEn: 'Shanghai', lat: 31.2304, lon: 121.4737, utcOffsetHours: 8 },
  { id: 'guangzhou', nameZh: '广州', nameEn: 'Guangzhou', lat: 23.1291, lon: 113.2644, utcOffsetHours: 8 },
  { id: 'shenzhen', nameZh: '深圳', nameEn: 'Shenzhen', lat: 22.5431, lon: 114.0579, utcOffsetHours: 8 },
  { id: 'chengdu', nameZh: '成都', nameEn: 'Chengdu', lat: 30.5728, lon: 104.0668, utcOffsetHours: 8 },
  { id: 'hangzhou', nameZh: '杭州', nameEn: 'Hangzhou', lat: 30.2741, lon: 120.1551, utcOffsetHours: 8 },
  { id: 'xian', nameZh: '西安', nameEn: "Xi'an", lat: 34.3416, lon: 108.9398, utcOffsetHours: 8 },
  // 港澳台
  { id: 'hongkong', nameZh: '香港', nameEn: 'Hong Kong', lat: 22.3193, lon: 114.1694, utcOffsetHours: 8 },
  { id: 'taipei', nameZh: '台北', nameEn: 'Taipei', lat: 25.0330, lon: 121.5654, utcOffsetHours: 8 },
  { id: 'macau', nameZh: '澳门', nameEn: 'Macau', lat: 22.1987, lon: 113.5439, utcOffsetHours: 8 },
  // 北美
  { id: 'newyork', nameZh: '纽约', nameEn: 'New York', lat: 40.7128, lon: -74.0060, utcOffsetHours: -5 },
  { id: 'losangeles', nameZh: '洛杉矶', nameEn: 'Los Angeles', lat: 34.0522, lon: -118.2437, utcOffsetHours: -8 },
  { id: 'sanfrancisco', nameZh: '旧金山', nameEn: 'San Francisco', lat: 37.7749, lon: -122.4194, utcOffsetHours: -8 },
  { id: 'seattle', nameZh: '西雅图', nameEn: 'Seattle', lat: 47.6062, lon: -122.3321, utcOffsetHours: -8 },
  { id: 'vancouver', nameZh: '温哥华', nameEn: 'Vancouver', lat: 49.2827, lon: -123.1207, utcOffsetHours: -8 },
  { id: 'toronto', nameZh: '多伦多', nameEn: 'Toronto', lat: 43.6532, lon: -79.3832, utcOffsetHours: -5 },
  { id: 'chicago', nameZh: '芝加哥', nameEn: 'Chicago', lat: 41.8781, lon: -87.6298, utcOffsetHours: -6 },
  { id: 'houston', nameZh: '休斯顿', nameEn: 'Houston', lat: 29.7604, lon: -95.3698, utcOffsetHours: -6 },
  // 欧洲
  { id: 'london', nameZh: '伦敦', nameEn: 'London', lat: 51.5074, lon: -0.1278, utcOffsetHours: 0 },
  { id: 'paris', nameZh: '巴黎', nameEn: 'Paris', lat: 48.8566, lon: 2.3522, utcOffsetHours: 1 },
  { id: 'berlin', nameZh: '柏林', nameEn: 'Berlin', lat: 52.5200, lon: 13.4050, utcOffsetHours: 1 },
  { id: 'madrid', nameZh: '马德里', nameEn: 'Madrid', lat: 40.4168, lon: -3.7038, utcOffsetHours: 1 },
  { id: 'amsterdam', nameZh: '阿姆斯特丹', nameEn: 'Amsterdam', lat: 52.3676, lon: 4.9041, utcOffsetHours: 1 },
  { id: 'rome', nameZh: '罗马', nameEn: 'Rome', lat: 41.9028, lon: 12.4964, utcOffsetHours: 1 },
  { id: 'prague', nameZh: '布拉格', nameEn: 'Prague', lat: 50.0755, lon: 14.4378, utcOffsetHours: 1 },
  { id: 'stockholm', nameZh: '斯德哥尔摩', nameEn: 'Stockholm', lat: 59.3293, lon: 18.0686, utcOffsetHours: 1 },
  // 亚太其他
  { id: 'tokyo', nameZh: '东京', nameEn: 'Tokyo', lat: 35.6762, lon: 139.6503, utcOffsetHours: 9 },
  { id: 'osaka', nameZh: '大阪', nameEn: 'Osaka', lat: 34.6937, lon: 135.5023, utcOffsetHours: 9 },
  { id: 'singapore', nameZh: '新加坡', nameEn: 'Singapore', lat: 1.3521, lon: 103.8198, utcOffsetHours: 8 },
  { id: 'kualalumpur', nameZh: '吉隆坡', nameEn: 'Kuala Lumpur', lat: 3.1390, lon: 101.6869, utcOffsetHours: 8 },
  { id: 'sydney', nameZh: '悉尼', nameEn: 'Sydney', lat: -33.8688, lon: 151.2093, utcOffsetHours: 10 },
  { id: 'melbourne', nameZh: '墨尔本', nameEn: 'Melbourne', lat: -37.8136, lon: 144.9631, utcOffsetHours: 10 },
  { id: 'seoul', nameZh: '首尔', nameEn: 'Seoul', lat: 37.5665, lon: 126.9780, utcOffsetHours: 9 },
  { id: 'bangkok', nameZh: '曼谷', nameEn: 'Bangkok', lat: 13.7563, lon: 100.5018, utcOffsetHours: 7 },
  // 南半球 / 其他
  { id: 'auckland', nameZh: '奥克兰', nameEn: 'Auckland', lat: -36.8485, lon: 174.7633, utcOffsetHours: 12 },
  { id: 'dubai', nameZh: '迪拜', nameEn: 'Dubai', lat: 25.2048, lon: 55.2708, utcOffsetHours: 4 },
] as const;

export function findCityById(id: string | undefined): City | undefined {
  return cities.find((c) => c.id === id);
}
