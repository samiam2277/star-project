# 06 · 36 原型百科 SEO Brief v1

> 对应任务:#3 原型百科文章 brief(SEO)
> 前置:`01-names.md`(36 命名)/`02-text.md`(72 段文案)/`archetypes.json`(元数据)
> 路由:`/learn/archetypes/[slug]` ⭐ v0.2 自然搜索引流主战场(PRD §9.2)
> 数据契约:`seo-brief.json`(本文档定义)
> 落地:36 篇双语长文 = 36 × 中英 = **72 份文章**;本任务交付**模板 + 1 张示例**,其余 35 张走批量生产流程(§9)

---

## §1 目标与受众

### 1.1 战略定位

`/learn/archetypes` 是 v0.2 引流主漏斗(PRD §9.2)。每篇文章一个目的:

```
搜索某个原型/星象 → 落地百科页 → 关键 CTA「测我的灵魂蓝图」→ 进入 onboarding
```

### 1.2 受众细分

| 段位 | 占比估计 | 语言偏好 | 典型查询 |
|---|---|---|---|
| **海外华人 18-35** | 50% | 中文为主 | 「拓荒者 性格」「白羊座 太阳 上升」「占星 36 原型」 |
| **ABC / 港台澳留学生** | 30% | 双语混合 | 「trailblazer 性格」「Aries archetype meaning」 |
| **英文用户(非华人)** | 20% | 纯英文 | "trailblazer archetype" / "aries sun personality" |

**写作原则**:中文版要让懂英文的用户读着不别扭(避免过度本土化梗),英文版要让 ABC 读着像他从小看的英文文章(避免直译腔)。

### 1.3 一篇文章 = 3 个搜索意图

每篇文章必须同时满足:

1. **Informational**:解释这个原型是什么(用户在了解概念)
2. **Self-check / 诊断**:让用户判断「我是这个吗」(高停留时长信号)
3. **Navigational(品牌化后)**:让搜过「星语」「StellarLog」的人能找到精确原型页

---

## §2 URL / 路径规范

```
中文:  https://stellarlog.com/zh/learn/archetypes/{slug}
English: https://stellarlog.com/en/learn/archetypes/{slug}
```

- `slug` 用 `archetypes.json.slug` 字段(已敲定,如 `trailblazer` `artisan` `deep-diver`)
- 中英文共用同一 slug(更利于 hreflang 互相强化权重)
- **不带 ID 前缀**(避免 URL 出现 `C01` 这种内部代码)
- 多语言用 `hreflang="zh-CN" / "en"`(不分 zh-TW、zh-HK 以免内容稀释)

### 2.1 hreflang 与 canonical

每页 `<head>` 必须有:

```html
<link rel="canonical" href="https://stellarlog.com/{lang}/learn/archetypes/{slug}" />
<link rel="alternate" hreflang="zh" href="https://stellarlog.com/zh/learn/archetypes/{slug}" />
<link rel="alternate" hreflang="en" href="https://stellarlog.com/en/learn/archetypes/{slug}" />
<link rel="alternate" hreflang="x-default" href="https://stellarlog.com/en/learn/archetypes/{slug}" />
```

---

## §3 关键词矩阵(Keyword Matrix)

### 3.1 三层关键词分类

```
┌─────────────────────────────────────────────────────┐
│ Tier A · Head Term(头部词)                         │
│ 高搜索量 + 高竞争 · 1-2 个/篇                       │
│ 例:占星原型 / astrology archetype                   │
├─────────────────────────────────────────────────────┤
│ Tier B · Body Term(腰部词)                         │
│ 中搜索量 + 中竞争 · 4-6 个/篇                       │
│ 例:拓荒者 性格 / Aries sun personality              │
├─────────────────────────────────────────────────────┤
│ Tier C · Long-Tail(长尾)                           │
│ 低搜索量 + 低竞争 · 10-15 个/篇                     │
│ 例:我是不是拓荒者 / am I a trailblazer archetype    │
└─────────────────────────────────────────────────────┘
```

**v0.2 战术**:**主攻 C 类长尾**。海外华人小众平台无法和 Co-Star / Astro-Charts 拼 head term,但长尾问句可以靠 36 篇的累积量做出体量优势。

### 3.2 全局关键词模式(可套用所有原型)

| 模式 | 中文示例 | English example |
|---|---|---|
| `{原型名}` | 拓荒者 | trailblazer |
| `{原型名} 是什么` | 拓荒者是什么意思 | what is the trailblazer archetype |
| `{原型名} 性格` | 拓荒者 性格特征 | trailblazer personality traits |
| `我是不是 {原型名}` | 我是不是拓荒者 | am I a trailblazer |
| `{原型名} vs {对照}` | 拓荒者和构形者区别 | trailblazer vs shaper |
| `{星座} {原型名}` | 白羊座 拓荒者 | aries trailblazer |
| `{原型名} 名人` | 拓荒者 名人 | famous trailblazers astrology |

### 3.3 占星签名词(各原型独家)

来自 `archetypes.json.astroSignals.primary`,转化为搜索友好的语言:

```
C01 拓荒者 primary signal: 太阳/火星·白羊 + 上升火象
→ 衍生关键词:
  • zh: 太阳白羊 性格 / 火星白羊 / 上升星座白羊 狮子 射手
  • en: aries sun personality / aries mars / fire ascendant
```

`seo-brief.json` 的 `astroKeywords` 字段就是这层衍生。

### 3.4 排除词(避免误伤)

- ❌ 不蹭命理 / 算命 / 改命 / 转运(平台定位是「人格潜能」,不是「预测/玄学」)
- ❌ 不用「最准」「绝对」「100%」(虚假承诺,Google 会判低质)
- ❌ 中文页避免「老外」「歪果仁」(用户画像里 30% 是 ABC,会被冒犯)

---

## §4 内容骨架(Content Skeleton)

### 4.1 长度目标

| 语言 | 目标字数 | 最低 | 最高 |
|---|---|---|---|
| 中文 | 1800 字 | 1500 | 2500 |
| English | 900 words | 750 | 1200 |

英文略短的原因:同等阅读时长下英文承载信息密度更高;且海外英文用户耐心阈值偏短。

### 4.2 H 结构(固定 7 段 + FAQ)

```
H1: {nameZh} {nameEn} · {oneliner 前半}
    例:拓荒者 Trailblazer · 你是天生的开拓者

  Lead 段(80-120 字 / 60-80 words)
  ↳ 钩子 + 占星签名一句话 + 「这篇文章会告诉你...」

H2: 你是不是「拓荒者」?
  ↳ 5 条 self-check 列表(直接拷自 02-text.md 的 gifts/shadows)
  ↳ 命中 3 条以上 → CTA 引导

H2: 拓荒者的核心天赋
  ↳ 展开 02-text 的 3 个 gifts,每个 ≈ 150-200 字
  ↳ 配心理学 / 占星双视角

H2: 拓荒者的阴影警报
  ↳ 展开 02-text 的 2 个 shadows,每个 ≈ 150-200 字
  ↳ 重点:不评判,给具体场景

H2: 进化路径:把开拓变成长程力量
  ↳ 展开 evolutionPath + 3 条可执行 micro-habit

H2: 占星签名:你盘里的哪些线索指向「拓荒者」
  ↳ 主特征(astroSignals)展开 + 真实名人盘举例 2-3
  ↳ ⭐ 占星术语爆炸点,SEO 兜各种「太阳白羊 性格」「上升火象」长尾

H2: 与其他原型的关系
  ↳ 同 faction 兄弟(C02-C12 选 2-3 个最相关)
  ↳ 互补原型(L05 / T08 等)
  ↳ 每个内链 1 句话锚文本

H2: 常见疑问 FAQ
  ↳ 3-5 条问答,语言贴近搜索 query(详见 §7 Schema.org)

CTA:
  → 主:「测一下你的灵魂蓝图,看看你是不是拓荒者」
  → 副:「订阅星语周报,每周一个原型解读」
```

### 4.3 内容生产源 = 已有数据 + 50% 新增

| 段位 | 数据源 | 是否需要新创作 |
|---|---|---|
| H1 + Lead | `nameZh/En` + `textZh.oneliner` | ❌ 拼装 |
| 自测列表 | `textZh.gifts` + `shadows` | ❌ 复用 |
| 天赋区展开 | gifts 原句 + 200 字扩写 | ✅ 新增 |
| 阴影区展开 | shadows 原句 + 200 字扩写 | ✅ 新增 |
| 进化路径 | evolutionPath + 3 micro-habit | ✅ 新增 |
| 占星签名 | `astroSignals.primary` + 名人盘 | ✅ 新增 |
| 关系链接 | combo-naming 数据 + 各原型 oneliner | ❌ 拼装 |
| FAQ | 关键词矩阵衍生 | ✅ 新增 |

**新增字数占比 ≈ 60%**。剩余 40% 是对已有内容的结构化呈现 + 内链。

---

## §5 Meta / OG / Title 模板

### 5.1 `<title>` 模板

| 语言 | 模板 | 字符上限 | 示例 |
|---|---|---|---|
| zh | `{nameZh} {nameEn} 是什么原型?{occupational hook} \| 星语` | 30-40 字(SERP 显示约 30 字) | 拓荒者 Trailblazer 是什么原型?敢为天下先的灵魂签名 \| 星语 |
| en | `{nameEn} Archetype: {one-line gist} \| StellarLog` | 60 chars | Trailblazer Archetype: The Soul Built to Go First \| StellarLog |

**关键**:title 不能只有原型名,要带「钩子词」让点击率提升。

### 5.2 `<meta name="description">` 模板

| 语言 | 长度 | 模板 |
|---|---|---|
| zh | 70-80 字(≈ 140-160 bytes,Google SERP 切断阈值) | `{oneliner}。深度解读{nameZh}原型的天赋、阴影与进化路径,以及你的本命盘里指向它的占星签名。测你的天命原型 →` |
| en | 140-160 chars | `{oneliner}. Discover the strengths, shadows, and growth path of the {nameEn} archetype — and the astrology clues pointing to it in your chart.` |

### 5.3 OG / Twitter Card

```html
<meta property="og:type" content="article" />
<meta property="og:title" content="{title}" />
<meta property="og:description" content="{description}" />
<meta property="og:image" content="https://cdn.stellarlog.com/og/archetypes/{slug}-{lang}.png" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta name="twitter:card" content="summary_large_image" />
```

OG 图自动生成模板(per archetype):

```
左侧:大字「{nameZh}」+ 小字「{nameEn}」
右侧:原型符号(由 themeColor 着色)+ 占星签名
底部:星语 logo + slogan
背景:渐变(themeColor → 深紫 #1A1B3A)
```

---

## §6 内链与锚文本策略

### 6.1 强制内链(每页至少 5 条)

| 链向 | 数量 | 锚文本风格 |
|---|---|---|
| 同 faction 其他原型 | 2-3 | 自然句式:「相似但更{...}的是 [匠造人]」 |
| 互补 faction 原型 | 1-2 | 「与你天生互补的是 [守护者] — 一个开路,一个守护」 |
| `/blueprint/start`(主 CTA) | 1 | 「测一下你的灵魂蓝图 →」 |
| `/learn/glossary`(术语) | 1-2 | 在「太阳白羊」「上升火象」等术语处链接 |
| `/learn/archetypes`(总览) | 1 | 面包屑导航,自然出现 |

### 6.2 锚文本反模式

- ❌ 「点击这里」「这里」(零信息量)
- ❌ 同一关键词锚文本指向不同 URL(Google 视为操纵)
- ❌ 一段内堆 ≥3 个内链(用户体验差 + 权重稀释)

### 6.3 反向内链矩阵

36 篇文章互相成网。期望矩阵密度:

```
每篇 ≥ 5 条出站内链 → 总出站 ≥ 180
每篇 ≥ 3 条入站(被其他原型页提到)→ 总入站 ≥ 108
→ 36 × 36 关系图(略)
```

详细矩阵在 `seo-brief.json` 的 `internalLinks.siblings/opposites` 字段。

---

## §7 结构化数据 / Schema.org

### 7.1 必填 schema 类型

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "headline": "{title}",
      "description": "{description}",
      "image": "{ogImageUrl}",
      "author": { "@type": "Organization", "name": "星语 StellarLog" },
      "publisher": { ... },
      "datePublished": "2026-...",
      "dateModified": "2026-...",
      "mainEntityOfPage": "{canonicalUrl}",
      "inLanguage": "{zh-CN | en}"
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Learn", "item": ".../learn" },
        { "@type": "ListItem", "position": 2, "name": "Archetypes", "item": ".../learn/archetypes" },
        { "@type": "ListItem", "position": 3, "name": "{nameZh|En}", "item": "{canonicalUrl}" }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        { "@type": "Question", "name": "...", "acceptedAnswer": { "@type": "Answer", "text": "..." } }
      ]
    }
  ]
}
```

### 7.2 FAQ 选题(3-5 条 / 篇)

每个原型都要包含的 4 个问题模式:

1. `{nameZh}原型是什么?` / `What is the {nameEn} archetype?`
2. `我怎么知道自己是 {nameZh}?` / `How do I know if I'm a {nameEn}?`
3. `{primarySign} 一定是 {nameZh} 吗?` / `Is every {primarySign} a {nameEn}?`(打破星座一对一误区)
4. `{nameZh}和{相邻原型}的区别?` / `{nameEn} vs {related} — what's the difference?`

(可选 #5)`{nameZh}名人有谁?` — 配 #8 盲测里的对应名人

---

## §8 示例:C01 拓荒者 Trailblazer 完整 brief

### 8.1 元信息(Frontmatter)

```yaml
id: C01
slug: trailblazer
faction: C
themeColor: "#FFB347"
canonical:
  zh: https://stellarlog.com/zh/learn/archetypes/trailblazer
  en: https://stellarlog.com/en/learn/archetypes/trailblazer
```

### 8.2 Title / Description

| 语言 | 字段 | 内容 |
|---|---|---|
| zh | title | 拓荒者 Trailblazer 是什么原型?敢为天下先的灵魂签名 \| 星语 |
| zh | description | 你是天生的开拓者,擅长在没人走过的地方率先迈出第一步。深度解读拓荒者原型的天赋、阴影与进化路径,以及你的本命盘里指向它的占星签名。测你的天命原型 → |
| en | title | Trailblazer Archetype: The Soul Built to Go First \| StellarLog |
| en | description | Born to take the first step where no one has walked. Explore the Trailblazer archetype's gifts, shadows, growth path — and the astrology clues in your chart. |

### 8.3 关键词矩阵

#### 中文

| 层级 | 关键词 |
|---|---|
| Head | 占星原型 / 灵魂蓝图 |
| Body | 拓荒者 性格 / 白羊座 太阳 性格 / 火星白羊 / 上升火象 / 拓荒型人格 |
| Long-tail | 我是不是拓荒者 / 拓荒者原型是什么意思 / 太阳白羊上升白羊性格 / 占星 36 种原型 拓荒者 / 拓荒者和重铸者区别 / 白羊座名人 性格 / 火象星座 领导力 / 火星白羊好吗 |

#### English

| Tier | Keywords |
|---|---|
| Head | astrology archetype / soul blueprint |
| Body | trailblazer personality / aries sun traits / aries mars / fire ascendant / pioneer archetype |
| Long-tail | am I a trailblazer / what is the trailblazer archetype / aries sun aries rising / 36 astrology archetypes trailblazer / trailblazer vs reshaper / famous aries personalities / fire sign leadership / aries mars meaning |

### 8.4 H 结构 + 字数分配

| H 层级 | 标题 | 中文字数 | English words |
|---|---|---|---|
| H1 | 拓荒者 Trailblazer · 你是天生的开拓者 | — | — |
| Lead | (钩子段) | 120 | 75 |
| H2 | 你是不是「拓荒者」?5 个信号 | 200 | 100 |
| H2 | 拓荒者的核心天赋:在不确定中起跑的能力 | 450 | 220 |
| H2 | 拓荒者的阴影警报:第一名的孤独 | 300 | 150 |
| H2 | 进化路径:把开拓变成长程力量 | 250 | 130 |
| H2 | 占星签名:你盘里的哪些线索指向「拓荒者」 | 350 | 175 |
| H2 | 与其他原型的关系 | 200 | 100 |
| H2 | 常见疑问 FAQ | 250 | 125 |
| CTA | 测你的灵魂蓝图 | 30 | 15 |
| **合计** | | **2150** | **1090** |

### 8.5 FAQ 内容(中英对照)

| Q (zh) | A (zh) | Q (en) | A (en) |
|---|---|---|---|
| 拓荒者原型是什么意思? | 拓荒者是星语 36 天命原型中 C 创造系第一型,核心特征是「擅长在没人走过的地方率先迈出第一步」。占星签名常见为太阳/火星·白羊 + 上升火象。 | What is the Trailblazer archetype? | Trailblazer is the first archetype in StellarLog's Creation faction, defined by the gift of taking the first step where no one has walked. The astrology signature usually involves Aries Sun/Mars with a fire ascendant. |
| 我怎么知道自己是拓荒者? | 自测 5 条信号(独立行动不要别人认可、把「不可能」听成「还没人试过」、失败恢复快、不耐烦等团队、把停下来误解为停滞)中命中 3 条以上,大概率是。完整判断需要看本命盘 → 测灵魂蓝图。 | How do I know if I'm a Trailblazer? | If 3 or more of these signals fit (acting independently without approval, hearing "no one's tried yet" when others say "impossible," fast recovery from failure, impatience with team pace, confusing rest with stagnation), you likely are. A natal chart can confirm. |
| 白羊座一定是拓荒者吗? | 不一定。太阳白羊只是 primary signal 之一,还要看月亮、上升、火星宫位与相位。约 60% 强白羊能量的人会命中拓荒者,40% 落到 C03 号召者、C08 远征者等其他创造系原型。 | Is every Aries a Trailblazer? | Not necessarily. Sun in Aries is just one of the primary signals — Moon, Ascendant, Mars house and aspects all matter. About 60% of strong-Aries people land on Trailblazer; the rest fall on C03 Vanguard, C08 Wayfarer, or other Creation archetypes. |
| 拓荒者和重铸者(C09)的区别? | 拓荒者是从 0 到 1 — 没有路就开一条;重铸者是把已存在的东西推倒重来。两者都「敢」,但拓荒者向外开拓,重铸者向内焚毁。 | Trailblazer vs Reshaper (C09)? | Trailblazer goes from 0 to 1 — opening a path where none exists. Reshaper tears down what already exists to forge it anew. Both are bold, but Trailblazer builds outward, Reshaper burns inward. |

### 8.6 内链矩阵

| 链向 archetype | 锚文本(zh) | 锚文本(en) |
|---|---|---|
| C03 号召者 | 集结众人冲锋的[号召者] | the [Vanguard] who rallies the charge |
| C08 远征者 | 把开拓做成长征的[远征者] | the [Wayfarer] who turns trailblazing into a long march |
| C09 重铸者 | 焚毁旧框架的[重铸者] | the [Reshaper] who burns down old frames |
| L05 守护者 | 你的互补面:[守护者] | your complement: the [Guardian] |
| T01 深潜者 | 与你形成镜像的[深潜者] | your mirror: the [Deep Diver] |

CTA 内链:`/blueprint/start` — 锚文本「测一下你的灵魂蓝图,看你是不是拓荒者」/ "Take the soul blueprint quiz — find out if you're a Trailblazer"

### 8.7 OG 图配置

```yaml
ogImage:
  zh: https://cdn.stellarlog.com/og/archetypes/trailblazer-zh.png
  en: https://cdn.stellarlog.com/og/archetypes/trailblazer-en.png
  altZh: "拓荒者 Trailblazer 原型卡 · 暖琥珀色"
  altEn: "Trailblazer archetype card · Warm amber"
  bgGradient: ["#FFB347", "#1A1B3A"]
  symbol: "▲" # 火象向上箭头
```

---

## §9 批量生产流程(35 篇剩余的)

### 9.1 生产 pipeline

```
Step 1 · seo-brief.json 批量填充(LLM 草稿 + 人工校对)
       ├─ 关键词矩阵(可半自动:模板 + 词典扩展)
       ├─ Title / Description(模板代入)
       └─ FAQ 4 个固定模式 + 1 个独家(LLM 草稿)

Step 2 · 长文草稿(LLM 主写)
       ├─ Lead / 自测 / FAQ → 模板拼装
       ├─ 天赋区/阴影区扩写 → LLM 草稿(每段 150-200 字)
       ├─ 占星签名 + 名人盘 → 引用 #8 盲测 fixtures
       └─ 进化路径 → 人工写(品牌口吻必须人工把关)

Step 3 · 人工 polish
       ├─ 双语自然度检查(避免直译腔)
       ├─ 排除词 grep(确保没踩 §3.4)
       ├─ 内链锚文本检查
       └─ FAQ schema.org 校验

Step 4 · 索引提交
       ├─ Sitemap.xml 增量更新
       ├─ Google Search Console 单页 URL inspection
       └─ 百度站长平台主动推送(zh 版)
```

### 9.2 时间预算(参考)

| 步骤 | 单篇 | 36 篇 |
|---|---|---|
| Step 1 数据填充 | 20 min | 12 h |
| Step 2 LLM 草稿 | 自动 | ~6 h(批跑) |
| Step 3 人工 polish | 90 min | 54 h |
| Step 4 索引 | 5 min | 3 h |
| **总计** | ~2 h | **~75 h** |

可拆分到 6-8 周交付,每周 4-5 篇。

### 9.3 质量验收

每篇上线前过这张 checklist:

- [ ] Title 50-60 字符 + 含主关键词
- [ ] Description 140-160 字符 + 含 CTA
- [ ] H1 仅 1 个 + 含 nameZh + nameEn
- [ ] 字数 zh ≥ 1500 / en ≥ 750
- [ ] 至少 5 条内链
- [ ] FAQ 3-5 条 + 含 schema.org markup
- [ ] OG 图 1200×630 已生成
- [ ] hreflang 中英互链
- [ ] canonical 正确
- [ ] 无 §3.4 排除词
- [ ] Lighthouse SEO 评分 ≥ 95

---

## §10 性能与 KPI

### 10.1 技术性能要求

- LCP < 2.5s(海外华人主集中地 us-east + asia-east)
- CLS < 0.1
- 文章页 JS bundle < 50 KB(主图 lazy,FAQ schema 服务端注入)
- Static export(Next.js SSG)+ ISR(每周 revalidate)

### 10.2 6 个月 SEO 目标

| 指标 | 6 月目标 |
|---|---|
| 36 篇全部收录(Google) | 100% |
| 36 篇全部收录(百度) | ≥ 80% |
| 月度自然搜索流量(总) | 5,000 UV |
| Top 10 排名长尾词数 | ≥ 50 |
| 文章页 → blueprint/start 转化 | ≥ 8% |
| 平均停留时长 | ≥ 90s |

### 10.3 监测

- Google Search Console + Bing Webmaster + 百度站长(三平台同步)
- 每周一拉一次 query report,新长尾入选则补 FAQ
- A/B 测试:H1 副标题的钩子词(3 个月一轮)

---

## §11 与下游模块的契约

### 11.1 数据契约

`docs/content/archetypes/seo-brief.json` schema(完整定义见同目录 JSON 文件):

```typescript
interface SeoBriefData {
  version: string;
  globalTaxonomy: {
    headTerms: { zh: string[]; en: string[] };
    questionPatterns: { zh: string[]; en: string[] };
    excludedTerms: string[];
  };
  perArchetype: Record<string, ArchetypeSeoEntry>;
}

interface ArchetypeSeoEntry {
  slug: string;
  faction: 'C' | 'L' | 'T';
  themeColor: string;
  canonical: { zh: string; en: string };
  title: { zh: string; en: string };
  metaDescription: { zh: string; en: string };
  primaryKeywords: { zh: string[]; en: string[] };
  longTailKeywords: { zh: string[]; en: string[] };
  astroKeywords: { zh: string[]; en: string[] };
  faqs: Array<{
    questionZh: string; answerZh: string;
    questionEn: string; answerEn: string;
  }>;
  internalLinks: {
    siblings: string[];    // archetype IDs
    opposites: string[];   // archetype IDs
    glossary: string[];    // glossary slugs
  };
  ogImage: {
    pathZh: string; pathEn: string;
    altZh: string; altEn: string;
    bgGradient: [string, string];
    symbol: string;
  };
  lengthTargets: { zh: number; en: number };
}
```

### 11.2 下游消费者

- `/learn/archetypes/[slug]` 页面(Next.js SSG):读取 `seo-brief.json` 渲染 `<title> / <meta> / OG / schema`
- `apps/web/scripts/generate-sitemap.ts`:用 `perArchetype` 生成 sitemap.xml
- `apps/web/scripts/generate-og.ts`:用 `ogImage` 字段批量生成 OG 图(Vercel @vercel/og 或 Satori)
- 文章正文(markdown):放 `docs/content/archetypes/articles/{slug}.{lang}.md`(本任务**不在 scope**)

---

## §12 边界与不在 scope

### 已在 scope:

- SEO brief 模板与方法论(本文档)
- 数据契约 `seo-brief.json` schema
- 1 张完整示例(C01 拓荒者)
- 批量生产 pipeline 设计

### 不在本次 scope:

- **其他 35 张 brief 的批量填充** — 走 §9 pipeline,独立后续任务
- **36 篇长文正文** — 上线时人工 + LLM 协作,本任务不写正文
- **OG 图实际生成** — 等设计 token + Satori 集成后批跑
- **Sitemap / robots.txt 工程** — 走前端工程任务
- **国际 SEO 实验(百度 vs Google 差异化)** — 看 6 月数据再说

---

## §13 验收检查清单

- [x] `06-seo-brief.md` 模板与方法论文档
- [x] §3 关键词矩阵三层分类 + 全局模式
- [x] §4 内容骨架 7+1 段定义
- [x] §5 Title / Description / OG 模板
- [x] §6 内链策略
- [x] §7 Schema.org 结构定义
- [x] §8 C01 拓荒者完整示例(title + 描述 + 关键词 + H 结构 + FAQ + 内链 + OG)
- [x] §11 `seo-brief.json` 数据契约定义
- [x] `seo-brief.json` 文件创建 + C01 示例数据

---

## 变更记录

| 版本 | 日期 | 内容 |
|---|---|---|
| v1 | 2026-05-12 | 初版:三层关键词矩阵 / 7+1 段骨架 / 双语 meta / schema.org / C01 worked sample |
