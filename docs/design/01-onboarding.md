# 01 Onboarding 5 步流程 (Onboarding Flow)

> 用户首次访问的 5 步快速注册 + 数据采集 + 原型生成。**Step-5 Hook 卡是 v0.2 转化金叉**——直接决定首日激活率与分享率。
>
> 对应 PRD: `[§5.0.4 数据采集策略]` `[§5.1 Onboarding]` `[§4.1 首次访问转化]` `[Step-5 Hook 卡]`
>
> 依赖: `[§00-system.md]` 设计系统 + `[02-blueprint-result.md]` 转场目标
>
> 版本 v0.2 · 2026-05-11

---

## §1 页面目标 / 用户预期 / 关键数据

### §1.1 目标

让首访用户在 **≤3 分钟**完成:
1. 提供完整出生数据(年/月/日/时/地)
2. 选择关心议题(用于 AI 上下文)
3. 在 step-5 看到自己被命名为 [天命原型](Hook 卡)
4. 选择"看完整蓝图"(主路径)/"分享原型"(传播路径)/"跳过"(降级路径)

**核心 KPI:** step-5 进入 → "看完整灵魂蓝图" 转化率 ≥ 65%(对标 v0.1 同期 30% 的提升)

### §1.2 用户预期

| 用户类型 | 预期 |
|---|---|
| 普通新用户 | 知道占星基本概念,愿意填出生信息 → 期待"个性化解读" |
| 占星硬核用户 | 已知道自己太阳/月亮/上升 → 期待"看到不一样的视角" |
| 入门小白 | 听说"星座测试" → 期待"有趣 + 准 + 不太长" |
| 海外华人 | 双语切换 + 文化偏好 + 时区敏感 |

### §1.3 关键数据点

```
event:onboarding_start              进入 step-1
event:onboarding_step_complete      参数:step_index, duration_ms
event:onboarding_birth_uncertainty  生时不确定度选择
event:onboarding_step5_view         看到 Hook 卡
event:onboarding_step5_share        分享原型(不强制注册)
event:onboarding_step5_continue     看完整蓝图(转化 KPI)
event:onboarding_step5_skip         跳过(进入 /today 不完整)
event:onboarding_drop               中途离开(细分 step_index)
```

---

## §2 信息架构

### §2.1 路由

```
/onboarding                       入口(无 step,自动跳 step-1 或断点续传)
/onboarding/birth-date            step-1
/onboarding/birth-time            step-2
/onboarding/birth-place           step-3
/onboarding/identity              step-4 (昵称 + 议题 + 语言)
/onboarding/result                step-5 (Hook 卡 ⭐)
```

### §2.2 URL 参数 / state

```
?lang=zh|en                       初始语言
?invite=:userId                   来自分享链接(影响 step-5 文案)
?utm_source=                      渠道来源
?edit=true                        老用户修改数据(只到 step-3)
```

### §2.3 进入路径

```
1. 首访首页 → "开始测试" 按钮         →  /onboarding/birth-date
2. 分享公开页 → "生成我的灵魂蓝图"     →  /onboarding?invite=...
3. /me 设置 → "修改出生信息"          →  /onboarding/birth-date?edit=true
```

### §2.4 退出路径

```
正常: step-5 选择
  → "看完整灵魂蓝图"  →  /blueprint/result?from=onboarding
  → "分享原型"        →  分享 Sheet → 留在 step-5 + Toast
  → "跳过"           →  /today (摘要卡未完整,Today 顶部提示"完成测试以解锁完整版")

中途退出: 任意 step
  → window unload    →  自动保存断点(用户 session 缓存),下次访问 /onboarding 时从断点继续
  → 主动返回         →  弹 Sheet 询问 "保存进度并退出?" / "继续填写"
```

### §2.5 State Machine (Step 状态)

```
[start] → step-1 (date)
  ↓ valid
[step-1] → step-2 (time)
  ↓ valid OR 选"我不确定"
[step-2] → step-3 (place)
  ↓ valid
[step-3] → step-4 (identity)
  ↓ valid
[step-4] → [computing] → step-5 (hook card)
  ↓ exit
```

每 step 顶部有进度条 `1/5 → 2/5 → ... → 5/5`,允许返回上一步但不允许直接跳跃。

---

## §3 Mobile Wireframes (每步详细)

### §3.1 Step-0: 欢迎页(可选,首访)

```
┌────────────────────────────────────┐
│  [全屏星空背景]                    │
│  StarfieldBackground (200 stars)   │
│                                    │
│                                    │
│         ✦   ✦                     │
│        ✦   ✦                      │
│         ✦                          │
│                                    │
│       星 语 · StellarLog          │  Brand Logo
│                                    │  Fraunces 28px
│                                    │
│   看见你尚未激活的自己             │  text-h2 fg-primary
│                                    │
│   3 分钟,生成你的灵魂蓝图           │  text-body fg-secondary
│                                    │
│                                    │
│   ┌────────────────────────────┐  │
│   │   开始测试 (免费)            │  │  Button.primary-gold
│   └────────────────────────────┘  │  撑满 (调整 padding 32)
│                                    │
│   已有账号? [登录]                  │  text-body-sm
│   语言:  中  /  EN                  │  text-caption
│                                    │
└────────────────────────────────────┘

视觉重点: 极简 + 烫金 + 星空,直接奠定调性
```

### §3.2 Step-1: 出生日期

```
┌────────────────────────────────────┐
│  ← 返回               1/5 ⚪⚫⚫⚫⚫ │  PageHeader + ProgressBar
├────────────────────────────────────┤
│                                    │
│                                    │
│   你的灵魂从何时开始?               │  text-display-lg
│                                    │  Fraunces 36px
│                                    │
│   出生日期会决定你的核心能量        │  text-body fg-secondary
│                                    │
│                                    │
│   ┌──────────────────────────┐    │
│   │     1995  |  06  |  21    │    │  DatePickerWheel
│   │                          │    │  3 列滚轮
│   │  ↑    ↑    ↑              │    │  bg-card
│   │  年   月   日              │    │  hh 240px
│   └──────────────────────────┘    │
│                                    │
│                                    │
│   今天是 2026-05-11                │  text-caption fg-dim
│                                    │
│   [继续 →]                          │  Button.primary 撑满
│                                    │
└────────────────────────────────────┘

实现细节:
  - 滚轮组件用 react-native-wheel-picker-android 或自己实现 (CSS scroll-snap)
  - 中间高亮一行: bg-accent-gold/15 + border-y accent-gold
  - 滚动时触觉反馈 light 每 200ms
  - 年份范围: 1920 - 当前年-1
  - 闰年/月末日动态校验
```

### §3.3 Step-2: 出生时间

```
┌────────────────────────────────────┐
│  ← 返回               2/5 ⚫⚪⚫⚫⚫ │
├────────────────────────────────────┤
│                                    │
│                                    │
│   几点几分的你?                      │  text-display-lg
│                                    │
│   时间精度决定原型的细节            │  text-body fg-secondary
│                                    │
│                                    │
│   ┌──────────────────────────┐    │
│   │       14    :    32       │    │  TimePickerWheel
│   │                          │    │  2 列(时/分)
│   │   ↑    ↑                  │    │
│   │   时   分                  │    │
│   └──────────────────────────┘    │
│                                    │
│   ─────────────────────────         │
│                                    │
│   生时确定度:                       │  text-body
│   ┌──────────────────────────┐    │
│   │  ●─────○─────○            │    │  CertaintySlider
│   │  精确  大致  不知道        │    │  3 档
│   └──────────────────────────┘    │
│                                    │
│   ⓘ 选"大致"或"不知道"也能生成原型 │  text-caption fg-dim
│      只是细节会少一些               │
│                                    │
│   [继续 →]                          │
│                                    │
└────────────────────────────────────┘

CertaintySlider 行为:
  - "精确": TimePicker 启用,后续生成完整原型
  - "大致": TimePicker 改为段位 (早上/上午/下午/傍晚/夜里/凌晨),禁用分钟,后续降级原型
  - "不知道": TimePicker 隐藏,显示 "我们用太阳 × 月亮估算",后续极简原型
```

### §3.4 Step-3: 出生地点

```
┌────────────────────────────────────┐
│  ← 返回               3/5 ⚫⚫⚪⚫⚫ │
├────────────────────────────────────┤
│                                    │
│   你在哪里第一次睁眼?                │  text-display-lg
│                                    │
│   ┌──────────────────────────┐    │
│   │  🔍 搜索城市…              │    │  PlaceAutocomplete
│   │                          │    │  Input h 56px
│   └──────────────────────────┘    │
│                                    │
│   ──── 建议 ────                    │  text-caption fg-dim
│   📍 上海, 中国 (从 IP 检测)        │  AutocompleteOption
│   📍 北京, 中国                      │  常用城市建议
│   📍 香港, 中国                      │
│   📍 New York, USA                  │
│                                    │
│   ┌──────────────────────────┐    │
│   │                          │    │  MapPreview (折叠态)
│   │   [选中后展开为静态地图]    │    │  bg-card placeholder
│   │                          │    │  240px height
│   └──────────────────────────┘    │
│                                    │
│   时区: GMT+8 (自动检测)            │  text-caption
│                                    │
│   [继续 →]                          │
│                                    │
└────────────────────────────────────┘

实现:
  - Mapbox Search Box API (主) / Google Places (备)
  - 选中后调用 timezonedb 解析历史时区(注意夏令时!)
  - 国家/省份/城市三级 fallback
  - 中文用户优先返回中文地名 + 英文 fallback
```

### §3.5 Step-4: 身份 + 议题

```
┌────────────────────────────────────┐
│  ← 返回               4/5 ⚫⚫⚫⚪⚫ │
├────────────────────────────────────┤
│                                    │
│   最后一步                          │  text-display-lg
│                                    │
│   ─────────────                     │
│                                    │
│   怎么称呼你?                       │  text-h3
│   ┌──────────────────────────┐    │
│   │  Sophia                   │    │  Input
│   └──────────────────────────┘    │
│   ⓘ 可以是昵称,不会公开           │  text-caption fg-dim
│                                    │
│   ─────────────                     │
│                                    │
│   你最近在思考什么? (可多选)        │  text-h3
│                                    │
│   ┌──────┐ ┌──────┐ ┌──────┐       │  Chip × 6 (multi-select)
│   │ 感情 │ │ 事业 │ │ 财富 │       │
│   └──────┘ └──────┘ └──────┘       │
│   ┌──────┐ ┌──────┐ ┌──────┐       │
│   │ 灵性 │ │ 家庭 │ │ 健康 │       │
│   └──────┘ └──────┘ └──────┘       │
│                                    │
│   ─────────────                     │
│                                    │
│   性别认同(可选)                    │  text-h3
│   ◯ 女  ◯ 男  ◯ 非二元  ◯ 不愿透露 │  RadioGroup
│                                    │
│   ⓘ 仅用于合盘文案,不影响原型       │  text-caption fg-dim
│                                    │
│   [生成我的灵魂原型 →]              │  Button.primary-gold
│                                    │
└────────────────────────────────────┘
```

### §3.6 Computing 中间态(0.5 - 3s)

```
┌────────────────────────────────────┐
│                                    │
│                                    │
│       [星盘旋转 Lottie 200×200]    │
│                                    │
│   正在解读你的星盘…                  │  text-h1
│                                    │
│   ▓▓▓▓▓▓▓▓▓▓ 推算行星位置 ✓        │
│   ▓▓▓▓▓▓▓▓▓░ 分析能量轴…           │  text-body-sm
│   ▓▓░░░░░░░░ 匹配 36 原型库          │  ProgressList
│   ░░░░░░░░░░ 解读天赋路径            │
│                                    │
│                                    │
└────────────────────────────────────┘

每步 prog list 用 token 化色:
  ✓ 完成: accent-gold
  当前: shimmer 动画
  待办: fg-dim 透明 0.4

延迟超过 3s: 文案变成 "你的原型很有意思,我们多想了一下…"
延迟超过 8s: 转入降级,只显示原型名 + 简短定义,后台异步补全
```

### §3.7 Step-5: 天命原型 Hook 卡 ⭐ v0.2 核心转化点

```
┌────────────────────────────────────┐
│  [全屏 gradient-deep-space 背景]   │
│   StarfieldBackground 80 stars      │
│                                    │
│   StatusBar 时间显示                │  系统层
│                                    │
│                                    │
│  ┌──────────────────────────┐      │
│  │ ╲ 1px 烫金边框(整圈)     │      │
│  │   gradient-archetype 背景  │      │  ArchetypeCard.M 变体
│  │   星盘纹理 6%             │      │  320 × 488px 居中
│  │   手绘原型剪影 30%         │      │
│  │   金粒子 Lottie 循环       │      │
│  │                          │      │
│  │  ✦ ✦ ✦                  │      │  小金星点装饰
│  │                          │      │
│  │   你 是                    │      │  text-body-sm fg-secondary
│  │   ──                      │      │  小标
│  │                          │      │
│  │  深   潜   者              │      │  思源宋体 Heavy 44px
│  │  ──────                   │      │  字距 0.12em
│  │  Deep Diver               │      │  Fraunces Italic 18px
│  │  ✦ No.07 ✦               │      │
│  │                          │      │
│  │  ──────────────           │      │  Divider
│  │                          │      │
│  │  你拥有看穿表象的本能直觉, │      │  text-body
│  │  在情绪深水里仍能呼吸。   │      │  Fraunces (Latin)
│  │                          │      │  思源宋体 Regular (中文)
│  │  今年的你正在修炼:          │      │
│  │  "从独自承担,             │      │
│  │   走向被看见的脆弱。"     │      │
│  │                          │      │
│  └──────────────────────────┘      │
│                                    │
│  ┌──────────────────────────┐      │
│  │  📖 看完整灵魂蓝图          │      │  Button.primary-gold 撑满
│  └──────────────────────────┘      │
│  ┌──────────────────────────┐      │
│  │  📤 分享我的原型            │      │  Button.secondary 撑满
│  └──────────────────────────┘      │
│                                    │
│  [跳过,先看看再说]                  │  Button.ghost text-caption
│                                    │
└────────────────────────────────────┘

⭐ 这是 v0.2 全产品最关键的一帧。每个细节都要打磨到位。
```

### §3.8 Step-5 主原型卡 - 关键动效逐帧

| 时刻 | 动作 | duration | curve | 触觉 |
|---|---|---|---|---|
| 0ms | 整页从黑屏 fade in | 400ms | ease-out-soft | - |
| 200ms | 卡片容器从 scale 0.92 + opacity 0 → scale 1 + opacity 100 | 800ms | ease-mystic | - |
| 500ms | 烫金边框从右下角生长一圈 | 1200ms | ease-mystic | - |
| 800ms | 星盘纹理 fade 0% → 6% | 600ms | linear | - |
| 900ms | 原型剪影 fade 0% → 30% | 800ms | ease-out-soft | - |
| 1100ms | 小标 "你是" fade in | 400ms | ease-out-soft | - |
| 1300ms | 中文"深"字浮现 | 200ms | ease-mystic | light |
| 1450ms | 中文"潜"字浮现 | 200ms | ease-mystic | light |
| 1600ms | 中文"者"字浮现 | 200ms | ease-mystic | light + medium |
| 1900ms | 烫金分隔线从中心向两侧拉伸 | 400ms | ease-out-soft | - |
| 2100ms | 英文 "Deep Diver" fade in | 600ms | ease-out-soft | - |
| 2500ms | Badge "No.07" pop in (scale 0.7→1) | 400ms | spring | - |
| 2800ms | 定义引文段落分行 fade-up 12px | 800ms (3 行 stagger 200) | ease-out-soft | - |
| 3600ms | "今年的你正在修炼" 进化文字浮现 | 600ms | ease-out-soft | - |
| 4200ms | 底部三按钮 fade-up 24px (stagger 100) | 600ms | ease-spring | - |
| 4400ms | 金粒子 Lottie 启动循环 | - | (loop) | - |
| 4500ms | impact-heavy + success haptic 高潮反馈 | - | - | **heavy + success** |
| 5000ms+ | 用户可交互 | - | - | - |

**核心情绪节奏:** 0-2s "蓄势"(背景与卡片浮现)→ 2-3s "揭晓"(原型名字现身)→ 3-4s "释义"(读懂自己)→ 4-5s "号召"(CTA 显现 + 高潮触觉)

### §3.9 Step-5 三种降级状态(基于 step-2 生时确定度)

#### §3.9.1 "精确" → 完整原型 (默认,如 §3.7)

完整原型名(2-3字) + 完整定义 + 完整进化路径片段

#### §3.9.2 "大致" → 简化原型

```
┌──────────────────────────┐
│  你可能是                  │  文案变为试探口吻
│                          │
│  深   潜   者              │
│  Deep Diver               │
│                          │
│  ⓘ 简化原型 · 生时大致     │  ChipBadge accent-purple
│                          │
│  你拥有看穿表象的本能直觉, │
│  ...简化定义,去掉关于上升/凯龙的内容 │
│                          │
│  ────────                 │
│                          │
│  💡 想看完整版?           │
│  问问父母,告诉我们准确    │
│  时间(±15 分钟内)        │
│  [更新生时 →]              │
│                          │
└──────────────────────────┘
```

#### §3.9.3 "不知道" → 极简原型

```
┌──────────────────────────┐
│  你的核心能量是              │
│                          │
│  深   水   感   知 者      │  4字组合名,体现"组合"非"原型"
│  Deep  Water  Sensor      │
│                          │
│  ⓘ 极简版 · 仅太阳×月亮   │  ChipBadge fg-dim
│                          │
│  你天生敏锐,情绪是你的    │
│  语言。                    │
│  (简短 2 句)               │
│                          │
│  ─────────                 │
│                          │
│  💡 想看完整原型?         │
│  我们需要你的精确出生时间 │
│  [告诉我出生时间 →]        │
│                          │
└──────────────────────────┘
```

---

## §4 状态变体

### §4.1 中途退出

```
任意 step Header 返回 → 弹底部 Sheet:
┌────────────────────────────────────┐
│                                    │
│  ⚠ 进度还没保存                    │
│                                    │
│  已完成 2/5 步,要现在退出吗?       │
│                                    │
│  ┌────────────────────────────┐    │
│  │  保存并退出                  │    │
│  └────────────────────────────┘    │
│  ┌────────────────────────────┐    │
│  │  继续填写                    │    │
│  └────────────────────────────┘    │
│                                    │
└────────────────────────────────────┘

退出时数据保存到 localStorage / IndexedDB
下次访问 / onboarding → 检查断点 → 直接跳到对应 step
```

### §4.2 数据错误

```
Step 1: 选择未来日期 → Toast "出生日期不能在未来"
Step 1: 选择 < 1920 → Toast "年份太早了,我们只支持 1920 年起"
Step 2: 时间 = 24:60 → 滚轮校验,不允许选中
Step 3: 城市搜索无结果 → 显示 "找不到这个地方,试试更大的城市?"
Step 4: 昵称为空 → Toast "给自己起个名字吧"
```

### §4.3 网络异常

```
Step 4 → Step 5 计算时网络断:
┌────────────────────────────────────┐
│  ⚠ 服务暂时不可用                  │
│                                    │
│  你的数据已保存在本地              │
│  网络恢复后会自动继续                │
│                                    │
│  [重试]                            │
│                                    │
└────────────────────────────────────┘
```

### §4.4 已存在账号(分享回流)

```
Email 验证发现已注册:
┌────────────────────────────────────┐
│                                    │
│   👋 欢迎回来,Sophia                │
│                                    │
│   你之前测过的原型是「深潜者」      │
│                                    │
│   [继续探索]   [重新测试]          │
│                                    │
└────────────────────────────────────┘

继续 → /blueprint/result
重新测试 → 警告"会覆盖原型",确认后才进入 onboarding
```

---

## §5 交互细节

### §5.1 手势

| 手势 | 触发位置 | 行为 |
|---|---|---|
| Swipe right | 任意 step (除 step-1 与 step-5) | 返回上一步 |
| Swipe left | 任意 step | (无,防止跳过校验) |
| Tap | DatePickerWheel 数字 | 直接定位到该值 |
| Long-press (300ms) | Hook 卡原型名 | 触发"复制原型名"小菜单 |
| Pull down | Step-5 | (无,防止误触退出) |

### §5.2 微动效

| 触发 | 效果 | duration / curve |
|---|---|---|
| Step 切换 | 当前内容 slide-left + fade out (240ms) / 下一内容 slide-right + fade in | 240ms · ease-out-soft |
| Progress bar 跳到下一 step | 烫金填充进 1/5 段,200ms 内完成 | 200ms · ease-out-soft |
| Wheel picker 滚动 | 选中数字 scale 1.0 → 1.1 + bg 渐入 | 150ms · spring |
| Chip 多选 | bg fill 渐变 + glow 微闪 | 250ms · ease-out-soft |
| Step-5 主原型卡 | 见 §3.8 详细 frame-by-frame | 总 4.5s |

### §5.3 触觉反馈

| 时刻 | Haptic |
|---|---|
| Wheel scroll 每经过一个数字 | light (节流到 200ms 间隔) |
| Chip 选中/取消 | light |
| Step 切换按钮 | medium |
| Step-5 原型揭晓高潮(t=4.5s) | **heavy + success** |
| 错误 (Toast) | warning |
| 网络重试成功 | success |

### §5.4 输入验证规则

| 字段 | 规则 | 错误文案 |
|---|---|---|
| 生日 | 1920-01-01 ≤ x ≤ 今天-1 | "出生日期不能在未来" / "年份太早了" |
| 生时(精确) | 00:00 ≤ x ≤ 23:59 | (滚轮强制) |
| 生时(大致) | 必须选 1 段 | (默认选"上午") |
| 出生地 | 必须从 Autocomplete 选择 | "请从建议中选择具体城市" |
| 昵称 | 1-20 字符,无特殊字符 | "昵称不能为空" / "字符限制" |
| 议题 | 0-3 个 | (无错,空也允许) |

### §5.5 分享(step-5 内)无注册流程

```
点击 "📤 分享我的原型" →
1. 生成临时 share token (写入 cookie + 后端 KV)
2. 调用 satori 生成卡片 (Hook 卡缩略版)
3. POST /api/share/quick → 返回 /share/:tempCardId
4. 弹分享 Sheet:
   - 复制链接
   - 系统分享(navigator.share)
   - 直接保存图片到相册
5. Toast "已复制到剪贴板"
6. step-5 卡片底部出现新 chip "已分享 ✓"
7. 仍在 step-5,可继续点"看完整蓝图"
```

### §5.6 Auto-save 断点

```
每步完成后写入 localStorage:
{
  "onboarding_draft": {
    "step": 3,
    "data": {
      "birth_date": "1995-06-21",
      "birth_time": "14:32",
      "birth_time_certainty": "exact",
      "birth_place": { ... }
    },
    "updated_at": "2026-05-11T14:32:00Z"
  }
}

下次访问 /onboarding 检查:
- 有 draft 且 < 7 天 → 直接跳对应 step
- 有 draft 且 > 7 天 → 提示 "之前没测完,继续吗?" / "重新开始"
- 无 draft → 从 step-1 开始
```

---

## §6 双语文案表

| Step | 元素 | zh | en | 备注 |
|---|---|---|---|---|
| 0 | brand tagline | 看见你尚未激活的自己 | See the self you haven't activated yet | text-h2 |
| 0 | subtitle | 3 分钟,生成你的灵魂蓝图 | 3 minutes to your Soul Blueprint | text-body |
| 0 | CTA | 开始测试 (免费) | Start Test (Free) | Button.primary-gold |
| 0 | login link | 已有账号? 登录 | Have an account? Sign in | |
| 1 | title | 你的灵魂从何时开始? | When did your soul begin? | text-display-lg |
| 1 | subtitle | 出生日期会决定你的核心能量 | Birth date shapes your core energies | text-body |
| 1 | year label | 年 | Year | wheel label |
| 1 | month label | 月 | Month | |
| 1 | day label | 日 | Day | |
| 2 | title | 几点几分的你? | What hour, what minute? | text-display-lg |
| 2 | subtitle | 时间精度决定原型的细节 | Precision shapes the archetype's detail | |
| 2 | certainty label | 生时确定度 | Time certainty | text-body |
| 2 | certainty-exact | 精确 | Exact | |
| 2 | certainty-rough | 大致 | Rough | |
| 2 | certainty-unknown | 不知道 | Don't know | |
| 2 | hint | 选"大致"或"不知道"也能生成原型,只是细节会少一些 | "Rough" or "Don't know" still generates an archetype, just less detail | text-caption |
| 3 | title | 你在哪里第一次睁眼? | Where did you first open your eyes? | text-display-lg |
| 3 | placeholder | 搜索城市… | Search city… | input placeholder |
| 3 | suggestions label | 建议 | Suggestions | text-caption |
| 3 | timezone label | 时区 | Time zone | |
| 4 | title | 最后一步 | One last step | text-display-lg |
| 4 | nickname q | 怎么称呼你? | What can we call you? | text-h3 |
| 4 | nickname hint | 可以是昵称,不会公开 | Nickname is fine, not public | text-caption |
| 4 | topic q | 你最近在思考什么? (可多选) | What's on your mind? (multi-select) | |
| 4 | topic-love | 感情 | Love | Chip |
| 4 | topic-career | 事业 | Career | |
| 4 | topic-money | 财富 | Money | |
| 4 | topic-spirit | 灵性 | Spirit | |
| 4 | topic-family | 家庭 | Family | |
| 4 | topic-health | 健康 | Health | |
| 4 | gender q | 性别认同(可选) | Gender (optional) | text-h3 |
| 4 | gender-f | 女 | Female | Radio |
| 4 | gender-m | 男 | Male | |
| 4 | gender-nb | 非二元 | Non-binary | |
| 4 | gender-na | 不愿透露 | Prefer not to say | |
| 4 | gender hint | 仅用于合盘文案,不影响原型 | Used only for synastry copy, doesn't affect archetype | text-caption |
| 4 | CTA | 生成我的灵魂原型 → | Generate my Soul Archetype → | Button.primary-gold |
| C | loading title | 正在解读你的星盘… | Reading your chart… | text-h1 |
| C | step-1 of computing | 推算行星位置 | Computing planet positions | |
| C | step-2 | 分析能量轴 | Analyzing energy axes | |
| C | step-3 | 匹配 36 原型库 | Matching against 36 archetypes | |
| C | step-4 | 解读天赋路径 | Interpreting your talents | |
| 5 | small label | 你是 | You are | text-body-sm |
| 5 | archetype-name (example) | 深潜者 | Deep Diver | text-display-xl |
| 5 | archetype-id | No.07 | No.07 | Badge |
| 5 | definition (example line 1) | 你拥有看穿表象的本能直觉, | You see beneath surfaces by instinct, | text-body Fraunces |
| 5 | definition (example line 2) | 在情绪深水里仍能呼吸。 | breathing in the deepest emotional waters. | |
| 5 | evolution prefix | 今年的你正在修炼: | This year, you're practicing: | text-body fg-secondary |
| 5 | evolution (example) | "从独自承担,走向被看见的脆弱。" | "From carrying alone, to being seen in vulnerability." | Fraunces Italic |
| 5 | CTA 1 | 看完整灵魂蓝图 | View full Soul Blueprint | Button.primary-gold |
| 5 | CTA 2 | 分享我的原型 | Share my Archetype | Button.secondary |
| 5 | skip | 跳过,先看看再说 | Skip for now | Button.ghost |
| 5 | degraded-rough chip | 简化原型 · 生时大致 | Simplified · Rough time | ChipBadge |
| 5 | degraded-unknown chip | 极简版 · 仅太阳×月亮 | Minimal · Sun × Moon only | ChipBadge |
| - | exit-sheet title | 进度还没保存 | Progress not saved | |
| - | exit-sheet body | 已完成 N/5 步,要现在退出吗? | You're N/5 done. Exit now? | |
| - | exit-save | 保存并退出 | Save and exit | |
| - | exit-continue | 继续填写 | Keep filling | |

**双语条目数:60+(单页)** ✅

---

## §7 Desktop 响应式适配

```
breakpoint: ≥1024px

布局变化:
  - 居中容器 width 480px (不撑满)
  - 左右两侧大量留白,带星空背景 + 远景金色装饰柱
  - Wheel Picker 高度可加 (320px)
  - Step-5 Hook 卡放大到 480 × 640px

字号上调:
  - text-display-xl 56px
  - text-display-lg 44px
  - Hook 卡原型名 56px

互动差异:
  - 鼠标 hover 状态生效
  - Tab key 可跨字段导航
  - 上下方向键操作 Wheel
  - Enter 键提交当前 step
```

---

## §8 接入 API / 数据契约

### §8.1 Step 提交

```
POST /api/onboarding/step
Headers: x-anonymous-session: <session_id>  (尚未注册时用)

Step-1 (date):
  payload: { step: 1, birth_date: "1995-06-21" }

Step-2 (time):
  payload: {
    step: 2,
    birth_time: "14:32" | null,
    birth_time_certainty: "exact" | "rough" | "unknown",
    birth_time_rough_period: "morning" | "afternoon" | ... | null
  }

Step-3 (place):
  payload: {
    step: 3,
    birth_place: {
      name_zh: "上海, 中国",
      name_en: "Shanghai, China",
      lat: 31.2304,
      lng: 121.4737,
      timezone: "Asia/Shanghai",
      country_code: "CN"
    }
  }

Step-4 (identity):
  payload: {
    step: 4,
    nickname: "Sophia",
    focus_topics: ["love", "career"],
    gender: "female" | null,
    locale: "zh-CN"
  }

Step-5 trigger:
  POST /api/onboarding/generate
  → 返回完整 SoulBlueprint (同 §02 §8.1 response 结构)
  → 耗时预算: <3s
```

### §8.2 异步生成(降级)

```
若 LLM 慢 > 8s:
  → 立即返回基础原型(规则计算 + 模板文字)
  → 后台异步用 LLM 补全完整定义/天赋/进化路径
  → Step-5 显示基础版,用户进入 /blueprint/result 时再 fetch 完整版
```

### §8.3 引用的 PRD 数据模型

```
[§6.1 User]           创建 User 记录 (匿名 → 注册后绑定)
[§6.1 SoulBlueprint]  Step-5 触发生成,永久缓存
[§6.1 PotentialRadar] Step-5 同步初始化 ceiling 上限,activated/transit_boost 置零
[§6.2 缓存]           上述两表均永久缓存
```

### §8.4 注册时机

```
v0.2 设计: 不强制注册即可走完 onboarding + 看 Hook 卡 + 分享
  - 匿名用户用 session_id 暂存
  - 看完整蓝图 / 任何 Plus 功能 / 持久保存数据 → 此时弹注册
  - 注册方式: Email + magic link / Google / Apple / 微信

匿名 → 注册绑定:
  POST /api/auth/bind-anonymous
  payload: { session_id, email/oauth_token }
  → 把匿名 onboarding 数据 + SoulBlueprint 迁移到 User 账户
```

---

## §9 设计师 Figma 落地 Checklist

### §9.1 关键素材

```
插画:
  /assets/illustrations/stars-welcome.svg     Step-0 装饰
  /assets/archetypes/*.svg                    36 原型剪影(Step-5 用)
  /assets/decorations/gold-foil-frame.svg     Hook 卡装饰

Lottie:
  /assets/lottie/gold-particles.json          Hook 卡金粒子
  /assets/lottie/chart-spinning.json          Computing 加载

字体: 同 §00 §2

Map tiles: Mapbox dark style + 神秘紫滤镜
```

### §9.2 使用的 token / 组件

```
颜色: bg-deep, bg-card, accent-gold, accent-purple, fg-primary..
字号: text-display-xl/lg, text-h1/h2/h3, text-body, text-caption
组件: Button.primary-gold/secondary/ghost
       Input, Chip (multi), RadioGroup, WheelPicker, CertaintySlider
       PlaceAutocomplete (Mapbox 集成),MapPreview
       PageHeader, ProgressBar
       ArchetypeCard.M (Step-5 主卡)
       StarfieldBackground
```

### §9.3 Figma 文件组织

```
🎨 01-Onboarding-Flow
├─ 📄 Cover
├─ 📄 Mobile · Step 0 (Welcome)
├─ 📄 Mobile · Step 1 (Birth Date)
├─ 📄 Mobile · Step 2 (Birth Time + Certainty)
├─ 📄 Mobile · Step 3 (Birth Place + Map)
├─ 📄 Mobile · Step 4 (Nickname + Topics + Gender)
├─ 📄 Mobile · Computing State
├─ 📄 Mobile · Step 5 (Hook Card - Full Archetype) ⭐
├─ 📄 Mobile · Step 5 - Degraded Rough
├─ 📄 Mobile · Step 5 - Degraded Unknown
├─ 📄 Mobile · Step 5 Animation Frame-by-Frame (ts 0/0.5/1/2/3/4.5s)
├─ 📄 Mobile · Exit Sheet
├─ 📄 Mobile · Errors (Network / Validation / Already Exists)
├─ 📄 Mobile · Share Sheet (in step-5)
├─ 📄 Desktop · Full Flow (1440 baseline)
├─ 📄 Prototype Flow (interactive)
└─ 📄 Animation Specs (Lottie + Framer)
```

### §9.4 检验

- [ ] 5 个 Step + Computing + Step-5 三个降级状态 + 异常态全部 Figma 化
- [ ] Step-5 关键动效 frame-by-frame 标注完整(参 §3.8)
- [ ] 双语文案 60+ 条以 Component Variant 方式落地(zh/en swap)
- [ ] 烫金边框样式与 §00 §4.2 一致
- [ ] Hook 卡分享版本(图片导出)已设计
- [ ] WheelPicker / CertaintySlider / PlaceAutocomplete 三个特殊组件单独详细规格
- [ ] 与 02-blueprint-result.md 转场对接(shared-element)已说明

---

## §10 写完自检

- [x] 页面目标 ≤ 3 行,核心 KPI 指明
- [x] URL + 进入/退出路径完整 + State Machine
- [x] 每 step Wireframe + Computing + Step-5 + 3 降级 + 错误态
- [x] 状态变体齐全(中途退出、错误、已存在账号)
- [x] 交互细节: 手势 5 项 + 动效 5 项 + Step-5 动效 17 帧 + Haptics 6 项
- [x] 双语文案表 60 条
- [x] Desktop 响应式 3 处差异
- [x] API 4 个 endpoints + payload + 异步降级
- [x] Figma checklist + 素材 + 组件 + 文件组织
- [x] 引用 PRD 章节: §5.0.4 / §5.1 / §4.1 / §6.1 / §6.2 (5 次)
- [x] 与 §00 / §02 一致

---

## 变更记录

| 版本 | 日期 | 内容 |
|---|---|---|
| v0.2 | 2026-05-11 | 初始版本,5 步 + Step-5 Hook 卡为转化金叉 |

---

**下一步**: `03-today.md` + `04-ai-chat.md` (日活路径双页)
