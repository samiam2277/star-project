# 00 设计系统总览 · StellarLog Design System v0.2

> 本文档是 5 个核心页 spec(`01`-`05`)的**唯一基础参照**。所有 token、组件、动效、文案策略在此定稿。
> 页面 spec 中不再重复定义,只引用本文件的章节锚点(例 `[§00-system.md §3.2]`)。
>
> 版本 v0.2 · 2026-05-11 · 对应 PRD v0.2

---

## §0 设计哲学:几何现代骨架 × 奇幻装饰层

### §0.1 调性陈述

> **"现代神秘主义" (Modern Mysticism)**
>
> 不是水晶球和占卜屋,而是天文台 × 实验室 × 古卷轴。
> 让用户感觉:**"这个产品认真对待我的人生,不是娱乐玩具。"**

### §0.2 视觉语言双轨

| 轨 | 比例 | 用途 | 实现细节 |
|---|---|---|---|
| **几何现代骨架** | ~70% | 信息结构、按钮、表单、导航、图表、文字网格 | Tailwind + shadcn 风格的 8pt grid + `rounded-2xl` + 大段留白 + 中性灰阶 |
| **奇幻装饰层** | ~30% | 原型卡、灵魂蓝图、年度角色卡、塔罗、分享卡、Onboarding Hook | 金色烫印边框 + 星盘 SVG 纹理 + 手绘塔罗插画 + 微光效粒子 |

**核心原则:奇幻装饰是"点睛",不是"涂满"。**
- 凡是用户做任务的页面(填表单、读列表、看图表)→ 几何骨架为主,留白即神性
- 凡是用户获得"被命名"瞬间的页面(蓝图报告、原型 Hook、年度角色卡、塔罗翻牌)→ 奇幻层放大,沉浸优先
- 严禁全屏星空背景配纯文字内容(廉价感的来源)

### §0.3 反例对照

```
❌ 通用占星 App  →  紫底白字 + 大量水晶 emoji + 旋转 logo + 闪烁特效
❌ Pure Material  →  Google Calendar 式工具感,丢失神秘
✅ StellarLog    →  深空底 + 烫金细线 + 留白 + 在关键瞬间引入奇幻
```

参考调性物:
- *Refinery29 占星专栏*(留白)
- *Co-Star 早期 iOS*(极简但太冷)我们要更温暖
- *人类图官方报告 PDF*(权威感)
- *DnD 5e Player's Handbook 内页*(奇幻骨架)
- *Apple Vision Pro 发布会主视觉*(现代神秘交界)

---

## §1 色彩系统

### §1.1 基础色板 (Base Palette)

```
┌─────────────────────────────────────────────────────────┐
│  名称           token              hex      使用场景         │
├─────────────────────────────────────────────────────────┤
│  深夜底         bg-deep            #0B0B14   主背景         │
│  星空底         bg-space           #11111C   次级容器       │
│  卡片底         bg-card            #15151F   普通卡片       │
│  抬升底         bg-elevated        #1C1C28   悬浮卡片/Modal  │
│  分割线         border-subtle      #2A2A38   弱分隔         │
│  描边           border-default     #3A3A4D   常规描边       │
├─────────────────────────────────────────────────────────┤
│  主文字         fg-primary         #F4EDE0   米白(暖白)     │
│  次要文字       fg-secondary       #C7C2B8   说明文字       │
│  弱化文字       fg-dim             #8A8595   占位/disabled   │
│  反色文字       fg-on-gold         #0B0B14   金底上的字       │
└─────────────────────────────────────────────────────────┘
```

> ⚠️ **暗色优先,不做 Light Mode**。MVP 锁定深色,Phase 3 再评估浅色。理由:神秘氛围与暗色高度耦合,夜深时的占星阅读场景占比超 60%(竞品数据)。

### §1.2 强调色 (Accent)

```
┌─────────────────────────────────────────────────────────┐
│  名称           token              hex       含义           │
├─────────────────────────────────────────────────────────┤
│  烫印金         accent-gold        #C9A876   品牌主色,Premium│
│  深金           accent-gold-deep   #9C7E4E   悬停/活跃       │
│  神秘紫         accent-purple      #6B5B95   潜能闪烁/特殊态  │
│  深紫           accent-purple-deep #4A3F6B   背景渐变锚点    │
│  玫瑰金         accent-rose        #B8838C   关系/塔罗/温暖    │
│  深海蓝         accent-blue        #5B7A95   直觉/北交       │
└─────────────────────────────────────────────────────────┘
```

**金的使用克制:** 每屏 ≤ 3 处金色元素(品牌 logo、主 CTA、关键边框各算一处)。烫金过多 → 廉价、变成"算命摊"。

### §1.3 雷达六维色 (Radar Hexagram)

对应 PRD §5.11 潜能雷达六维度,饱和度统一(HSL 中 S=45-55%),保证六色并置时不"打架"。

```
┌──────────────────────────────────────────────────────────┐
│  维度            token              hex      占星映射         │
├──────────────────────────────────────────────────────────┤
│  创造力 Creativity radar-creativity #E0A82E  日/狮子/五宫    │
│  领导力 Leadership radar-leadership #C26B5C  火星/白羊/十宫   │
│  洞察力 Insight    radar-insight    #6B5B95  水星/双子/三九宫 │
│  社交力 Social     radar-social     #B8838C  金星/天秤/七宫   │
│  直觉力 Intuition  radar-intuition  #5B7A95  月/海王/十二宫    │
│  执行力 Execution  radar-execution  #5C7A6B  土星/摩羯/六宫    │
└──────────────────────────────────────────────────────────┘
```

### §1.4 语义色 (Semantic)

```
success      #5C7A6B  与"执行力"同色,有意为之
warning      #E0A82E  与"创造力"同色,谨慎使用
danger       #C26B5C  与"领导力"同色,仅用于破坏性操作
info         #5B7A95  与"直觉力"同色
```

### §1.5 渐变 (Gradients)

```
gradient-deep-space:
  linear(180deg, #0B0B14 0%, #15151F 50%, #11111C 100%)
  用途: 全局背景

gradient-archetype:
  linear(135deg, #2A2438 0%, #1A1A28 50%, #0B0B14 100%)
  用途: 原型卡背景

gradient-gold-foil:
  linear(135deg, #C9A876 0%, #E5C892 50%, #9C7E4E 100%)
  用途: 烫金边框 / 重要 CTA / 解锁按钮

gradient-potential-glow:
  radial(circle, #6B5B95 0%, transparent 70%)
  用途: 潜能激活闪烁光晕
```

### §1.6 透明度规约

```
overlay/scrim:      rgba(11,11,20, 0.72)    Modal 背景
glass-card:         rgba(28,28,40, 0.45) + backdrop-blur(20px)  浮窗
hover-state:        opacity 0.85
disabled:           opacity 0.40 + filter saturate(0.5)
```

---

## §2 Typography

### §2.1 字体家族

| 用途 | Latin | 中文 | Fallback |
|---|---|---|---|
| **UI 正文** | Inter Variable | PingFang SC / 苹方 | -apple-system, Segoe UI, sans-serif |
| **品牌标题** | Fraunces Variable (Serif 古典感) | 思源宋体 (Source Han Serif) | Georgia, "STSong", serif |
| **数据/坐标** | JetBrains Mono | (沿用 Latin) | Menlo, Consolas, monospace |
| **原型名称** | Fraunces Black 700 + 字距 0.02em | 思源宋体 Heavy 900 + 字距 0.08em | 同上 |

**字体加载策略:** Fraunces 与思源宋体均自托管 woff2,subset 仅常用字。Inter 与 PingFang 走系统/CDN。首屏 FOIT 控制在 200ms 内。

### §2.2 Type Scale (Mobile First)

```
┌────────────────────────────────────────────────────────────────────┐
│  token            size/lh        weight  字号/行高     用法            │
├────────────────────────────────────────────────────────────────────┤
│  text-display-xl  44/52 px        700     Fraunces     蓝图原型主标题   │
│  text-display-lg  36/44 px        700     Fraunces     页面级英雄标题   │
│  text-display     28/36 px        700     Fraunces     模块标题         │
│  text-h1          24/32 px        600     Inter        二级标题          │
│  text-h2          20/28 px        600     Inter        卡片标题          │
│  text-h3          18/26 px        600     Inter        子标题            │
│  text-body-lg     17/26 px        400     Inter        正文(阅读密集)    │
│  text-body        15/24 px        400     Inter        正文(默认)        │
│  text-body-sm     14/22 px        400     Inter        次要正文          │
│  text-caption     13/18 px        400     Inter        辅助说明          │
│  text-micro       11/16 px        500     Inter        徽章/标签         │
└────────────────────────────────────────────────────────────────────┘
```

中文字号同号(无需 ×1.1),但 line-height +2px。

### §2.3 双语并排显示 (原型名场景)

灵魂蓝图原型名首次显示时,中英并排:

```
┌────────────────────────────────────┐
│                                    │
│       深  潜  者                    │
│   ─────────────────                │
│      Deep  Diver                   │
│                                    │
└────────────────────────────────────┘

中文: 思源宋体 Heavy 32px,字距 0.12em,fg-primary
分隔线: 60px 长,1px 烫金 (#C9A876, 50% opacity)
英文: Fraunces Italic 18px,字距 0.04em,fg-secondary
```

### §2.4 阅读流体性

- 中文段落优先**两端对齐 + hanging punctuation**(`text-align: justify; hanging-punctuation: first last;`)
- 西文段落左对齐
- 段落间距 1.5× line-height
- 最大行长:中文 24 全角字,西文 65-72 字符(Mobile 减半,实际 12-16 字)

---

## §3 间距 & 栅格

### §3.1 8pt Grid 系统

所有间距、尺寸、定位都基于 8pt 倍数:

```
spacing tokens:
  s-0    0
  s-1    4px      (微小:icon 内边距)
  s-2    8px      (基础:tag 内边距)
  s-3    12px     (元素间距)
  s-4    16px     (默认:卡片内边距)
  s-5    20px     (中等)
  s-6    24px     (大:卡片间距)
  s-8    32px     (区段间距)
  s-10   40px     (模块间距)
  s-12   48px     (页面级间距)
  s-16   64px     (英雄区)
  s-20   80px     (页脚等)
```

例外: 1px(分割线)、2px(描边)。

### §3.2 Mobile 栅格

```
viewport: 375px (设计基线,iPhone 13 mini)
margin:   24px 左右
gutter:   16px (双列时)
content:  327px (375 - 24×2)

容器最大宽:
  Mobile: 100% (受 margin 限制)
  Tablet (≥768px): 720px 居中
  Desktop (≥1280px): 1180px 居中
```

### §3.3 Safe Area

iOS 与 Android 都遵守 safe-area-inset:

```
顶部安全区: env(safe-area-inset-top, 44px)
底部安全区: env(safe-area-inset-bottom, 34px) + BottomTab 高度
```

底部 5 Tab 容器实际占高:**56px(content) + 34px(safe area) = 90px**。
所有内容必须避让此区域。

### §3.4 Z-index 层级

```
z-base       0       默认内容
z-elevated   10      浮起卡片(雷达浮窗等)
z-sticky     20      sticky header
z-overlay    30      下拉/Tooltip
z-modal-bg   40      Modal 背景遮罩
z-modal      50      Modal 内容
z-toast      60      Toast/通知
z-debug      9999    开发用
```

---

## §4 圆角、描边、阴影、光效

### §4.1 圆角

```
radius-sm    8px     小元素(tag/chip)
radius-md    12px    输入框/按钮
radius-lg    16px    普通卡片
radius-xl    24px    重点卡片(原型卡)
radius-2xl   32px    沉浸卡片(蓝图报告主卡)
radius-full  9999px  胶囊按钮 / 头像
```

### §4.2 描边

```
border-1     1px solid border-subtle      弱分隔
border-2     1px solid border-default     默认
border-gold  1px solid accent-gold + glow 烫金边框
border-gold-thick  2px solid (gradient)    重点元素

烫金边框的完整样式(用于原型卡/解锁按钮):
  border: 1px solid transparent;
  background:
    linear-gradient(#15151F, #15151F) padding-box,
    linear-gradient(135deg, #C9A876, #E5C892, #9C7E4E) border-box;
  box-shadow: 0 0 24px rgba(201, 168, 118, 0.18);
```

### §4.3 阴影

```
shadow-sm:   0 1px 2px rgba(0,0,0,0.4)
shadow-md:   0 4px 12px rgba(0,0,0,0.5)
shadow-lg:   0 12px 32px rgba(0,0,0,0.6)
shadow-glow-gold:    0 0 32px rgba(201, 168, 118, 0.25)
shadow-glow-purple:  0 0 32px rgba(107, 91, 149, 0.30)  /* 潜能激活 */
```

### §4.4 星盘纹理叠加

`overlay-zodiac-texture`(原型卡/蓝图报告背景纹理):
- 资源:`/assets/textures/zodiac-grid-1x.svg`(约 4KB,黑底白线)
- 应用方式:`opacity: 0.06` + `mix-blend-mode: screen`
- 内容:12 宫位放射线 + 黄道环淡刻度

### §4.5 金箔颗粒纹理

`overlay-gold-foil-grain`(分享卡/年度角色卡):
- 资源:`/assets/textures/gold-foil-grain.webp`(8KB)
- 颗粒大小 2-3px,平铺
- 应用:覆盖在金色填充层上,`opacity: 0.4` + `mix-blend-mode: overlay`

---

## §5 组件库 (Component Library)

> 所有组件在 5 个页面 spec 中可被直接引用。命名采用 `<ComponentName>` 形式。

### §5.1 基础组件

#### §5.1.1 Button

```
┌──────────────────────────────────────────────────────────────────┐
│ variant         尺寸     视觉                          用途         │
├──────────────────────────────────────────────────────────────────┤
│ primary-gold    44/52px  烫金渐变填充 + 烫金边框        主 CTA       │
│ secondary       44/52px  border-2 + bg 透明           次级           │
│ ghost           40/48px  无边框 + hover 出底           弱 CTA         │
│ destructive     44px     bg-danger 填充               删除/解绑      │
│ icon-only       40px     圆角正方形                     工具按钮      │
└──────────────────────────────────────────────────────────────────┘

primary-gold 完整样式:
  background: linear-gradient(135deg, #C9A876 0%, #E5C892 50%, #9C7E4E 100%);
  color: #0B0B14;
  font-weight: 600;
  box-shadow: 0 4px 16px rgba(201, 168, 118, 0.32);
  text-shadow: 0 1px 0 rgba(255,255,255,0.2);

  hover:  brightness(1.08)
  active: scale(0.97)
  disabled: opacity 0.4 + grayscale(0.8)
  loading: 内部 spinner + 文字 "处理中…/Processing…"
```

**触摸目标最小尺寸:44 × 44px**(WCAG 2.5.5)。

#### §5.1.2 Input / Form Field

```
┌─────────────────────────────────────────────────┐
│  Label (text-body-sm, fg-secondary)             │
│  ┌───────────────────────────────────────┐      │
│  │  placeholder / value                   │ 56  │
│  └───────────────────────────────────────┘      │
│  helper / error (text-caption, fg-dim)          │
└─────────────────────────────────────────────────┘

Input 高 56px(为输入法弹起后舒适按压设计)
bg: bg-card, border: border-2
focus: border-color → accent-gold, ring 1px gold
error: border-color → danger, helper 变红
```

特殊类型:
- **DatePicker**: 滚轮式三轴(年/月/日),夜空主题
- **TimePicker**: 同上,带"不确定"checkbox(挂钩 PRD §5.0.4 的原型降级)
- **PlaceAutocomplete**: 集成 Mapbox/Google Places,异步建议下拉

#### §5.1.3 Toggle / Switch

```
关 ⚫─○     ○─⚫ 开
   #3A3A4D    accent-gold

宽 44px 高 24px,bg-elevated,thumb 20px 圆形
```

#### §5.1.4 Slider (时间机器/激活度)

```
[───●──────────] 60%
     ↑
  滑块: 24px 烫金球 + 内 glow
  轨道: 4px,已选段烫金,未选段 border-subtle
```

#### §5.1.5 Tab

水平 Tab(三段式选择,如 Free/Plus/Pro):

```
┌──────────────┬──────────────┬──────────────┐
│   Free       │   Plus  ●    │   Pro        │
└──────────────┴──────────────┴──────────────┘

激活态: 底部 2px 烫金下划线 + 文字 fg-primary
未激活: 文字 fg-dim
```

#### §5.1.6 Chip / Tag

```
胶囊状,radius-full,h-7 px-3
默认: bg-elevated, text-caption, fg-secondary
激活: bg-accent-gold/10, border-accent-gold, fg-accent-gold
```

应用:focus_topics 选择、AI Quick Reply、流年标签。

### §5.2 品牌组件 (Brand Components)

#### §5.2.1 ArchetypeCard

灵魂蓝图最重要的视觉资产。提供 3 个尺寸:

```
┌─────────── ArchetypeCard.S (用于列表/Today 摘要) ───────────┐
│  120 × 168px,radius-xl,gradient-archetype 背景             │
│  顶部 zodiac glyph 16px,中部 中英原型名(stack),底部 1 行 tagline │
└──────────────────────────────────────────────────────────┘

┌─────────── ArchetypeCard.M (用于分享/Card 列表) ────────────┐
│  320 × 440px,radius-2xl,完整金边                            │
│  星盘纹理 6% opacity + 手绘原型插画 30% opacity 居中            │
│  上中下三段: glyph & 编号 / 原型名 / 一句话定义                  │
└──────────────────────────────────────────────────────────┘

┌─────────── ArchetypeCard.L (用于蓝图报告页主视觉) ──────────┐
│  全屏宽 × 高 488px,radius-2xl (仅底部),融合页面顶部            │
│  星盘纹理 + 烫金粒子动态(Lottie)+ 中英原型名 + 微动效        │
│  CTA "解锁完整蓝图" 浮于卡片底部                                │
└──────────────────────────────────────────────────────────┘
```

#### §5.2.2 GoldBadge

```
徽章类型(尺寸 24-32px):
  premium-gold     金色实心,fg-on-gold 文字     付费层标识
  potential-spark  紫色,有 2s 闪烁循环          潜能激活
  archetype-id     金色圆环 + 中央 glyph         原型 ID
  level            金色刻度环 + 数字               觉醒等级
```

#### §5.2.3 ZodiacGlyph

12 星座 + 10 行星 + 4 元素 + 4 模态,统一 SVG icon set。

```
sizes: 16 / 20 / 24 / 32 / 48 / 64
默认色: fg-secondary (1.5px stroke)
激活色: accent-gold
神秘紫色变体: accent-purple (用于潜能开关)
```

资源路径:`/assets/glyphs/zodiac/*.svg`(共 30 个 icon,合计 ~12KB)

#### §5.2.4 RadarChart6D

六维潜能雷达。三层叠加渲染:

```
Layer 1 (灰):  潜力上限,fg-dim 30% 填充
Layer 2 (彩):  已激活,六维各自颜色(§1.3) 50% 填充
Layer 3 (闪):  流年点亮,白色 2s 呼吸 + glow

六轴标签: 中英可切,默认中文
中心点: ZodiacGlyph(用户主太阳星座)
半径分级: 内 25% / 50% / 75% / 100% 刻度环
```

支持尺寸: 200/280/360px(浮窗用 200,Me 页用 360)

### §5.3 导航组件

#### §5.3.1 BottomTab (Mobile 主导航)

5 Tab,与 PRD §3.2 一致:

```
┌──────────────────────────────────────────────────────┐
│  ☀    ●    💬    🔗    👤                              │
│  Today Chart  AI  Connect  Me                          │
└──────────────────────────────────────────────────────┘

容器高 90px (含 safe-area-bottom 34px)
背景: bg-elevated,顶部 1px border-subtle
icon 24px,active 时 fg-accent-gold + 上方 2px 金色短下划线
label 11px,fg-dim → fg-primary
浮起按钮(可选): 中央"AI"放大成 56px 圆形浮起,gradient-gold-foil
```

#### §5.3.2 TopNav (Desktop / Tablet)

PRD §3.2 Mobile 与 Desktop 导航容器不同,Desktop 顶部横向:

```
┌──────────────────────────────────────────────────────────────┐
│  StellarLog  |  Today  Chart  AI Chat  Connect  Me   [Avatar] │
└──────────────────────────────────────────────────────────────┘

高 64px,bg 半透明 backdrop-blur
logo 左,导航中,头像与设置右
```

#### §5.3.3 Breadcrumb

```
Me / Blueprint / 进化路径
```

仅 Desktop,Mobile 用页面 Header 的 ← 返回按钮。

#### §5.3.4 PageHeader

```
┌──────────────────────────────────────────┐
│  ←        页面标题              ⋯ / 操作 │
└──────────────────────────────────────────┘

高 56px,底部 1px border-subtle
左: 返回箭头 (32×32,fg-primary)
中: text-h2,可省略号截断
右: 单/双 icon-only 按钮
```

### §5.4 对话组件

#### §5.4.1 ChatBubble

三类气泡,共用统一样式骨架:

```
┌─── user ───────────────────────────────┐
│                          ┌─────────────┐│
│                          │ 用户提问内容 ││
│                          │             ││
│                          └─────────────┘│
│                          ↑                │
│                          accent-purple,18px radius (左下角 4px) │
└──────────────────────────────────────────┘

┌─── ai ─────────────────────────────────┐
│  ┌─────────┐                              │
│  │ avatar  │                              │
│  └─────────┘                              │
│  「深潜者」视角  ← ContextChip 引导文字     │
│  ┌─────────────────┐                       │
│  │ AI 回复内容       │ streaming 时打字光标   │
│  │ 引用 §5.2(可点击) │                       │
│  └─────────────────┘                       │
│         bg-card,18px radius (右下角 4px)     │
└──────────────────────────────────────────┘

┌─── tool-call ──────────────────────────┐
│  ⚙  正在调用 get_transit(2026-05-12)…   │
│  ▼ 展开                                   │
│  {  tool result preview ...  }            │
└──────────────────────────────────────────┘
```

详见 `04-ai-chat.md`。

#### §5.4.2 ContextChip

AI 头像下方的"以原型视角对话"标识:

```
┌──────────────────────┐
│  ◆ 以「深潜者」视角对话 │  ← 可点击,跳原型详情
└──────────────────────┘

bg-elevated,radius-full,h-7,text-caption,fg-accent-gold
```

#### §5.4.3 QuickReplyChip

AI 回复下方建议的快捷追问:

```
[今天的能量重点?] [给我一张塔罗] [我该联系他吗?]
```

Chip 样式同 §5.1.6,横向滚动,最多 4 个。

### §5.5 数据可视化组件

#### §5.5.1 NatalChart3D (3D 本命盘 shell)

完整规格见 `05-chart-3d.md`,此处定义 token:

```
canvas viewport: 全屏宽 × min(viewport-height, 600px)
默认相机: 距盘 6 单位,俯视 30°
背景: gradient-deep-space + 星空粒子(react-three/fiber Stars)
盘面:
  - 外环 360° 黄道带(纹理 zodiac-ring.webp)
  - 12 宫位放射 + 标号
  - 行星 sprite(每行星一个 PNG,256×256)
  - 相位连线(2D SVG 叠加层,过 60fps 性能阈值则降级)
```

#### §5.5.2 NatalChart2D (SVG 后备)

3D 不可用时降级:

```
viewBox: 0 0 400 400
纯 SVG,可静态导出 PDF
样式与 3D 一致(配色、glyph)
```

#### §5.5.3 AspectLine

行星间相位连线,5 种相位类型颜色:

```
合相 conjunction  #C9A876  实线 2px
对相 opposition   #C26B5C  实线 2px
三分 trine        #5C7A6B  虚线 1.5px
四分 square       #B8838C  实线 1.5px
六分 sextile      #5B7A95  虚线 1px
```

容差 orb 用 line opacity 表示:0° = 100%, 8° = 30%。

#### §5.5.4 HouseSegment

12 宫扇形,鼠标悬停高亮:

```
默认: 透明 + 1px border-subtle
hover: accent-gold/8% 填充 + border-accent-gold
active(点击): 同 hover + 弹出右侧解读卡
```

### §5.6 沉浸 / 装饰组件

#### §5.6.1 StarfieldBackground

```
全屏背景,canvas/WebGL
星点数: Mobile 80 / Desktop 200
动效: 每颗星 6s 缓慢闪烁,5% 星点每 30s 流星划过
性能预算: <1% CPU on iPhone 12
```

实现建议:`react-three/drei` 的 `<Stars>` 或纯 canvas (取决于页面是否已加载 R3F)。

#### §5.6.2 GoldFoilOverlay

```
SVG 烫金边框 overlay,4 角装饰花纹 + 上下中间细线
应用层:
  ArchetypeCard.M / L
  分享卡
  年度角色卡
  PDF 报告封面

资源: /assets/decorations/gold-foil-frame.svg (~6KB)
颜色变量: stroke 用 accent-gold,内描边用 accent-gold-deep
```

#### §5.6.3 TarotCard

```
长宽比 5:8 (250×400 / 200×320)
卡背: gradient-archetype + 居中烫金 logo + 星盘纹理
卡面:
  - 上 1/3: 牌位罗马数字 + 名称(双语)
  - 中 1/2: 手绘塔罗插画 (PNG,512×800)
  - 下 1/6: 一句关键词

翻牌动效: 3D flip(rotateY 0 → 180°,duration 800ms,ease-out)
逆位: rotateZ 180° + 微红光晕
```

#### §5.6.4 ProgressOrb (雷达浮窗)

```
50 × 50px 浮球,bg gradient-archetype + radial-glow accent-purple
内含: 微缩 RadarChart6D (六轴简化为彩色点)
拖动: 可拖到屏幕右边任意 Y 位置
点击: 展开雷达详情 Modal
触发: 每次潜能值变化时 + 1s 脉冲(scale 1 → 1.15 → 1)
```

详细行为见 PRD §5.4.2.1。

---

## §6 图标系统 (Iconography)

### §6.1 通用 UI 图标

- 库:**Lucide** (`lucide-react`) 作为基底,1.5px stroke,size 16/20/24
- 风格调整:把 stroke-linecap 改为 `round`,与字体的圆润感呼应
- 自定义图标(占星术语):另存 `/assets/glyphs/` 下,严格遵循 Lucide 风格规约,保证一致性

### §6.2 占星 / 自定义图标(必备清单)

```
zodiac/         12 星座 glyph
planets/        10 行星 + 北南交点 + 凯龙 + 莉莉丝 (14 个)
houses/         12 宫(可选,通常用数字)
elements/       4 元素(火/土/风/水)
modalities/     3 模态(基本/固定/变动)
aspects/        5 主要相位(合/对/三/四/六)
archetype/      36 个原型 silhouette(用于 ArchetypeCard 装饰)
tarot/          78 张牌的简化 glyph(用于列表)
```

### §6.3 Emoji 政策

**严禁在产品 UI 内使用平台 emoji**(🌟⭐💫 等)。理由:
- 跨平台显示不一致
- 与品牌视觉冲突(廉价感)
- 多巴胺式滥用,破坏神秘感

例外:用户输入(自定义昵称、聊天消息)允许 emoji。
营销文案/分享卡 OG 文案也允许少量。

---

## §7 动效原则 (Motion Principles)

### §7.1 时长 token

```
duration-instant   80ms     按钮按下反馈
duration-fast      150ms    Tooltip / Toast
duration-base      250ms    普通过渡(opacity/scale)
duration-slow      400ms    页面切换 / 模态出入
duration-dramatic  800ms    塔罗翻牌 / 蓝图揭晓
duration-ambient   2000ms+  闪烁循环 / 呼吸光
```

### §7.2 缓动 token

```
ease-out-soft       cubic-bezier(0.16, 1, 0.3, 1)        UI 出现
ease-in-soft        cubic-bezier(0.7, 0, 0.84, 0)         UI 消失
ease-spring         (Framer Motion spring: stiffness 200 damping 22)  互动反馈
ease-mystic         cubic-bezier(0.4, 0, 0.2, 1)          神秘揭晓(慢入 + 余韵)
```

### §7.3 关键动效场景

| 场景 | 效果 | duration | curve |
|---|---|---|---|
| 原型名首次显示 | 逐字浮现 + 金粒子飘散 | 1200ms | ease-mystic |
| 蓝图报告"翻开" | 卡片从 0° 翻到 0° + 烫金边框生长 | 1500ms | ease-mystic |
| 雷达点亮 | 对应顶点 scale 1.4 + 颜色饱和度 +30% + 余晖 1s | 600ms + 1000ms tail | spring |
| Tab 切换 | 下划线 slide + 内容 fade-x 16px | 250ms | ease-out-soft |
| 塔罗翻牌 | rotateY 180° + scale 微 bounce | 800ms | ease-spring |
| 行星点击解读 | 行星 scale 1.2 + 弹出卡片 from-bottom | 250 + 400ms | ease-spring |
| Modal 出入 | 背景 fade + 内容 from-bottom 24px | 400ms | ease-out-soft |
| Toast | from-top + auto-dismiss 3s | 300ms | ease-out-soft |

### §7.4 触觉反馈 (Haptics) 关键时刻

iOS 与 Android 都触发 `impact-light` 或对应等级:

| 时刻 | Haptic |
|---|---|
| 主 CTA 按下 | impact-medium |
| 原型揭晓瞬间 | impact-heavy + 0.2s 后 success |
| 塔罗翻牌触发 | impact-light |
| 雷达点亮 | impact-light × 3 (节奏) |
| 错误/警告 | warning |
| 成功(订阅完成) | success |

实现:`expo-haptics`(若 Native)或 navigator.vibrate(若 Web)。

### §7.5 性能预算

- 首屏 LCP < 2.5s (Mobile 4G)
- 任何动效 60fps 无掉帧
- 同屏动效数 ≤ 3 个并行
- prefers-reduced-motion 用户:**所有 duration > 200ms 的动效降级为 fade-only**

---

## §8 双语策略 (Bilingual Strategy)

### §8.1 语言切换

- 全局语言由 `next-intl` locale 控制,用户偏好存于 `User.locale_preference`
- **默认中文**(zh-CN),用户进入后第一屏可一键切换 EN
- URL 路径前缀:`/zh/today`、`/en/today`
- 同一原型/术语保持中英对照绑定(数据层 `i18n_strings` 表)

### §8.2 中英排版差异

| 维度 | zh | en |
|---|---|---|
| 字距 | letter-spacing 0.02em(标题 0.08em) | 0em(标题 0.02em) |
| 行高 | +2px | 默认 |
| 段距 | 1.5× line-height | 1.3× |
| 对齐 | 两端对齐 + hanging punct | 左对齐 |
| 数字 | 全角阿拉伯(占星度数除外,用半角) | 半角 |
| 引号 | 「」 | "" |

### §8.3 关键术语对照(摘抄,完整版见 `i18n/glossary.json`)

```
天命原型      Soul Archetype
深潜者        Deep Diver
织梦人        Dream Weaver
搭桥者        Bridge Builder
燃灯者        Lantern Bearer
灵魂蓝图      Soul Blueprint
平行人生      Parallel Lives
年度角色卡    Year Character Card
潜能雷达      Potential Radar
关系化学      Relationship Chemistry
觉醒等级      Awakening Level
天赋区        Talent Zone
阴影区        Shadow Zone
进化路径      Evolution Path
本命盘        Natal Chart
合盘          Synastry
流年          Transit
推运          Progression
太阳返照盘    Solar Return Chart
```

### §8.4 文案语气 (Voice & Tone)

```
zh: 温暖、笃定、不卖弄、避免"亲爱的XX",拒绝鸡汤
    Sample: "你正在走入一段需要勇气的时光。它不会一直容易。"
    Anti-sample: "亲爱的水瓶宝宝~今天要美美哒~"

en: Confident, poetic but not flowery, sentence fragments okay
    Sample: "You're walking into a season that asks for courage. It won't always be easy."
    Anti-sample: "Hey gorgeous Aquarius! Slay today, queen!"
```

### §8.5 文案长度对照

- 中文翻译后**字符数通常为英文 0.55-0.7 倍**,但视觉宽度相似
- 设计稿应同时验证中英两版本均不溢出
- 按钮文案:中文 ≤ 4 字,英文 ≤ 14 字符
- 卡片标题:中文 ≤ 12 字,英文 ≤ 28 字符

---

## §9 插画 & 资源指引

### §9.1 插画方向

| 类别 | 风格定义 | 数量 | 输出物 |
|---|---|---|---|
| **36 原型 silhouette** | 单色烫金剪影,占星元素融入 | 36 张 | SVG, 512×512 |
| **塔罗 78 张** | 半写实手绘 + 几何分割,深空主题 | 78 张 | PNG, 1024×1600 |
| **星座肖像装饰** | 用于详情页背景,可重复使用 | 12 张 | WebP, 2048×1024 |
| **年度角色卡 主视觉** | RPG 风,角色立绘 + 装备图 | 12 张 (每月生日) | PNG, 1200×1800 |
| **空状态插画** | 极简线稿 + 一抹烫金 | 8 个场景 | SVG |

### §9.2 插画师 brief (待外包时填用)

```
- 风格关键词: 神秘主义、几何抽象、烫金、深空、手绘塔罗、Art Nouveau 余味
- 配色: 仅使用本系统 §1 中定义的 token 色,严禁自由发挥
- 输出: 矢量优先(36 原型/星座),栅格仅塔罗与角色卡
- 文件格式: SVG with `<title>` 双语标签,可直接被 React `<Icon>` 引用
- License: Buyout (永久全权)
- 单价区间: $80-150 / 张(参考 Fiverr Pro)
```

### §9.3 现成可用资产候选

不外包前可使用的占位/替代:
- **Tabler Icons** (MIT) - UI icon 补充
- **Phosphor Icons** - 备用
- **Lucide Icons** - 主要 UI icon set
- **Rider Waite Smith 塔罗** (PD 公版) - 塔罗插画临时占位
- **NASA APOD** (PD) - 深空背景临时
- **AI 生成** (Midjourney / DALL-E 3) - 原型 silhouette 临时占位,标注 "v0 待替换"

---

## §10 无障碍 (Accessibility Baseline)

### §10.1 对比度

- 正文 fg-primary on bg-deep: 14.8:1 ✅ AAA
- 正文 fg-secondary on bg-deep: 7.2:1 ✅ AAA
- fg-dim 仅用于次要信息,3.5:1 ⚠️ 非可读关键文字勿用
- 金色 CTA 文字 fg-on-gold on gold: 11.2:1 ✅ AAA

### §10.2 触摸目标

- 所有可点击元素 ≥ 44 × 44px(WCAG 2.5.5)
- 间距 ≥ 8px

### §10.3 键盘导航 (Desktop)

- 所有交互元素 Tab 可达
- focus-visible 状态:1.5px accent-gold 描边 + 4px offset glow

### §10.4 屏幕阅读器

- 装饰性图(星盘纹理、金箔)`aria-hidden`
- 功能性图标必须 `aria-label`(双语)
- 原型卡 `role="article"` + 完整 alt 描述
- 雷达图 `role="img" aria-label="潜能雷达图,创造力 60%,..."`

### §10.5 减弱动效

`@media (prefers-reduced-motion: reduce)`:
- 所有 duration > 200ms 改为 fade-only
- 闪烁循环停止
- 翻牌改为切换显示
- Lottie 动画暂停在第一帧

---

## §11 Token 导出 (Dev Handoff)

### §11.1 Tailwind config 片段

```js
// tailwind.config.ts (片段,供开发参考)
export default {
  theme: {
    extend: {
      colors: {
        bg: {
          deep: '#0B0B14',
          space: '#11111C',
          card: '#15151F',
          elevated: '#1C1C28',
        },
        fg: {
          primary: '#F4EDE0',
          secondary: '#C7C2B8',
          dim: '#8A8595',
          'on-gold': '#0B0B14',
        },
        accent: {
          gold: '#C9A876',
          'gold-deep': '#9C7E4E',
          purple: '#6B5B95',
          'purple-deep': '#4A3F6B',
          rose: '#B8838C',
          blue: '#5B7A95',
        },
        radar: {
          creativity: '#E0A82E',
          leadership: '#C26B5C',
          insight: '#6B5B95',
          social: '#B8838C',
          intuition: '#5B7A95',
          execution: '#5C7A6B',
        },
        border: {
          subtle: '#2A2A38',
          DEFAULT: '#3A3A4D',
        },
      },
      fontFamily: {
        sans: ['Inter Variable', 'PingFang SC', 'system-ui', 'sans-serif'],
        serif: ['Fraunces Variable', 'Source Han Serif', 'Georgia', 'serif'],
        mono: ['JetBrains Mono', 'Menlo', 'monospace'],
      },
      fontSize: {
        'display-xl': ['44px', { lineHeight: '52px', fontWeight: '700' }],
        'display-lg': ['36px', { lineHeight: '44px', fontWeight: '700' }],
        'display':    ['28px', { lineHeight: '36px', fontWeight: '700' }],
        'h1':         ['24px', { lineHeight: '32px', fontWeight: '600' }],
        'h2':         ['20px', { lineHeight: '28px', fontWeight: '600' }],
        'h3':         ['18px', { lineHeight: '26px', fontWeight: '600' }],
        'body-lg':    ['17px', { lineHeight: '26px', fontWeight: '400' }],
        'body':       ['15px', { lineHeight: '24px', fontWeight: '400' }],
        'body-sm':    ['14px', { lineHeight: '22px', fontWeight: '400' }],
        'caption':    ['13px', { lineHeight: '18px', fontWeight: '400' }],
        'micro':      ['11px', { lineHeight: '16px', fontWeight: '500' }],
      },
      borderRadius: {
        'sm': '8px',
        'md': '12px',
        'lg': '16px',
        'xl': '24px',
        '2xl': '32px',
      },
      boxShadow: {
        'glow-gold':   '0 0 32px rgba(201, 168, 118, 0.25)',
        'glow-purple': '0 0 32px rgba(107, 91, 149, 0.30)',
      },
    },
  },
}
```

### §11.2 CSS 变量(供非 Tailwind 项目/邮件模板使用)

```css
:root {
  --bg-deep: #0B0B14;
  --bg-card: #15151F;
  --fg-primary: #F4EDE0;
  --accent-gold: #C9A876;
  /* ... 完整版见 /styles/tokens.css */
}
```

### §11.3 设计 Token 同步规约

- Figma Variables 与 `tailwind.config.ts` 通过 `figma-tokens` 插件双向同步
- 任何 token 修改必须 PR 评审
- 严禁开发者在组件内硬编码颜色/字号

---

## §12 资源清单与文件结构 (供开发)

```
src/
├─ styles/
│  ├─ tokens.css            CSS 变量
│  ├─ globals.css           Reset + 字体加载
│  └─ animations.css        关键帧动画
├─ components/
│  ├─ ui/                   基础(Button, Input, Tab...)
│  ├─ brand/                品牌(ArchetypeCard, RadarChart6D...)
│  ├─ nav/                  导航(BottomTab, PageHeader...)
│  ├─ chat/                 对话(ChatBubble, ContextChip...)
│  ├─ viz/                  数据(NatalChart3D, AspectLine...)
│  └─ immersive/            沉浸(StarfieldBackground, TarotCard...)
public/
├─ assets/
│  ├─ glyphs/               zodiac/planets/houses 等 SVG
│  ├─ textures/             zodiac-grid.svg, gold-foil-grain.webp
│  ├─ decorations/          gold-foil-frame.svg
│  ├─ archetypes/           36 原型 silhouette SVG
│  ├─ tarot/                78 张塔罗 PNG
│  └─ illustrations/        空状态 / 错误页插画
└─ fonts/
   ├─ Fraunces[wght].woff2
   └─ SourceHanSerifCN-VF.otf.woff2
```

---

## §13 设计交付 Checklist (写完一份页面 spec 后自检)

每份 `0X-pagename.md` 写完后用以下 12 项自检:

- [ ] §1 页面目标 ≤ 3 行,有"用户预期"动词
- [ ] §2 URL + 进入/退出路径完整
- [ ] §3 ASCII Wireframe 用 36 字符宽度模拟 375px,每元素有组件名 + 状态变体
- [ ] §4 至少列出 Loading / Empty / Error 三态,加各用户层级(Free/Plus/Pro)差异
- [ ] §5 交互细节有具体手势 + 动效引用 §00.7
- [ ] §6 双语文案表 ≥ 15 条,中英并列
- [ ] §7 Desktop 响应式至少标注 3 处差异
- [ ] §8 接入 API 列出 endpoint + payload 字段,引用 PRD §6
- [ ] §9 Figma checklist 引用 §00 token + 组件
- [ ] 全文引用 PRD 章节 ≥ 5 次(格式 `[§5.0.4]`)
- [ ] 与已写过的页面 spec **无冲突**(配色/术语/组件用法)
- [ ] 一位"假设的设计师"读完能直接画出 Figma 主屏

---

## 变更记录

| 版本 | 日期 | 内容 |
|---|---|---|
| v0.2 | 2026-05-11 | 初始版本,对应 PRD v0.2 |

---

**下一步**: 参照本系统去写 `02-blueprint-result.md`(v0.2 产品门面)。
