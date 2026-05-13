# StellarLog Design Spec · MVP 5 核心页

> Figma 落地用的高保真设计规格文档(Markdown)。**不是 Figma 文件本身**,而是设计师/开发拿到即可在 Figma 画稿、在 Next.js 写组件的输入。
>
> 对应 PRD: `docs/PRD.md` v0.2 · 2026-05-11
> 调性: 现代神秘主义(几何现代骨架 + 奇幻装饰层)
> 优先端: Mobile First (Desktop 后续作响应式适配)

---

## 文件索引

```
docs/design/
├─ README.md                   ← 本文件,导航 + PRD 映射 + 实施顺序
├─ 00-system.md                设计系统总览(token + 组件库 + 双语策略)
├─ 01-onboarding.md            页面 1: Onboarding 5 步流程 + Hook 卡
├─ 02-blueprint-result.md      页面 2: 灵魂蓝图报告页 ⭐ v0.2 产品门面
├─ 03-today.md                 页面 3: Today 首页(日活路径)
├─ 04-ai-chat.md               页面 4: AI 占星师对话(原型上下文 UI)
└─ 05-chart-3d.md              页面 5: 本命盘 3D(含 v0.2 潜能开关)
```

---

## 与 PRD 章节的对应

| 设计文件 | PRD 章节 |
|---|---|
| `00-system.md` | §0 一页概览(品牌定位/差异化) |
| `01-onboarding.md` | §5.1 Onboarding · §5.0.4 报告结构 · §4.1 首次访问转化 · Step-5 Hook 卡 |
| `02-blueprint-result.md` | §5.0 灵魂人格学系统 · §5.0.4 报告结构 · §5.0.5 商业化嵌入 · §5.9 平行人生 · §5.10 年度角色卡 · §5.11 潜能雷达 · §8 Phase 1 · §9.2 订阅矩阵 |
| `03-today.md` | §5.4 剧情卡 · §5.4.2.1 潜能激活反馈 · §5.11 潜能雷达浮窗 · §4.2 核心日活路径 · §5.0.3 原型作为公共上下文 |
| `04-ai-chat.md` | §5.3 AI 占星师 · §5.3.2 System Prompt · §5.3.4 Tools · §5.0.3 原型公共上下文 · §9.2 订阅配额 |
| `05-chart-3d.md` | §5.2 本命盘 · §5.2.1 3D 互动 · §5.2.3 Layer 4 原型解读 · §5.11 雷达联动 · §7 技术架构 |

### 全文 PRD 引用次数(grep `\[§`)
- 各页面至少引用 PRD 章节 ≥ 5 次
- 全 5 页合计 ≥ 30 次

---

## v0.2 五大体验模块覆盖检查

PRD v0.2 的差异化核心:**灵魂蓝图 / 平行人生 / 年度角色卡 / 关系化学 / 潜能雷达**。MVP 5 页覆盖情况:

| 模块 | 主出现页面 | 入口/预览页面 |
|---|---|---|
| 灵魂蓝图 (Soul Blueprint) | `02-blueprint-result.md` (主) + `01-onboarding.md` (Hook 卡) | `03-today.md` 顶部摘要 |
| 平行人生 (Parallel Lives) | `02-blueprint-result.md` §3.10 预告(Plus 锁) | 主页面预告,详情页见 PRD §5.9(MVP 后) |
| 年度角色卡 (Year Card) | `02-blueprint-result.md` §3.9 预览 | 详情页见 PRD §5.10(MVP 后) |
| 关系化学 (Synastry Chemistry) | (MVP 不含主页面,极简版仅"组合原型名 + 评分") | 见 PRD §5.6(Phase 2) |
| 潜能雷达 (Potential Radar) | `03-today.md` RadarOrb 浮窗 + `02-blueprint-result.md` §3.8 预览 + `05-chart-3d.md` 潜能开关联动 | 详情页 `/radar`(MVP 后) |

**注:** MVP 不画 §5.6 完整合盘页面、§5.9 平行人生详情页、§5.10 年度角色卡完整页、§5.11 潜能雷达完整页。这些都在 Phase 2 后再做。MVP 主要任务是把 5 大体验**入口**与"灵魂蓝图门面"打磨到极致,验证差异化是否成立。

---

## 实施顺序(按依赖)

按依赖与重要性分 5 批:

### 批 1: 设计系统 (00)
**`00-system.md`** — 必须最先完成,所有其他文档引用其 token / 组件。
- 色彩 token (基础 + 强调 + 雷达六维)
- Typography
- 间距 & 栅格
- 圆角 / 描边 / 阴影
- 全部组件库清单(基础 + 品牌 + 导航 + 对话 + 数据 + 沉浸)
- 动效原则
- 双语策略
- 插画 brief
- 无障碍基线
- Token 导出格式

### 批 2: 产品门面 (02)
**`02-blueprint-result.md`** — v0.2 的灵魂,最大文件(~900 行)。
- 11 个 Section 完整 wireframe
- 主原型卡 frame-by-frame 动效(2.2s 揭晓)
- Free / Plus / Pro 三层付费墙
- 三种原型降级状态
- 分享卡片(双语 / 中文 / 英文 三版本)
- PDF $9.99 升级钩子
- 双语文案表 38 条

### 批 3: Onboarding (01)
**`01-onboarding.md`** — 直接接到 02 的 shared-element 转场。
- 5 步流程 + Computing 中间态 + Step-5 Hook 卡
- Step-5 主原型卡 frame-by-frame 动效(4.5s 总长)
- 三种原型降级版本
- 无注册分享流程
- 60+ 条双语文案

### 批 4: 日活路径 (03 + 04)
**`03-today.md`** + **`04-ai-chat.md`** — 用户每天的两条主要路径。

`03-today.md`:
- 5 大 Section(原型摘要 / 剧情 / Transit / 塔罗 / AI 入口)
- RadarOrbWidget 浮窗 + 触发逻辑
- Story A/B/C 潜能激活反馈
- 50+ 条双语文案

`04-ai-chat.md`:
- ChatContextHeader "以原型视角对话" UI(v0.2 关键)
- 三种 ChatBubble(user / ai streaming + citations / tool-call)
- ToolCallChip 展开式 UI
- 行星 GlyphChip + MiniNatalChart 联动
- SSE 流式 + System Prompt 结构
- SafetyCard 自杀干预
- 42+ 条双语文案

### 批 5: 技术风险页 (05) + 索引 (README)
**`05-chart-3d.md`** — 性能与降级最重要的页。
- 3D NatalChart 视觉规格 + 性能预算
- PlanetInterpretSheet 四 Tab(含 v0.2 "潜能开关")
- TimeMachine 三模式
- 4 ViewMode (3D / 2D / 列表 / 简版)
- 雷达联动
- 38+ 条双语文案

**`README.md`** — 本文件,导航 + 映射 + 验证总览。

---

## 给设计师的协作指南

### 启动前

- [ ] 读完 `00-system.md`,把所有 token 在 Figma Variables 落地
- [ ] 把 5 个核心组件先建好 Component (ArchetypeCard / RadarChart6D / Button / ChatBubble / GlyphChip)
- [ ] 双语字体准备(Inter + Fraunces + 思源宋体 + PingFang)
- [ ] 与插画师沟通 36 原型 silhouette 立项(可先用 AI 生成临时占位)

### 每个页面 spec 拿到后的工作流

1. 通读一遍,标出疑问(如有,与产品同步澄清)
2. 在 Figma 新建该页面 file,按 §9 "Figma 文件组织"建 Pages
3. 主屏先画 Mobile · Default(主状态)
4. 各状态变体 frame
5. Prototype Flow connection
6. Animation specs 用 Figma 内嵌 video / GIF 或 Loom 链接记录
7. 完成后跑 §9.4 检验清单
8. Dev handoff 到 Tokens Studio / Figma to Code

### 与开发的对接

- 所有命名(`bg-deep`、`text-display-xl`、`Button.primary-gold` 等)与 `tailwind.config.ts` 一致
- ASCII Wireframe 不需要 100% 像素级精确,但**信息层级 + 交互态 + 状态变体**必须完整
- 双语文案以 spec 中的 i18n key 为准,而非 Figma 文本
- 动效以 spec §5 / §7 为准,Figma 仅做静态展示与必要的 timeline 说明

---

## 验证(完成全部 spec 后执行)

```bash
# 1. 文件清单
ls docs/design/
# 应输出: 00-system.md  01-onboarding.md  02-blueprint-result.md
#         03-today.md   04-ai-chat.md      05-chart-3d.md  README.md

# 2. PRD 引用次数
grep -rEc "\[§" docs/design/*.md
# 每个文件应 ≥ 5,合计 ≥ 30

# 3. 双语文案合计
grep -rE "^\| [^|]+\| [^|]+\| [^|]+\|" docs/design/0*.md | wc -l
# 应 ≥ 200

# 4. v0.2 关键词出现
grep -rEc "灵魂蓝图|平行人生|天命原型|潜能雷达|关系化学|深潜者|原型上下文" docs/design/
# 应 ≥ 50
```

---

## 不做的事(范围共识)

- ❌ Figma 文件本身(Claude Code 没这能力)
- ❌ 生产用插画/图标资源(写素材清单交给插画师)
- ❌ 品牌 logo 定稿(属于品牌定稿任务,PRD §12 第 1 项)
- ❌ Phase 2/3 的其余页面(平行人生页 / 年度角色卡完整页 / 合盘页 / 雷达详情页等暂时不写)
- ❌ Email / 推送通知模板(单独项目)
- ❌ 营销 Landing Page(单独项目)

---

## 后续工作(优先级)

按 PRD §12 推进:

1. **插画师 brief 与外包** — 36 原型 silhouette + 12 月年度角色卡主视觉(优先)
2. **平行人生 / 年度角色卡 / 雷达 / 合盘 详情页 spec** — Phase 2
3. **设计系统 Figma Library 发布** — 给设计/开发共享
4. **品牌 logo 与 wordmark 定稿** — 与字体 Fraunces / 思源宋体协调
5. **Email / Notification 设计** — 单独项目
6. **国际化 RTL 适配** — Phase 3(阿拉伯语市场后再做)

---

## 变更记录

| 版本 | 日期 | 内容 |
|---|---|---|
| v0.2 | 2026-05-11 | 初始版本,5 核心页 + 设计系统 + README 索引完成 |

---

**核心理念回顾**

> 几何现代骨架(70%)+ 奇幻装饰层(30%)
> 留白即神性,奇幻是点睛
> "看见你尚未激活的自己" — 让用户被命名为某个原型那一刻,产品才真正诞生

每一份 spec 都是为了让这句话在屏幕上发生。
