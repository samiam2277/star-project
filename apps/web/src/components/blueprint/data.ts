/**
 * 灵魂蓝图报告页 · 模拟数据
 * 后续替换为 API 响应
 */

export interface BlueprintData {
  primaryArchetype: {
    id: string;
    nameZh: string;
    nameEn: string;
    number: number;
    definition: string;
    themeColor: string;
  };
  talentZone: TalentItem[];
  shadowZone: ShadowItem[];
  shadowTips: string[];
  evolutionPath: EvolutionData;
  radar: RadarData;
  nextSteps: NextStepItem[];
  generatedAt: string;
  userTier: 'free' | 'plus' | 'pro';
}

export interface TalentItem {
  headline: string;
  description: string;
}

export interface ShadowItem {
  headline: string;
  description: string;
}

export interface EvolutionData {
  southNode: { sign: string; label: string };
  northNode: { sign: string; label: string };
  narrative: string;
  actions: ActionItem[];
}

export interface ActionItem {
  headline: string;
  why: string;
  how: string;
}

export interface RadarData {
  dimensions: RadarDimension[];
  insight: string;
}

export interface RadarDimension {
  key: string;
  label: string;
  ceiling: number;
  activated: number;
  transitBoost: number;
  color: string;
}

export interface NextStepItem {
  label: string;
  href: string;
  variant: 'primary-gold' | 'secondary' | 'ghost';
}

export const mockBlueprint: BlueprintData = {
  primaryArchetype: {
    id: 'deep_diver',
    nameZh: '深潜者',
    nameEn: 'Deep Diver',
    number: 7,
    definition: '把别人察觉不到的细节，活成自己的指南针。',
    themeColor: '#5B7A95',
  },
  talentZone: [
    {
      headline: '看穿表象的本能直觉',
      description:
        '你能在别人停下来的地方继续往下走。表面上的「没问题」对你来说是信号，你本能地感到下面还有东西。',
    },
    {
      headline: '在情绪深水里仍能呼吸',
      description:
        '当情绪浓度高到让大多数人想逃时，你反而更清醒。痛苦不会让你瘫痪，它让你更敏锐。',
    },
    {
      headline: '对未被言说的事物特别敏锐',
      description:
        '你听得懂沉默里的信息。别人没说完的半句话、房间里没点破的张力——这些对你来说都是可读的数据。',
    },
  ],
  shadowZone: [
    {
      headline: '容易把痛苦内化为孤独',
      description:
        '你倾向于一个人消化沉重的感受，直到它变成「我不需要任何人」的错觉。',
    },
    {
      headline: '防御性的「我不需要任何人」',
      description:
        '当脆弱感来袭时，你的第一反应是撤回、关闭、独自处理。这种自我保护有时会切断你真正需要的连接。',
    },
  ],
  shadowTips: [
    '命名情绪，而不是回避它',
    '给一个人发「我现在不太好」',
    '30 分钟独处，但之后主动联系一个人',
  ],
  evolutionPath: {
    southNode: { sign: '巨蟹', label: '独自承担' },
    northNode: { sign: '摩羯', label: '被看见的脆弱' },
    narrative:
      '你来时带着一种「我自己可以」的惯性。你的南交在巨蟹，意味着你过去很多世都习惯了在情绪深海里独自游泳。但这一世，你的北交在摩羯，邀请你学会一种不同的勇气：不是独自潜入更深，而是把你的深度带到岸上，让别人也能看见它、使用它、回应它。',
    actions: [
      {
        headline: '在亲近的人面前练习「我不会」',
        why: '你习惯了自己什么都能handle，这会无形中把别人推远。',
        how: '这周选一件小事，对伴侣或朋友说「这个我不太会，你能帮我吗？」。',
      },
      {
        headline: '把照顾换成被照顾，每周一次',
        why: '你付出关怀时很自在，接受关怀时却浑身不自在。',
        how: '每周设定一个「被照顾时刻」——让别人请你吃饭、帮你做事。',
      },
      {
        headline: '写下 3 件你怕承认的需要',
        why: '你的阴影里藏着一些你不敢承认的渴望。',
        how: '用手机备忘录，不加修饰地写下来。写给自己看，不需要发出去。',
      },
    ],
  },
  radar: {
    dimensions: [
      { key: 'creativity', label: '创造力', ceiling: 80, activated: 45, transitBoost: 0, color: '#E0A82E' },
      { key: 'leadership', label: '领导力', ceiling: 60, activated: 30, transitBoost: 0, color: '#C26B5C' },
      { key: 'insight', label: '洞察力', ceiling: 95, activated: 78, transitBoost: 12, color: '#6B5B95' },
      { key: 'social', label: '社交力', ceiling: 70, activated: 35, transitBoost: 0, color: '#B8838C' },
      { key: 'intuition', label: '直觉力', ceiling: 88, activated: 65, transitBoost: 5, color: '#5B7A95' },
      { key: 'execution', label: '执行力', ceiling: 75, activated: 40, transitBoost: 0, color: '#5C7A6B' },
    ],
    insight: '洞察力 +12（天王过你的 3 宫）',
  },
  nextSteps: [
    { label: '跟 AI 聊聊我的蓝图', href: '/ai', variant: 'primary-gold' },
    { label: '分享我的灵魂原型', href: '/share', variant: 'secondary' },
    { label: '看完整 3D 本命盘', href: '/chart', variant: 'ghost' },
  ],
  generatedAt: '2026-05-11',
  userTier: 'plus',
};
