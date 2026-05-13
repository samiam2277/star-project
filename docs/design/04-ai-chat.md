# 04 AI 占星师对话 (AI Chat)

> 北极星指标 WCC(每周对话次数)直接挂钩的核心页面。**体现 v0.2 关键:原型上下文 UI** —— AI 不是泛泛聊天,而是以用户的"天命原型"视角对话。
>
> 对应 PRD: `[§5.3 AI 占星师]` `[§5.3.2 System Prompt 结构]` `[§5.3.4 Tools]` `[§5.0.3 原型作为公共上下文]` `[§9.2 订阅配额]`
>
> 依赖: `[§00-system.md]` `[02-blueprint-result.md]` 原型来源 `[05-chart-3d.md]` 星盘联动
>
> 版本 v0.2 · 2026-05-11

---

## §1 页面目标 / 用户预期 / 关键数据

### §1.1 目标

让用户感觉"这个 AI 真的懂我",通过三个核心机制:
1. **原型视角对话**: AI 在 Header 明示"以「深潜者」视角和你对话",回复风格 + 措辞 + 隐喻系统都贴合用户原型
2. **Tool 可见化**: 用户能看见 AI 在调 `get_transit / draw_tarot / get_archetype` 等工具(类似 Cursor 展开式 thinking),增强信任与好奇
3. **星盘联动**: AI 提到"你的月亮"时,旁侧迷你星盘自动高亮该行星

**核心 KPI:** WCC ≥ 12 次/周(目标用户)/ 平均会话长度 ≥ 6 轮 / 用户满意 thumbs-up ≥ 75%

### §1.2 用户预期

| 用户层 | 预期 |
|---|---|
| 首次 (从 Today 入口) | 看到引导问题 / 期待"真的会回答星盘问题" |
| 普通 Plus | 期待 30 次/天 不会被截断 |
| Pro | 无限 + 上下文记忆跨会话(Phase 2) |
| 占星硬核 | 期待 AI 调用 get_transit/get_aspect 时显示**真实计算结果** |

### §1.3 关键数据点

```
event:chat_open                       进入页面
event:chat_session_start              新建 session
event:chat_message_sent               用户发消息
event:chat_message_streamed           AI 开始流式输出
event:chat_message_complete           AI 完成
event:chat_tool_call                  参数:tool_name
event:chat_tool_call_expanded         用户点击展开 tool 详情
event:chat_planet_highlighted         AI 提到行星,联动星盘高亮触发
event:chat_message_thumbs             参数:up/down
event:chat_session_end                参数:turns
event:chat_quota_hit                  到达每日配额
event:chat_upgrade_click              从配额耗尽 CTA 点击升级
```

---

## §2 信息架构

### §2.1 路由

```
/ai-chat                       新建或继续会话
/ai-chat/:sessionId            进入指定历史会话(Plus+)
/ai-chat?initial=:text         预填初次消息(从 Today QuickReply 跳来)
/ai-chat?context=archetype     强调原型上下文(从 /blueprint/result 跳来)
```

### §2.2 进入路径

```
1. Today AI 入口 / Quick Reply
2. BottomTab 第 3 位 (中央 FAB)
3. /blueprint/result "跟 AI 聊聊我"
4. Notification (推送 "AI 想和你聊聊今天")
5. /ai-chat/:sessionId (历史会话列表点击)
```

### §2.3 退出路径

```
返回 ← / BottomTab → 各自 Tab
AI 提到星盘 → 用户点击行星名 → /chart?focus=planet (双指返回保留 chat)
AI 推荐塔罗 → 点击 → /tarot
配额耗尽 → 升级 CTA → /pricing
```

### §2.4 会话生命周期

```
[start] ── session create ──> [active] ── timeout 30min ──> [paused]
                  │                       │
                  │                       └── 用户主动 end ──> [archived]
                  │
                  └── 用户从 [paused] 进入 → resume(若 <24h)/ 新建(若 >24h)
```

---

## §3 Mobile Wireframe

### §3.1 整页结构(主状态:active 会话中)

```
┌────────────────────────────────────┐
│  ← 占星师 AI               ⋯  ⓘ    │  Section 0: PageHeader
│  ┌─────┐  ╲ 1.5px 烫金边框          │  Section 1: ChatContextHeader
│  │AVTR │  ◆ 以「深潜者」视角对话    │  ChatHeaderAvatar 40 + ContextChip
│  └─────┘  ───                       │
│            剩余 28/30 (Plus)        │  Usage text-caption fg-dim
├────────────────────────────────────┤
│                                    │
│  9:32 AM · 今天                    │  TimeDivider text-caption fg-dim
│                                    │
│  ┌─────────────────────────────┐   │  ai 气泡
│  │ ✦ 早上好,Sophia。            │   │  ChatBubble.ai
│  │   你的月亮今早进入了天蝎座的 │   │  bg-card radius 18 (左下 4)
│  │   第 12 宫,这是一段你的内在 │   │
│  │   特别活跃的时间。            │   │
│  │   想聊点什么?                │   │
│  │                              │   │
│  │   ┌──────────────────────┐   │   │
│  │   │ ⚙ 调用了 get_transit   │   │   │  ToolCallChip (折叠态)
│  │   │   2026-05-11 09:32     │   │   │  bg-elevated chip
│  │   │   ▾ 展开               │   │   │
│  │   └──────────────────────┘   │   │
│  │                              │   │
│  │  [👍] [👎]                    │   │  Feedback chips
│  └─────────────────────────────┘   │
│                                    │
│                ┌─────────────────┐ │  user 气泡
│                │ 我和我朋友 J     │ │  ChatBubble.user
│                │ 最近吵架了,我应  │ │  bg accent-purple
│                │ 该主动联系吗?    │ │  radius 18 (右下 4)
│                └─────────────────┘ │
│                            9:33 AM │  TimeStamp
│                                    │
│  ┌─────────────────────────────┐   │  AI streaming 中
│  │ ✦ 你的月亮在 12 宫,这一面    │   │  打字光标 |
│  │   让你在亲密关系里特别敏感… │   │
│  │   ▍ (streaming...)             │   │
│  │                              │   │
│  │   ┌──────────────────────┐   │   │  ToolCallChip
│  │   │ ⚙ 正在调用            │   │   │  active 态
│  │   │   get_synastry_aspect  │   │   │
│  │   │   user_id, friend_chart│   │   │
│  │   │   ⌛ (spinner)          │   │   │
│  │   └──────────────────────┘   │   │
│  └─────────────────────────────┘   │
│                                    │
├────────────────────────────────────┤
│  [今天能量 ↗] [画张塔罗] [关于 J↗] │  Section 3: QuickReplyChips
├────────────────────────────────────┤
│  ┌──────────────────┐ ┌─┐ ┌──────┐ │  Section 4: ComposeBar
│  │ 输入你的问题…      │ │🎤│ │ 发送 │ │
│  └──────────────────┘ └─┘ └──────┘ │
│  ✦ 28/30 · 升级 Pro 无限             │  Plus 用户提示
└────────────────────────────────────┘

[迷你星盘悬浮层 - 当 AI 提到行星时滑出]
                              ┌──────┐
                              │ ☽    │ 80×80
                              │ 12宫  │ 浮于右上
                              └──────┘
```

### §3.2 ChatContextHeader 详细规格

```
┌──────────────────────────────────────┐
│  ┌────┐  ◆ 以「深潜者」视角对话      │  整体 h 64
│  │40 ×│  ──                           │  bg-elevated
│  │ 40 │  剩余 28/30 (Plus)            │  border-bottom 1px subtle
│  └────┘  ──────                       │
└──────────────────────────────────────┘

ChatHeaderAvatar:
  - 40×40 圆形,bg gradient-archetype
  - 中心: ZodiacGlyph (用户主原型对应符号)
  - 周围有缓慢呼吸的烫金 ring (3s ease-in-out 循环)

ContextChip:
  - text-body-sm fg-accent-gold
  - 前缀 ◆ (烫金菱形)
  - "「深潜者」" 部分加金底圆角 Chip 强调
  - Tap → /blueprint/result?from=ai-chat (回到原型详情)

Usage indicator:
  - Free: "5/5 次/天" (用完显示橙色)
  - Plus: "28/30 (Plus)"
  - Pro: "不限 (Pro)" + 金色 dot
```

### §3.3 ChatBubble.ai 详细规格

```
基础容器:
  max-width: 85%
  margin-left: 0 (左对齐)
  bg-card
  radius: 18px,左下角 4px
  padding: 16px 18px

内部结构:
  1. 前缀 icon ✦ (烫金 12px) + 内容
  2. AI 回复文字(Fraunces Latin + 思源宋体)
  3. 行星/术语高亮: 嵌入式 GlyphChip
     例如文字中的 "月亮" 自动包裹为:
     ┌──┐
     │☽ │ 月亮  ← bg-elevated chip, 可点击 → 联动星盘
     └──┘
  4. ToolCallChip(若有,见 §3.4)
  5. CitationChip(若有,见 §3.5)
  6. 反馈条 [👍] [👎]
  7. 时间戳(若 lazy mode 显示)

Streaming 态:
  - 文字逐字浮现(字符级 stagger,每字 15ms)
  - 末尾 1 个闪烁光标 ▍
  - 期间不显示 [👍][👎]
  - 完成后 fade-in 反馈条
```

### §3.4 ToolCallChip 详细规格

```
折叠态:
┌──────────────────────────────────────┐
│  ⚙  调用了 get_transit                │  h 36
│     2026-05-11 09:32                  │  bg-elevated
│                                      │  border-1 border-subtle
│                              ▾         │  radius-md padding 12
└──────────────────────────────────────┘

展开态(点击折叠 chevron):
┌──────────────────────────────────────┐
│  ⚙  get_transit                       │
│  ────────                             │
│                                      │
│  📥 输入:                              │
│  {                                    │
│    "user_id": "...",                  │
│    "date": "2026-05-11"               │
│  }                                    │
│                                      │
│  📤 输出:                              │
│  {                                    │
│    "transits": [                      │
│      { "planet": "moon",              │
│        "house": 12,                   │
│        "sign": "scorpio" },           │
│      { ... }                          │
│    ]                                  │
│  }                                    │
│                                      │
│  耗时: 1.2s                            │
│  ───────                              │
│                              ▴ 收起   │
└──────────────────────────────────────┘

active 态(AI 正在调用):
  - 左侧 ⚙ icon 缓慢 360° 旋转 (4s linear)
  - 右侧 spinner
  - 文字"正在调用…"
  - 完成后变为折叠态 + light haptic

支持的 tools(对应 PRD §5.3.4):
  get_transit             获取当前流年相位
  get_aspect              查询两行星相位
  get_synastry_aspect     合盘特定相位
  draw_tarot              抽塔罗牌
  get_user_archetype      获取用户原型详情 ⭐ v0.2
  get_potential_radar     获取潜能雷达 ⭐ v0.2
  generate_parallel_life  生成平行人生路径 ⭐ v0.2
  search_knowledge        知识库检索
```

### §3.5 CitationChip(引用源)

```
当 AI 引用占星经典或用户数据时,文末出现引用:

┌──────────────────────────────────────┐
│  📚 参考                               │
│  · 你的本命盘 §2 (太阳合相水星)         │
│  · 流年 §3.1 (土星过 4 宫)              │
└──────────────────────────────────────┘

参考类型:
  · 用户数据(本命盘/合盘/雷达 )- 可点击跳详情
  · 占星经典(Liz Greene / Howard Sasportas)
  · 塔罗解读(Rachel Pollack)
  · 知识库内部 ID
```

### §3.6 ChatBubble.user

```
基础容器:
  max-width: 85%
  margin-left: auto (右对齐)
  bg: accent-purple
  fg-primary
  radius: 18px,右下角 4px
  padding: 14px 18px

无 icon 前缀
无 ToolCall 或 Citation
有时间戳(右下角)
```

### §3.7 ChatBubble.tool-call 独立态

少见情况:tool 调用独立于消息(如 AI 主动跑后台分析),作为独立气泡:

```
┌──────────────────────────────────────┐
│  ⚙ 我正在帮你后台计算今晚的火星 transit │
│  ──                                    │
│  预计 2 秒…                             │
└──────────────────────────────────────┘

  bg-elevated
  border-l-3 accent-gold
  padding 16
  自动收起当完成时
```

### §3.8 行星联动星盘高亮

```
当 AI 回复包含 "你的月亮" / "上升星" / "金星" 等行星术语时:
1. 文字内自动包裹为 GlyphChip (§3.3 步骤 3)
2. 右上角浮出迷你星盘 MiniNatalChart 80×80,2s 后自动收起
3. 该行星在迷你盘上 glow 高亮 + 旋转放大 1.2×
4. 用户点击迷你盘 → 全屏 /chart?focus=moon (3D 主盘)

MiniNatalChart 视觉:
  ┌─────────┐
  │ ╱─────╲ │  Circle bg-card
  │╱ ☉ ☽ ☿ ╲│  12 宫位简化标志
  │ │ ●●● │ │  行星点 + glow
  │ ╲ ★★★ ╱ │  当前提到的行星 1.5x size + 烫金 glow
  │  ╲───╱  │
  └─────────┘

触发节流: 每会话最多每 30s 高亮一次,避免抖动
```

### §3.9 QuickReplyChips(下方建议)

```
位于 ComposeBar 上方,横向滚动

┌──────────────────────────────────────┐
│ [今天能量 ↗] [画张塔罗] [关于 J↗]    │
└──────────────────────────────────────┘

样式: 复用 §00 §5.1.6 Chip
  bg-elevated, radius-full, h-9
  text-body-sm fg-secondary
  ↗ 表示"延展话题",→ 表示"具体动作"

生成逻辑:
  - AI 每条回复结束时,LLM 同时输出 3 条 next-best questions
  - 用户 tap → 自动填入 ComposeBar 并 focus
  - 长按 → 提交不修改
```

### §3.10 ComposeBar 详细规格

```
┌──────────────────────────────────────┐
│ ┌────────────────────┐ ┌─┐ ┌──────┐ │
│ │ 输入你的问题…        │ │🎤│ │ 发送 │ │  h 56
│ │ (auto-grow)         │ └─┘ └──────┘ │
│ └────────────────────┘                │
│ ✦ 28/30 · 升级 Pro 无限                │  text-caption fg-dim
└──────────────────────────────────────┘

Input:
  bg-elevated
  border-2 border-subtle (focus: accent-gold)
  radius-md
  text-body fg-primary
  placeholder fg-dim
  auto-grow max 4 lines (after auto-scroll)

🎤 语音键 (40×40):
  Tap → 录音 (max 60s)
  录音中: 红色脉冲 + 波形可视化
  Tap 二次 → 发送(自动转文字 + 上传)

发送键 (按钮):
  默认 disabled (灰色)
  有文字 → 烫金 enabled
  Tap → 发送

附件键(隐藏功能,Phase 2):
  📎 上传图片(描述梦境/手相/星盘截图)
```

### §3.11 配额耗尽态

```
Free 用户用完 5 次/天:
┌────────────────────────────────────┐
│  ⚙ 配额已用完                       │  状态卡片(占满 ComposeBar 位置)
│  ─────                              │
│                                    │
│  今天的 5 次免费对话已用完           │
│                                    │
│  ┌──────────────────────────┐      │
│  │  升级 Plus 解锁 30 次/天    │      │  Button.primary-gold
│  └──────────────────────────┘      │
│  ┌──────────────────────────┐      │
│  │  Pro · 不限次               │      │  Button.secondary
│  └──────────────────────────┘      │
│                                    │
│  · 明天 00:00 重置 ·                 │  text-caption fg-dim
│                                    │
└────────────────────────────────────┘
```

---

## §4 状态变体

### §4.1 首次进入(无历史会话)

```
┌────────────────────────────────────┐
│  ChatContextHeader (空 quota 5/5)  │
├────────────────────────────────────┤
│                                    │
│  ✦ AI 占星师 · Deep Diver Edition │  Welcome screen
│  ─────                              │
│                                    │
│  ┌──────────────────────────┐      │
│  │ ✦ 你好 Sophia,            │      │
│  │   我是你的 AI 占星师。     │      │
│  │   我会以你「深潜者」的     │      │
│  │   视角和你对话,可以问我:  │      │
│  └──────────────────────────┘      │
│                                    │
│  推荐问题:                          │
│  [今天我的能量重点?]                │  QuickReplyChip
│  [给我抽一张今日塔罗]              │
│  [我和 J 适合做朋友吗?]            │
│  [明天我要见客户,该注意什么?]     │
│  [告诉我「深潜者」的隐藏面]        │
│                                    │
│  ComposeBar                         │
└────────────────────────────────────┘
```

### §4.2 Loading (AI 思考中)

```
显示 typing indicator 气泡:

┌──────────────────────────┐
│ ✦ ●  ●  ●                │  3 点跳动 (delay 0/0.15/0.3s)
└──────────────────────────┘

期间不阻止用户继续输入(进入队列)
```

### §4.3 Error

```
单条消息错误:
┌──────────────────────────┐
│ ✦ ⚠ 这条没生成出来        │  红色边框气泡
│                          │
│   [重新生成] [反馈问题]    │
└──────────────────────────┘

整体连接错误:
顶部 Banner:
┌────────────────────────────────────┐
│  🔌 连接中断,正在重连…              │
└────────────────────────────────────┘
```

### §4.4 历史会话列表 (Plus+,从 ⋯ 菜单进入)

```
┌────────────────────────────────────┐
│  ← 历史对话                         │
├────────────────────────────────────┤
│                                    │
│  今天                              │
│  ┌──────────────────────────┐      │
│  │ 早上好 · 月亮在 12 宫       │      │  SessionListItem
│  │ ─────                     │      │  bg-card padding 16
│  │ 5 轮 · 09:30              │      │  radius-lg
│  │ 我和我朋友 J 最近吵架了…   │      │
│  └──────────────────────────┘      │
│                                    │
│  昨天                              │
│  ┌──────────────────────────┐      │
│  │ 关于职业 ...               │      │
│  │ 12 轮 · 21:14             │      │
│  └──────────────────────────┘      │
│                                    │
│  2026-05-09                        │
│  ...                                │
│                                    │
└────────────────────────────────────┘

每条:
  - 标题(LLM 生成,基于会话摘要)
  - 轮数 + 时间
  - 摘要 preview
  - 右滑: 删除 / 收藏
```

### §4.5 用户层级差异

```
Free:
  - 5 次/天
  - 无历史会话(只保留当前 24h 内)
  - 无 tool 展开详情(只显示折叠态)

Plus:
  - 30 次/天
  - 历史会话保留 90 天
  - tool 详情完整可见
  - 迷你星盘高亮可用

Pro:
  - 无限
  - 历史会话永久 + 跨会话上下文记忆(Phase 2)
  - "AI 视角切换": 可切换不同原型视角对话(实验功能)
  - 优先模型路由 (Claude Opus 4.6 vs Sonnet)
```

---

## §5 交互细节

### §5.1 手势

| 手势 | 触发 | 行为 |
|---|---|---|
| Tap | ContextChip "「深潜者」" | → /blueprint/result?from=ai-chat |
| Tap | ChatHeaderAvatar | 同上 |
| Tap | GlyphChip(行星) | → /chart?focus=planet |
| Tap | ToolCallChip 折叠态 | 展开详情 |
| Tap | CitationChip 引用项 | 跳对应详情 |
| Tap | MiniNatalChart 浮层 | → /chart?focus=current_planet |
| Tap | QuickReplyChip | 填入 ComposeBar + focus |
| Long-press | QuickReplyChip | 直接发送(不修改) |
| Long-press | ChatBubble.ai | 弹出"复制 / 重新生成 / 反馈" |
| Long-press | ChatBubble.user | 弹出"复制 / 编辑重发 / 删除" |
| Swipe left | SessionListItem | 显示"删除"按钮 |
| Pull down | 会话列表 | 刷新 |

### §5.2 微动效

| 触发 | 效果 | duration / curve |
|---|---|---|
| 新消息出现(user) | from-bottom-right slide + scale 0.95→1 | 300ms · ease-spring |
| 新消息出现(ai 完整) | from-bottom-left fade-up 12px | 300ms · ease-out-soft |
| AI streaming 文字 | 字符级 stagger fade-in | 15ms/字 |
| Typing indicator | 3 点跳动 delay 0/0.15/0.3s | 1500ms 循环 |
| ToolCallChip 折叠/展开 | 高度过渡 + chevron 旋转 | 250ms · ease-out-soft |
| Tool call active spinner | 4s 旋转一圈 | linear 循环 |
| MiniNatalChart 滑出 | from-right scale 0.7→1 | 400ms · ease-spring |
| MiniNatalChart 自动收起 | scale 1→0.7 + fade | 300ms · ease-in-soft |
| 行星 GlyphChip 高亮触发 | scale 1.1 + glow 0.3s | 400ms · spring |
| 配额警告(剩 1) | quota text 闪烁金色 | 800ms × 2 |

### §5.3 触觉反馈

| 时刻 | Haptic |
|---|---|
| 发送消息 | light |
| AI 开始 streaming | light(微感知) |
| AI 完成 | medium |
| Tool call 完成 | light |
| 配额耗尽 | warning |
| 反馈 thumbs-up/down | light |
| MiniNatalChart 出现 | light |

### §5.4 流式输出体验

```
关键 UX 原则:
  1. 不让用户等待空气 → 收到 token 立即显示
  2. token 流速控制 → 每字符 ≥ 15ms,避免太快读不到
  3. 平滑跳跃避免 → 当 token 还没拼完整词,延迟 100ms 等待
  4. 错误恢复 → streaming 中断时显示"正在恢复…"自动 retry 3 次

Tool call 流式:
  - AI 决定调 tool 时立即显示 active 态(不等响应)
  - tool 响应回来后插入到 active chip 内
  - tool 完成后,AI 继续 streaming 后续文字
```

### §5.5 上下文记忆策略

```
Session 内:
  - 全部历史消息保留在 context window
  - 超过 Claude 200k context 时,前部分压缩为 summary

跨 session (Plus+):
  - 用户最后 5 个会话的摘要 + 用户档案(原型 / 雷达 / focus_topics)注入 system prompt
  - 用户档案变更(如雷达点亮维度)即时反映

Pro 跨 session 记忆 (Phase 2):
  - 使用 RAG (检索增强) - 用户提到的关键事件 / 人名 / 决策 入向量库
  - 后续会话查询并注入相关历史
```

### §5.6 安全 / 边界

```
AI 回复禁止:
  ❌ 医疗诊断建议
  ❌ 法律建议
  ❌ 投资决策(可一般性讨论金钱议题)
  ❌ 暴力 / 自残相关
  ❌ 政治评价
  ❌ 玄学迷信(算财运 / 命格 / 转运手镯)

自杀干预:
  当 AI 检测到用户表达自杀/自残倾向时:
  - 中断常规回复
  - 显示 SafetyCard:
    ┌──────────────────────────┐
    │  💛 我看到你正在很难的地方   │
    │                          │
    │  专业的帮助会比我更有用     │
    │  ─────                    │
    │  北美:                     │
    │   988 (Suicide & Crisis Lifeline) │
    │  中国大陆:                 │
    │   400-161-9995 (危机干预) │
    │                          │
    │  [立即拨打] [让我先听你说]  │
    └──────────────────────────┘
  - "让我先听你说" → 转入安全话术模式(不再深入星盘细节,而是倾听 + 建议求助)
```

---

## §6 双语文案表

| 元素 | zh | en | 备注 |
|---|---|---|---|
| Header title | 占星师 AI | Astrology AI | text-h2 |
| Context label | 以「深潜者」视角对话 | Chatting as "Deep Diver" | text-body-sm |
| Usage Plus | 剩余 28/30 (Plus) | 28/30 left (Plus) | text-caption |
| Usage Pro | 不限 (Pro) | Unlimited (Pro) | |
| Usage Free | 剩余 3/5 (Free) | 3/5 left (Free) | |
| Welcome line 1 | 你好 Sophia, | Hi Sophia, | |
| Welcome line 2 | 我是你的 AI 占星师 | I'm your AI astrologer | |
| Welcome line 3 | 我会以你「深潜者」的视角和你对话 | I'll chat with you in your "Deep Diver" voice | |
| Welcome line 4 | 可以问我: | You can ask me: | |
| Tool call - get_transit | 调用了 get_transit | Called get_transit | ToolCallChip |
| Tool call active | 正在调用 | Calling | active 态 |
| Tool input label | 输入 | Input | 展开态 |
| Tool output label | 输出 | Output | |
| Tool duration | 耗时 | Took | |
| Tool expand | 展开 | Expand | |
| Tool collapse | 收起 | Collapse | |
| Citation label | 参考 | References | |
| Compose placeholder | 输入你的问题… | Type your question… | |
| Send button | 发送 | Send | |
| Voice button label | 语音输入 | Voice input | aria-label |
| Quota tip Plus | 28/30 · 升级 Pro 无限 | 28/30 · Upgrade to Pro for unlimited | |
| Quota exhausted title | 配额已用完 | Quota reached | |
| Quota exhausted body Free | 今天的 5 次免费对话已用完 | Today's 5 free chats are used | |
| Quota CTA upgrade Plus | 升级 Plus 解锁 30 次/天 | Upgrade to Plus for 30/day | |
| Quota CTA upgrade Pro | Pro · 不限次 | Pro · Unlimited | |
| Quota reset | 明天 00:00 重置 | Resets at 00:00 tomorrow | |
| Loading typing | (3 dots animation, no text) | (same) | |
| Error message | 这条没生成出来 | This reply didn't come through | |
| Error regenerate | 重新生成 | Regenerate | Button |
| Error feedback | 反馈问题 | Send feedback | Button |
| Connection lost | 连接中断,正在重连… | Connection lost, reconnecting… | Banner |
| Sessions title | 历史对话 | Chat History | |
| Session item turns | N 轮 | N turns | |
| Quick reply 1 | 今天我的能量重点? | What's my energy focus today? | Welcome chip |
| Quick reply 2 | 给我抽一张今日塔罗 | Pull me a tarot for today | |
| Quick reply 3 | 我和 J 适合做朋友吗? | Am I compatible with J? | |
| Quick reply 4 | 明天我要见客户,该注意什么? | I'm meeting a client tomorrow — anything I should know? | |
| Quick reply 5 | 告诉我「深潜者」的隐藏面 | Tell me Deep Diver's hidden side | |
| Safety card title | 我看到你正在很难的地方 | I see you're in a hard place | 自杀干预 |
| Safety card body | 专业的帮助会比我更有用 | Professional help is what you need now | |
| Safety phone US | 988 (Suicide & Crisis Lifeline) | 988 (Suicide & Crisis Lifeline) | |
| Safety phone CN | 400-161-9995 (危机干预) | 400-161-9995 (Crisis line - China) | |
| Safety CTA call | 立即拨打 | Call now | |
| Safety CTA listen | 让我先听你说 | Let me listen first | |
| Thumbs up label | 这条有帮助 | Helpful | aria-label |
| Thumbs down label | 这条不太对 | Not quite right | aria-label |

**双语条目数:42+** ✅

---

## §7 Desktop 响应式适配

```
breakpoint: ≥1024px

布局变化:
  - 双栏:
    - 左侧 280px Sidebar = ChatContextHeader + 历史会话列表 + 新建会话按钮
    - 右侧 主对话流 max-width 800px
  - MiniNatalChart 改为固定右上角 240×240 持续可见(不再自动收起)
  - 输入框扩展为多行(Shift+Enter 换行,Enter 发送)

字号微调:
  - text-body 16px(vs Mobile 15px)
  - 行高加大保证阅读密度

键盘快捷键:
  - Cmd/Ctrl+K  新建会话
  - Cmd/Ctrl+R  重新生成最后一条 AI 回复
  - Cmd/Ctrl+/  快速反馈
  - Esc         关闭浮层
```

---

## §8 接入 API / 数据契约

### §8.1 创建会话

```
POST /api/chat/session
Authorization: Bearer <jwt>
Payload:
  {
    "context": {
      "from": "today" | "blueprint" | "manual",
      "initial_message": "..." | null,
      "include_archetype_context": true  // v0.2 关键
    }
  }

Response:
  {
    "session_id": "uuid",
    "system_prompt_summary": "AI 会以「深潜者」视角对话",
    "quota_remaining": 28
  }
```

### §8.2 发送消息(SSE 流式)

```
POST /api/chat/session/:id/message
Content-Type: text/event-stream
Payload:
  {
    "content": "我和 J 吵架了,应该主动联系吗?",
    "include_radar_context": true  // 是否注入当前雷达状态
  }

Stream events:
  event: thinking
  data: {"timestamp": "..."}

  event: tool_call_start
  data: {"tool": "get_synastry_aspect", "args": {...}}

  event: tool_call_result
  data: {"result": {...}, "duration_ms": 1200}

  event: token
  data: {"text": "你的月亮在 "}

  event: token
  data: {"text": "12 宫,"}

  event: glyph_highlight
  data: {"planet": "moon", "trigger_chart": true}

  event: complete
  data: {"message_id": "uuid", "total_tokens": 480, "model": "claude-sonnet-4-6"}

  event: quick_replies
  data: {"replies": ["...", "...", "..."]}

  event: error
  data: {"code": "RATE_LIMIT", ...}
```

### §8.3 System Prompt 结构 (引用 PRD §5.3.2)

```yaml
system_prompt:
  role: |
    你是 StellarLog 的 AI 占星师,以用户的天命原型视角对话。
    你的回复必须:
    - 温暖、笃定、不卖弄
    - 用占星术语但不堆砌
    - 引用具体行星/相位作为依据
    - 主动调用 tools 获取实时数据
    - 在必要时联动用户的星盘可视化

  context_data:
    archetype: "deep_diver"          # ⭐ v0.2
    archetype_definition: "..."
    talent_zone: [...]
    shadow_zone: [...]
    activated_potentials:             # ⭐ v0.2
      creativity: 45
      intuition: 47
      ...
    today_transits: [...]
    focus_topics: ["love", "career"]
    locale: "zh-CN"

  voice_guide:
    zh: |
      用第二人称"你",避免"亲爱的"等修辞。
      隐喻系统贴合深潜者:水、深度、潜流、回声、暗礁。
      避免命令式("你应该")改为可能性("你可以试试")。
    en: |
      Use second person 'you' without endearments.
      Metaphors should match Deep Diver: water, depths, undercurrents, echoes.
      Replace imperatives with invitations ("you might try").

  tools_available:
    - get_transit
    - get_aspect
    - get_synastry_aspect
    - draw_tarot
    - get_user_archetype       # ⭐ v0.2
    - get_potential_radar      # ⭐ v0.2
    - generate_parallel_life   # ⭐ v0.2
    - search_knowledge

  safety:
    - 自杀/自残检测 → SafetyCard
    - 医疗/法律/投资 → 引导专业渠道
    - 政治 → 礼貌回避
```

### §8.4 模型路由

```
默认 (Plus + Pro):
  Claude Sonnet 4.6 (anthropic.com)
  Failover: GLM-4.7 (智谱)

Pro 实验功能:
  优先 Claude Opus 4.6
  Failover Sonnet 4.6

Free:
  Sonnet 4.6
  限制: max_output 1024 token

成本预算: 单轮 ~3000 input + ~500 output ≈ $0.01 (Sonnet)
```

### §8.5 引用 PRD 数据模型

```
[§6.1 ChatSession]      session_id, user_id, started_at, archetype_snapshot
[§6.1 ChatMessage]      role, content, tool_calls[], tokens_in/out, model, ts
[§6.1 SoulBlueprint]    system prompt 注入
[§6.1 PotentialRadar]   activated_potentials 注入
[§6.1 User]             tier, quota_used_today
[§5.3.2 System Prompt]  完整规约
[§5.3.4 Tools]          8 个 tool 定义
```

---

## §9 设计师 Figma 落地 Checklist

### §9.1 关键素材

```
插画:
  原型 silhouette (复用 §02)
  迷你星盘 SVG (复用 §05)

Lottie:
  /assets/lottie/typing-dots.json     3 点跳动
  /assets/lottie/avatar-breathing.json 头像呼吸光圈

字体: 同 §00
```

### §9.2 使用的 token / 组件

```
颜色: bg-deep, bg-card, bg-elevated, accent-gold, accent-purple, fg-*
字号: text-h2, text-body, text-body-sm, text-caption
组件:
  PageHeader
  ChatContextHeader (新)
  ChatHeaderAvatar (新)
  ContextChip (§00 §5.4.2)
  ChatBubble.ai/user/tool-call (§00 §5.4.1)
  ToolCallChip (新)
  CitationChip (新)
  GlyphChip (嵌入式,新)
  QuickReplyChip (复用)
  ComposeBar (新)
  VoiceButton (新)
  MiniNatalChart (新,80×80)
  TypingIndicator (新)
  SessionListItem (新)
  SafetyCard (新)
```

### §9.3 Figma 文件组织

```
🎨 04-AI-Chat
├─ 📄 Cover
├─ 📄 Mobile · Welcome (Empty)
├─ 📄 Mobile · Active Conversation (主状态)
├─ 📄 Mobile · ChatBubble Variants (user/ai/tool-call/error)
├─ 📄 Mobile · ToolCallChip Collapsed / Expanded / Active
├─ 📄 Mobile · GlyphChip + MiniNatalChart Overlay
├─ 📄 Mobile · Streaming State (token-by-token)
├─ 📄 Mobile · QuickReply + ComposeBar States
├─ 📄 Mobile · Quota Exhausted
├─ 📄 Mobile · Session List
├─ 📄 Mobile · Safety Card (Crisis Intervention)
├─ 📄 Mobile · Free / Plus / Pro Variants
├─ 📄 Desktop · 2-Column Layout
├─ 📄 Prototype Flow
└─ 📄 Animation Specs (typing, streaming, tool calls, planet highlight)
```

### §9.4 检验

- [ ] 3 种 ChatBubble 完整设计
- [ ] ToolCallChip 三态(折叠/展开/active)
- [ ] CitationChip + GlyphChip 嵌入式样式
- [ ] MiniNatalChart 浮层 + 主盘联动
- [ ] Welcome / Active / Quota Exhausted / Session List 四态
- [ ] SafetyCard 完整
- [ ] 3 用户层级差异
- [ ] 双语文案 42+ 条
- [ ] streaming 体验 frame-by-frame 标注

---

## §10 写完自检

- [x] 页面目标 + WCC KPI
- [x] URL + 进入/退出 + Session 生命周期
- [x] Wireframe 完整 + 10+ 子组件详细规格
- [x] Loading/Error/Welcome/Quota Exhausted/Session List 多态
- [x] 手势 12 项 + 动效 10 项 + Haptics 7 项 + 流式输出 UX 规范 + 上下文记忆策略 + 安全干预
- [x] 双语文案 42+ 条
- [x] Desktop 双栏 + 快捷键
- [x] API: 创建会话 + SSE 流式 + System Prompt 完整规约 + 模型路由
- [x] 引用 PRD: §5.3 / §5.3.2 / §5.3.4 / §5.0.3 / §9.2 / §6.1 (6 次)
- [x] 与 §00 / §02 / §03 一致

---

## 变更记录

| 版本 | 日期 | 内容 |
|---|---|---|
| v0.2 | 2026-05-11 | 初始版本,原型上下文 UI + Tool Call 可视化 |

---

**下一步**: `05-chart-3d.md` 本命盘 3D (技术风险最高的页面)
