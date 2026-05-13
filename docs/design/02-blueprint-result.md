# 02 灵魂蓝图报告页 (Soul Blueprint Report)

> **v0.2 产品门面**。Onboarding 完成后用户落地的第一个完整页面,也是 §5.9 平行人生、§5.10 年度角色卡、§5.11 潜能雷达的总入口。
>
> 对应 PRD: `[§5.0.4 报告结构]` `[§5.0.5 商业化嵌入]` `[§8 Phase 1]` `[§9.2 订阅矩阵]`
>
> 依赖: `[§00-system.md]` 设计系统
>
> 版本 v0.2 · 2026-05-11

---

## §1 页面目标 / 用户预期 / 关键数据

### §1.1 目标

让用户用 **2 分钟时间**理解并接受"我是 [原型名]"的身份认同,产生三种行为之一:
1. **理解 → 分享**(社交传播,病毒拉新)
2. **理解 → 跟 AI 聊聊**(开启日活路径)
3. **理解 → 升级**(解锁完整版/平行人生/年度卡/PDF)

### §1.2 用户预期

| 用户来源 | 预期 |
|---|---|
| Onboarding step-5 点 "看完整灵魂蓝图" | 看到比 Hook 卡更详细的"原型详解 + 进化指南" |
| Today 顶部"原型摘要卡"点击 | 复习自己的报告,可能想分享或升级 |
| Me 头像旁徽章点击 | 等同上,且常含订阅升级动机 |
| 老用户 Plus/Pro 进入 | 看到完整版,且能进入 §5.9/§5.10 模块 |
| 分享公开链接 `/share/:cardId` 访问者 | 看到极简版(无登录),底部强 CTA "你也来生成一个" |

### §1.3 关键数据点(分析埋点)

```
event:blueprint_view              进入页面
event:blueprint_scroll_depth      滚动深度 25/50/75/100
event:blueprint_section_view      每个 section 进入视口
event:blueprint_ai_cta_click      "跟 AI 聊聊我"
event:blueprint_share_click       分享触发(细分:卡片样式选择)
event:blueprint_upgrade_view      看到付费墙
event:blueprint_upgrade_click     点击升级 (细分:Plus/Pro/PDF)
event:blueprint_year_card_click   "看 2026 年度角色"
event:blueprint_parallel_click    "查看平行人生"
event:blueprint_complete          滚到底部并停留 >5s
```

**北极星指标关联:**`blueprint_share_click / blueprint_view` 应 ≥ 10%(PRD §1 分享率目标)

---

## §2 信息架构

### §2.1 路由

```
/blueprint/result             登录用户的报告页(完整)
/blueprint/result?archetype=  老用户切换查看不同原型(Pro 自定义功能)
/share/:cardId                公开分享页(无登录可见极简版)
```

### §2.2 URL 参数 / state

```
?from=onboarding              首次进入,触发逐字浮现 + 烫金边框生长动效
?from=today                   普通访问,跳过初次动效
?from=share                   分享回流,顶部加 "由 @用户名 分享" 横幅
?upgrade_hint=plus            从锁定模块跳来,自动滚动到付费墙并高亮
?archetype=dream_weaver       Pro 自定义切换的原型 id
```

### §2.3 进入路径

```
1. Onboarding step-5 "看完整灵魂蓝图" CTA  →  ?from=onboarding
2. Today 顶部原型摘要卡 "查看完整" 按钮     →  ?from=today
3. Me 头像旁的原型徽章                      →  默认参数
4. 平行人生页"返回蓝图"按钮                 →  ?from=lives
5. 年度角色卡页"我的原型"链接                →  ?from=year-card
6. AI Chat 上下文 chip "深潜者"             →  ?from=ai-chat
7. 外部分享链接                              →  /share/:cardId
```

### §2.4 退出路径

```
1. "跟 AI 聊聊我"           →  /ai-chat?archetype-context=true
2. "分享我的原型"           →  分享 Sheet (站内/系统)
3. "查看平行人生"           →  /lives  (Plus 锁)
4. "查看 2026 年度角色"     →  /year-card  (含 Plus 锁)
5. "看完整本命盘"           →  /chart    (3D 本命盘)
6. "解锁完整版/购买 PDF"    →  /pricing  或 Modal
7. 返回箭头                  →  history.back() 或 /me
```

---

## §3 Mobile Wireframe (主状态:Plus 完整版,from=onboarding)

> 36 字符宽模拟 375px Mobile 屏。每元素标 [组件名 · 状态]。

### §3.1 整页结构(滚动概览)

```
┌────────────────────────────────────┐
│  ← 我的灵魂蓝图          ⋯  📤      │  Section 0: PageHeader
├────────────────────────────────────┤
│                                    │
│                                    │
│       深  潜  者                    │  Section 1: 原型主视觉
│     ───────────                    │  (ArchetypeCard.L 撑满)
│      Deep  Diver                   │
│                                    │
│    [✦ 灵魂原型 · No.07]            │
│                                    │
│                                    │
├────────────────────────────────────┤
│                                    │
│  一句话定义                        │  Section 2: 定义引述
│  "把别人察觉不到的细节,            │
│   活成自己的指南针。"              │
│                                    │
├────────────────────────────────────┤
│                                    │
│  ⭐ 你的天赋区                     │  Section 3: 天赋区
│                                    │  (TalentZone)
│  ▸ 看穿表象的本能直觉              │
│  ▸ 在情绪深水里仍能呼吸            │
│  ▸ 对未被言说的事物特别敏锐        │
│                                    │
│  ─────────────────                 │
│  星盘依据: ☽ 天蝎 12宫            │
│           ☿ 双鱼 3宫 △ ♆          │
│                                    │
├────────────────────────────────────┤
│                                    │
│  🌒 你的阴影区                     │  Section 4: 阴影区
│                                    │  (ShadowZone)
│  • 容易把痛苦内化为孤独            │
│  • 防御性的"我不需要任何人"        │
│                                    │
│  💡 当这个阴影来临时,你可以...      │
│  [展开 3 条具体建议 ▾]              │
│                                    │
├────────────────────────────────────┤
│                                    │
│  🧭 你的进化路径                   │  Section 5: 进化路径
│                                    │  (EvolutionPath)
│  从 ────── 走向 ──────              │
│  独自承担   被看见的脆弱            │
│  ☋ 巨蟹     ☊ 摩羯                │
│                                    │
│  [一段诗意化的旁白文字]            │
│                                    │
│  📚 进化心法 (3 条具体行动)         │
│  ▸ 在亲近的人面前练习"我不会"      │
│  ▸ 把照顾换成被照顾,每周一次       │
│  ▸ 写下 3 件你怕承认的需要         │
│                                    │
├────────────────────────────────────┤
│                                    │
│  🌟 你的潜能雷达                   │  Section 6: 潜能雷达
│                                    │  (RadarChart6D 预览)
│       ╱─────────╲                  │
│      ╱   闪烁    ╲                 │
│      ●   雷达图   ●                │
│      ╲           ╱                 │
│       ╲─────────╱                  │
│                                    │
│  灰圈=潜力上限 彩=已激活           │
│  紫闪=今年流年点亮                 │
│                                    │
│  [打开完整雷达 →]                  │
│                                    │
├────────────────────────────────────┤
│                                    │
│  🎴 2026 年度角色卡               │  Section 7: 年度角色 CTA
│  ┌────────────────────────┐        │  (YearCardPreview)
│  │   灯  塔  守  望  者   │        │
│  │   Lantern Keeper        │        │
│  │                          │        │
│  │   主线: 把光照向他人       │        │
│  │   隐藏副本: ___ (Plus)    │        │
│  └────────────────────────┘        │
│                                    │
│  [展开 2026 任务清单 →]            │
│                                    │
├────────────────────────────────────┤
│                                    │
│  🌌 你的平行人生                   │  Section 8: 平行人生预告
│                                    │  (ParallelLivesPreview)
│  星盘藏着 3 条潜能路径,可能你      │
│  从未察觉:                          │
│                                    │
│  ① 公  众  表  达  者  (可见)      │
│  ② 深  度  研  究  者  🔒          │
│  ③ 疗  愈  协  调  者  🔒          │
│                                    │
│  [解锁详细路径分析 →] 🔒 Plus      │
│                                    │
├────────────────────────────────────┤
│                                    │
│  📖 深度灵魂报告 PDF               │  Section 9: PDF 升级钩子
│  ┌────────────────────────┐        │  (PDFUpsell)
│  │  30 页 LLM 长文           │        │
│  │  含: 童年模式分析           │        │
│  │       关系模板               │        │
│  │       职业天命              │        │
│  │       未来 3 年关键节点      │        │
│  │                          │        │
│  │  [立即获取 · $9.99]       │        │
│  └────────────────────────┘        │
│                                    │
├────────────────────────────────────┤
│                                    │
│  下一步                            │  Section 10: 闭环 CTA
│  ┌────────────────────────┐        │  (NextStepCTAs)
│  │ 💬 跟 AI 聊聊我的蓝图    │        │
│  └────────────────────────┘        │
│  ┌────────────────────────┐        │
│  │ 📤 分享我的灵魂原型      │        │
│  └────────────────────────┘        │
│  ┌────────────────────────┐        │
│  │ 🔮 看完整 3D 本命盘      │        │
│  └────────────────────────┘        │
│                                    │
├────────────────────────────────────┤
│                                    │
│  生成于 2026-05-11                │  Section 11: 元数据
│  基于版本 archetype-lib v1.0       │
│  [⟲ 我的出生信息变了?]              │
│                                    │
├────────────────────────────────────┤
│  · · ·  (5 Tab BottomTab)          │
└────────────────────────────────────┘
```

### §3.2 Sticky 元素

- **PageHeader** sticky 在顶部,滚动到 Section 2 之后**右上角自动出现迷你原型徽章**(GoldBadge 24px)
- **底部 CTA 浮起栏**: 滚到 Section 5 之后浮起 `[💬 跟 AI 聊聊]` `[📤 分享]` 双按钮,bg-elevated + backdrop-blur,高 64px,贴近 BottomTab 上方

### §3.3 Section 1: 原型主视觉(详细规格)

```
┌────────────────────────────────────┐
│ ⊙ 1px 烫金边框(底部圆角 2xl)         │
│ ╲ gradient-archetype 背景            │
│   星盘纹理 6% opacity overlay        │
│   手绘原型剪影 30% opacity 居中       │
│                                    │
│   [浮于上方的金粒子 Lottie · 循环]    │
│                                    │
│       深  潜  者                    │
│       ▲思源宋体 Heavy 36px           │
│       字距 0.12em                   │
│       fg-primary                    │
│                                    │
│     ───────────                    │
│     1px 烫金线 60px 居中             │
│                                    │
│      Deep  Diver                   │
│       ▲Fraunces Italic 18px         │
│       字距 0.04em                   │
│       fg-secondary                  │
│                                    │
│    ✦ 灵魂原型 · No.07              │
│    ▲GoldBadge.archetype-id          │
│    中央放 zodiac glyph              │
│    数字: Fraunces 14px              │
│                                    │
└────────────────────────────────────┘

容器: ArchetypeCard.L 变体 [§00-system §5.2.1]
高度: 488px (撑满首屏)
内边距: 上 80px,下 64px,左右 32px
背景层级(从底到顶):
  1. gradient-archetype
  2. /assets/textures/zodiac-grid.svg @ 6% opacity, screen blend
  3. /assets/archetypes/deep_diver.svg @ 30% opacity, 居中,500×500
  4. Lottie 金粒子 (3 KB JSON,缓慢上升)
  5. 文字层
```

**首次进入动效(from=onboarding 触发,顺序):**

| 时机 | 动作 | duration | curve |
|---|---|---|---|
| 0ms | 背景从 bg-deep fade in | 600ms | ease-out-soft |
| 200ms | 烫金边框从右下角生长一圈 | 1200ms | ease-mystic |
| 500ms | 原型剪影从透明 0% → 30% | 800ms | ease-out-soft |
| 700ms | 中文"深 潜 者"逐字浮现(每字 stagger 100ms) | 1000ms | ease-mystic |
| 1300ms | 烫金分隔线从中间向两侧拉伸 | 400ms | ease-out-soft |
| 1500ms | 英文 "Deep Diver" fade in | 600ms | ease-out-soft |
| 1800ms | 金粒子 Lottie 启动 | - | (循环) |
| 1900ms | Badge "No.07" pop in (scale 0.8→1) | 300ms | spring |
| 2200ms | 触觉反馈 impact-heavy + 0.3s 后 success | - | - |

后续 Section 用 IntersectionObserver,各自首次进入视口时 fade-up 24px,400ms。

### §3.4 Section 2: 定义引述

```
┌────────────────────────────────────┐
│                                    │
│  "                                 │  ← Fraunces Italic 80px
│   把别人察觉不到的细节,             │     accent-gold @ 40% opacity
│   活成自己的指南针。               │     左上角装饰引号
│                                  " │
│                                    │
│  ── DEFINITION                      │  ← text-micro caption
│                                    │     fg-dim, letter-spacing 0.2em
└────────────────────────────────────┘

文字: text-display 28px,Fraunces 中英混排
      中文用思源宋体 Regular 24px
      行高 1.6
段落最大宽: 280px (Mobile)
左右内边距: 32px
段落上下间距: 48px
```

### §3.5 Section 3: 天赋区(TalentZone)

```
┌────────────────────────────────────┐
│                                    │
│  ⭐ 你的天赋区                     │  text-h1 + ZodiacGlyph.star 24px
│                                    │     金色 glyph + fg-primary 文字
│                                    │
│  ┌──────────────────────────┐      │  TalentBullet × 3
│  │ ▸ 看穿表象的本能直觉      │      │  bg-card,padding 16px
│  │   ────────────────       │      │  radius-lg
│  │   一句简短承接说明        │      │  左侧 3px 金色短线
│  └──────────────────────────┘      │
│                                    │
│  ┌──────────────────────────┐      │
│  │ ▸ 在情绪深水里仍能呼吸    │      │
│  │ ...                       │      │
│  └──────────────────────────┘      │
│                                    │
│  ┌──────────────────────────┐      │
│  │ ▸ 对未被言说的事物特别敏锐│      │
│  │ ...                       │      │
│  └──────────────────────────┘      │
│                                    │
│  ─────────────────────────         │
│  ※ 星盘依据                        │
│    ☽ 月亮 天蝎 12宫               │
│    ☿ 水星 双鱼 3宫 △ ♆           │
│                                    │
└────────────────────────────────────┘

每条 TalentBullet:
  - 第一行 text-h3 (18px semibold),fg-primary
  - 第二行 text-body-sm,fg-secondary
  - 左侧 3px × full-height 金色短线 (accent-gold)
  - hover/tap: 整卡 scale 0.98 + 弹出详细解读 Sheet

星盘依据条:
  - 折叠态(默认): "☽ ☿ 等 5 个 glyph 横排" + 文字 "支持依据"
  - 展开态: 每个 glyph 配中文行,字号 text-body-sm
  - 折叠/展开 chevron 在右侧
```

### §3.6 Section 4: 阴影区(ShadowZone)

```
┌────────────────────────────────────┐
│                                    │
│  🌒 你的阴影区                     │  text-h1
│  ─────────────────                 │  fg-primary
│  阴影不是缺点,而是未被照亮的部分。 │  text-caption fg-dim
│                                    │
│  ┌──────────────────────────┐      │  ShadowBullet × 2
│  │ • 容易把痛苦内化为孤独    │      │  bg-card padding 16px
│  │   ────────────────       │      │  左侧 3px 紫色短线
│  │   解释这种模式是怎么形成的│      │  (accent-purple)
│  └──────────────────────────┘      │
│  ┌──────────────────────────┐      │
│  │ • 防御性的"我不需要任何人"│      │
│  │ ...                       │      │
│  └──────────────────────────┘      │
│                                    │
│  💡 当这个阴影来临时,你可以...     │  CalloutBox
│  ┌──────────────────────────┐      │  bg-accent-purple-deep/30
│  │ ▾ 展开 3 条具体建议       │      │  border-l-4 accent-purple
│  │                          │      │  内含可折叠条目
│  │   1. 命名情绪,而不是回避它│      │
│  │   2. 给一个人发"我现在不好"│     │
│  │   3. 30 分钟独处,但有计划 │      │
│  └──────────────────────────┘      │
│                                    │
└────────────────────────────────────┘

注: 阴影区文案语气必须"温和、共情、不评判"。
    严禁出现"你应该"、"你必须"、"改正"等命令词。
    所有阴影建议都框架为"你可以试试" / "如果你愿意"。
```

### §3.7 Section 5: 进化路径(EvolutionPath)

```
┌────────────────────────────────────┐
│                                    │
│  🧭 你的进化路径                   │  text-h1
│                                    │
│  ┌──────────────────────────┐      │  EvolutionDiagram
│  │                          │      │  bg-card,radius-xl
│  │   ☋          ☊            │      │  padding 32px
│  │ 巨蟹    →    摩羯          │      │
│  │ 南交         北交          │      │
│  │                          │      │
│  │ "独自承担" → "被看见的脆弱"│      │
│  │ ────────     ────────    │      │
│  │ 你来时       你正在去向   │      │
│  └──────────────────────────┘      │
│                                    │
│  ┌──────────────────────────┐      │  PathNarrative
│  │ 一段 80-120 字的诗意化旁白│     │  text-body Fraunces
│  │ 描述这条进化路径的故事感   │     │  fg-primary @ 90%
│  │ ...                       │     │  italic
│  └──────────────────────────┘      │
│                                    │
│  📚 进化心法 (3 条具体行动)         │  text-h2
│                                    │
│  ┌──────────────────────────┐      │  ActionCard × 3
│  │ ▸ 在亲近的人面前练习"我不会"│    │
│  │   ────────────────       │      │
│  │   why:为什么这一条管用     │      │
│  │   how:具体怎么做           │      │
│  └──────────────────────────┘      │
│  ...                                │
│                                    │
└────────────────────────────────────┘

EvolutionDiagram 视觉细节:
  - 两个圆形容器(60×60),用 1.5px 渐变金色 → 紫色的箭头连接
  - 左侧南交圆: bg accent-rose-deep 内含 glyph
  - 右侧北交圆: bg accent-gold 内含 glyph + glow
  - 箭头是 stroke-dasharray 8 4,有 2s 慢速流动动画
```

> ⚠️ **付费墙在此分界**:Free 用户在 Section 5 末尾(进化心法的 3 条行动)处被遮挡。详见 §4 状态变体。

### §3.8 Section 6: 潜能雷达预览

```
┌────────────────────────────────────┐
│                                    │
│  🌟 你的潜能雷达                   │  text-h1
│                                    │
│  ┌──────────────────────────┐      │
│  │                          │      │
│  │       ╱──────────╲       │      │  RadarChart6D
│  │      ╱    创造    ╲      │      │  size 280px
│  │     ╱   ╱──────╲  ╲     │      │  中央: ZodiacGlyph
│  │  执行 ●        ● 领导    │      │     (主太阳星座)
│  │     ╲   ╲      ╱  ╱     │      │
│  │      ╲    ●●    ╱       │      │  闪烁点: 紫色 2s 呼吸
│  │  直觉 ●        ● 洞察    │      │  彩色点: 当前激活值
│  │     ╲   ╲     ╱  ╱      │      │  灰色环: 上限
│  │      ╲   社交   ╱        │      │
│  │       ╲──────╱           │      │
│  └──────────────────────────┘      │
│                                    │
│  图例:                              │  RadarLegend
│  ● 灰: 你的潜力上限                │  text-caption fg-dim
│  ● 彩: 已激活的能量                │
│  ● 紫闪: 今年流年点亮              │
│                                    │
│  本月雷达提示:                      │  RadarInsight bg-card
│  "洞察力 +12 (天王过你的 3 宫)"     │  text-body-sm
│                                    │
│  [打开完整雷达 →]                  │  Button.secondary 全宽
│                                    │
└────────────────────────────────────┘
```

### §3.9 Section 7: 年度角色卡 CTA

```
┌────────────────────────────────────┐
│                                    │
│  🎴 2026 年度角色卡               │  text-h1
│  ─────────────────                 │
│  每年生日触发,讲述这一年的你       │  text-caption fg-dim
│                                    │
│  ┌──────────────────────────┐      │  YearCardPreview
│  │                          │      │  150×210 (5:7 ratio)
│  │    🌟 烫金边框 🌟         │      │  ArchetypeCard.M 变体
│  │    星盘纹理 + 角色立绘     │      │  bg gradient-archetype
│  │                          │      │
│  │   灯  塔  守  望  者     │      │
│  │   Lantern  Keeper        │      │
│  │   ─────                  │      │
│  │   2026                   │      │
│  │                          │      │
│  │   主线: 把光照向他人       │      │
│  │   支线: ...               │      │
│  │   隐藏副本: 🔒 Plus       │      │
│  │   装备: 🔒 Plus           │      │
│  │                          │      │
│  └──────────────────────────┘      │
│                                    │
│  [展开 2026 任务清单 →]            │  Button.secondary
│  下一张角色卡: 2027 生日季触发      │  text-caption fg-dim
│                                    │
└────────────────────────────────────┘

详细页面规格不在本文档,见 PRD §5.10。
此处仅作 CTA 入口。
```

### §3.10 Section 8: 平行人生预告

```
┌────────────────────────────────────┐
│                                    │
│  🌌 你的平行人生                   │  text-h1
│                                    │
│  星盘藏着 3 条潜能路径,            │  text-body fg-secondary
│  可能你从未察觉:                    │
│                                    │
│  ┌──────────────────────────┐      │  ParallelPath × 3
│  │  ①                       │      │  bg-card padding 20
│  │  公  众  表  达  者       │      │  Path 1 完全可见
│  │  Public Voice             │      │
│  │  "你的话有改变人的力量"    │      │
│  │                          │      │
│  │  [查看详细分析 →]          │      │
│  └──────────────────────────┘      │
│                                    │
│  ┌──────────────────────────┐      │
│  │  ②  🔒                   │      │  Path 2 锁定
│  │  深  度  研  究  者       │      │  名字可见
│  │  Deep Researcher          │      │  描述被高斯模糊覆盖
│  │  ░░░░░░░░░░░░░░░░░░░░░  │      │
│  │  ░░░░░░░░░░░░░░░░░░░░░  │      │
│  │                          │      │
│  │  [Plus 解锁 $7.99/月]      │      │
│  └──────────────────────────┘      │
│                                    │
│  ┌──────────────────────────┐      │
│  │  ③  🔒                   │      │  Path 3 同样锁定
│  │  疗  愈  协  调  者       │      │
│  │  Healer Coordinator       │      │
│  │  ...                      │      │
│  └──────────────────────────┘      │
│                                    │
└────────────────────────────────────┘

锁定态实现:
  - 描述文字外层 div { filter: blur(8px); opacity: 0.4; }
  - 上层覆盖 GoldBadge 锁图标 + "Plus 解锁" 按钮
  - 点击锁图标 → 跳 /pricing?from=blueprint&hook=parallel_lives
```

### §3.11 Section 9: PDF 升级钩子(PDFUpsell)

```
┌────────────────────────────────────┐
│                                    │
│  ┌──────────────────────────┐      │  PDFUpsellCard
│  │ 📖                        │      │  bg gradient-archetype
│  │ 深度灵魂报告 PDF           │      │  border-gold-thick
│  │ ─────────────             │      │  radius-2xl
│  │                          │      │  padding 32px
│  │  30 页 LLM 长文           │      │
│  │  专属生成,无重复           │      │
│  │                          │      │
│  │  含:                       │      │
│  │   · 童年模式的星盘解读     │      │
│  │   · 你的"关系模板"        │      │
│  │   · 职业天命三大方向       │      │
│  │   · 未来 3 年关键节点      │      │
│  │   · 给父母/伴侣的指南     │      │
│  │                          │      │
│  │  ┌──────────────────┐    │      │
│  │  │ 立即获取  $9.99    │    │      │  Button.primary-gold
│  │  └──────────────────┘    │      │
│  │                          │      │
│  │  ⓘ 一次性付费 · 永久可下载 │     │  text-caption fg-dim
│  └──────────────────────────┘      │
│                                    │
└────────────────────────────────────┘

视觉重点: 在 Section 10 之前出现,刚好用户已读完免费内容,
       情绪温度最高时呈现一次性付费机会。
```

### §3.12 Section 10: 闭环 CTA

```
┌────────────────────────────────────┐
│                                    │
│  下一步                            │  text-h2
│                                    │
│  ┌──────────────────────────┐      │  Button.primary-gold 全宽
│  │  💬 跟 AI 聊聊我的蓝图    │      │
│  └──────────────────────────┘      │
│                                    │
│  ┌──────────────────────────┐      │  Button.secondary 全宽
│  │  📤 分享我的灵魂原型      │      │
│  └──────────────────────────┘      │
│                                    │
│  ┌──────────────────────────┐      │  Button.ghost 全宽
│  │  🔮 看完整 3D 本命盘      │      │
│  └──────────────────────────┘      │
│                                    │
└────────────────────────────────────┘

三个 CTA 优先级与对应 PRD 北极星:
  1️⃣ AI Chat → WCC 转化(主)
  2️⃣ 分享     → 拉新转化
  3️⃣ 本命盘  → 深度探索(留存)
```

### §3.13 Section 11: 元数据

```
┌────────────────────────────────────┐
│                                    │
│   生成于 2026-05-11 14:32         │  text-caption fg-dim
│   基于 archetype-lib v1.0          │  居中
│                                    │
│  [⟲ 我的出生信息变了?]              │  Button.ghost
│                                    │  fg-dim hover:fg-accent-gold
│   → 跳 /onboarding?edit=true       │
│                                    │
└────────────────────────────────────┘
```

---

## §4 状态变体

### §4.1 Loading / Skeleton

```
首次生成(无缓存)时显示:
┌────────────────────────────────────┐
│  ⊙ 正在解读你的星盘…              │
│                                    │
│         [星盘旋转 Lottie · 4s]      │
│                                    │
│  ▓▓▓▓▓▓▓▓▓▓ 推算行星位置  ✓      │
│  ▓▓▓▓▓▓▓▓▓░ 分析能量轴 …         │
│  ▓▓▓░░░░░░░ 匹配原型库             │
│  ░░░░░░░░░░ 生成你的天赋路径         │
│                                    │
└────────────────────────────────────┘

实际生成应在 <3s 内(SoulBlueprint 计算 + LLM 简短回填)
若 >5s 显示"还差一点,你的原型很有趣…"安抚文案
若 >15s 显示降级到只展示基础原型,后台补全详细文字
```

### §4.2 Empty (尚未完成 Onboarding)

```
┌────────────────────────────────────┐
│                                    │
│         ✦                          │  Empty Illustration
│       ✦  ✦                        │  (空状态金色星点)
│     ✦      ✦                       │
│                                    │
│  你的灵魂蓝图还没生成              │  text-h2
│                                    │
│  完成 5 步快速测试,3 分钟内       │  text-body fg-secondary
│  揭晓你的原型                       │
│                                    │
│  [开始测试 →]                      │  Button.primary-gold
│                                    │
└────────────────────────────────────┘
```

### §4.3 Error (生成失败)

```
┌────────────────────────────────────┐
│                                    │
│         ⚠                          │
│                                    │
│  星盘数据出了点问题                │
│                                    │
│  可能的原因:                        │
│  · 出生地无法解析                  │
│  · 时区计算异常                    │
│                                    │
│  [重试]    [修改我的出生信息]      │
│                                    │
└────────────────────────────────────┘

错误码与文案对应:
  E_GEOCODE_FAIL    "我们找不到这个出生地,要不要改一个?"
  E_EPHEMERIS_FAIL  "星历计算服务暂时不可用,请稍后再试"
  E_LLM_FAIL        "AI 解读暂时不可用,但你的原型已生成 → 进入简版"
  E_NETWORK         "断网了,本地缓存的报告 → 查看缓存版"
```

### §4.4 用户层级差异

#### §4.4.1 Free 用户

```
可见: Section 0-5
锁定: Section 5 的"进化心法 3 条行动" + Section 6-9 全部锁定

锁定呈现:
┌────────────────────────────────────┐
│  📚 进化心法 (3 条具体行动)         │
│                                    │
│  ┌──────────────────────────┐      │
│  │ ▸ 在亲近的人面前练习"我不会"│  │  第 1 条可见
│  └──────────────────────────┘      │
│  ┌──────────────────────────┐      │
│  │ ░░░░░░░░░░░░░░░░░░░░░░░  │      │  第 2 条模糊
│  └──────────────────────────┘      │
│  ┌──────────────────────────┐      │
│  │ ░░░░░░░░░░░░░░░░░░░░░░░  │      │  第 3 条模糊
│  └──────────────────────────┘      │
│                                    │
│  ─── 🔒 完整版需要 Plus ───        │  Paywall 横条
│  ┌──────────────────────────┐      │  bg gradient-gold-foil/15
│  │  解锁 Plus 即可看到:        │      │  border-l-4 accent-gold
│  │  · 完整进化心法            │      │  padding 24px
│  │  · 6 维潜能雷达详情         │      │
│  │  · 2026 年度角色卡完整     │      │
│  │  · 1 条平行人生路径深度     │      │
│  │                          │      │
│  │  [升级 Plus · $7.99/月]    │      │
│  │  [先看看 PDF · $9.99]      │      │
│  └──────────────────────────┘      │
│                                    │
└────────────────────────────────────┘

之后的 Section 6-9 用 "🔒 仅 Plus 可见" 占位卡替代,各仅 80px 高
确保用户能滑过去看到 Section 10 闭环 CTA + Section 11 元数据
```

#### §4.4.2 Plus 用户

```
可见: Section 0-9 完整(包括 1 条平行人生路径详细)
锁定: Section 8 的另外 2 条平行人生路径(描述模糊+解锁按钮)
新增: 顶部 PageHeader 右上角 GoldBadge "Plus" 徽章
```

#### §4.4.3 Pro 用户

```
可见: 全部
新增:
  - PageHeader 右上角 GoldBadge "Pro" 徽章
  - Section 1 右上角浮出 [⟲ 切换原型] 按钮(原型自定义功能)
  - Section 7 年度角色卡下方增加"历史角色卡库 ↓"链接 → /me/year-cards
  - Section 8 三条平行人生全可见
```

### §4.5 原型降级状态(对应 PRD §5.0.4 数据采集策略)

#### §4.5.1 仅"上午/下午"

```
Section 1 主原型卡保留,但右下角加 ChipBadge:
┌─────────────────┐
│  ⓘ 简化原型      │  bg accent-purple/20
│  Tap to upgrade │  text-caption
└─────────────────┘

Section 3 天赋区"星盘依据"下方加提示:
─────────────────
ⓘ 你的出生时间是"上午/下午",
   完整原型需要精确到分钟。
   [告诉我们更准确的时间 →]
```

#### §4.5.2 完全不知道生时

```
Section 1 主原型卡用更简化版本(仅"太阳 × 月亮"组合)
所有 Section 都加 ⓘ "受限" 标识
Section 6 雷达图标"潜力上限"维度数据置空(灰色虚线)
底部增加显示:
  ┌────────────────────────────┐
  │ ⓘ 你看到的是「极简原型」        │
  │   完整原型需要精确出生时间      │
  │                            │
  │   [问问父母看,告诉我 →]       │
  └────────────────────────────┘
```

### §4.6 分享公开页(/share/:cardId · 无登录)

```
┌────────────────────────────────────┐
│                                    │
│  分享自 @用户昵称                  │  顶部横幅
│  ─────────────────                 │
│                                    │
│  [完整 Section 1 主视觉]           │
│                                    │
│  [一句话定义]                      │  仅展示这两节
│                                    │
│  ─── 想看自己的吗? ───             │
│                                    │
│  ┌──────────────────────────┐      │
│  │  生成我的灵魂蓝图          │      │  Button.primary-gold 撑满
│  │   (免费)                  │      │
│  └──────────────────────────┘      │
│                                    │
│  · 已有 12,839 人测过 ·            │  社会证明
│                                    │
└────────────────────────────────────┘
```

---

## §5 交互细节

### §5.1 手势

| 手势 | 触发位置 | 行为 |
|---|---|---|
| Tap | 各 Section 卡片 | 展开/收起 详细内容(若有) |
| Tap | TalentBullet/ShadowBullet | 弹出底部 Sheet 展示该条详细解读 |
| Long-press (500ms) | Section 1 原型主卡 | 触发"分享卡片预览"半屏 Sheet |
| Swipe down | 顶部下拉 | 刷新报告(限 archetype 升级后) |
| Swipe up (from BottomTab area) | 任意位置 | 显示快捷 CTA Sheet |
| Pinch-out | Section 6 雷达图 | 放大查看详情(等同点击"打开完整雷达") |

### §5.2 微动效

| 触发 | 效果 | duration / curve |
|---|---|---|
| 首次进入(from=onboarding) | 见 §3.3 详细分段动效 | 总 2200ms · ease-mystic |
| 每个 Section 进入视口 | fade-up 24px | 400ms · ease-out-soft |
| 各 Section 标题左侧 emoji | hover 时缓慢 360° 旋转 | 2000ms · linear |
| 阴影区 Bullet 左侧紫色线 | 慢速呼吸光晕 | 3000ms · ease-in-out |
| 雷达图闪烁点 | 紫色 2s 呼吸 + radial glow | 2000ms · ease-in-out 循环 |
| 平行人生锁定卡 | hover 时高斯模糊 8px → 4px | 300ms · ease-out |
| PDF 升级卡金色边框 | 持续微微发光呼吸 | 4000ms · ease-in-out |
| 主 CTA 按钮 | hover scale 1.02 + glow 增强 | 200ms · ease-spring |
| 进化路径箭头 | dash 流动从左到右 | 2000ms · linear 循环 |

### §5.3 触觉反馈点 (Haptics)

| 时刻 | Haptic |
|---|---|
| 原型名揭晓瞬间(from=onboarding,t=2200ms) | heavy + 0.3s success |
| 任一 Section 进入视口 | (无,避免过度) |
| Bullet 卡片点击 | light |
| 锁定区域点击 | warning |
| 升级按钮点击 | medium |
| 分享卡片生成完成 | success |

### §5.4 转场动画

| 来源 → 目标 | 转场 |
|---|---|
| Onboarding step-5 → blueprint/result?from=onboarding | hero-shared-element: 原型卡从 step-5 位置平滑过渡到 Section 1,放大 1.2× |
| Today 摘要卡 → blueprint/result?from=today | fade + scale,无 shared element |
| 任意 → /ai-chat | from-right slide,300ms |
| 任意 → /share Modal | from-bottom slide,400ms |
| 任意 → /pricing Modal | from-bottom slide + scale 0.95→1,400ms |

### §5.5 分享流程(详细子流程)

点击 [📤 分享我的灵魂原型] →

```
Step 1: 弹出 BottomSheet "选择分享版本"
┌────────────────────────────────────┐
│  📤 分享你的灵魂原型               │
│  ─────────────────                 │
│                                    │
│  [双语版预览 320×480]              │
│  [中文版预览 320×480]              │  3 个版本横滑选择
│  [英文版预览 320×480]              │  通过 swiper 切换
│                                    │
│  调整:                              │
│  □ 显示昵称   ✓ 显示原型编号        │
│  □ 加水印     ✓ 加 QR 码            │
│                                    │
│  [复制到剪贴板]  [系统分享]        │
│                                    │
└────────────────────────────────────┘

Step 2: 渲染分享卡片
  - 使用 satori + sharp 在边缘节点生成
  - 输出 1080×1920 PNG (Instagram Story 比例)
  - 同时生成 1200×630 (Twitter Card OG)
  - 上传到 R2,得到 /share/:cardId

Step 3: 系统分享(navigator.share API)
  - title: "我是 [深潜者] - 灵魂蓝图"
  - url: https://stellarlog.app/share/:cardId
  - files: [PNG Blob]

Step 4: 埋点 + Toast "已复制到剪贴板 / 已分享"
```

**分享卡片三版本设计:**

```
双语版 (默认):
┌────────────────┐
│                │
│   深潜者       │
│   ────         │
│   Deep Diver   │
│                │
│  ✦ No.07 ✦    │
│                │
│  我的天赋是    │
│  「看穿表象的  │
│   直觉」       │
│                │
│  我在修炼      │
│  「被看见的    │
│   脆弱」       │
│                │
│  · stellarlog ·│
│   [QR 码]      │
│   @ 用户昵称   │
└────────────────┘

中文版: 同上,移除英文行
英文版: 仅英文,Fraunces 字体为主
```

### §5.6 滚动驱动的视觉变化

```
scroll progress 0%:    PageHeader 透明,Section 1 撑满
scroll progress 5%:    PageHeader 出现 backdrop-blur + 1px border-subtle
scroll progress 20%:   PageHeader 右上角浮出迷你原型徽章(GoldBadge 24px)
scroll progress 40%:   底部浮起 [💬 AI 聊聊] [📤 分享] 双按钮
scroll progress 80%:   底部浮起按钮变形为"现在升级 Plus" (Free 用户专用)
scroll progress 100%:  显示页脚元数据 + 复位推荐
```

---

## §6 双语文案表

| Section | 元素 | zh | en | 备注 |
|---|---|---|---|---|
| 0 | Header 标题 | 我的灵魂蓝图 | My Soul Blueprint | text-h2 |
| 1 | 主原型名(示例) | 深潜者 | Deep Diver | 思源宋体 Heavy / Fraunces Black |
| 1 | 副标识 | 灵魂原型 · No.07 | Soul Archetype · No.07 | GoldBadge |
| 2 | 引述前缀 | (示例) 把别人察觉不到的细节, | (example) Live by the details others miss, | Fraunces Italic |
| 2 | 引述后缀 | 活成自己的指南针。 | walk by your inner compass. | |
| 2 | 标签 | 定义 | DEFINITION | text-micro 字距 0.2em |
| 3 | 标题 | 你的天赋区 | Your Talents | text-h1 |
| 3 | bullet 1 | 看穿表象的本能直觉 | Instinctive insight beneath surfaces | text-h3 |
| 3 | 星盘依据标题 | 星盘依据 | From your chart | text-caption |
| 4 | 标题 | 你的阴影区 | Your Shadows | text-h1 |
| 4 | 副标 | 阴影不是缺点,而是未被照亮的部分。 | Shadows aren't flaws — they're parts not yet lit. | text-caption |
| 4 | callout | 当这个阴影来临时,你可以... | When the shadow surfaces, you might try... | CalloutBox |
| 5 | 标题 | 你的进化路径 | Your Evolution Path | text-h1 |
| 5 | 南交标签 | 你来时 | Where you came from | text-caption fg-dim |
| 5 | 北交标签 | 你正在去向 | Where you're heading | text-caption fg-dim |
| 5 | 心法标题 | 进化心法 | Practices for the Path | text-h2 |
| 5 | actioncard why | 为什么 | Why it works | text-caption |
| 5 | actioncard how | 怎么做 | How to start | text-caption |
| 6 | 标题 | 你的潜能雷达 | Your Potential Radar | text-h1 |
| 6 | 图例 灰 | 灰: 你的潜力上限 | Gray: Your ceiling | text-caption |
| 6 | 图例 彩 | 彩: 已激活的能量 | Color: Activated | text-caption |
| 6 | 图例 紫闪 | 紫闪: 今年流年点亮 | Pulse: Lit by this year's transits | text-caption |
| 6 | CTA | 打开完整雷达 → | Open full radar → | Button.secondary |
| 7 | 标题 | 2026 年度角色卡 | 2026 Year Character Card | text-h1 |
| 7 | 副标 | 每年生日触发,讲述这一年的你 | Generated each birthday — your year's narrative | text-caption |
| 7 | 主线标签 | 主线 | Main Quest | RPG style |
| 7 | 支线标签 | 支线 | Side Quest | |
| 7 | 隐藏副本标签 | 隐藏副本 | Hidden Dungeon | |
| 7 | 装备标签 | 装备 | Equipment | |
| 7 | CTA | 展开 2026 任务清单 → | View 2026 quests → | Button.secondary |
| 8 | 标题 | 你的平行人生 | Your Parallel Lives | text-h1 |
| 8 | 副标 | 星盘藏着 3 条潜能路径,可能你从未察觉: | Three potential lives — paths you may not have seen: | text-body |
| 8 | 锁文案 | Plus 解锁 | Unlock with Plus | Button on locked |
| 9 | 标题 | 深度灵魂报告 PDF | Deep Soul Report PDF | text-h2 |
| 9 | 字数说明 | 30 页 LLM 长文,专属生成 | 30-page LLM essay, uniquely yours | text-body |
| 9 | 价格 | $9.99 一次性 | $9.99 one-time | Button.primary-gold |
| 9 | 免责 | 一次性付费 · 永久可下载 | One-time · Lifetime download | text-caption |
| 10 | section 标题 | 下一步 | What's Next | text-h2 |
| 10 | CTA 1 | 跟 AI 聊聊我的蓝图 | Chat with AI about my blueprint | Button.primary-gold |
| 10 | CTA 2 | 分享我的灵魂原型 | Share my Soul Archetype | Button.secondary |
| 10 | CTA 3 | 看完整 3D 本命盘 | Open my full 3D chart | Button.ghost |
| 11 | 生成日期 | 生成于 {date} | Generated on {date} | text-caption |
| 11 | 修改链接 | 我的出生信息变了? | Birth info changed? | Button.ghost |

**双语条目数:38(单页)** — 满足 §00 总验证标准。

---

## §7 Desktop 响应式适配

```
breakpoint: ≥1024px

布局变化:
  - 主容器最大宽 1180px 居中
  - Section 1 主视觉宽度: 720px 居中,左右金色装饰柱 + 远景星空背景延伸到屏幕边缘
  - Section 3-9 用双列布局: 左列(主内容) 480px / 右列(Sticky 侧栏) 360px / gap 80px
    - Sticky 侧栏内容: 滚动 TOC + 升级 CTA + 原型徽章
  - 雷达图 §6 size 增加到 360px
  - 平行人生 §8 三张卡变 1×3 横排,每张 280×400

字号上调(可选):
  - text-display-xl 56px (vs Mobile 44px)
  - text-display-lg 44px
  - 其余保持

非视觉差异:
  - 顶部 BottomTab 改为 TopNav (§00 §5.3.2)
  - 底部浮起 CTA 改为固定右下角悬浮按钮 (FAB)
  - 长按手势改为右键菜单
```

---

## §8 接入 API / 数据契约

### §8.1 进入页面拉取

```
GET /api/blueprint/me
Authorization: Bearer <jwt>

Response (Plus 用户示例):
{
  "blueprint": {
    "user_id": "uuid",
    "primary_archetype_id": "deep_diver",
    "secondary_archetype_id": "dream_weaver",
    "archetype_metadata": {
      "name_zh": "深潜者",
      "name_en": "Deep Diver",
      "number": 7,
      "definition_zh": "把别人察觉不到的细节,活成自己的指南针。",
      "definition_en": "Live by the details others miss...",
      "silhouette_url": "/assets/archetypes/deep_diver.svg"
    },
    "talent_zone": [
      {
        "headline_zh": "看穿表象的本能直觉",
        "headline_en": "Instinctive insight beneath surfaces",
        "description_zh": "...",
        "description_en": "...",
        "evidence": [
          { "glyph": "moon", "sign": "scorpio", "house": 12 },
          { "glyph": "mercury", "sign": "pisces", "house": 3, "aspect": "trine_neptune" }
        ]
      },
      ...
    ],
    "shadow_zone": [...],
    "evolution_path": {
      "south_node": { "sign": "cancer", "house": 4, "label_zh": "独自承担" },
      "north_node": { "sign": "capricorn", "house": 10, "label_zh": "被看见的脆弱" },
      "narrative_zh": "...",
      "narrative_en": "...",
      "actions": [
        { "headline_zh": "...", "why_zh": "...", "how_zh": "..." },
        ...
      ]
    },
    "potential_radar": {  // 嵌入预览,完整数据通过 GET /api/radar/me
      "creativity":  { "ceiling": 80, "activated": 45, "transit_boost": 12 },
      "leadership":  { "ceiling": 60, "activated": 30, "transit_boost": 0 },
      ...
    },
    "year_character_card_preview": {
      "year": 2026,
      "name_zh": "灯塔守望者",
      "name_en": "Lantern Keeper",
      "main_quest_zh": "把光照向他人"
    },
    "parallel_lives_summary": {
      "path_count": 3,
      "preview": [
        { "index": 1, "name_zh": "公众表达者", "name_en": "Public Voice", "unlocked": true },
        { "index": 2, "name_zh": "深度研究者", "name_en": "Deep Researcher", "unlocked": false },
        { "index": 3, "name_zh": "疗愈协调者", "name_en": "Healer Coordinator", "unlocked": false }
      ]
    },
    "generated_at": "2026-05-11T14:32:18Z",
    "archetype_library_version": "1.0",
    "user_tier": "plus"
  }
}

错误码:
  404 BLUEPRINT_NOT_GENERATED  → 跳 /onboarding 完成测试
  409 BIRTH_DATA_INVALID       → 显示 §4.3 错误态
  503 SERVICE_DEGRADED         → 显示简版 + 后台 retry
```

### §8.2 用户动作

| 动作 | Endpoint | Payload |
|---|---|---|
| 点击 Bullet 查看详细 | `GET /api/blueprint/talent/:bullet_id` | - |
| 点击"打开完整雷达" | `GET /api/radar/me` | - |
| 点击"看 2026 任务清单" | `GET /api/year-card/2026` | - |
| 点击 Plus 解锁 | `GET /api/pricing?hook=parallel_lives` | - |
| 点击 PDF 购买 | `POST /api/checkout/pdf` | `{ product: "deep_soul_report" }` |
| 点击分享生成卡 | `POST /api/share/blueprint` | `{ version: "bilingual" \| "zh" \| "en", include_qr: bool }` |
| 进入 AI Chat | `POST /api/chat/session` | `{ context: { archetype: "deep_diver" } }` |

### §8.3 引用的 PRD 数据模型实体

```
[§6.1 User]                primary_archetype_id, archetype_locked_at, locale_preference
[§6.1 SoulBlueprint]       完整结构,本页直接渲染
[§6.1 ParallelLife]        Section 8 预览
[§6.1 YearCharacterCard]   Section 7 预览
[§6.1 PotentialRadar]      Section 6 预览
[§6.2 缓存策略]            SoulBlueprint 永久缓存,除非 archetype_library_version 升级
```

### §8.4 性能预算

- LCP: 1.5s (Section 1 主原型卡需在 1.5s 内显示)
- TTI: 2.5s
- 报告数据 + 首屏图片合计 < 250KB
- 滚动 60fps

---

## §9 设计师 Figma 落地 Checklist

### §9.1 关键素材

```
必备插画:
  /assets/archetypes/deep_diver.svg           512×512 矢量剪影
  /assets/archetypes/.../*.svg                共 36 张
  /assets/decorations/gold-foil-frame.svg     四角金箔装饰
  /assets/textures/zodiac-grid.svg            星盘纹理
  /assets/textures/gold-foil-grain.webp       金箔颗粒

字体:
  Fraunces Variable        Latin
  Source Han Serif CN VF    中文
  Inter Variable           UI Latin
  PingFang SC              UI 中文 (系统)

Lottie:
  /assets/lottie/gold-particles.json          原型卡金粒子飘浮
  /assets/lottie/chart-spinning.json          Loading 星盘旋转
```

### §9.2 使用的 token (引用 §00-system.md)

```
颜色:
  bg-deep, bg-card, bg-elevated
  fg-primary, fg-secondary, fg-dim
  accent-gold, accent-gold-deep
  accent-purple, accent-purple-deep
  accent-rose
  radar-creativity..radar-execution
  border-subtle

字号:
  text-display-xl (原型主标题)
  text-display (Section 标题)
  text-h1, text-h2, text-h3
  text-body, text-body-sm, text-caption, text-micro

圆角:
  radius-md (Button)
  radius-lg (普通卡片)
  radius-xl (TalentBullet 等)
  radius-2xl (ArchetypeCard.L)

阴影:
  shadow-glow-gold (烫金 CTA)
  shadow-glow-purple (闪烁点)

动效:
  duration-mystic (1500ms · 揭晓动效)
  duration-base (250ms · 普通过渡)
  ease-mystic
  ease-out-soft
  spring
```

### §9.3 使用的组件 (引用 §00-system.md)

```
基础:
  Button.primary-gold, .secondary, .ghost
  Toggle, Chip

品牌:
  ArchetypeCard.L (Section 1)
  ArchetypeCard.M (Section 7 年度卡)
  GoldBadge.archetype-id (Section 1)
  GoldBadge.premium-gold (Plus/Pro 用户角标)
  ZodiacGlyph (Section 3 星盘依据 + Section 5 进化路径)
  RadarChart6D (Section 6)

导航:
  PageHeader (顶部)
  BottomTab (底部,继承全局)

数据:
  YearCardPreview (新组件 — 仅本页用,Figma 单独定义)
  ParallelPath (新组件 — 仅本页用)
  EvolutionDiagram (新组件 — 仅本页用)
  PDFUpsellCard (新组件 — 仅本页用)

沉浸:
  StarfieldBackground (整页背景)
  GoldFoilOverlay (PDF 升级卡)
```

### §9.4 Figma 文件组织建议

```
🎨 02-Soul-Blueprint-Result
├─ 📄 Cover
├─ 📄 Mobile · Onboarding First Visit (主状态)
│   ├─ Frame: 375 × 4800px
│   └─ 含 11 个 Section,完整滚动版
├─ 📄 Mobile · Free Paywall
├─ 📄 Mobile · Plus / Pro Variants
├─ 📄 Mobile · States (Loading / Empty / Error)
├─ 📄 Mobile · Archetype Downgrade (no birth time)
├─ 📄 Mobile · Share Sheet (3 versions)
├─ 📄 Public Share Page (/share/:cardId)
├─ 📄 Desktop · Full Layout (1440 × 4000)
├─ 📄 Interactions (Prototype connections)
└─ 📄 Animation Specs (Lottie + Framer specs 截图记录)
```

### §9.5 检验

- [ ] 11 个 Section 全部 Figma 化
- [ ] 4 个状态变体齐全
- [ ] 双语文案表的 38 条全部落地(zh/en 两个 component variant)
- [ ] 烫金边框样式与 §00 §4.2 一致
- [ ] 雷达图与 §00 §5.2.4 配色一致
- [ ] 锁定区高斯模糊参数验证(blur 8px, opacity 0.4)
- [ ] 滚动驱动的 5 个 progress 节点验证
- [ ] 分享卡 1080×1920 实际渲染清晰
- [ ] Pro 用户的 "切换原型" 按钮已设计

---

## §10 写完自检 (引用 §00 §13)

- [x] 页面目标 ≤ 3 行,有用户预期动词
- [x] URL + 进入/退出路径完整
- [x] ASCII Wireframe 用 36 字符宽度,每元素有组件名 + 状态变体
- [x] Loading / Empty / Error 三态 + Free/Plus/Pro 三层差异 + 原型降级 2 态 + 分享公开页
- [x] 交互细节 (手势 6 项 + 动效 9 项 + Haptics 5 项)
- [x] 双语文案表 38 条
- [x] Desktop 响应式 4 处差异
- [x] API endpoint + payload + PRD 引用
- [x] Figma checklist + 素材 + 组件 + 文件组织
- [x] 引用 PRD 章节 ≥ 5 次: §5.0.4 / §5.0.5 / §5.9 / §5.10 / §5.11 / §6.1 / §6.2 / §8 / §9.2 (共 9 次)
- [x] 与 §00-system.md token / 组件库一致

---

## 变更记录

| 版本 | 日期 | 内容 |
|---|---|---|
| v0.2 | 2026-05-11 | 初始版本,v0.2 产品门面页 |

---

**下一步**: `01-onboarding.md` (5 步流程 + Hook 卡),从 step-5 接到此页 Section 1 的 shared-element 转场。
