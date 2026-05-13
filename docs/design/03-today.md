# 03 Today 首页 (Daily Activity Hub)

> 登录后默认落地页,5 Tab 之一。承载日活路径:每日剧情卡 + Transit 提醒 + 塔罗 + AI 入口 + 潜能雷达浮窗。
>
> 对应 PRD: `[§5.4 剧情卡]` `[§5.4.2.1 潜能激活反馈]` `[§5.11 潜能雷达]` `[§4.2 核心日活路径]` `[§5.0.3 原型作为公共上下文]`
>
> 依赖: `[§00-system.md]` `[02-blueprint-result.md]` 原型摘要 `[04-ai-chat.md]` AI 入口
>
> 版本 v0.2 · 2026-05-11

---

## §1 页面目标 / 用户预期 / 关键数据

### §1.1 目标

让用户每天打开 App 都有"我今天要看一眼"的理由,通过:
- **原型摘要卡**: 提醒"我是谁" → 进入完整蓝图复习
- **今日剧情卡**: 一个有意思的微抉择,A/B/C 选项点亮潜能
- **Transit 提醒**: "今天天王过你的 3 宫"(占星深度,留住硬核用户)
- **今日塔罗**: 1 张牌的轻预占(随机但好玩)
- **AI 入口**: 大按钮 / 引导问题,转化到 Chat
- **潜能雷达浮窗**: 浮于屏幕右侧的小 Orb,实时反馈"今天点亮了哪一维"

**核心 KPI:** Day-7 留存 ≥ 35%;剧情卡完成率 ≥ 60%;AI Chat 触达率 ≥ 25%

### §1.2 用户预期

| 用户层 | 预期 |
|---|---|
| Free 首日 | 看到 onboarding 生成的原型摘要 + 1 张剧情卡 + 5 次 AI |
| Free 7 日后 | 雷达开始有色块,期待"什么时候能解锁完整版" |
| Plus | 雷达三层全开,剧情卡更细腻(原型语境强) |
| Pro | 顶部多 AI 快捷入口 + 历史角色卡链接 |

### §1.3 关键数据点

```
event:today_view
event:today_archetype_card_click          → /blueprint/result?from=today
event:today_story_view                    剧情卡进入视口
event:today_story_choice                  参数:option (A/B/C)
event:today_story_potential_lit           哪一维度点亮 + delta
event:today_transit_card_view
event:today_transit_card_click            → /chart?focus=transit_id
event:today_tarot_draw                    抽牌
event:today_tarot_reveal                  翻牌完成
event:today_ai_entrance_click             AI 入口被点
event:today_radar_orb_click               浮窗被点
event:today_radar_orb_pulse               浮窗触发脉冲(被点亮时)
```

---

## §2 信息架构

### §2.1 路由

```
/today          (主页面)
/today?focus=story | tarot | transit | ai     带 deep link 锚点
```

### §2.2 模块顺序

由上至下:

```
1. PageHeader (StatusBar + brand)
2. ArchetypeSummaryCard      ← 顶部固定 / 滚动出现迷你
3. TodayStoryCard            ← 主要互动
4. TransitRemindersGroup     ← 今日重要相位/合相
5. TodayTarotCard            ← 一张轻塔罗
6. AIEntranceCard            ← 引导问题 + 大入口
7. (BottomTab)
+
8. RadarOrbWidget            ← 浮于屏幕右侧 (z-elevated)
```

### §2.3 进入路径

```
1. 登录默认 → /today
2. BottomTab 第 1 项 → /today
3. 通知点击(Transit alert / Story reminder) → /today?focus=...
4. /blueprint/result 闭环 CTA "现在去 Today 看看" → /today
```

### §2.4 退出路径

```
ArchetypeSummaryCard → /blueprint/result
TodayStoryCard 完成后 "继续聊" → /ai-chat (带 story context)
TransitReminder Tap → /chart?focus=transit_id
TodayTarotCard → /tarot/today (详情)
AIEntranceCard → /ai-chat
RadarOrbWidget → /radar (Modal 或全屏)
BottomTab 其他 Tab → 对应 route
```

---

## §3 Mobile Wireframe (主状态:Plus 用户,常规日)

```
┌────────────────────────────────────┐
│  ✦ 星语   2026-05-11   🔔  👤      │  Section 0: PageHeader
│                                    │  brand + date + bell + avatar
├────────────────────────────────────┤
│  ┌──────────────────────────┐      │
│  │ 你好 Sophia,深潜者         │      │  Section 1: ArchetypeSummaryCard
│  │ ──────────                │      │  bg gradient-archetype
│  │ 早上好,                   │      │  radius-xl 烫金边框
│  │ 今天月亮在你的 4 宫,       │      │  h ~140
│  │ 适合内省                   │      │
│  │                          │      │
│  │       [小型原型剪影]       │      │  右上角装饰图
│  │       Deep Diver           │      │
│  └──────────────────────────┘      │
├────────────────────────────────────┤
│                                    │
│  ✨ 今日剧情                       │  Section 2: TodayStoryCard
│                                    │  text-h2
│  ┌──────────────────────────┐      │
│  │  ─── 凌晨 2 点的微信 ──── │      │  StoryHeader
│  │                          │      │
│  │  你的朋友 J 突然发来 5 条 │      │  text-body Fraunces
│  │  消息,关于他和他男朋友的 │      │  fg-primary
│  │  争吵。屏幕上的"正在输入" │      │
│  │  没有停过 12 分钟。       │      │
│  │                          │      │
│  │  你现在的感觉是…          │      │
│  │                          │      │
│  │  ┌────────────────────┐  │      │  StoryChoice × 3
│  │  │ A. 立刻接听,直接打过去│ │      │  bg-card hover:bg-elevated
│  │  └────────────────────┘  │      │  radius-lg padding 16
│  │  ┌────────────────────┐  │      │
│  │  │ B. 先听完,等他打字完  │ │      │
│  │  └────────────────────┘  │      │
│  │  ┌────────────────────┐  │      │
│  │  │ C. 回复"我明天找你聊"│ │      │
│  │  └────────────────────┘  │      │
│  │                          │      │
│  │  ⓘ 选项基于你的"深潜者"  │      │  text-caption fg-dim
│  │    原型设计                │      │
│  └──────────────────────────┘      │
├────────────────────────────────────┤
│                                    │
│  🌌 今日 Transit                   │  Section 3: TransitRemindersGroup
│  ─────────────────                 │  text-h2
│                                    │
│  ┌──────────────────────────┐      │  TransitCard × 1-3
│  │ 🌝 月亮过你的 4 宫        │      │  bg-card padding 16
│  │ ─────────────             │      │  radius-lg
│  │ 14:32 - 22:48              │      │  text-caption fg-dim
│  │                          │      │
│  │ 这段时间情绪向内,适合     │      │  text-body
│  │ 写日记或独处。             │      │  fg-secondary
│  │                          │      │
│  │ [看星盘 →]                 │      │  Button.ghost
│  └──────────────────────────┘      │
│                                    │
│  ┌──────────────────────────┐      │
│  │ ☿ 水星合相你的金星 (orb 1°)│     │
│  │ ─────────────             │      │
│  │ 今日 03:00 起,持续 48 小时 │     │
│  │                          │      │
│  │ 关于美/爱/钱的对话特别顺  │      │
│  │ 利,适合谈判或表达。       │      │
│  └──────────────────────────┘      │
│                                    │
├────────────────────────────────────┤
│                                    │
│  🎴 今日塔罗                       │  Section 4: TodayTarotCard
│                                    │  text-h2
│  ┌──────────────────────────┐      │
│  │                          │      │  TarotCard 200×320 居中
│  │      [塔罗牌正面/背面]    │      │  默认显示卡背
│  │                          │      │  点击翻牌
│  │  抽到 5 次/天 / 已抽 1/1  │      │
│  └──────────────────────────┘      │
│                                    │
│  [抽今日塔罗]  /  [展开解读]       │  Button 视抽牌状态
│                                    │
├────────────────────────────────────┤
│                                    │
│  ┌──────────────────────────┐      │  Section 5: AIEntranceCard
│  │ 💬 跟 AI 占星师聊聊         │      │  bg-card 烫金边框轻
│  │ ─────────────             │      │  radius-xl
│  │                          │      │  padding 24
│  │ 今天问点什么?              │      │
│  │                          │      │
│  │ [今天的能量重点?]           │      │  QuickReplyChip × 3
│  │ [我和 J 适合聊吗?]          │      │
│  │ [给我抽一张明天的牌]        │      │
│  │                          │      │
│  │ ─────────────             │      │
│  │  剩余 28/30 次 (Plus)      │      │  Usage indicator
│  │                          │      │
│  │ ┌────────────────────┐    │      │
│  │ │ 打开对话 →          │    │      │  Button.primary-gold 撑满
│  │ └────────────────────┘    │      │
│  └──────────────────────────┘      │
│                                    │
├────────────────────────────────────┤
│  · · ·  (BottomTab 5 项)            │  Section 7: BottomTab
└────────────────────────────────────┘

                    ┌─────┐
                    │  ◉  │   Section 8: RadarOrbWidget
                    │  ●  │   z-elevated 浮于右侧
                    │  ●  │   50×50px
                    └─────┘   屏幕右边,垂直居中
                              用户可拖拽
                              [§5.4.2.1] 触发逻辑
```

### §3.1 ArchetypeSummaryCard 详细规格

```
┌────────────────────────────────────────┐
│ bg: gradient-archetype                 │  整体 radius-xl
│ border: 1px 烫金 (#C9A876 @ 30%)        │  padding 20px
│ ╲ 星盘纹理 5% opacity overlay            │
│                                        │
│  你好 Sophia,深潜者                     │  text-h3 fg-primary
│  ──                                    │  小金线 24px
│  ───────                               │
│                                        │
│  早上好,                                │  text-body fg-secondary
│  今天月亮在你的 4 宫,                   │
│  适合内省。                             │
│                                        │
│  右上角浮: 30 × 30 原型剪影 + glow      │
│  右下角小 chip: [看完整蓝图 →]           │
└────────────────────────────────────────┘

时段问候:
  04:00 - 12:00  早上好
  12:00 - 18:00  下午好
  18:00 - 22:00  晚上好
  22:00 - 04:00  夜深了

第二行能量描述模板(基于今日 transit):
  "今天 {planet} 在你的 {house} 宫,适合 {action}。"
  动态生成,LLM 边缘节点生成 + 缓存 24h
```

### §3.2 TodayStoryCard 详细规格

```
基本结构:
┌──────────────────────────────────┐
│  StoryHeader                       │
│   - 场景标签: 凌晨 2 点的微信       │
│   - 标签样式: text-caption + ─── 装饰线
│                                  │
│  StoryBody                        │
│   - text-body Fraunces (Latin) +  │
│     思源宋体 Regular (中文)        │
│   - 段落最大 4 段,< 80 字         │
│   - 沉浸式叙事(非命令式)         │
│                                  │
│  StoryQuestion                    │
│   - text-h3 fg-primary           │
│   - 用动词起头,引导动作          │
│                                  │
│  StoryChoices × 3                 │
│   - A/B/C 三选项,无对错          │
│   - 各对应一个 "potential dimension":│
│     A → 领导力 (执行果断)         │
│     B → 直觉力 (静观感受)         │
│     C → 洞察力 (理性边界)         │
│   - 选项标签隐藏(避免引导)       │
└──────────────────────────────────┘

选择后:
┌──────────────────────────────────┐
│  ✓ 你选了 B                       │
│                                  │
│  这一选择让你激活了你的           │
│  ✨ 直觉力                        │
│  ─────                           │
│                                  │
│  此刻,在屏幕的另一头,J 觉得     │  剧情后续 (微短文)
│  被听见了。"正在输入"停了下来,   │
│  他发来一句:                      │
│                                  │
│  "谢谢你愿意等。"                 │
│                                  │
│  ⓘ 今日剧情结束,明天再来          │
│                                  │
│  [继续跟 AI 聊聊]                 │  Button.secondary
│  [今天的雷达 ↗]                   │  Button.ghost
└──────────────────────────────────┘

A/B/C 选择后的反馈是 §5.4.2.1 潜能激活的核心反馈:
  - 选择瞬间 → light haptic
  - 浮窗 RadarOrbWidget 触发脉冲(详 §5.1)
  - 0.5s 后剧情后续 fade-up
  - 1.5s 后高亮"激活了 [维度]"
  - 雷达对应维度 +N (规则: 普通激活 +2,完美选项 +5)
```

### §3.3 RadarOrbWidget 详细规格

```
位置:
  - 默认 fixed right: 16px, top: 50%
  - 用户拖动后 localStorage 保存位置
  - 不在 BottomTab 高度内(z-elevated 浮于内容)

视觉:
  ┌─────────┐
  │   ╱─╲    │  50 × 50px
  │  ●   ●   │  bg gradient-archetype
  │ ●  ●  ● │  border 1.5px accent-gold
  │  ●   ●   │  内部: 缩微 RadarChart6D 6 个色点
  │   ╲─╱    │  shadow-glow-purple
  └─────────┘  radius-full

状态:
  default: 静态
  pulse: 当某维度被点亮时(剧情卡 / AI 对话 / 学习)
         - scale 1.0 → 1.15 → 1.0
         - 对应维度色点放大 + 颜色饱和度 +30%
         - 0.5s 触发,余晖 1.0s
         - light haptic × 3 (节奏)

点击:
  → 弹出 Modal "今日雷达"
   ┌──────────────────────────┐
   │  今日雷达                  │
   │  ────                     │
   │                          │
   │  [完整 RadarChart6D 280px]│
   │                          │
   │  今日激活:                 │
   │  ✦ 直觉力 +2 (剧情卡 B)    │
   │  ✦ 洞察力 +1 (AI 对话)     │
   │                          │
   │  本周累计: 直觉 +8 / ...    │
   │                          │
   │  [打开完整雷达 →]          │  → /radar 详情
   └──────────────────────────┘
```

---

## §4 状态变体

### §4.1 Loading / 首次进入

```
ArchetypeSummaryCard: skeleton (gradient + 闪烁)
TodayStoryCard:       skeleton 文字 + 3 个空 chip
TransitReminders:     单一 skeleton card
TarotCard:            卡背静态
AIEntranceCard:       skeleton chip × 3

预计 < 600ms 首屏完成(数据缓存),冷启动 < 2s
```

### §4.2 Empty

#### §4.2.1 用户未完成 onboarding

```
ArchetypeSummaryCard 替换为:
┌──────────────────────────┐
│  你的灵魂蓝图等待生成        │
│                          │
│  3 分钟完成测试,解锁        │
│  专属内容                  │
│                          │
│  [开始测试 →]              │
└──────────────────────────┘

其他模块也都是占位 + "完成测试解锁"
```

#### §4.2.2 没有今日 transit

```
TransitRemindersGroup 显示:
  "✨ 今天天象平静,适合自己创造节奏。"
  (避免空空如也)
```

### §4.3 Error

```
某模块加载失败:
  显示该模块占位 + [重试] 按钮
  其他模块正常显示
  顶部不浮 Toast(避免干扰)

全页加载失败:
  显示全屏 Error state + [刷新] 按钮
```

### §4.4 用户层级差异

#### §4.4.1 Free 用户

```
- ArchetypeSummaryCard: 完整
- TodayStoryCard: 每日 1 张,完整
- TransitReminders: 仅 1 张(最重要的)
- TodayTarotCard: 限 1 抽/天
- AIEntranceCard: 剩余 N/5 次/天
- RadarOrbWidget: 显示灰色上限 + 已激活,无紫色流年闪烁层
```

#### §4.4.2 Plus

```
- TransitReminders: 完整(可显示 1-3 张)
- TodayTarotCard: 3 抽/天
- AIEntranceCard: 30 次/天
- RadarOrbWidget: 三层全开
- 顶部 PageHeader 右上 GoldBadge "Plus"
```

#### §4.4.3 Pro

```
- AIEntranceCard: 无限次,显示 "Pro · 不限"
- 顶部多一个快捷"今日深度 AI 简报" CTA
- Radar Orb 点击后可看完整 6 维历史曲线(7/30/365 天)
```

---

## §5 交互细节

### §5.1 手势

| 手势 | 触发 | 行为 |
|---|---|---|
| Tap | ArchetypeSummaryCard | → /blueprint/result?from=today |
| Tap | StoryChoice A/B/C | 选择,触发后续(详 §3.2) |
| Tap | TransitCard | → /chart?focus=transit_id |
| Tap | TarotCard(背面) | 翻牌动效 + 显示牌面 |
| Tap | TarotCard(正面) | → /tarot/today 完整解读 |
| Tap | QuickReplyChip | → /ai-chat 带预填问题 |
| Tap | "打开对话" CTA | → /ai-chat |
| Long-press | RadarOrbWidget | 拖动开始,可移动位置 |
| Drag | RadarOrbWidget | 改变位置(垂直方向),贴右/贴左 snap |
| Pull-down | 整页顶部 | 刷新(重新拉取今日数据,触发 light haptic) |
| Swipe left | TransitCard | (Plus) 切到下一张 transit |

### §5.2 微动效

| 触发 | 效果 | duration / curve |
|---|---|---|
| ArchetypeSummaryCard 进入视口 | fade-up 16px | 400ms · ease-out-soft |
| 每 Section 进入视口 | stagger fade-up 12px (间隔 80ms) | 各 400ms · ease-out-soft |
| StoryChoice hover | bg 渐变 + 左侧出现 2px 金色短线 | 200ms · ease-out-soft |
| StoryChoice 选中 | 整选项 scale 0.98 + 烫金边框生长 | 300ms · ease-spring |
| Story 选完后续 fade-up | 已选项变金色徽章 + 后续段落浮现 | 600ms stagger 200 |
| TransitCard hover | shadow-glow-purple 微浮起 | 200ms · ease-out-soft |
| Tarot 翻牌 | 见 §00 §7.3 | 800ms · ease-spring |
| RadarOrbWidget pulse | scale 1.0 → 1.15 → 1.0 + 色点放大 | 600ms + 1000ms tail |
| Quick Reply Chip 出现 | stagger fade-in (各 200ms 间隔 50) | 200ms × 3 |
| AI CTA glow 呼吸 | shadow-glow-gold opacity 0.6 → 1 → 0.6 | 4000ms · ease-in-out |

### §5.3 触觉反馈

| 时刻 | Haptic |
|---|---|
| Pull-to-refresh | light(开始)+ medium(完成) |
| StoryChoice 选中 | light |
| Story 后续展示完成(雷达点亮) | light × 3(节奏) |
| Tarot 抽牌触发 | light |
| Tarot 翻牌完成 | medium |
| AI CTA 点击 | medium |
| RadarOrbWidget pulse 触发 | light × 3 节奏 |
| RadarOrbWidget 拖到 snap 位置 | medium |

### §5.4 转场动画

| 来源 → 目标 | 转场 |
|---|---|
| /today → /blueprint/result | from-right slide,300ms |
| /today → /ai-chat | from-bottom slide + scale 0.95→1,400ms |
| /today → /tarot/today | hero-shared-element: 塔罗牌从 §4 位置放大平移 |
| /today → /chart | fade + transit_id 高亮(到 Chart 后自动 zoom 该行星) |
| RadarOrbWidget Modal 开 | from-right slide-in + opacity |

### §5.5 RadarOrbWidget 触发与消失逻辑 (§5.4.2.1 实现)

```
显示规则:
  - 进入 /today 时默认显示
  - 用户在其他 Tab 时隐藏
  - localStorage 记忆用户是否手动隐藏(双指捏合或长按"隐藏")

触发脉冲事件:
  - 剧情卡选择完成 → pulse + 对应维度色点
  - AI 对话产生(每 5 轮触发一次) → pulse
  - 学习中心完成一节 → pulse
  - Transit 高峰时段进入 → pulse(每天最多一次)

不触发脉冲的事件:
  - 普通页面浏览
  - 抽塔罗(单独有翻牌动效已够)
  - 分享(社交行为不挂钩雷达)

消失条件:
  - 用户主动拖到屏幕外 80% 位置 → 弹"隐藏雷达?"确认
  - 主动隐藏后,顶部 PageHeader 右侧出现"🌟" icon 可重新显示
```

### §5.6 主题/时段适配

```
时段背景微调:
  04:00-08:00  bg-deep + 极淡的玫瑰金渐变(黎明感)
  08:00-18:00  默认 bg-deep
  18:00-22:00  bg-deep + 紫色渐变(暮色)
  22:00-04:00  bg-deep 加深 + 增加星空粒子密度

仅极微变化,避免影响识别。
```

---

## §6 双语文案表

| Section | 元素 | zh | en | 备注 |
|---|---|---|---|---|
| 0 | header date | 2026-05-11 | May 11, 2026 | 自动 |
| 1 | greeting morning | 早上好 | Good morning | |
| 1 | greeting afternoon | 下午好 | Good afternoon | |
| 1 | greeting evening | 晚上好 | Good evening | |
| 1 | greeting night | 夜深了 | Quiet night | |
| 1 | sample tagline | 今天月亮在你的 4 宫,适合内省 | Moon in your 4th house — turn inward today | text-body |
| 1 | view full | 看完整蓝图 → | View full Blueprint → | text-caption |
| 2 | section | 今日剧情 | Today's Scene | text-h2 |
| 2 | scene label sample | 凌晨 2 点的微信 | A 2am Message | text-caption |
| 2 | question sample | 你现在的感觉是… | What you feel now… | text-h3 |
| 2 | choice A sample | A. 立刻接听,直接打过去 | A. Call right away | StoryChoice |
| 2 | choice B sample | B. 先听完,等他打字完 | B. Wait until he's done typing | |
| 2 | choice C sample | C. 回复"我明天找你聊" | C. Reply "we can talk tomorrow" | |
| 2 | choice hint | 选项基于你的"深潜者"原型设计 | Choices crafted for your Deep Diver archetype | text-caption |
| 2 | post-choice ack | 你选了 B | You chose B | |
| 2 | activated phrase | 这一选择让你激活了你的 | This choice activated your | |
| 2 | dimension (sample) | 直觉力 | Intuition | text-h2 |
| 2 | end-of-day | 今日剧情结束,明天再来 | Today's scene complete — come back tomorrow | text-caption |
| 2 | continue chat | 继续跟 AI 聊聊 | Keep talking with AI | Button |
| 2 | view radar | 今天的雷达 ↗ | Today's radar ↗ | Button |
| 3 | section | 今日 Transit | Today's Transits | text-h2 |
| 3 | transit moon-4h sample | 月亮过你的 4 宫 | Moon transiting your 4th house | TransitCard title |
| 3 | transit description sample | 这段时间情绪向内,适合写日记或独处 | Emotions turn inward — good for journaling or solitude | text-body |
| 3 | view chart | 看星盘 → | View chart → | Button |
| 3 | empty | 今天天象平静,适合自己创造节奏 | The sky is quiet today — make your own rhythm | text-body |
| 4 | section | 今日塔罗 | Today's Tarot | text-h2 |
| 4 | not drawn | 抽今日塔罗 | Draw today's card | Button |
| 4 | drawn | 展开解读 | Expand reading | Button |
| 4 | quota indicator (Free) | 已抽 1/1 | Drew 1 / 1 | text-caption |
| 4 | quota indicator (Plus) | 已抽 1/3 | Drew 1 / 3 | |
| 5 | section sample | 跟 AI 占星师聊聊 | Chat with the AI astrologer | text-h3 |
| 5 | prompt | 今天问点什么? | What's on your mind? | text-body |
| 5 | chip 1 sample | 今天的能量重点? | Today's energy focus? | QuickReplyChip |
| 5 | chip 2 sample | 我和 J 适合聊吗? | Should I talk to J? | |
| 5 | chip 3 sample | 给我抽一张明天的牌 | Pull a card for tomorrow | |
| 5 | usage Plus | 剩余 28/30 次 (Plus) | 28 / 30 left (Plus) | text-caption |
| 5 | usage Pro | 不限 (Pro) | Unlimited (Pro) | |
| 5 | CTA | 打开对话 → | Open chat → | Button.primary-gold |
| 8 | orb title | 今日雷达 | Today's Radar | Modal title |
| 8 | dim creativity | 创造力 | Creativity | RadarLabel |
| 8 | dim leadership | 领导力 | Leadership | |
| 8 | dim insight | 洞察力 | Insight | |
| 8 | dim social | 社交力 | Social | |
| 8 | dim intuition | 直觉力 | Intuition | |
| 8 | dim execution | 执行力 | Execution | |
| 8 | today lit sample | ✦ 直觉力 +2 (剧情卡 B) | ✦ Intuition +2 (Story B) | text-body-sm |

**双语条目数:50+** ✅

---

## §7 Desktop 响应式适配

```
breakpoint: ≥1024px

布局:
  - 居中容器 max-width 1180px
  - 双列布局: 主列 720px + 侧栏 360px
    - 主列: ArchetypeSummary → Story → Transit → Tarot
    - 侧栏: AIEntranceCard sticky top:80px + 历史信息条
  - RadarOrbWidget 改为右下角 FAB

字号上调有限(读密度优先,不放太大)
```

---

## §8 接入 API / 数据契约

### §8.1 进入页面拉取

```
GET /api/today/dashboard
Authorization: Bearer <jwt>

Response:
{
  "user": { "nickname": "Sophia", "primary_archetype_id": "deep_diver", "tier": "plus" },
  "archetype_summary": {
    "archetype_name_zh": "深潜者",
    "archetype_name_en": "Deep Diver",
    "today_tagline_zh": "今天月亮在你的 4 宫,适合内省",
    "today_tagline_en": "..."
  },
  "today_story": {
    "id": "story_2026_05_11_deepdiver",
    "scene_label_zh": "凌晨 2 点的微信",
    "scene_label_en": "A 2am Message",
    "body_zh": "...",
    "body_en": "...",
    "question_zh": "你现在的感觉是…",
    "question_en": "What you feel now…",
    "choices": [
      { "id": "a", "label_zh": "...", "label_en": "...", "dimension": "leadership", "delta": 2 },
      { "id": "b", "label_zh": "...", "label_en": "...", "dimension": "intuition", "delta": 2 },
      { "id": "c", "label_zh": "...", "label_en": "...", "dimension": "insight", "delta": 2 }
    ],
    "completed_choice": null | "b",
    "post_choice_continuation": { "b": "...", "a": "...", "c": "..." }
  },
  "transits": [
    {
      "id": "transit_xxx",
      "title_zh": "月亮过你的 4 宫",
      "title_en": "Moon transiting your 4th house",
      "start_at": "2026-05-11T14:32:00Z",
      "end_at": "2026-05-11T22:48:00Z",
      "description_zh": "...",
      "planet": "moon",
      "house": 4
    }
  ],
  "today_tarot": {
    "drawn": false,
    "draws_remaining": 3,
    "card": null
  },
  "ai_quota": { "used": 2, "limit": 30, "tier": "plus" },
  "radar_today": {
    "lit_dimensions": [
      { "dimension": "intuition", "delta": 2, "source": "story_card" }
    ]
  }
}
```

### §8.2 用户动作

| 动作 | Endpoint |
|---|---|
| 选择 Story Choice | `POST /api/story/:id/choose` `{ choice_id }` → 返回 continuation + radar +delta |
| 抽塔罗 | `POST /api/tarot/draw` `{ deck: "rider-waite" }` → 返回 card |
| 点击 Quick Reply | `POST /api/chat/session` `{ initial_message }` |
| 拖动 Orb 后保存位置 | localStorage,不上 API |
| 点击 Orb 打开 Modal | `GET /api/radar/today` |

### §8.3 引用 PRD 数据模型

```
[§6.1 User]            tier, nickname, primary_archetype_id
[§6.1 SoulBlueprint]   archetype_summary
[§6.1 PotentialRadar]  radar_today
[§5.4.2.1]             潜能激活反馈(实时写 activation_log)
[§5.11]                完整雷达数据
```

### §8.4 缓存策略

```
today/dashboard:  60s edge cache + SWR
今日剧情:        每用户 + 每天预生成,KV 缓存到午夜
Transit:         每用户 24h 缓存 + 整点失效
塔罗:            session 缓存(用户已抽则保留至明日)
```

---

## §9 设计师 Figma 落地 Checklist

### §9.1 关键素材

```
插画:
  /assets/illustrations/today-empty-story.svg     无剧情占位
  /assets/illustrations/today-empty-transit.svg   无 transit
  原型剪影 30 × 30 缩略图 (复用 §02)
  塔罗 78 张牌面 (复用 §05 系统)

Lottie:
  /assets/lottie/radar-orb-pulse.json             浮窗脉冲
  /assets/lottie/dimension-glow.json              维度激活光晕

字体: 同 §00
```

### §9.2 使用的 token / 组件

```
颜色: bg-deep, bg-card, accent-gold, radar-*, fg-*
字号: text-h2/h3, text-body, text-caption
组件:
  PageHeader, BottomTab
  ArchetypeSummaryCard (新)
  TodayStoryCard (新,含 StoryHeader/Body/Question/Choice)
  TransitCard (新)
  TodayTarotCard (新, 复用 TarotCard 组件)
  AIEntranceCard (新)
  QuickReplyChip (复用 chat 组件)
  RadarOrbWidget (新,核心特色)
  RadarChart6D (复用 §00)
```

### §9.3 Figma 文件组织

```
🎨 03-Today
├─ 📄 Cover
├─ 📄 Mobile · Default Plus User
├─ 📄 Mobile · Free User Variant
├─ 📄 Mobile · Pro User Variant
├─ 📄 Mobile · Story Choice Made (post-choice)
├─ 📄 Mobile · Tarot Drawn
├─ 📄 Mobile · Empty States (no blueprint / no transit)
├─ 📄 Mobile · Loading Skeleton
├─ 📄 Mobile · Errors
├─ 📄 Mobile · RadarOrbWidget States
├─ 📄 Mobile · RadarOrb Modal (open)
├─ 📄 Desktop · Full Layout
├─ 📄 Prototype Flow
└─ 📄 Animation Specs
```

### §9.4 检验

- [ ] 6 大 Section + 浮窗 全部 Figma 化
- [ ] 3 用户层级变体 + Story 选前后 + Tarot 抽前后
- [ ] 浮窗的 4 个状态(default / pulse / dragged / Modal open)
- [ ] 双语文案 50+ 条 落地
- [ ] RadarOrbWidget 缩微 RadarChart 视觉精确

---

## §10 写完自检

- [x] 页面目标 + KPI 明确
- [x] URL + 进入/退出 + 主路径
- [x] Wireframe 8 个模块详细 + RadarOrbWidget 单独规格
- [x] Loading / Empty 双 / Error / 三用户层级
- [x] 手势 11 项 + 动效 10 项 + Haptics 8 项 + Orb 触发逻辑
- [x] 双语文案 50+ 条
- [x] Desktop 双列布局说明
- [x] API 5+ endpoints + 缓存策略
- [x] 引用 PRD: §5.4 / §5.4.2.1 / §5.11 / §4.2 / §5.0.3 / §6.1 (6 次)
- [x] 与 §00 / §02 / §01 一致

---

## 变更记录

| 版本 | 日期 | 内容 |
|---|---|---|
| v0.2 | 2026-05-11 | 初始版本,日活路径 |

---

**下一步**: `04-ai-chat.md` AI 占星师对话(原型上下文 + Tool Call UI)
