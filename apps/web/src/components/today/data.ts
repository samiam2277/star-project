/**
 * Today 首页 · 模拟数据
 * 后续替换为 API 响应
 */

import type { StoryChoice } from './TodayStoryCard';
import type { TransitItem } from './TransitRemindersGroup';
import type { RadarDimension } from './RadarOrbWidget';

export interface TodayData {
  userName: string;
  archetype: {
    nameZh: string;
    nameEn: string;
    themeColor: string;
  };
  greeting: string;
  energyText: string;
  story: {
    sceneTag: string;
    narrative: string;
    question: string;
    choices: StoryChoice[];
    followUpText: string;
  };
  transits: TransitItem[];
  tarot: {
    cardName: string;
    cardNameEn: string;
    meaning: string;
    drawnCount: number;
    dailyLimit: number;
  };
  ai: {
    quickReplies: string[];
    usageUsed: number;
    usageTotal: number;
    userTier: 'free' | 'plus' | 'pro';
  };
  radar: {
    dimensions: RadarDimension[];
  };
}

export const mockTodayData: TodayData = {
  userName: 'Sophia',
  archetype: {
    nameZh: '深潜者',
    nameEn: 'Deep Diver',
    themeColor: '#5B7A95',
  },
  greeting: '早上好',
  energyText: '今天月亮在你的 4 宫，适合内省。',
  story: {
    sceneTag: '凌晨 2 点的微信',
    narrative:
      '你的朋友 J 突然发来 5 条消息，关于他和他男朋友的争吵。屏幕上的「正在输入」没有停过 12 分钟。',
    question: '你现在的感觉是…',
    choices: [
      {
        key: 'A',
        text: '立刻接听，直接打过去',
        dimension: 'leadership',
        dimensionLabel: '领导力',
      },
      {
        key: 'B',
        text: '先听完，等他打字完',
        dimension: 'intuition',
        dimensionLabel: '直觉力',
      },
      {
        key: 'C',
        text: '回复「我明天找你聊」',
        dimension: 'insight',
        dimensionLabel: '洞察力',
      },
    ],
    followUpText:
      '此刻，在屏幕的另一头，J 觉得被听见了。「正在输入」停了下来，他发来一句：「谢谢你愿意等。」',
  },
  transits: [
    {
      id: 'moon-4h',
      icon: '🌝',
      title: '月亮过你的 4 宫',
      timing: '14:32 - 22:48',
      description: '这段时间情绪向内，适合写日记或独处。',
    },
    {
      id: 'mercury-venus',
      icon: '☿',
      title: '水星合相你的金星 (orb 1°)',
      timing: '今日 03:00 起，持续 48 小时',
      description: '关于美/爱/钱的对话特别顺利，适合谈判或表达。',
    },
  ],
  tarot: {
    cardName: '倒吊人',
    cardNameEn: 'The Hanged Man',
    meaning:
      '暂停不是为了停滞，而是为了换一个角度看见水面下的真相。',
    drawnCount: 0,
    dailyLimit: 1,
  },
  ai: {
    quickReplies: [
      '今天的能量重点？',
      '我和 J 适合聊吗？',
      '给我抽一张明天的牌',
    ],
    usageUsed: 2,
    usageTotal: 30,
    userTier: 'plus',
  },
  radar: {
    dimensions: [
      { key: 'creativity', color: '#E0A82E', activated: 45, ceiling: 80 },
      { key: 'leadership', color: '#C26B5C', activated: 30, ceiling: 60 },
      { key: 'insight', color: '#6B5B95', activated: 78, ceiling: 95 },
      { key: 'social', color: '#B8838C', activated: 35, ceiling: 70 },
      { key: 'intuition', color: '#5B7A95', activated: 65, ceiling: 88 },
      { key: 'execution', color: '#5C7A6B', activated: 40, ceiling: 75 },
    ],
  },
};
