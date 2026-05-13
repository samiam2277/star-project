# 05 本命盘 3D (Natal Chart 3D)

> 技术风险最高的页面。3D 互动星盘是 v0.1 的核心能力,在 v0.2 升级了"行星点击 → 潜能开关"视角(详 PRD §5.2.1)。
>
> 对应 PRD: `[§5.2 本命盘]` `[§5.2.1 3D 互动星盘]` `[§5.2.3 解读引擎 Layer 4 原型解读]` `[§5.11 潜能雷达联动]` `[§7 技术架构]`
>
> 依赖: `[§00-system.md]` 设计系统 `[04-ai-chat.md]` AI 联动入口 `[02-blueprint-result.md]` 蓝图门面
>
> 版本 v0.2 · 2026-05-11

---

## §1 页面目标 / 用户预期 / 关键数据

### §1.1 目标

让用户能:
1. **直观感受**自己的本命盘 3D 形态(占星硬核用户的"老婆本")
2. **点行星 = 解读**:不仅看到行星位置,更看到"这是你某个潜能的开关"(v0.2 升级)
3. **时间机器**: 拖动滑块看 transit 与本命盘的叠加,理解流年
4. **降级到 2D**: 性能差或偏好简洁的用户可切换 2D 模式

**核心 KPI:** 行星点击率(进入页面用户中 ≥ 70% 点击 ≥1 个行星)/ 滚动 + 拖动手势完成率(无误触退出) ≥ 85% / 60fps 比例(中端设备)≥ 90%

### §1.2 用户预期

| 用户类型 | 预期 |
|---|---|
| 占星硬核 | 看到行星精确度数、相位线、宫位边界、orb 范围 |
| 普通用户 | 看到"我的星盘很美" + 能点击知道每颗行星意味什么 |
| 移动用户 | 期待手势流畅 + 不耗电 + 加载快 |
| 低端设备 | 自动降级 2D,不影响信息密度 |

### §1.3 关键数据点

```
event:chart_open
event:chart_render_complete         time-to-first-render ms
event:chart_render_mode             "3d" | "2d_fallback"
event:chart_planet_click            参数: planet, house
event:chart_planet_interpret_view   行星解读卡进入视口
event:chart_potential_switch_view   "潜能开关"视角触发 ⭐ v0.2
event:chart_house_click             参数: house_number
event:chart_aspect_click            参数: from, to, aspect_type
event:chart_time_machine_drag       开始拖时间滑块
event:chart_time_machine_settle     拖完静止在某日期
event:chart_2d_toggle               切换到 2D 模式
event:chart_share                   分享星盘截图
event:chart_fps_drop                参数:fps (debugging)
```

---

## §2 信息架构

### §2.1 路由

```
/chart                       默认本命盘(now)
/chart?focus=:planet         自动 zoom 该行星(从 AI Chat / Today Transit 跳来)
/chart?time=:iso_date        时间机器初始日期(默认 = today)
/chart?mode=2d               强制 2D 模式
/chart?compare=:sessionId    叠加合盘(Phase 2)
```

### §2.2 进入路径

```
1. BottomTab Chart Tab → /chart
2. AI Chat 行星名 GlyphChip → /chart?focus=moon
3. Today TransitCard "看星盘 →" → /chart?focus=moon&time=...
4. Blueprint Result "看完整 3D 本命盘" → /chart
5. Me 设置 "我的星盘" → /chart
```

### §2.3 退出路径

```
BottomTab 其他 → 各自
Planet 解读卡 "跟 AI 聊聊这个" → /ai-chat?topic=planet_moon
Planet 解读卡 "看这维度雷达" → /radar?dim=intuition (v0.2 关键 CTA)
Time Machine "回到本命" → 重置 time = birth time
返回 ← → history.back()
```

---

## §3 Mobile Wireframe

### §3.1 整页结构(默认 3D 模式)

```
┌────────────────────────────────────┐
│  ← 我的本命盘            ⓘ  ⋯       │  Section 0: PageHeader
├────────────────────────────────────┤
│                                    │
│                                    │
│        [3D Canvas viewport]        │  Section 1: NatalChart3D
│                                    │  全屏宽 × 64vh
│           ╱──────╲                  │
│          ╱  ☉ ♂   ╲                │  Three.js 渲染
│         │ ☽    ●   │                │
│         │  ☿  ●  ♀ │                │
│          ╲ ♆  ●   ╱                 │
│           ╲─────╱                   │
│                                    │
│        gradient-deep-space + Stars │
│                                    │
├────────────────────────────────────┤
│  ┌──────────────────────────┐      │
│  │ 2026-05-11 14:32 GMT+8    │      │  Section 2: TimeMachineSlider
│  │ ─────●─────────────       │      │  bg-card padding 16
│  │  现在 →                     │      │
│  │                          │      │
│  │  [本命] [今天]  [自由滑动] │      │  Time mode tabs
│  └──────────────────────────┘      │
├────────────────────────────────────┤
│  ┌────┐ ┌────┐ ┌────┐ ┌────┐       │  Section 3: ViewModeBar
│  │ 3D │ │ 2D │ │ 列表│ │ 简版│       │  4 视图模式
│  │ ●  │ │    │ │    │ │    │       │  当前 3D active
│  └────┘ └────┘ └────┘ └────┘       │
├────────────────────────────────────┤
│  · · ·  (BottomTab)                │
└────────────────────────────────────┘

[点击行星后弹出 PlanetInterpretSheet,详 §3.3]
[点击宫位弹出 HouseInterpretSheet,详 §3.4]
[点击相位线弹出 AspectInterpretSheet,详 §3.5]
```

### §3.2 NatalChart3D 视觉规格

```
Canvas 尺寸: 100% 宽 × 64vh 高
背景: gradient-deep-space (CSS) + 透明 Three.js canvas overlay

3D 场景组件:
  1. 黄道环(主盘)
     - 半径 r = 1.0 unit
     - 360° 圆环,12 个 30° 扇区(星座)
     - 纹理: /assets/textures/zodiac-ring-3d.webp (1024×1024)
     - 反光材质: MeshStandardMaterial metalness 0.3 roughness 0.6
     - 烫金描边: 0.005 unit 内/外环

  2. 宫位放射线 (12 lines)
     - 从盘心向外,长度 1.2 unit
     - LineBasicMaterial color border-default opacity 0.3
     - 宫位数字 1-12 标注在 1.15 unit 处 (HTML overlay)

  3. 行星 sprites (10-14 个)
     - PlaneGeometry 0.08 unit
     - 纹理: /assets/glyphs/planets-3d/*.png (256×256 with glow)
     - 位置: 半径 0.85 unit 上的圆周,角度 = ecliptic longitude
     - 悬停: scale 1.15 + emissive glow
     - 点击: scale 1.3 + 持续 glow (state)

  4. 相位线 (Aspect Lines)
     - SVG 2D overlay 而非 Three.js 内部(性能更好)
     - 在 canvas 之上叠加 <svg> 层
     - 5 种相位 5 种颜色 (§00 §5.5.3)
     - orb 容差用 opacity 表达

  5. 星空背景
     - <Stars> from drei (count: 200, factor 5)
     - 缓慢自转 0.1 rad/min

  6. 灯光
     - AmbientLight intensity 0.3
     - PointLight at (3, 5, 3) intensity 0.6 color #C9A876
     - 整盘呈现微烫金高光

相机:
  默认 OrbitControls
  起始: position (0, 0, 3),距盘 3 unit,俯视约 15°
  缩放范围: 2 - 6 unit
  旋转限制: polarAngle [10°, 80°] (避免反转)
  damping: 0.1 (惯性)

性能:
  目标 60fps on iPhone 12+ / 中端 Android (高通 8 Gen 1)
  低端检测后自动降级 2D
```

### §3.3 PlanetInterpretSheet (⭐ v0.2 潜能开关视角)

点击行星 → 从底部 slide-up 半屏 Sheet(占屏 60%):

```
┌────────────────────────────────────┐
│  [3D Canvas 上半区 dim 50%]          │
│  ────────────────────────          │  Sheet drag handle
├────────────────────────────────────┤
│                                    │
│  ☽  月亮 · 天蝎座 · 12 宫          │  text-h1
│  ──                                 │  GlyphChip 32 + text
│                                    │
│  ─────── 基础信息 ───────           │  TabRow (4 tabs)
│  解读 / 潜能开关 / 相位 / 关键事件   │  当前 "潜能开关" active
│                                    │
├────────────────────────────────────┤
│  ╲ Tab: 潜能开关 (⭐ v0.2)          │
│                                    │
│  这是你「直觉力」潜能的开关        │  text-h2
│  ─────                              │  fg-accent-purple
│                                    │
│  ┌──────────────────────────┐      │  PotentialSwitchPanel
│  │                          │      │  bg-card padding 20
│  │   潜力上限    87 /100     │      │  radius-lg
│  │   ▓▓▓▓▓▓▓▓░░             │      │
│  │                          │      │
│  │   已激活      47 /100     │      │  RadarSubChart
│  │   ▓▓▓▓░░░░░░             │      │  bg accent-purple/15
│  │                          │      │
│  │   今年流年   +12 (天王过) │      │  text-caption
│  │                          │      │
│  └──────────────────────────┘      │
│                                    │
│  ✨ 怎么激活这个开关?              │  text-h3
│                                    │
│  · 写日记记录梦境(直接吃水域)       │  ActionList × 3
│  · 减少社交媒体 1h/天                │
│  · 每周一次有目的的"什么都不做"      │
│                                    │
│  ─────                              │
│                                    │
│  📌 你的月亮档案                    │  GlyphProfile
│   位置: 天蝎座 18°23'                │  text-body-sm
│   宫位: 第 12 宫                     │  table-like layout
│   日返: 0.1°/天                      │
│   注: 12 宫月亮深刻、敏感、隐藏      │
│                                    │
│  ─────                              │
│                                    │
│  ┌──────────────────────────┐      │
│  │  💬 跟 AI 聊聊我的月亮      │      │  Button.primary-gold
│  └──────────────────────────┘      │
│  ┌──────────────────────────┐      │
│  │  ✨ 看完整潜能雷达          │      │  Button.secondary
│  └──────────────────────────┘      │
│                                    │
└────────────────────────────────────┘

Sheet 行为:
  - drag-down 可关闭(dismiss-threshold 25%)
  - 半屏 = 60vh;支持向上拖到全屏(100vh)
  - 上拉时背景 dim 100%,变成 Modal
```

### §3.4 HouseInterpretSheet (12 宫位点击)

```
点击空白宫位区域 → Sheet 内容简化:

┌──────────────────────────────────┐
│  第 4 宫 · IC                     │
│  ──                                │
│                                  │
│  宫位含义: 家 · 根 · 内心安全感    │
│  ─────                            │
│                                  │
│  本宫包含行星:                     │
│  ☽ 月亮 (天蝎 18°)                │  PlanetList
│  ☿ 水星 (天秤 26°)               │
│                                  │
│  你的 4 宫是「深潜者」原型的       │  text-body
│  情感锚点。                       │  Fraunces
│                                  │
│  [打开月亮详情]  [打开水星详情]   │  Button.ghost
│                                  │
└──────────────────────────────────┘
```

### §3.5 AspectInterpretSheet (相位线点击)

```
┌──────────────────────────────────┐
│  ☉ ─△─ ♄                          │
│  太阳 △ 土星 (120°)               │
│  ──                                │
│                                  │
│  实际度数: 120°34'                 │
│  容差 orb: 0°34'                  │
│                                  │
│  这是一组「贵人相位」              │  text-body
│  你内在的责任感与表达力           │  Fraunces
│  天然合作,容易做出有结构          │
│  的成就。                         │
│                                  │
│  对应「深潜者」原型:               │
│  这是你天赋区第 2 项的星盘依据。  │
│                                  │
│  [跳到天赋区 →]                   │  Button.secondary
│  [跟 AI 聊聊这个相位]             │  Button.primary-gold
│                                  │
└──────────────────────────────────┘
```

### §3.6 TimeMachineSlider 详细规格

```
┌──────────────────────────────────┐
│  2026-05-11 14:32 GMT+8           │  CurrentDate (居中)
│                                  │  text-body-sm fg-secondary
│                                  │
│  ●─────────●──────●               │  Slider track
│  birth     today  drag           │  3 个 marker
│                                  │
│  ┌─────┐ ┌─────┐ ┌──────────┐   │  ModeTab
│  │ 本命 │ │ 今天 │ │ 自由滑动 │   │  3 种模式
│  └─────┘ └─────┘ └──────────┘   │
│   active                          │
│                                  │
│  当前显示: 本命盘                  │  text-caption fg-dim
└──────────────────────────────────┘

三种模式:
  1. 本命 (Natal):
     - Slider 锁定在 birth 位置
     - 显示纯本命行星
     - 滑块禁用

  2. 今天 (Today):
     - Slider 锁定在 now 位置
     - 显示 transit(浮于本命盘外圈)
     - 双色行星: 本命金色 / transit 紫色

  3. 自由滑动 (Free):
     - Slider 可拖动
     - 范围: birth - 10 年 ~ birth + 30 年
     - 实时计算并动画化行星位置
     - 每次拖动停 200ms 触发计算 + 雷达 transit_boost 重算

Slider 视觉:
  - track: 4px 渐变 (accent-purple → accent-gold)
  - thumb: 24px 烫金球 + glow + 内含日期 chip
  - 拖动时上方浮出大字 date "2026-05-11"
  - markers: birth 紫色 dot / today 金色 dot

性能预算:
  - 滑动期间降级到 30fps (节流)
  - 停止 500ms 后恢复 60fps + 计算精确相位
```

### §3.7 ViewModeBar (4 视图模式)

```
┌────┬────┬─────┬─────┐
│ 3D │ 2D │列表 │ 简版 │
│ ●  │    │     │     │
└────┴────┴─────┴─────┘

每 tab 高 44px,等宽:

3D:
  默认 3D Canvas + OrbitControls

2D:
  传统 SVG 2D 星盘(360° 平面图)
  保留所有交互(点击/拖动)
  性能预算更低

列表 (List):
  把所有行星/相位拉平成 List
  ┌────────────────────────┐
  │ ☽ 月亮 · 天蝎 12 宫     │
  │   18°23'  日返 0.1°    │
  │   ─────                │
  │   [📌 解读]             │
  └────────────────────────┘
  适合占星硬核用户

简版 (Simple):
  仅显示太阳/月亮/上升 三大轴
  无相位线
  零渲染压力
  适合首次访问 + 弱网/低端
```

---

## §4 状态变体

### §4.1 Loading (首次进入)

```
┌────────────────────────────────────┐
│  ← 我的本命盘                       │
├────────────────────────────────────┤
│                                    │
│                                    │
│         [星盘旋转 Lottie]            │  ChartLoadingState
│                                    │
│   正在生成你的本命盘...              │  text-h2
│                                    │
│   ▓▓▓▓▓▓▓▓▓░ 计算行星位置           │  ProgressList
│   ▓▓▓░░░░░░░ 计算相位                │
│   ░░░░░░░░░░ 加载 3D 模型             │
│                                    │
└────────────────────────────────────┘

预期 <1.5s 完成(Swiss Ephemeris WASM 缓存 + KV)
首次加载略慢(~3s)由于 WASM 初始化
```

### §4.2 3D 不可用降级

```
设备检测失败:
  - 触发条件: WebGL 不可用 / fps 持续 <30 / 用户主动选 2D
  - 自动切换 2D 模式 + Toast "已切换到 2D 模式"

降级提示卡(右上角):
┌────────────────────────────────────┐
│  ⓘ 3D 在这设备上较慢                 │
│  已切换到 2D 模式                   │
│  [我要试试 3D]                      │
└────────────────────────────────────┘
```

### §4.3 数据错误

```
出生数据无效 / 时区计算失败:
┌────────────────────────────────────┐
│  ⚠ 星盘无法生成                     │
│                                    │
│  原因: 出生地时区无法解析             │
│                                    │
│  [修改出生信息]  [联系客服]          │
└────────────────────────────────────┘
```

### §4.4 用户层级差异

```
Free:
  - 完整 3D 可看
  - 行星解读 Layer 1+2(传统) 完整
  - Layer 4 原型解读(v0.2)仅 3 颗行星(日/月/上升)
  - 其他行星点击 → 显示"Plus 解锁原型解读"

Plus:
  - 完整 Layer 1+2+4 解读
  - 时间机器自由滑动可用
  - 雷达联动可见

Pro:
  - 所有 + 进阶相位 (quincunx 等次相位)
  - 时间机器精度提升到分钟
  - 多个 transit 叠加(比 Plus 默认更多)
```

### §4.5 焦点态 (?focus=:planet 进入)

```
进入时:
  1. 整盘从默认相机位置缓慢飞向焦点行星
  2. 焦点行星 scale 1.5 + 持续 glow
  3. 其他行星暂时 opacity 0.5(突出焦点)
  4. 2s 后自动弹出 PlanetInterpretSheet
  5. 用户操作后恢复正常
```

---

## §5 交互细节

### §5.1 手势

| 手势 | 触发 | 行为 |
|---|---|---|
| Single Tap | 行星 sprite | 弹 PlanetInterpretSheet |
| Single Tap | 宫位扇区(空白) | 弹 HouseInterpretSheet |
| Single Tap | 相位线 | 弹 AspectInterpretSheet |
| Double Tap | 任意位置 | 重置相机到默认 |
| One-finger Drag | Canvas 空白区 | 旋转视角(OrbitControls) |
| Two-finger Pinch | Canvas | 缩放相机距离 |
| Two-finger Drag | Canvas | 平移视角 |
| Long-press (500ms) | 行星 | 弹"复制度数 / 分享行星卡"小菜单 |
| Drag | TimeMachineSlider thumb | 时间机器拖动 |
| Tap | ViewModeBar tab | 切换视图模式 |
| Swipe up | PlanetInterpretSheet | 半屏 → 全屏 |
| Swipe down | PlanetInterpretSheet | 全屏 → 半屏 → 关闭 |
| Pull down | Page top | 刷新(重新计算今日 transit) |

### §5.2 微动效

| 触发 | 效果 | duration / curve |
|---|---|---|
| 进入页面 | 3D Canvas fade-in + 整盘缩放 0.92→1 | 600ms · ease-out-soft |
| 行星 hover | sprite scale 1.0→1.15 + emissive glow 0→0.6 | 200ms · ease-out-soft |
| 行星 tap selected | scale 1.0→1.3 + 持续 glow 循环呼吸 | 300ms + 3000ms loop |
| 相位线 hover (Desktop) | opacity ×1.5 + 1px stroke 加粗 | 200ms · ease-out-soft |
| PlanetInterpretSheet 弹出 | from-bottom slide + 背景 dim 渐入 | 400ms · ease-out-soft |
| TimeMachine slider 拖动 | 行星位置实时插值 + 上方日期 chip 浮出 | 实时 + 200ms fade |
| TimeMachine snap to today | thumb 拉回 today 位置 | 300ms · spring |
| 焦点 (?focus=) 相机飞行 | camera lerp + lookAt 缓动 | 1200ms · ease-mystic |
| ViewModeBar 切换 | 当前内容 fade-out + 新内容 fade-in 200ms | 200ms 各 · ease-out-soft |
| 3D 转 2D 切换 | 整 Canvas fade-out + SVG fade-in | 300ms 各 |

### §5.3 触觉反馈

| 时刻 | Haptic |
|---|---|
| 行星点击 | medium |
| Sheet 弹出 | light |
| Sheet 下滑关闭(到 dismiss 阈值) | light |
| TimeMachine drag 经过本命位置 | medium(强反馈,意识到回到本命) |
| TimeMachine drag 经过 today 位置 | light |
| TimeMachine drag 每月跳跃 | light(节流到 200ms) |
| ViewMode 切换 | light |
| 3D 转 2D 降级提示 | warning |

### §5.4 转场动画

| 来源 → 目标 | 转场 |
|---|---|
| Today / AI Chat → /chart?focus=planet | fade + 相机自动飞向焦点行星 |
| /chart → /ai-chat?topic=planet_xxx | from-bottom slide + planet sprite 共享 element |
| /chart → /radar?dim=xxx | from-right slide |
| Sheet 内"看完整潜能雷达" → /radar | Sheet 缩小到 thumbnail + 飞向新页 |

### §5.5 性能策略

```
渲染优化:
  - 行星 sprite 使用 InstancedMesh 一次性 batch render
  - 相位线 SVG 2D 而非 Three.js Line (避免 line draw call 慢)
  - 星空背景使用 BufferGeometry + Points (200 颗星不分别 mesh)
  - 用户静止超 5s → 降到 30fps 节能模式
  - prefers-reduced-motion 用户 → 直接 2D 模式

资源加载:
  - 行星 PNG 纹理: 256×256 webp,预加载全部 14 张 (~150KB)
  - 黄道环纹理: 1024×1024 webp (~80KB)
  - 字体 / Lottie: 与全局共享
  - Swiss Ephemeris WASM: ~600KB,首次加载缓存

设备检测:
  function shouldDowngradeTo2D() {
    if (!webglAvailable()) return true
    if (devicePixelRatio < 1.5 && deviceMemory < 4) return true
    if (fpsSampler.average < 30 over 3s) return true
    return false
  }
```

### §5.6 雷达联动(⭐ v0.2 关键)

```
当 PlanetInterpretSheet 的"潜能开关"Tab 被查看时:
  → 写入埋点 chart_potential_switch_view
  → 顶部状态栏右上角 RadarOrb (§03 §3.3) 触发 pulse + 对应维度色点
  → 用户每次查看一个新行星的潜能开关 → 该维度 activated +1 (规则: 每天每维 max +3)

跨页面联动:
  - /chart 上的潜能开关 view → /today 上 RadarOrb 同步更新
  - 详细行为见 PRD §5.4.2.1
```

---

## §6 双语文案表

| 元素 | zh | en | 备注 |
|---|---|---|---|
| Header title | 我的本命盘 | My Natal Chart | text-h2 |
| Header info | ⓘ | ⓘ | tap → 占星 101 简易解释 |
| TimeMachine current | 当前显示 | Currently showing | text-caption |
| TimeMachine natal | 本命 | Natal | Tab |
| TimeMachine today | 今天 | Today | Tab |
| TimeMachine free | 自由滑动 | Free | Tab |
| TimeMachine birth marker | 出生 | Birth | hover |
| ViewMode 3d | 3D | 3D | Tab |
| ViewMode 2d | 2D | 2D | Tab |
| ViewMode list | 列表 | List | Tab |
| ViewMode simple | 简版 | Simple | Tab |
| PlanetSheet tab basic | 解读 | Reading | TabRow |
| PlanetSheet tab potential | 潜能开关 | Potential Switch | ⭐ v0.2 |
| PlanetSheet tab aspects | 相位 | Aspects | |
| PlanetSheet tab events | 关键事件 | Key Events | |
| Potential switch headline | 这是你「直觉力」潜能的开关 | This is the switch for your Intuition | text-h2 |
| Potential ceiling label | 潜力上限 | Ceiling | |
| Potential activated label | 已激活 | Activated | |
| Potential transit label | 今年流年 | This year's transit | |
| Potential activation title | 怎么激活这个开关? | How to flip this switch? | text-h3 |
| Glyph profile title | 你的{planet}档案 | Your {planet} profile | |
| Glyph profile position | 位置 | Position | |
| Glyph profile house | 宫位 | House | |
| Glyph profile motion | 日返 | Daily motion | |
| Sheet CTA chat | 💬 跟 AI 聊聊我的{planet} | Chat about my {planet} | Button.primary-gold |
| Sheet CTA radar | ✨ 看完整潜能雷达 | View full Radar | Button.secondary |
| House sheet title sample | 第 4 宫 · IC | 4th House · IC | |
| House meaning sample | 家 · 根 · 内心安全感 | Home · Roots · Inner safety | |
| House planets in | 本宫包含行星 | Planets in this house | |
| Aspect sheet title sample | 太阳 △ 土星 (120°) | Sun △ Saturn (120°) | |
| Aspect orb label | 容差 orb | Orb tolerance | |
| Loading 1 | 计算行星位置 | Calculating positions | |
| Loading 2 | 计算相位 | Calculating aspects | |
| Loading 3 | 加载 3D 模型 | Loading 3D model | |
| 3D downgrade title | 3D 在这设备上较慢 | 3D is slow on this device | |
| 3D downgrade body | 已切换到 2D 模式 | Switched to 2D | |
| 3D downgrade retry | 我要试试 3D | Try 3D anyway | |
| Free lock interpret | Plus 解锁原型解读 | Unlock with Plus | Free 用户行星 Layer 4 锁定 |
| Error chart title | 星盘无法生成 | Chart could not be generated | |
| Error reason sample | 出生地时区无法解析 | Birth place timezone unresolved | |
| Error CTA edit | 修改出生信息 | Edit birth info | Button.secondary |

**双语条目数:38+** ✅

---

## §7 Desktop 响应式适配

```
breakpoint: ≥1024px

布局:
  - Canvas 占左侧 70% 宽 × 整 viewport-128 高
  - 右侧 30% 固定面板:
    - 上半: TimeMachineSlider + ViewModeBar
    - 中部: Sticky PlanetInterpretPanel(点击行星后填充,不弹 Sheet)
    - 下半: 实时数据表格(行星度数 / 相位列表)
  - 不弹 Sheet,改为右侧 sticky panel

键盘快捷键:
  - R: 重置相机
  - 1-9: 直接跳查某行星 (日月水金火...)
  - Esc: 关闭面板
  - Space: 暂停/恢复 transit 自动播放(Phase 2)
```

---

## §8 接入 API / 数据契约

### §8.1 进入页面拉取

```
GET /api/chart/natal
Authorization: Bearer <jwt>

Response:
{
  "user_id": "uuid",
  "natal": {
    "birth_data": { date, time, place, timezone, lat, lng },
    "planets": [
      {
        "planet": "sun",
        "longitude": 90.234,        // 黄经
        "latitude": 0.0,
        "sign": "cancer",
        "sign_degree": 0.234,
        "house": 7,
        "house_system": "placidus",
        "speed": 0.97,
        "retrograde": false
      },
      ...
    ],
    "houses": [
      {
        "number": 1,
        "cusp_longitude": 12.5,
        "sign": "aries",
        "sign_degree": 12.5
      },
      ...
    ],
    "aspects": [
      {
        "from": "sun",
        "to": "moon",
        "type": "trine",
        "exact_degree": 120.34,
        "orb": 0.34,
        "applying": true
      },
      ...
    ]
  },
  "current_transits": [...]
}

GET /api/chart/transit?date=2026-05-11T14:32:00Z
  返回该时刻的 transit 行星位置(用于 TimeMachine)
```

### §8.2 行星解读

```
GET /api/chart/interpret/planet
  ?planet=moon
  &user_id=uuid

Response:
{
  "planet": "moon",
  "layers": {
    "layer1_traditional": {
      "headline_zh": "情绪与本能的容器",
      "body_zh": "..."
    },
    "layer2_psychological": {
      "headline_zh": "你的内在小孩",
      "body_zh": "..."
    },
    "layer4_archetype": {       // ⭐ v0.2 仅 Plus+
      "potential_dimension": "intuition",
      "ceiling": 87,
      "activated": 47,
      "transit_boost": 12,
      "activation_actions": [
        { "headline_zh": "...", "why_zh": "..." },
        ...
      ],
      "narrative_zh": "..."
    }
  },
  "profile": {
    "longitude": 235.38,
    "sign": "scorpio",
    "sign_degree": 18.38,
    "house": 12,
    "speed": 13.2  // deg/day
  }
}
```

### §8.3 引用 PRD

```
[§5.2 本命盘]                     主结构
[§5.2.1 3D 互动星盘交互]          所有手势 + 视觉
[§5.2.3 解读引擎 Layer 4 原型解读] PlanetSheet 潜能开关 Tab
[§5.11 潜能雷达联动]              查看潜能开关写 activation_log
[§7 技术架构]                     Three.js + Swiss Ephemeris WASM
[§6.2 缓存]                       Natal 永久缓存,Transit 整点失效
```

---

## §9 设计师 Figma 落地 Checklist

### §9.1 关键素材

```
3D 纹理:
  /assets/textures/zodiac-ring-3d.webp           1024×1024
  /assets/glyphs/planets-3d/*.png                14 张 256×256 with glow

2D SVG:
  /assets/glyphs/zodiac/*.svg                     12 + 14

Lottie:
  /assets/lottie/chart-spinning.json              Loading 共用
```

### §9.2 使用 token / 组件

```
颜色: bg-deep, accent-gold, accent-purple, fg-*, radar-*
字号: text-h2, text-h3, text-body, text-caption
组件:
  PageHeader
  NatalChart3D (核心,复用 §00 §5.5.1)
  NatalChart2D (后备,§00 §5.5.2)
  TimeMachineSlider (新)
  ViewModeBar (新)
  PlanetInterpretSheet (新,半屏 + 全屏)
  HouseInterpretSheet (新)
  AspectInterpretSheet (新)
  PotentialSwitchPanel (新,v0.2 核心)
  GlyphProfile (新,行星档案表)
  ChartLoadingState (新)
```

### §9.3 Figma 文件组织

```
🎨 05-Natal-Chart-3D
├─ 📄 Cover
├─ 📄 Mobile · Default View (3D)
├─ 📄 Mobile · 2D Fallback
├─ 📄 Mobile · List Mode
├─ 📄 Mobile · Simple Mode
├─ 📄 Mobile · PlanetInterpretSheet - 解读 Tab
├─ 📄 Mobile · PlanetInterpretSheet - 潜能开关 Tab ⭐
├─ 📄 Mobile · PlanetInterpretSheet - 相位 Tab
├─ 📄 Mobile · PlanetInterpretSheet - 关键事件 Tab
├─ 📄 Mobile · HouseInterpretSheet
├─ 📄 Mobile · AspectInterpretSheet
├─ 📄 Mobile · TimeMachine - 本命 / 今天 / 自由
├─ 📄 Mobile · Focus Mode (?focus=moon 自动飞)
├─ 📄 Mobile · Free / Plus / Pro Variants
├─ 📄 Mobile · 3D Downgrade Toast
├─ 📄 Mobile · Loading / Error States
├─ 📄 Desktop · Split Layout (Canvas + Right Panel)
├─ 📄 Prototype Flow
└─ 📄 Animation / Camera / Gesture Specs
```

### §9.4 检验

- [ ] 4 ViewMode 全部 Figma 化
- [ ] 3 种 Interpret Sheet 完整
- [ ] PotentialSwitchPanel 详细规格(v0.2 核心)
- [ ] TimeMachine 三模式
- [ ] Focus 焦点态相机动画 frame 标注
- [ ] 3D 降级流程
- [ ] 3 用户层级差异
- [ ] 双语文案 38+ 条
- [ ] 性能预算文档化

---

## §10 写完自检

- [x] 页面目标 + KPI 明确
- [x] URL + 进入/退出 + 5 入口
- [x] Wireframe 主结构 + 3 种 Sheet + TimeMachine + ViewModeBar 各自详细
- [x] Loading / 3D 降级 / Error / 三用户层级 / 焦点态
- [x] 手势 13 项 + 动效 10 项 + Haptics 8 项 + 性能策略 + 雷达联动
- [x] 双语文案 38+ 条
- [x] Desktop split layout + 键盘快捷键
- [x] API: natal + transit + planet interpret + 引用 PRD §6.2 缓存
- [x] 引用 PRD: §5.2 / §5.2.1 / §5.2.3 / §5.11 / §7 / §6.2 (6 次)
- [x] 与 §00 / §02 / §03 / §04 一致

---

## 变更记录

| 版本 | 日期 | 内容 |
|---|---|---|
| v0.2 | 2026-05-11 | 初始版本,3D 本命盘 + v0.2 潜能开关视角 |

---

**MVP 5 页 design spec 完成。** 下一步: README 索引 + 实施顺序。
