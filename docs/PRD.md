# 星语 / StellarLog — 产品设计与信息架构文档

> 版本 v0.2 · 2026-05-11
> 面向海外华人 / 双语用户的西方占星 + 塔罗 + AI 占星师互动平台
>
> **v0.2 变更主线**：引入"灵魂人格学（Soul Archetype System）"作为产品骨架，原有五大能力模块（3D 本命盘 / AI 占星师 / 剧情卡 / 合盘 / 塔罗）成为能力底座，新增五大体验模块（灵魂蓝图 / 平行人生 / 年度角色卡 / 关系化学反应 / 潜能雷达）作为用户感知层。差异化从"会聊天的星盘"升级为"看见你尚未激活的自己"。

---

## 0. 一页概览 (One-Pager)

| 项 | 内容 |
|---|---|
| **产品名** | 星语 / StellarLog (待定，备选: Cosmara, Astrolog, 星海 Astrium) |
| **一句话定位** | 看见你尚未激活的自己 — 海外华人的中英双语灵魂人格平台 |
| **目标用户** | 18-35 岁海外华人 / ABC / 港台澳留学生与白领，双语用户 |
| **核心体系** | 灵魂人格学（天命原型 / 平行人生 / 潜能雷达） × 西方占星（本命 / 流年 / 合盘） × 塔罗 × AI 占星师 |
| **差异化** | (1) 灵魂人格学 Soul Archetype System — 天命原型 + 平行人生 + 潜能雷达 (2) 中英双语原生 (3) AI 占星师对话 — 基于本命盘 + 用户原型 (4) 3D 可玩星盘 (5) 剧情化潜能激活卡 |
| **MVP 周期目标** | 3 个月内推出可用版本 |
| **商业模式** | Freemium + 订阅 (深度解读/AI 上限/合盘) |
| **成功指标** | D7 留存 ≥ 25%, AI 对话用户 D30 留存 ≥ 35%, 分享率 ≥ 10% |

---

## 1. 用户画像

### Persona A — 留学生 Lily (24, 多伦多)

- 在加拿大读研，朋友圈中英混用
- 用过 Co-Star 但觉得文案太冷淡且无中文支持
- 对本命盘有基础了解，知道自己太阳天蝎、月亮双鱼、上升狮子
- 痛点：想用中文聊占星但 Co-Star/Sanctuary 无中文；国内占星网站访问慢且 UI 陈旧
- 期待：能用中文跟 AI 聊感情困惑，知道是不是因为金星逆行

### Persona B — 跨文化白领 Eric (31, 旧金山)

- ABC，中文读说流利但写不顺
- 占星泛娱乐用户，主要看每日运势、合盘
- 用过 The Pattern，喜欢"会主动提醒你"的感觉
- 痛点：想给国内父母/伴侣做合盘但产品都是单语
- 期待：可以一键切换中英文，分享卡片同时给双语朋友

### Persona C — 占星深度爱好者 Vivian (28, 伦敦)

- 学过塔罗、看过 Liz Greene 等经典著作
- 关注 Astro.com 但觉得 UI 上世纪、无社交
- 愿为深度内容付费 ($10-20/月)
- 期待：精确到秒的星历 (Swiss Ephemeris)、流年盘、太阳返照盘、塔罗记录簿

### 共同行为模式

- 每天 1-3 次打开 (碎片时间)
- 重大决策前会查星象 (面试、约会、换工作)
- 重要日子前查流年 (生日、新月、水逆)
- 喜欢分享精美卡片到 Instagram / 小红书 / Twitter

---

## 2. 产品定位与价值主张

### 2.1 一句话价值主张

> **"你的本命盘会说话 — 用你最舒服的语言。"**
>
> *Your birth chart can talk back — in whichever language you think in.*

更野心的版本（v0.2 起作为主推 hero copy）：

> **"你的星盘藏着你尚未激活的版本。"**
>
> *Your chart holds the version of you that hasn't woken up yet.*

### 2.2 四层价值

v0.1 的"理性 / 情感 / 社交"三层之上，v0.2 新增 **人格层**，作为产品最深价值锚点：

| 层 | 给用户的承诺 | 实现方式 |
|---|---|---|
| **理性层** | 比 Astro.com 还专业，但能看懂 | Swiss Ephemeris 精度 + 渐进式解读 |
| **情感层** | 不是冷冰冰的报告，是会陪你的伙伴 | AI 占星师对话 + 剧情化运势 |
| **社交层** | 你的星象值得被分享和看见 | 精美卡片 + 关系图谱 + 双语分享 |
| **人格层** ⭐ | 让你看见"你能成为谁"，而不只是"你是什么" | 灵魂蓝图（天命原型）+ 平行人生 + 潜能雷达 |

### 2.3 与竞品的差异化矩阵

| 维度 | Co-Star | Sanctuary | The Pattern | 国内占星 | **星语** |
|---|---|---|---|---|---|
| 中英双语 | ❌ | ❌ | ❌ | 仅中 | ✅ 原生 |
| AI 对话 | 有但浅 | ❌ (真人) | ❌ | 极少 | ✅ 基于本命盘 + 原型 |
| 3D 星盘 | ❌ | ❌ | ❌ | ❌ | ✅ |
| 流年/Transit | 部分 | ❌ | ✅ | 弱 | ✅ |
| 合盘 | ✅ | 弱 | ✅ | 弱 | ✅ + 关系化学反应 |
| 塔罗 | ❌ | ✅ | ❌ | 弱 | ✅ + 记录簿 |
| 剧情化运势 | ❌ | ❌ | ❌ | ❌ | ✅ |
| **人格化深度** ⭐ | 浅人格标签 | ❌ | 浅 | ❌ | ✅ 灵魂蓝图 + 平行人生 + 潜能雷达 |

> 关键洞察：前 7 行是竞品都能追的能力维度；最后一行的"人格化深度"是 v0.2 真正的护城河 — 它不是新功能，是把所有功能重新组织在"看见 + 成为谁"这条叙事下。

---

## 3. 信息架构 (IA)

### 3.1 站点地图

```
星语 StellarLog
│
├─ /  首页 (未登录态)
│   ├─ 30 秒星盘速测 (Hook)
│   └─ 价值主张展示
│
├─ /onboarding  注册引导
│   ├─ /step-1  生日 + 生时 (含"我不确定"分支)
│   ├─ /step-2  出生地点 (地图选择)
│   ├─ /step-3  语言偏好 (中/英/双语)
│   ├─ /step-4  关注议题 (感情/事业/成长)
│   └─ /step-5  天命原型 Hook 卡 ⭐ v0.2 转化关键
│
├─ /today  今日 (登录后首页) ⭐ 核心页
│   ├─ 今日剧情卡 (含潜能激活反馈)
│   ├─ Transit 提醒 (重要相位)
│   ├─ 今日塔罗
│   ├─ 灵魂蓝图入口 (天命原型摘要卡)
│   └─ AI 占星师对话入口
│
├─ /blueprint  灵魂蓝图 ⭐ v0.2 引流核心
│   ├─ /blueprint/result   完整报告 (天赋 / 阴影 / 进化路径 / 年度角色)
│   ├─ /blueprint/share    分享卡片公开页
│   └─ /blueprint/upgrade  升级到完整版的付费墙
│
├─ /chart  本命盘
│   ├─ /chart/3d        3D 互动星盘 ⭐
│   ├─ /chart/wheel     传统 2D 圆盘
│   ├─ /chart/houses    宫位详解
│   ├─ /chart/planets   行星详解 (含"潜能开关"视角)
│   └─ /chart/aspects   相位详解
│
├─ /ai  AI 占星师 ⭐ 核心
│   ├─ /ai/chat         对话主界面 (注入天命原型上下文)
│   ├─ /ai/history      历史对话
│   └─ /ai/topics       预设话题入口
│
├─ /lives  平行人生模拟器 ⭐ Plus 付费钩子
│   ├─ /lives/overview  路径数与名字 (Free 可见)
│   └─ /lives/:pathId   单条路径详细分析 (Plus 解锁)
│
├─ /year-card  年度角色卡 (生日触发) ⭐ 留存利器
│   ├─ /year-card/:year  某年角色卡详情
│   └─ /year-card/share  分享页
│
├─ /radar  潜能雷达 (六维)
│   └─ (Pro 看完整三层数据 + 流年实时影响)
│
├─ /transits  流年与运势
│   ├─ /transits/today
│   ├─ /transits/month
│   ├─ /transits/year   年度报告
│   └─ /transits/return 太阳/月亮返照盘
│
├─ /synastry  合盘 (v0.2 升级为关系化学反应)
│   ├─ /synastry/new        创建合盘
│   ├─ /synastry/:id        合盘详情 (含组合原型化学反应卡)
│   └─ /synastry/relations  关系图谱
│
├─ /tarot  塔罗
│   ├─ /tarot/daily         每日一牌
│   ├─ /tarot/spread        牌阵 (三张/凯尔特十字)
│   ├─ /tarot/journal       塔罗日记
│   └─ /tarot/deck          牌库浏览
│
├─ /learn  学习中心 (留存武器)
│   ├─ /learn/glossary      术语表 (双语)
│   ├─ /learn/articles      文章
│   ├─ /learn/archetypes    36 天命原型百科 ⭐ v0.2 新增
│   └─ /learn/level         潜能觉醒等级体系
│
├─ /share/:cardId  分享卡片 (公开页, SEO)
│
└─ /me  个人中心
    ├─ /me/profile       基本资料 (含天命原型徽章)
    ├─ /me/level         潜能觉醒等级与成就
    ├─ /me/relations     关系列表
    ├─ /me/year-cards    历年年度角色卡归档 (Pro 看全部)
    ├─ /me/subscription  订阅管理
    └─ /me/settings      设置 (语言/时区/通知)
```

### 3.2 顶级导航 (Bottom Tab / Top Nav)

桌面：顶部水平导航
移动：底部 5 个 Tab

```
[今日 Today] [星盘 Chart] [AI 对话] [塔罗 Tarot] [我 Me]
```

合盘、流年、学习中心从对应主 Tab 二级入口进入，避免一级膨胀。

**v0.2 新模块的入口分配**（5 Tab 保持不变）：
- **灵魂蓝图** `/blueprint`：从 Today 顶部"天命原型摘要卡" + Me 个人主页头部徽章进入
- **平行人生** `/lives`：从 Blueprint 报告底部 CTA + AI 对话推荐进入
- **年度角色卡** `/year-card`：生日前 3 天通过 push/横幅触达，归档在 Me → 年度角色卡
- **潜能雷达** `/radar`：从 Today 浮窗 + Me → 潜能雷达进入

### 3.3 URL 命名约定

- 路径全小写 kebab-case
- 中英语言通过 cookie + URL prefix 双轨：`/zh/chart`、`/en/chart`，默认根据浏览器
- 用户内容使用短 ID：`/synastry/r7Kp2`，便于分享
- 分享卡片支持 OG 图片：`/share/:cardId.png`

---

## 4. 关键用户旅程

### 4.1 首次访问 → 转化为注册用户

```
[访问 / ]
   ↓
[展示 Hero: 输入你的生日, 30 秒看你的天命原型]   ⭐ v0.2 升级措辞
   ↓
[输入生日 + 大致出生时间 (含"不确定"选项)]
   ↓
[展示天命原型 Hook 卡 ⭐ v0.2]
   例: "✨ 你是「深潜者」— 你拥有看穿表象的本能直觉..."
   底部: 「📖 看完整灵魂蓝图」 「📤 分享我的原型」
   ↓
[卡片底部 CTA: "想看完整灵魂蓝图? 补充出生地"]
   ↓
[注册 (Google / Apple / Email)]
   ↓
[onboarding 完整数据采集 → 生成完整灵魂蓝图 → 跳到 /today]
```

设计要点：
- 不强制登录看 Hook 结论，降低门槛
- ⭐ v0.2: Hook 从"列举式"(太阳/月亮/上升) 升级为"身份命名式"(你是「深潜者」)——后者爆点更强,分享率预期 ×3
- 文案要"刺中人心"，不要泛泛而谈
- 出生时间不确定时降级到简化原型 (太阳 × 月亮,无上升与凯龙)

### 4.2 核心日活路径

```
[Push: 今天月亮触发你的金星, 你的洞察力有点亮的机会]   ⭐ v0.2 加潜能视角
   ↓
[打开 → /today]
   ↓
[今日剧情卡 → 选择 A/B/C → 展示解读]
   ↓
[浮窗弹出: "🔓 你激活了「直觉力」+1"]   ⭐ v0.2 新增
   ↓
[底部推荐: 想问 AI 占星师吗?]
   ↓
[/ai/chat → 对话 (AI 以"作为深潜者,你..."开场)]
   ↓
[对话末尾推荐: 今日塔罗 / 看看完整流年 / 解锁平行人生路径 B]
```

### 4.3 合盘传播路径

```
[/synastry/new → 输入对方信息或邀请链接]
   ↓
[生成合盘 → 展示组合原型卡 (如「深渊灯塔」)]   ⭐ v0.2 升级
   ↓
[展示三维化学评分 (创业/恋爱/友谊)]
   ↓
[一键生成双语分享卡片 (组合原型 + 评分)]
   ↓
[分享到 IG / 小红书 / WeChat]
   ↓
[对方点击 → 看到合盘公开页 (含 ta 的原型) → 触发自己的注册]
```

### 4.4 年度角色卡触发路径 ⭐ v0.2 新增 (年度留存利器)

```
[生日前 3 天 → Push: "你的 2026 角色卡已生成,点击查收"]
   ↓
[打开 → /year-card/2026]
   ↓
[展示 RPG 风角色卡: 主线 / 支线 / 隐藏副本 / 装备]
   ↓
[领取动画 + 自动归档到 /me/year-cards]
   ↓
[CTA: 「分享给朋友」 + 「解锁 Pro 看历史角色卡库」]
   ↓
[全年内任意时间可回看,但首次生成固定时点 → 制造仪式感]
```

设计要点:
- 生日是产品的天然回归点,这条路径全年只触发一次,但留存价值极高
- 历史角色卡库随用户在产品停留越久越完整,**离开成本指数级上升**
- 角色卡分享率预期 > 灵魂蓝图,因为它带"年度仪式"色彩

---

## 5. 核心功能模块详细设计

> v0.2 结构提示：§5.0 是统领章节（产品骨架），§5.1-5.8 是**能力底座** + 在底座之上的"人格化包装"，§5.9-5.11 是**新增体验模块**（平行人生 / 年度角色卡 / 潜能雷达）。所有模块共享同一个 `archetype` 上下文。

### 5.0 灵魂人格学系统 (Soul Archetype System) ⭐ v0.2 产品骨架

#### 5.0.1 为什么需要这层抽象

竞品（Co-Star / Sanctuary / The Pattern）的占星产品落点都在"运势播报"或"浅层人格标签"，用户用完一次就走。付费意愿最强、分享传播最广的内容类别——参考 MBTI、人类图、Big Five——都是"**自我认知 + 潜能开发**"，本质是给用户一个"被命名"的爆点。

星语 v0.2 的策略：**把本命盘包装为"灵魂人格学"，走心理学路线，避开迷信感。** 用户看到的不是冷冰冰的"太阳天蝎、月亮双鱼"，而是被赋予一个有故事的身份卡——"你是**深潜者**"。

#### 5.0.2 36 个天命原型库 (Archetype Library)

原型 = 由本命盘核心要素映射出的一个稳定身份模型。设计要点：

| 维度 | 设计 |
|---|---|
| 数量 | 36 个 (3×12 结构，便于网格化呈现与传播) |
| 命名 | 2-3 字中文 + 英文短语，如 **深潜者 Deep Diver**、**织梦人 Dream Weaver**、**搭桥者 Bridge Builder**、**燃灯人 Light Bearer** |
| 输入要素 | 太阳星座 × 月亮星座 × 上升 + 北交点（业力方向）+ 凯龙（创伤主题）|
| 计算 | 决策树兜底（保证落点稳定）+ LLM 微调润色（保证文案灵动）|
| 双语 | 每个原型有独立的中英双语命名 + 解读，不互译 |

> **算法不暴露给用户**——展示时只给"原型名 + 你的天赋区 + 阴影区 + 进化路径"，类似 MBTI 给四个字母却不解释具体维度怎么算出来的。这种"被命名"的体验是 Hook 的关键。

#### 5.0.3 原型 = 所有模块的公共上下文

```
        ┌──────────────────────────┐
        │   用户的 primary_archetype   │
        │   (生成一次,永久缓存)        │
        └──────────────┬───────────┘
                       │ 注入
       ┌──────────┬────┼────┬──────────┬──────────┐
       ↓          ↓    ↓    ↓          ↓          ↓
   AI prompt  剧情卡  3D盘  合盘组合  雷达初始权重  分享卡
   system_msg  framing 解读  原型命名  六维分布     视觉
```

落地清单：
- **§5.3 AI 占星师** — `system_prompt.context_data.archetype` 字段注入
- **§5.4 剧情卡** — 选项围绕"激活原型天赋"或"回避原型阴影"设计
- **§5.2 本命盘** — Layer 4 解读引擎按原型解读 (~40 条文案)
- **§5.6 合盘** — 两个原型 → 一张"组合原型卡"（如"深渊灯塔 = 深潜者 × 燃灯人"）
- **§5.11 潜能雷达** — 原型决定六维的初始分布（深潜者起手"洞察力"上限高）
- **§5.10 年度角色卡** — 在原型骨架上叠流年事件，生成 RPG 角色卡

#### 5.0.4 报告结构 (灵魂蓝图)

用户首次进入 `/blueprint` 看到的报告页（同时也是 §5.9 平行人生、§5.10 年度角色卡的入口）：

```
┌──────────────────────────────────┐
│  你是 「深潜者」                  │
│  Deep Diver                      │
│                                  │
│ ⭐ 天赋区                         │
│   - 看穿表象的本能直觉             │
│   - 在情绪深水里仍能呼吸           │
│   - 对未被言说的事物特别敏锐        │
│                                  │
│ 🌒 阴影区                          │
│   - 容易把痛苦内化为孤独           │
│   - 防御性的"我不需要任何人"        │
│                                  │
│ 🧭 进化路径 (南交 → 北交)          │
│   "从独自承担,走向被看见的脆弱"     │
│                                  │
│ 🎴 你的 2026 年度角色:             │
│   「灯塔守望者」                  │
│                                  │
│ [💬 跟 AI 聊聊我]  [📤 分享卡片]   │
└──────────────────────────────────┘
```

分享文案模板：**"我是 [原型名]，我的天赋是 [天赋一句话]，我在修炼 [进化路径]。"**

#### 5.0.5 商业化嵌入

- Free：原型名 + 天赋区 + 阴影区（基础版灵魂蓝图）
- Plus：完整报告（含进化路径 + 年度角色 + 1 条平行人生详情）
- Pro：完整 + 原型自定义 + 历史角色卡库
- 一次性付费：**深度灵魂报告 PDF $9.99**（30+ 页 LLM 长文，可作为生日礼物送人）

#### 数据采集策略

```
必需:
  - 生日 (年月日)
  - 出生时间 (含"我不确定"开关)
  - 出生地 (城市级，地图辅助选择)

可选:
  - 性别认同 (合盘文案用)
  - 显示名 / 昵称
  - 头像
  - 时区 (从出生地自动推算 + 当前地区检测)

偏好:
  - 主语言 (中/英/双语自动切换)
  - 关注议题 (感情/事业/财富/灵性/家庭/健康)
  - 通知偏好 (Transit 触发/每日运势/合盘动态)
```

#### "生时不确定"分支处理

占星学痛点：很多用户不知道精确出生时间。处理策略：

| 用户输入 | 系统行为 | 可用功能 |
|---|---|---|
| 精确到分钟 | 完整本命盘 | 全部功能 |
| 只知道"上午/下午" | Solar Chart (太阳为 1 宫) | 太阳、月亮、行星宫位估算 |
| 完全不知道 | 仅星座 (太阳 + 月亮估算) | 受限功能，引导询问父母 |

UI: 提供"生时确定度"滑块 (确定 / 大致 / 不知道)，并提示精度影响。

**生时不确定时的原型降级**（v0.2）：
- 精确到分钟 → 完整原型（太阳 × 月亮 × 上升 + 北交 + 凯龙）
- 上午/下午 → 简化原型（太阳 × 月亮 + 北交，去掉上升与凯龙参数）
- 完全不知道 → 极简原型（仅太阳 × 月亮 → 12×12=144 组合压缩到 36 原型的子集）

无论降级到哪一级，都保证用户能拿到一个原型名，不留空白页。

#### Step-5: 天命原型 Hook 卡 ⭐ v0.2 新增 (转化关键)

Step 1-4 完成后，立即（不等用户进入 `/today`）展示一张原型 Hook 卡：

```
┌──────────────────────────────────┐
│   ✨ 你是 「深潜者」 ✨            │
│      Deep Diver                  │
│                                  │
│   你拥有看穿表象的本能直觉,        │
│   在情绪深水里仍能呼吸。           │
│                                  │
│   今年的你正在修炼:                │
│   "从独自承担,走向被看见的脆弱"     │
│                                  │
│   [📖 看完整灵魂蓝图]              │
│   [📤 分享我的原型]                │
└──────────────────────────────────┘
```

设计要点：
- 这张卡是 v0.2 的**转化金叉**——比起 v0.1 "你的太阳/月亮/上升"的列举式 Hook，被命名为"深潜者"这种身份感更强
- 卡片底部 CTA 优先级：「看完整灵魂蓝图」 > 「分享」 > 「跳过」
- 分享按钮直接生成图片到剪贴板，不强制注册即可分享（公开页 `/share/:cardId`）
- 三色分享卡：双语版 / 中文版 / 英文版

#### 双语策略

- 检测浏览器 `Accept-Language`
- 显示三种 UI 模式可切换：
  - 中文界面
  - English UI
  - 双语并排 (中文为主，英文术语标注)
- 占星术语建立中英对照术语表，所有内容支持 hover/tap 切换显示

### 5.2 本命盘 (Birth Chart)

#### 5.2.1 3D 互动星盘 ⭐

技术：Three.js / React Three Fiber

布局：
```
外圈:  黄道十二宫 (3D 圆环, 缓慢旋转)
中圈:  12 宫位 (Placidus 默认, 可切 Whole Sign / Koch / Equal)
内圈:  10 行星 + 凯龙 + 北交点 + Lilith
连线:  主要相位 (合相/对分/三分/四分/六分)
```

交互：
- 拖拽旋转视角
- 点击行星 → 弹出该行星解读卡 (星座 + 宫位 + 主要相位)
- **点击行星「潜能开关」视角** ⭐ v0.2 新增：在解读卡顶部加一行"这是你 [洞察力] 潜能的开关，当前激活度 60%"，点击跳转 `/radar` 雷达页
- 点击宫位 → 弹出宫位主题解读
- 点击相位线 → 弹出该相位含义
- 悬停显示精确度数
- "时间机器"滑块：拖动改变出生时间 ±N 分钟，可视化看上升变化

性能要求：
- 移动端 60fps
- 包体积 < 200KB (compressed 不含 Three.js)
- 行星纹理使用 sprite + WebGL instancing

#### 5.2.2 2D 传统圆盘

降级方案，老派占星师友好：
- 用 `@astrodraw/astrochart` 或自绘 SVG
- 黑白学术风格
- 可下载为 PDF / PNG

#### 5.2.3 解读引擎

数据驱动，三层结构：

```
Layer 1: 单因子 (Planet in Sign / Planet in House / Sign in House)
  例: 太阳天蝎、月亮在 4 宫
  → 约 120 条短文案 (10 行星 × 12 星座 + 10 × 12 宫)

Layer 2: 双因子 (Aspect)
  例: 太阳合金星、月亮刑火星
  → 约 200 条 (10 行星两两 × 5 主相位, 去重)

Layer 3: 模式 (Pattern)
  例: 大三角、T 三角、星群、Stellium
  → 约 30 条

Layer 4: 原型解读 ⭐ v0.2 新增 (灵魂人格学层)
  例: "你是深潜者 — 你的天蝎太阳与双鱼月亮共振出水象深度,
       北交在双子提示你今年的进化是从内在世界走向公共表达"
  → 36 个原型 × 中英双语 ≈ 72 条长文案

总词条 ~390，每条中英双语 → ~780 条文案
```

文案策略：
- 长度分级：speed-read (1 行) / detail (3 段) / deep-dive (长文)
- 默认 detail 级，可一键切换深浅
- 避免宿命论措辞 ("你必定...") → 使用倾向性表述 ("你倾向于...")

### 5.3 AI 占星师对话 ⭐ (核心差异化)

#### 5.3.1 产品形态

```
┌──────────────────────────────┐
│ AI 占星师 · 双语                │
│                              │
│ 占星师: 你好 Lily, 我看到你太阳   │
│ 在天蝎、月亮双鱼，今天月亮恰好     │
│ 进入你的 7 宫，关系上会有信号...   │
│                              │
│ [💬 输入] [🎤 语音] [🃏 抽塔罗] │
│                              │
│ 推荐话题:                     │
│ - 我下周面试会顺利吗?           │
│ - 跟 X 还能继续吗?              │
│ - 这个月最重要的能量?           │
└──────────────────────────────┘
```

#### 5.3.2 技术实现

**Stack**: Claude (`claude-sonnet-4-6`) 主推理 + GLM-4.7 备选/降级 (海外华人覆盖)

**System Prompt 结构** (注入用户上下文):

```yaml
role: 资深占星师，温暖、专业、不宿命论
language: 根据用户 message 自动判断中/英，混语保留混语
context_data:
  archetype: ⭐ v0.2 新增
    primary: 深潜者 Deep Diver
    talent_zone: [情绪深度, 直觉洞察, 看穿表象]
    shadow_zone: [孤独防御, 把痛苦内化]
    evolution_path: 从独自承担,走向被看见的脆弱
  activated_potentials:  # 雷达数据 ⭐ v0.2 新增
    insight: 78 / ceiling 95
    intuition: 65 / ceiling 88
    creativity: 42 / ceiling 70
    leadership: 30 / ceiling 60
    social: 50 / ceiling 75
    execution: 55 / ceiling 80
  natal_chart:
    sun: 天蝎 8°23' (第 4 宫)
    moon: 双鱼 22°15' (第 8 宫)
    asc: 狮子 14°02'
    mc: 金牛 11°45'
    planets: [...]
    major_aspects: [...]
    patterns: [大三角 水象]
  current_transits:
    - 月亮今日进入第 7 宫
    - 木星本周三分本命金星
    - 水星明日逆行
  user_focus_topics: [感情, 事业]
  recent_conversations: 上次对话总结
guidelines:
  - 引用具体的星象数据,不空谈
  - **始终以用户的原型为锚点回答**（如"作为深潜者,你...") ⭐ v0.2
  - 给出可操作建议
  - 不预测具体事件(法律风险),给倾向和建议
  - 不评判用户决定
  - 涉及重大议题(健康/法律/财务)提醒咨询专业人士
```

#### 5.3.3 关键设计决策

| 决策 | 选择 | 理由 |
|---|---|---|
| 单 turn vs 多 turn | 多 turn,保留历史 | 占星对话是逐步深入的 |
| 历史长度 | 最近 10 轮 + 摘要 | 控制 token 成本 |
| Streaming | 是 | 占星解读偏长,体验关键 |
| Tool use | 是 | AI 可调用 `get_transit_today`、`get_synastry` 等工具 |
| 引用可视化 | 是 | AI 提到某行星时,星盘对应行星高亮 |

#### 5.3.4 Tool Use 设计

AI 占星师可调用的工具 (function calling):

```typescript
tools = [
  {
    name: "get_natal_data",
    description: "获取用户本命盘完整数据"
  },
  {
    name: "get_transits",
    description: "获取指定日期的 Transit 影响",
    params: { date: "ISO date", days: number }
  },
  {
    name: "get_synastry",
    description: "获取与某人的合盘数据",
    params: { person_id: string }
  },
  {
    name: "draw_tarot",
    description: "为用户抽塔罗回应问题",
    params: { spread: "single" | "three_card" }
  },
  {
    name: "calculate_solar_return",
    description: "计算今年太阳返照盘"
  },
  // ⭐ v0.2 新增 (灵魂人格学层)
  {
    name: "get_user_archetype",
    description: "获取用户的灵魂蓝图(原型 + 天赋区 + 阴影区 + 进化路径)"
  },
  {
    name: "get_potential_radar",
    description: "获取用户当前六维潜能雷达数据(灰圈/彩圈/闪烁层)",
    params: { include_history: boolean }
  },
  {
    name: "generate_parallel_life_hint",
    description: "针对用户某个职业/感情议题,基于平行人生数据给一句方向性提示",
    params: { topic: "career" | "love" | "growth" }
  }
]
```

#### 5.3.5 限额与商业化

| 用户层级 | 每日对话 | 上下文长度 | 工具调用 |
|---|---|---|---|
| 免费 | 5 轮/天 | 短 | 仅 natal |
| Plus ($7.99/月) | 30 轮/天 | 中 | + transits + tarot |
| Pro ($14.99/月) | 无限 | 长 | 全部 |

#### 5.3.6 安全与合规

- 健康/法律/财务等议题强制免责
- 自伤/危机话题触发人工干预提示 (导向专业资源)
- 不存储敏感对话内容超过 30 天,可随时删除
- 内容审核 (使用 Claude 的内置 safety + 自建关键词过滤)

### 5.4 每日剧情运势卡 ⭐ (留存利器)

#### 5.4.1 产品形态

替代传统"今日运势"陈词，做成短剧情选项卡：

```
┌─ 5/12 ─────────────────────┐
│ 月亮今天进入你的 7 宫,关系     │
│ 议题被照亮。下午 3 点左右       │
│ 你会面临一个选择:              │
│                            │
│ 场景: 一个旧友突然约你晚饭     │
│                            │
│  A) 答应 — 但你今晚原本想      │
│     一个人静静                │
│  B) 婉拒 — 但担心ta会失望      │
│  C) 改约下周                  │
│                            │
└────────────────────────────┘
```

用户选择后展示：
```
┌──────────────────────────┐
│ 你选了 B。                │
│                          │
│ 从你的金星-土星相位看,      │
│ 你常常在亲密和自由之间       │
│ 摇摆。今天月亮的能量提醒     │
│ 你: 真诚地表达需要,比委曲    │
│ 求全更接近亲密。             │
│                          │
│ 占星师 Tip: 试着说"我今晚 │
│ 需要 me-time, 下周我请你"。  │
│                          │
│ [💬 找 AI 聊聊] [⭐ 收藏]  │
└──────────────────────────┘
```

#### 5.4.2 生成机制

**剧情卡 = Daily Transit × User Archetype × Focus Topic × Story Template** ⭐ v0.2 升级

每天凌晨 0:00 (用户当地时间) 为活跃用户预生成：

```
1. 计算用户今日 Transit 与本命盘的关键互动
2. 选取最显著的相位 / 入宫事件 (1-2 个)
3. 结合用户的 archetype + focus_topics + 当前潜能激活状态 ⭐ v0.2
   - archetype 决定剧情的"情感语调"(深潜者的剧情有更多内在视角)
   - 当前潜能激活状态决定剧情指向"激活短板"还是"巩固长板"
4. 从故事模板库中选择匹配模板,LLM 填充用户化细节
5. 生成 3 个分支选项 + 各自的解读
   每个选项标注:
     - 该选项激活的潜能维度 (如:执行力 +1)
     - 或绕开的阴影 (如:回避了 "孤独防御")
```

模板库设计：
- ~200 个基础模板 (按 transit × topic 笛卡尔积)
- 每个模板 LLM 个性化生成具体场景文案
- 缓存模板生成结果,降低 LLM 成本
- ⭐ v0.2 新增:每个模板配 36 原型的"情感语调微调"层(轻量 prompt 加注),不重写模板

#### 5.4.2.1 选项的"潜能激活/阴影回避"语义 ⭐ v0.2

每个 A/B/C 选项不再只是"哪个选项更准",而是用户在做一次微小的人格练习。完成后实时反馈：

```
你选了 B。
🔓 你今天激活了「直觉力」+1 → 雷达对应维度闪光
🌒 你避开了「孤独防御」阴影 → 阴影地图上对应区域微亮
```

视觉上,选完一秒后从顶部弹出一个 1.5 秒的浮窗,导向 §5.11 潜能雷达。

#### 5.4.3 反馈循环

用户选完后可评分"准不准" → 反馈数据用于：
- 优化模板权重
- 个性化推荐 (用户偏好哪种 framing)
- 训练数据沉淀

### 5.5 流年与 Transit

#### 5.5.1 功能层级

```
今日 Transit       → 已含在 /today
本月 Transit 日历  → 月历视图,标注关键日期
年度报告           → 长文形式,关键时间节点
太阳返照盘 (Solar Return)
月亮返照盘 (Lunar Return)
推运盘 (Secondary Progression) — Plus 用户
```

#### 5.5.2 月历视图

```
┌─ 2026年5月 ───────────────────────┐
│  日  一  二  三  四  五  六        │
│         1   2   3   4*  5         │
│  6   7*  8   9   10  11  12       │
│      ★               ⚠            │
│  ...                              │
│                                  │
│ 标记说明:                          │
│ ★ 重要相位日 (吉)                  │
│ ⚠ 挑战相位日                       │
│ ☾ 新月/满月                       │
│ ☿ 水逆开始/结束                    │
└──────────────────────────────────┘
```

点击每一天 → 弹出当日详细 Transit 报告。

### 5.6 合盘与关系化学反应 (Synastry Chemistry) ⭐ v0.2 升级

> v0.1 命名"合盘与关系图谱"——技术能力视角；v0.2 升级为"关系化学反应"——人格化包装视角。底层数据计算不变，呈现方式与商业化层重写。

#### 5.6.1 合盘创建路径

```
路径 A: 输入对方信息 (生日+生时+地)
路径 B: 发送邀请链接给对方填写
路径 C: 对方也是 StellarLog 用户 → 互相授权
```

#### 5.6.2 合盘呈现 — 组合原型卡 ⭐ v0.2

两人的原型 → 一张"组合原型卡"，是 v0.2 关系模块的传播主力：

```
┌─────────────────────────────────┐
│  你 ←→ Sarah                    │
│                                │
│ 组合原型: 「深渊灯塔」              │
│   Deep Diver × Light Bearer     │
│   (你的深度 × ta 的温度)           │
│                                │
│ ⭐ 高频共振点:                    │
│   你的金星合 Sarah 的火星 (吸引力强)│
│   你的月亮三分她的木星 (情感互助)   │
│                                │
│ ⚠ 摩擦点:                        │
│   你的土星刑她的月亮 (责任感差异)   │
│                                │
│ 🎯 你们适合一起做什么:             │
│   长期项目 ✓✓✓                   │
│   日常陪伴 ✓✓                    │
│   高强度任务 ✓                    │
│                                │
│ [🔍 详细解读] [📤 分享] [💬 问AI] │
└─────────────────────────────────┘
```

设计要点：
- 36 个原型两两可生成 ~630 组合，预生成 + LLM 兜底（首次组合现算）
- 组合命名遵循"原型一 × 原型二 → 复合诗意名"模式，避免直接列原型名
- 分享卡片视觉风格与 §5.0 灵魂蓝图一致（同视觉体系）

#### 5.6.3 关系图谱 (差异化)

用户可以把所有合盘可视化为一张"关系星图"：

```
        [我]
       /  |  \
     恋人 妈妈 老板
     高频  挑战 共振
```

每条连线颜色/粗细表示关系健康度 (基于合盘核心相位算法评分)。

#### 5.6.4 化学评分 (Chemistry Score) ⭐ v0.2 新增

每对合盘除组合原型外，还展示三维评分（0-100），是社交传播的关键钩子：

| 维度 | 计算来源 | 用户感知 |
|---|---|---|
| **创业搭档度** | MC / 6宫 / 10宫互动 + 火星-土星协调度 | "适合一起开公司吗?" |
| **恋爱化学度** | 金星-火星 / 月亮-月亮 / 7宫 / 8宫 | "暧昧能修成正果吗?" |
| **友谊兼容度** | 水星-水星 / 11宫 / 风象元素 | "能聊一辈子吗?" |

视觉呈现：
```
       创业  ▰▰▰▰▰▰▰░░░  72
       恋爱  ▰▰▰▰▰▰▰▰▰░  88
       友谊  ▰▰▰▰▰▰░░░░  61
```

商业化：
- Free 只看一个综合数字 (一句话评语)
- Plus 看完整三维 + 组合原型卡 + 摩擦点详解
- 一次性付费: **深度关系化学报告 PDF $4.99**

### 5.7 塔罗

#### 5.7.1 牌阵

| 牌阵 | 卡片数 | 场景 |
|---|---|---|
| 每日一牌 | 1 | 每日打卡 |
| 三张牌 (过去/现在/未来) | 3 | 通用占卜 |
| 关系四张 | 4 | 感情议题 |
| 凯尔特十字 | 10 | 深度议题 (Plus 用户) |

#### 5.7.2 抽牌互动

3D 翻牌动画 (Three.js / Lottie)，配合音效：

```
1. 用户输入问题 (可选)
2. 看到一副牌堆
3. 切牌动画
4. 拖动选牌 → 翻面
5. 每张牌单独解读 + 整体语义
6. AI 占星师给出综合建议
```

#### 5.7.3 塔罗日记

每次抽牌自动记录,用户可回看:
- 日期 + 问题
- 抽到的牌 + 牌阵
- 当时的解读
- 用户后续记录 (一周后真实发生了什么)

→ 长期用户的强留存机制 (沉没成本)

### 5.8 潜能觉醒系统 (Awakening System) ⭐ v0.2 升级

> v0.1 命名"游戏化系统 / 占星师等级"——技能掌握视角；v0.2 升级为"潜能觉醒系统"——人格成长视角。等级名与解锁条件全面挂钩"六维潜能雷达"。

#### 5.8.1 潜能觉醒等级

| 等级 | 解锁条件 | 解锁内容 |
|---|---|---|
| Lv 1 **觉醒之初** | 注册完成 + 领取灵魂蓝图 | 本命盘 + 今日剧情卡 + 原型摘要 |
| Lv 2 **初见星图** | 连续 3 天 + 雷达任 1 维度 ≥ 20 | 完整灵魂蓝图(免费版) + 简易合盘 |
| Lv 3 **走入深潜** | 连续 7 天 + 雷达任 3 维度 ≥ 30 | 月运势 + 塔罗三张 + 一条平行人生路径名 |
| Lv 4 **潜能开光** | 连续 30 天 + 雷达 6 维度都 ≥ 30 | 流年 + 凯尔特十字 + 关系化学完整版 |
| Lv 5 **星语行家** | 订阅 Plus + 雷达任 1 维度 ≥ 70 | 推运盘 + 占星术语词典 + 平行人生详细 |
| Lv 6 **灵魂导师** | Pro + 通过原型测验 + 雷达 6 维度都 ≥ 50 | 原型自定义 + 解读模板自定义 + 社区贡献权限 |

设计逻辑：
- 等级不是单纯"使用时长"，而是"雷达点亮维度数 × 时长 × 订阅层级"的复合函数
- 雷达 + 等级互为表里：等级是状态量，雷达是过程量
- Lv6 改"灵魂导师"，与产品骨架（灵魂人格学）首尾呼应

#### 5.8.2 成就徽章

- **第一次系列**：第一次合盘、第一次抽塔罗、第一次问 AI、第一次领灵魂蓝图
- **探索系列**：走完本命盘所有 12 宫、了解 10 颗行星、点亮雷达 6 个维度
- **时刻系列**：在新月许愿、在水逆开始日打卡、领取生日年度角色卡
- **关系系列**：5 个合盘、10 个合盘、关系图谱完整
- **原型探索系列** ⭐ v0.2 新增：解锁 3 / 5 / 10 个不同的原型解读（通过合盘组合或测验）

徽章可展示在个人主页，可分享。

### 5.9 平行人生模拟器 (Parallel Lives) ⭐ v0.2 Plus 付费钩子

#### 5.9.1 产品形态

```
┌──────────────────────────────────┐
│  你的星盘里隐藏着 3 条潜能路径      │
│                                  │
│  路径 A:「公众表达者」              │
│   太阳-水星合相 × MC 在风象        │
│   📖 已解锁                       │
│                                  │
│  路径 B:「深度研究者」              │
│   3 宫 / 8 宫星群 × 北交在双子     │
│   🔒 升级 Plus 解锁                │
│                                  │
│  路径 C:「疗愈协调者」              │
│   月亮-海王相位 × 6 宫凯龙          │
│   🔒 升级 Plus 解锁                │
│                                  │
│  [✨ 升级 Plus 看全部]             │
└──────────────────────────────────┘
```

#### 5.9.2 生成机制

平行人生 **不预测未来**，而是基于本命盘识别 **三条用户先天具备但未必同时激活的能量路径**。理论根据：

- 行星-宫位组合本身就是多义的（一颗水星可以做记者、可以做学者、可以做商人）
- 北交节点 + 凯龙 + MC 共同构成"潜能向量"
- 一个本命盘通常可识别 2-3 个非冲突的发展路径

算法步骤：

```
1. 提取本命盘的"角色种子" (rolesseeds):
   - 个人三大 (太阳 / 月亮 / 上升) → 内核倾向
   - 水星 / 金星 / 火星 → 互动方式
   - MC + 北交 + 凯龙 → 发展方向
2. 用 36 原型库做种子聚类,识别 2-3 个最强信号
3. LLM 基于种子生成路径详情:
   - 路径名（2-5 字诗意命名）
   - 高光场景 (你在这条路径上 5 年后的一天)
   - 关键年龄节点 (基于流年推运)
   - 行动指南 (Plus / Pro 独占)
```

#### 5.9.3 分层呈现与商业化

| 层级 | 看到的内容 |
|---|---|
| Free | 3 条路径数 + 路径 A 的名字与一行描述 |
| Plus | 全部路径名 + 详细分析 + 1 条路径的行动指南 |
| Pro | 全部路径行动指南 + 关键年龄推运联动 |
| 一次性付费 ($6.99) | **职业天命分析报告 PDF**（专注职业路径深度） |

#### 5.9.4 防迷信措辞

避开"你应该转行做记者"这种宿命论。措辞规范：

- ✅ "你身上有'公众表达者'的种子，它在 _____ 这类场景最容易冒头"
- ✅ "如果想试这条路，可以从 _____ 开始"
- ❌ "你注定会成为 _____"
- ❌ "不走这条路你会失败"

### 5.10 年度角色卡 (Year Character Card) ⭐ v0.2 留存利器

#### 5.10.1 产品形态

每年生日触发，基于太阳返照盘 + 流年推运生成的 RPG 风格角色卡：

```
┌───────────────────────────────────┐
│ ⚔ 2026 灯塔守望者                  │
│   The Lighthouse Keeper            │
│                                   │
│ 你是「深潜者」在 2026 年的化身,     │
│ 主线任务: 把内在深度变为他人灯塔     │
│                                   │
│ 📜 主线任务                        │
│   - 完成一个公开发布 (写作/演讲)    │
│                                   │
│ 🌿 支线任务                        │
│   - 修复一段断裂关系               │
│   - 在 7 月木星入巨蟹时启动新住所计划 │
│                                   │
│ 🕳 隐藏副本                        │
│   - 11 月土星刑相期: 学会拒绝       │
│                                   │
│ 🎒 装备建议                        │
│   - 武器: 日记本 (整合内在洞察)     │
│   - 护甲: 一个真正信任的朋友        │
│   - 道具: 木星护身符 (4 月吉相位)   │
│                                   │
│ [📦 收藏到角色卡库] [📤 分享]      │
└───────────────────────────────────┘
```

#### 5.10.2 触发机制

- 生日前 3 天 push："你的 2026 角色卡已生成，点击查收"
- 用户领取后自动归档到 `/me/year-cards`
- 全年内任意时间可回看，但首次生成是固定时点 → 制造仪式感

#### 5.10.3 数据基础

```
输入:
  - 本命盘 (固定)
  - 太阳返照盘 (今年 vs 出生时同太阳度)
  - 当年 12 个月主要 Transit 日历

输出:
  - 主线/支线/隐藏副本 (按 Transit 类型映射)
  - 装备建议 (按今年北交所在领域 + 流年木星位置)
  - LLM 润色为 RPG 措辞
```

#### 5.10.4 历史角色卡库 (留存利器)

```
[2024 探路游侠]  [2025 织网人]  [2026 灯塔守望者] ...
```

用户的"人生编年史"——连续几年的角色卡形成可视化时间线，**离开成本越来越高**。

商业化：
- Free：当年限领 1 张
- Plus：当年完整 + 历史回看
- Pro：完整历史角色卡库 + 角色卡 PDF 导出

### 5.11 潜能雷达 (Potential Radar) ⭐ v0.2 游戏化成长

#### 5.11.1 六维定义

| 维度 | 中文 | 占星映射 |
|---|---|---|
| Creativity | 创造力 | 太阳 / 金星 / 5 宫 / 火元素 |
| Leadership | 领导力 | 太阳 / 火星 / 10 宫 / MC |
| Insight | 洞察力 | 水星 / 海王 / 8 宫 / 12 宫 |
| Social | 社交力 | 金星 / 水星 / 7 宫 / 11 宫 / 风元素 |
| Intuition | 直觉力 | 月亮 / 海王 / 水元素 |
| Execution | 执行力 | 火星 / 土星 / 6 宫 / 10 宫 / 土元素 |

#### 5.11.2 三色层雷达视觉

```
   洞察力 (灰圈 95 / 彩圈 60 / 闪光 +12 流年)
       ╱─╲
      ╱   ╲
直觉 ─     ─ 创造
     ╲   ╱
      ╲─╱
   执行/领导/社交
```

- **灰色层 (Ceiling)** = 本命盘潜力上限（一旦计算就不变）
- **彩色层 (Activated)** = 已激活的部分（随用户使用产品而增长）
- **闪烁层 (Transit Boost)** = 当前流年点亮（动态，每月刷新）

#### 5.11.3 激活机制（让用户回来用产品）

```
+1 创造力：完成一次塔罗记录
+1 洞察力：跟 AI 占星师做完一次深度对话 (≥10 轮)
+1 社交力：完成一次合盘
+1 执行力：连续 7 天打卡
+2 直觉力：在新月日记录一个直觉
+1 领导力：分享一张原型卡片
... (每周上限 +10, 防刷)
```

这是 **§9.1 留存机制**的可视化抓手——用户能"看见"自己在长 vs 没长。

#### 5.11.4 商业化分层

| 层级 | 看得到 |
|---|---|
| Free | 灰圈 + 彩圈两层（静态值，每周更新一次） |
| Plus | + 流年闪光层（每月更新） |
| Pro | 完整三层 + 实时流年（每日更新）+ 历史轨迹图 |

---

## 6. 数据模型

### 6.1 核心实体

```typescript
// 用户
User {
  id: UUID
  email: string (unique)
  oauth: { google?, apple?, wechat? }
  display_name: string
  avatar_url?: string
  language: "zh" | "en" | "bilingual"
  timezone: string  // IANA, e.g. "America/Toronto"
  current_location?: { lat, lng, city }
  focus_topics: string[]  // ["love", "career", ...]
  level: number
  primary_archetype_id?: string  // ⭐ v0.2: 用户的天命原型 (如 "deep_diver")
  archetype_locked_at?: timestamp  // ⭐ v0.2: 原型生成时间,用于版本升级判断
  created_at: timestamp
}

// 本命盘 (一个用户可以有多个 — 自己 + 关注的人)
NatalChart {
  id: UUID
  owner_user_id: UUID
  subject_type: "self" | "relation"
  subject_name: string
  birth: {
    datetime_utc: timestamp
    datetime_local: timestamp
    timezone: string
    location: { lat, lng, city, country }
    time_accuracy: "exact" | "approx" | "unknown"
  }
  // 计算结果 (派生数据,缓存)
  chart_data: {
    planets: { name, sign, degree, house, retrograde }[]
    houses: { number, sign, degree, system: "placidus" | ... }[]
    aspects: { p1, p2, type, orb, applying }[]
    patterns: string[]  // ["grand_trine_water", ...]
  }
  created_at: timestamp
}

// 关系/合盘
Relationship {
  id: UUID
  user_id: UUID
  related_chart_id: UUID  // 指向 NatalChart
  relation_type: "lover" | "family" | "friend" | "colleague" | "self"
  display_name: string
  synastry_data: {  // 缓存
    key_aspects: ...
    composite_chart: ...
    score: number  // 0-100, 用于关系图谱可视化
    combo_archetype_id?: string  // ⭐ v0.2: 组合原型 (如 "deep_lighthouse")
    chemistry_scores?: {  // ⭐ v0.2: 化学反应三维评分
      business: number  // 0-100
      romance: number
      friendship: number
    }
  }
  notes?: string
  created_at: timestamp
}

// AI 对话
Conversation {
  id: UUID
  user_id: UUID
  title: string  // 自动生成的标题
  messages: Message[]
  summary?: string  // 长对话自动摘要
  context_snapshot: {
    transits_at_start: any
    natal_data_version: string
  }
  language: "zh" | "en" | "mixed"
  created_at, updated_at
}

Message {
  role: "user" | "assistant" | "tool"
  content: string
  tool_calls?: any[]
  tokens: number
  created_at: timestamp
}

// 剧情卡
StoryCard {
  id: UUID
  user_id: UUID
  date: date  // 用户当地日期
  template_id: string
  scenario: string
  options: { id, label, interpretation }[]
  user_choice?: string
  user_rating?: number  // 1-5,事后准确度评分
  generated_at: timestamp
}

// 塔罗记录
TarotReading {
  id: UUID
  user_id: UUID
  spread: "single" | "three" | "relation" | "celtic_cross"
  question?: string
  cards: { position, card_name, orientation, interpretation }[]
  ai_summary?: string
  user_notes?: string
  outcome_notes?: string  // 用户后续补充
  created_at: timestamp
}

// 订阅
Subscription {
  id: UUID
  user_id: UUID
  tier: "free" | "plus" | "pro"
  provider: "stripe" | "apple" | "google"
  current_period_end: timestamp
  status: "active" | "canceled" | "past_due"
}

// 等级与成就
UserProgress {
  user_id: UUID  // PK
  level: number
  exp: number
  streak_days: number
  longest_streak: number
  badges: { id, earned_at }[]
  stats: {
    chats_count, synastries_count, tarot_count, ...
  }
}

// ─── ⭐ v0.2 新增: 灵魂人格学层实体 ───

// 灵魂蓝图 (用户的天命原型完整报告)
SoulBlueprint {
  user_id: UUID  // PK
  primary_archetype_id: string  // "deep_diver"
  secondary_archetype_id?: string  // 可选副原型 (用于光谱式呈现)
  talent_zone: string[]  // 天赋区描述句 ×3
  shadow_zone: string[]  // 阴影区描述句 ×2
  evolution_path: {
    south_node_narrative: string  // 来自南交点的过去模式
    north_node_narrative: string  // 北交点的进化方向
    integration_hint: string      // 整合建议
  }
  year_role_id?: string  // 关联当年的 YearCharacterCard
  computation_input: jsonb  // 计算输入快照,用于版本升级时重算
  archetype_library_version: string  // 36 原型库版本
  generated_at: timestamp
}

// 平行人生路径
ParallelLife {
  id: UUID
  user_id: UUID
  path_index: 1 | 2 | 3
  path_name: string  // "公众表达者" / "深度研究者" / "疗愈协调者"
  seed_combination: string  // 基于的本命盘要素组合
  highlight_scenario: string  // 5 年后的高光场景描述
  age_milestones: { age: number, event: string }[]  // 基于流年推运
  action_guide?: text  // Plus 解锁
  unlocked: boolean
  generated_at: timestamp
}

// 年度角色卡
YearCharacterCard {
  id: UUID
  user_id: UUID
  year: number  // 2026
  character_name: string  // "灯塔守望者"
  base_archetype_id: string  // 派生自用户原型
  main_quest: string
  side_quests: string[]
  hidden_dungeons: { trigger_month: number, theme: string }[]
  equipment: {
    weapon: string
    armor: string
    item: string
  }
  solar_return_data: jsonb  // 太阳返照盘快照
  generated_at: timestamp
  claimed_at?: timestamp  // 用户领取时间
}

// 潜能雷达
PotentialRadar {
  user_id: UUID  // PK
  dimensions: {
    creativity:  { ceiling: number, activated: number, transit_boost: number }
    leadership:  { ceiling: number, activated: number, transit_boost: number }
    insight:     { ceiling: number, activated: number, transit_boost: number }
    social:      { ceiling: number, activated: number, transit_boost: number }
    intuition:   { ceiling: number, activated: number, transit_boost: number }
    execution:   { ceiling: number, activated: number, transit_boost: number }
  }
  activation_log: {
    dimension: string
    source: "story_card" | "ai_chat" | "tarot" | "synastry" | "learn" | "share"
    delta: number
    ts: timestamp
  }[]
  last_transit_refresh: timestamp  // 闪烁层最近一次刷新
  weekly_activation_quota: number  // 每周激活上限,防刷
}
```

### 6.2 派生数据缓存策略

- 本命盘计算结果存 `chart_data` JSON 字段，本命盘永不变 → 计算一次永久缓存
- 流年/Transit → 每日凌晨预计算次日，缓存到 Redis (TTL 48h)
- 合盘 → 用户首次创建时计算，存 `synastry_data`，永久缓存
- AI 对话上下文 → Redis 缓存最近 10 轮 + summary
- **灵魂蓝图** ⭐ v0.2 → 生成一次永久缓存,只在原型库版本升级 (`archetype_library_version` 变化) 时触发重算
- **组合原型 (Relationship.synastry_data.combo_archetype_id)** ⭐ v0.2 → 首次合盘时计算,永久缓存;同一原型组合在跨用户复用 (查找 LRU 缓存表)
- **潜能雷达** ⭐ v0.2 → `activated` 实时写入,`ceiling` 在灵魂蓝图生成时一次性算出,`transit_boost` 每月凌晨刷新一次

### 6.3 关键索引

```sql
-- 用户当日剧情卡查询
CREATE INDEX idx_story_user_date ON story_cards(user_id, date DESC);

-- 用户对话列表 + 最近活跃
CREATE INDEX idx_conv_user_updated ON conversations(user_id, updated_at DESC);

-- 关系列表
CREATE INDEX idx_rel_user ON relationships(user_id, created_at DESC);
```

---

## 7. 技术架构

### 7.1 整体架构

```
┌──────────────────────────────────────────────────┐
│  CDN (CloudFlare / AWS CloudFront)               │
│   静态资源 + 全球分发 (覆盖海外华人)               │
└───────┬───────────────────────────┬──────────────┘
        ↓                           ↓
┌─────────────────────┐    ┌────────────────────┐
│  Next.js (Vercel)   │    │  分享卡片 OG image │
│   SSR + ISR + i18n  │    │   (Vercel OG)      │
│   /zh /en routes    │    └────────────────────┘
└────────┬────────────┘
         ↓
┌──────────────────────────────────────────────────┐
│  BFF (Node.js / tRPC or REST)                    │
│   认证 / 用户 / 配置 / 业务编排                   │
└─┬──────────┬────────────┬──────────┬─────────────┘
  ↓          ↓            ↓          ↓
┌─────┐   ┌──────┐    ┌──────┐   ┌──────────┐
│天文  │   │ AI   │    │ 内容 │   │ 通知     │
│算力  │   │ 服务 │    │ 服务 │   │ 服务     │
│Python│   │      │    │      │   │ Push/Mail│
│Kerykeion│ │Claude│    │CMS   │   │          │
│SwissEph │ │GLM   │    │      │   │          │
└──┬──┘   └──────┘    └──────┘   └──────────┘
   ↓
┌─────────────────────────────────────┐
│  PostgreSQL (用户 / 关系 / 内容)      │
│  Redis (缓存 / 队列 / 实时 transit)   │
│  S3 / R2 (分享卡片 / 头像 / 资源)     │
└─────────────────────────────────────┘
```

### 7.2 技术选型详表

| 模块 | 选择 | 备选 | 理由 |
|---|---|---|---|
| **前端框架** | Next.js 15 (App Router) | Remix | i18n + SSR + SEO + Vercel 一键部署 |
| **UI 组件** | Tailwind + shadcn/ui | MUI | 速度快, 易定制 |
| **3D 引擎** | React Three Fiber | Babylon | React 集成最好 |
| **动画** | Framer Motion + Lottie | GSAP | 易学 + 移动端友好 |
| **状态管理** | Zustand + TanStack Query | Redux | 轻量, 现代 |
| **i18n** | next-intl | i18next | App Router 原生支持 |
| **天文计算** | Swiss Ephemeris WASM | CircularNatalHoroscopeJS | 高精度 + 浏览器可跑 |
| **后端语言** | Node.js (BFF) + Python (算力) | 全 Node | Kerykeion 在 Python |
| **后端框架** | Hono / Express + FastAPI | NestJS | 轻量 |
| **数据库** | PostgreSQL (Supabase) | Aurora | 托管省事, 含 auth |
| **缓存/队列** | Upstash Redis | AWS ElastiCache | Serverless 友好 |
| **AI 模型** | Claude Sonnet 4.6 + GLM-4.7 (中文降级) | OpenAI | Claude 中英表现均衡 |
| **AI 编排** | Claude Agent SDK | LangChain | 官方 SDK, tool use 原生 |
| **存储** | Cloudflare R2 | S3 | 免出口流量, 适合 CDN |
| **认证** | Supabase Auth / Clerk | Auth0 | 开箱即用 |
| **支付** | Stripe + Apple/Google IAP | Paddle | 标准选择 |
| **推送** | OneSignal / WebPush | Firebase | 跨平台 |
| **监控** | Sentry + Vercel Analytics | DataDog | 性价比 |
| **CMS** | Sanity / Notion API | Contentful | 内容协作便利 |

### 7.3 关键模块技术深度

#### 7.3.1 星盘计算

**精度选择**:

- 用户输入精度 ±1 分钟 → 上升轴 ±15 角分误差,Swiss Ephemeris 完全覆盖
- 默认 Placidus 宫制 (国际主流),可切换 Whole Sign (Hellenistic 风格,海外流行)
- 容许度 (Orb)：合相 8°、对分 8°、三分 6°、四分 6°、六分 4° (可调)

**计算流**:

```
用户输入 (date, time, lat, lng)
  ↓
转换 UTC (考虑历史 DST,使用 IANA TZDB)
  ↓
计算 Julian Day
  ↓
Swiss Ephemeris WASM
  → 行星位置 (黄经/黄纬/速度)
  → 上升/中天
  → 宫位划分
  ↓
派生计算
  → 相位 (两两计算 + orb 过滤)
  → 星群/三角等模式识别
  ↓
存数据库 + Redis 缓存
```

**性能**:
- 客户端首次计算 ~50ms (WASM 已加载)
- 服务端用 Python Kerykeion 备份计算,确保一致性

#### 7.3.2 AI 服务

**模型路由策略**:

```typescript
function routeModel(message: string, userTier: Tier) {
  const language = detectLanguage(message);

  // Pro 用户始终用最好模型
  if (userTier === "pro") return "claude-sonnet-4-6";

  // 中文重内容用 GLM (成本低、中文好)
  if (language === "zh" && message.length > 100) {
    return "glm-4.7";
  }

  // 默认 Claude
  return "claude-sonnet-4-6";
}
```

**上下文管理**:

```
total_context = system_prompt (含 natal_chart 数据 ~2000 tokens)
              + recent_messages (10 轮 ~4000 tokens)
              + current_message
              + tool_results (按需 ~1000 tokens)

≈ 7000-10000 tokens / 请求
```

**成本预估** (按 Claude Sonnet 4.6 定价):
- 单轮平均 ~3000 input + ~500 output ≈ $0.01 / turn
- 免费用户 5 轮/天 ≈ $0.05/天 × 30 = $1.5/月/用户
- Plus 30 轮/天 ≈ $0.3/天 → 月成本 $9，售价 $7.99 → 亏损
- → **关键**：Plus 改为 30 轮/天但实际人均使用 ~10 轮 → 摊薄成本 ~$3/月，毛利 60%

#### 7.3.3 i18n 实现

```
/zh/today  → 中文 UI + 中文内容
/en/today  → 英文 UI + 英文内容
/today     → 根据 Accept-Language + Cookie 自动跳转

数据层:
content = { zh: "...", en: "..." }  // 静态内容
ai_output = LLM 根据 user.language 动态生成
术语 = 中英对照词典 (hover 显示对应语言)
```

时区处理：
- 所有时间 UTC 存储
- 显示时按 `user.timezone` 转换
- "今日" 概念按用户时区计算 (跨时区用户的 daily card 不会乱)

### 7.4 部署架构

```
开发 → Preview (Vercel PR Preview)
     → Staging (staging.stellarlog.app)
     → Production (stellarlog.app)

地区分布:
  Edge (CloudFlare) 全球
  Origin (Vercel Edge Runtime) 多区域
  数据库主区域: us-east (海外华人主集中地)
  数据库副本: ap-southeast (服务亚太)
```

---

## 8. MVP 路线图

### Phase 1 — MVP (Week 1-12)

**目标**: 验证核心假设 (灵魂蓝图原型 Hook + 双语 AI + 雷达点亮 是否打动海外华人)

> v0.2 关键变更:Phase 1 必须含**灵魂蓝图 V1** 与**潜能雷达 V1**,否则差异化丢失,产品退化为 v0.1 能力底座。

包含：
- ✅ Onboarding (含双语 + 不确定生时 + step-5 原型 Hook 卡) ⭐ v0.2
- ✅ **灵魂蓝图 V1 (含 36 原型库 + 基础天赋/阴影/进化路径报告)** ⭐ v0.2 核心
- ✅ 3D 本命盘 (核心行星 + 主相位 + 潜能开关视角)
- ✅ 本命盘解读 (Layer 1 + Layer 2 + Layer 4 原型解读)
- ✅ AI 占星师对话 (基于本命盘 + 原型上下文注入)
- ✅ 每日剧情卡 (5 个模板验证 + 选项 ↔ 潜能激活反馈)
- ✅ **潜能雷达 V1 (六维,仅展示灰圈+彩圈两层,不联动流年)** ⭐ v0.2
- ✅ 简易塔罗 (单牌 + 三张)
- ✅ 分享卡片 (原型卡 + 本命盘 + 塔罗)
- ✅ 基础订阅 (免费 / Plus)

不包含 (放 v2)：
- ❌ 平行人生模拟器 (→ Phase 2)
- ❌ 年度角色卡 (→ Phase 2,接近 6 月生日季再做)
- ❌ 完整合盘化学反应 (用极简版替代:仅"组合原型名 + 一行评分")
- ❌ 详细流年/Transit (只在剧情卡内提及)
- ❌ 完整关系图谱
- ❌ 凯尔特十字
- ❌ 完整潜能觉醒等级 (只保留 Lv1-2 与连续天数)

### Phase 2 — Growth (Week 13-24)

聚焦留存与传播:
- **平行人生模拟器** ⭐ v0.2 (Plus 钩子)
- **年度角色卡** ⭐ v0.2 (首批生日季触达 — Week 13-24 横跨夏秋,正好覆盖一波生日)
- **完整关系化学反应** ⭐ v0.2 (含组合原型 + 三维评分 + 分享卡)
- 完整合盘 + 关系图谱
- 流年报告
- **潜能雷达 V2** ⭐ v0.2 (含闪烁层流年联动)
- 完整潜能觉醒等级 (Lv3-4)
- 推送精细化 (Transit 触发 + 雷达点亮里程碑)

### Phase 3 — Premium (Week 25+)

聚焦付费转化:
- 太阳返照 / 月亮返照
- 推运盘
- 凯尔特十字
- AI 私人占星师 (Pro 解锁更深度 prompt + 原型自定义对话)
- **深度灵魂报告 PDF** ⭐ v0.2 ($9.99 一次性付费产品)
- **深度关系化学报告 PDF** ⭐ v0.2 ($4.99)
- **职业天命分析报告 PDF** ⭐ v0.2 ($6.99)
- 潜能觉醒 Lv5-6 + 原型测验
- 历史角色卡库 (Pro 全开放)

---

## 9. 留存与商业化

### 9.1 留存机制设计

| 机制 | 目的 | 实现 |
|---|---|---|
| **Hook 卡爆点** ⭐ v0.2 | D0 转化 | Onboarding 末页生成原型 Hook 卡 |
| **Daily Hook** | D1 留存 | 每日剧情卡 + Transit push + 雷达进度反馈 |
| **Streak** | D7 留存 | 连续打卡解锁徽章 + 潜能觉醒升级 |
| **AI 对话** | D30 留存 | 用户跟 AI 建立"关系"(注入原型上下文,有连续感) |
| **塔罗日记** | D90 留存 | 沉没成本(数据积累) |
| **潜能雷达** ⭐ v0.2 | 长期可视化 | 雷达点亮维度数 = 用户"看见自己长大" |
| **历史角色卡库** ⭐ v0.2 | 年度留存 | 连续几年的角色卡 = 人生编年史,迁移成本极高 |
| **关系图谱** | 长期留存 | 越用越完整,迁移成本高 |
| **学习路径** | 教育留存 | 等级解锁内容,有目标感 |

### 9.2 商业化设计

#### 订阅层级 ⭐ v0.2 按"人格潜能五大模块"权益矩阵重设计

| 维度 | **Free $0** | **Plus $7.99/月** | **Pro $14.99/月** |
|---|---|---|---|
| 灵魂蓝图 | 基础版(原型+天赋+阴影) | 完整版(+进化路径+年度角色) | 完整+原型自定义 |
| 平行人生 | 路径数+1 个名字 | 1 条完整路径详情+行动指南 | 全部路径完整+关键年龄推运 |
| 年度角色卡 | 当年限 1 张 | 当年完整+历史回看 | 完整历史角色卡库+PDF 导出 |
| 关系化学反应 | 仅综合评分+一句评语 | 完整三维评分+组合原型卡 | + 深度摩擦点解析+合盘 PDF |
| 潜能雷达 | 灰圈+彩圈两层,每周更新 | + 流年闪烁层,每月更新 | 完整三层+每日实时+历史轨迹图 |
| AI 占星师 | 5 轮/天,仅 natal 工具 | 30 轮/天,+ transits/tarot 工具 | 无限,全部工具 |
| 塔罗 | 1 次/天 单牌+三张 | 无限+凯尔特十字 | + 塔罗日记 AI 综合分析 |
| 本命盘解读 | 三层(L1+L2+L4) | + L3 模式 + 深浅切换 | + 自定义解读模板 |
| 流年/Transit | 仅今日剧情卡内提及 | 月历视图+年度报告 | + 推运盘+太阳/月亮返照 |
| 年定价 | — | $59.99/年 (优惠 ~37%) | $119.99/年 (优惠 ~33%) |

**地区差异化定价**:
- 北美 / 欧洲: 上面定价
- 亚洲 (港澳台 / 东南亚华人): Plus $4.99 / Pro $9.99 (PPP 调整)

#### 一次性付费产品 ⭐ v0.2 围绕"人格潜能"重组

| 产品 | 价格 | 内容 |
|---|---|---|
| **深度灵魂报告 PDF** | $9.99 | 30+ 页 LLM 长文,可作生日礼物送人 (基于完整原型 + 进化路径 + 流年) |
| **关系化学报告 PDF** | $4.99 | 单段关系深度分析 (组合原型 + 高频/摩擦点 + 三维评分逻辑详解) |
| **职业天命分析报告** | $6.99 | 聚焦平行人生中的职业路径,加 MC/北交/Vertex 深度解析 |
| **年度报告** | $9.99 | 生日时弹出 (与年度角色卡互补,角色卡是入口,报告是深度) |
| 太阳返照盘单次 | $2.99 | 保留 v0.1 产品 |

#### 增长机制

- 邀请朋友互相合盘 → 双方各得 7 天 Plus 试用
- 分享卡片带水印 → 自然引流 (v0.2 主推:**原型卡**与**组合原型卡**)
- SEO: `/share/:cardId` 公开页 + 内容文章 (双语长尾词)
- ⭐ v0.2 新增:**`/learn/archetypes` 36 原型百科**做 SEO 长尾,每个原型一篇双语长文,自然搜索引流

### 9.3 北极星指标

```
North Star: 每周活跃用户对 AI 占星师的对话次数 (WCC)

辅助指标:
- D1 / D7 / D30 留存
- 付费转化率 (目标 5% 免费→Plus)
- ARPU
- 分享率 / 推荐转化率
```

---

## 10. 国际化与本地化策略

### 10.1 双语原则

**不是简单翻译,是双重原生**:

| 维度 | 策略 |
|---|---|
| UI 文案 | 中英两版独立撰写,不互译 |
| 占星术语 | 建立权威双语术语表,可悬停切换 |
| AI 输出 | 根据用户消息自动判断,混语保留混语 |
| 内容文章 | 中英分别策划,关注议题略有差异 |
| 分享卡片 | 双语版 + 中文版 + 英文版,用户选 |

### 10.2 文化适配

- 中文版避免基督教/西方民俗隐喻
- 英文版避免过度中式表达
- 塔罗牌图：选择文化中性艺术风格 (避免欧洲教堂浓重元素或东方水墨)
- 颜色：避免单一文化强符号 (大红/纯白)

### 10.3 时区/日期

- 全部 UTC 存储
- 用户当地显示 (含 DST 自动)
- "今日" 概念按用户 timezone
- 出生地时区使用历史 TZDB (1970 年前的复杂时区由 Swiss Ephemeris 自带处理)

---

## 11. 风险与开放问题

### 11.1 主要风险

| 风险 | 等级 | 应对 |
|---|---|---|
| AI 内容合规 (心理/法律) | 高 | 强制免责声明 + 关键词过滤 + 危机转人工 |
| LLM 成本失控 | 中 | 缓存 + 模型路由 + 限额分级 |
| 出生时间数据不准 | 中 | 提供"不确定"分支 + 精度提示 |
| 海外华人市场规模有限 | 中 | 同步规划纯英文版扩展非华人用户 |
| 苹果商店占星类应用审核 | 中 | 强调"娱乐",非"预测" |
| 内容生产瓶颈 | 中 | 早期 LLM 辅助 + 后期签约占星师审核 |

### 11.2 待决策开放问题

1. **品牌名**：星语 / Cosmara / 星海 / Astrolog?
2. **本命盘宫制默认**：Placidus (国际通用) vs Whole Sign (Hellenistic 复兴)？
3. **是否做社区**：用户互发动态、占星笔记 — 增加留存但有运营成本与合规风险
4. **塔罗牌艺术风格**：自绘 (成本高) vs 授权经典牌 (Rider-Waite 公版可用)
5. **AI 占星师人格化**：单一 AI 还是多个性格 (温暖型 / 直白型 / 学院型)？
6. **是否做声音输出 (TTS)**：AI 占星师能"读"给你听 — 增加沉浸但成本上升
7. **数据隐私分级**：本命盘信息是否允许用户设为"完全私密"，连服务器也不存原始 birth data？

---

## 12. 下一步建议

1. **品牌定稿** + 商标可用性检查 + 域名注册
2. **设计稿** (Figma): 5 个核心页面
   - Onboarding (含 step-5 原型 Hook 卡) ⭐ v0.2
   - **灵魂蓝图报告页 `/blueprint/result`** ⭐ v0.2 (这是 v0.2 的产品门面)
   - Today (含原型摘要卡 + 雷达进度浮窗)
   - AI Chat (含原型上下文 UI)
   - 本命盘 3D (含潜能开关解读卡)
3. **天命原型库内容工程** ⭐ v0.2 (与设计并行,可独立启动)
   - 36 原型命名敲定 (中英双语,可注册商标的命名规避)
   - 每个原型 4 段文案: 一句话定义 + 天赋区 + 阴影区 + 进化路径 (×2 语言 = 72 文档)
   - 36 原型百科文章 (作为 `/learn/archetypes` SEO 长尾内容)
   - 36×36 组合原型命名 (~630 个,可预生成 + LLM 兜底)
4. **技术 spike**:
   - Swiss Ephemeris WASM 在 Next.js 中的可行性 + 包体积
   - 3D 星盘 60fps 在中端手机上的可行性
   - Claude tool use + 自定义 transit 工具集成
   - ⭐ v0.2: **原型映射决策树 + LLM 后处理**的可行性验证 (本命盘核心要素 → 原型 ID 的稳定输出)
   - ⭐ v0.2: **潜能雷达六维评分函数**的占星映射设计 + 校准
5. **MVP 开发启动** (Phase 1 按 v0.2 重排版的清单拆分到 sprint)

---

## 附录 A — 占星术语双语对照表 (节选)

| 中文 | English | 说明 |
|---|---|---|
| 本命盘 | Natal Chart / Birth Chart | |
| 上升星座 | Ascendant / Rising Sign | 1 宫宫头 |
| 中天 | Midheaven / MC | 10 宫宫头 |
| 太阳返照 | Solar Return | 每年生日的盘 |
| 推运 | Progression | 通常指次限推运 |
| 流年 | Transit | 当前行星与本命盘的关系 |
| 合盘 | Synastry | 双盘叠加比较 |
| 中点盘 | Composite Chart | 关系合成盘 |
| 相位 | Aspect | 行星间角度 |
| 容许度 | Orb | 相位偏差 |
| 凯龙 | Chiron | 小行星,创伤主题 |
| 北交点 | North Node | 业力点 |
| 莉莉丝 | Lilith / Black Moon | 黑月 |
| 大三角 | Grand Trine | 三个行星 120°互成 |
| T 三角 | T-Square | 两个对分 + 中点四分 |
| 星群 | Stellium | 3+ 行星汇聚 |

完整版见 `/learn/glossary`，UI 中所有术语 hover/tap 可切换语言。

---

## 附录 B — 关键参考资料

- 商业范式参考: Co-Star (https://www.costarastrology.com/)、The Pattern、Sanctuary
- 技术参考:
  - Swiss Ephemeris: https://www.astro.com/swisseph/
  - Kerykeion: https://github.com/g-battaglia/kerykeion
  - CircularNatalHoroscopeJS: https://github.com/0xStarcat/CircularNatalHoroscopeJS
  - AstroChart: https://github.com/Kibo/AstroChart
- 内容参考: Liz Greene, Stephen Arroyo, Howard Sasportas (人本占星派)

---

*文档版本 v0.1,后续在 issues 中迭代*
