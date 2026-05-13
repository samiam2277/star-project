# 05 · 36×36 组合原型命名策略 v1

> 对应任务:#2 36×36 组合原型命名
> 前置:`01-names.md`(36 双语命名)/ `archetypes.json`(36 元数据)
> 数据契约:`combo-naming.json`(本文档定义)
> 工程实现:`apps/web/src/lib/astro/naming.ts`(本文档驱动)

---

## §1 设计哲学

**本命原型** = 你长期是谁的核心特征(从出生盘推断)
**年度原型** = 这一年的你的主调(从年盘 / 行星运行推断)

两者**共用 36 套原型字典**,但**语义视角不同**:
- 同一个「拓荒者」放在本命位 = 你这辈子是 pioneer 性格
- 放在年度位 = 今年是你的开荒年

**组合**有 36 × 36 = **1296 种可能**,但用户每年只看到 **1 种**(他自己的本命 × 当年年度)。所以问题不是「为 1296 都起好名」,而是「让任一组合在前端渲染时都有一个合格的标签 + 短描述」。

我们用**三层架构**做到这点,而不是手工列 1296 条数据。

---

## §2 命名策略概览(三层架构)

```
┌─────────────────────────────────────────────────────────┐
│  Tier 1  Self-match (对角线,36 条)                     │
│  natalId === annualId → 「双重共振」类命名               │
│  手工命名 + 一句话 tagline                              │
├─────────────────────────────────────────────────────────┤
│  Tier 2  Faction-pair (9 种序对,模板化)                │
│  CC / CL / CT / LC / LL / LT / TC / TL / TT             │
│  用模板「{N}…{A}」拼接原型名 + 6 句主题 tagline         │
├─────────────────────────────────────────────────────────┤
│  Tier 3  Fallback (不可命中)                            │
│  纯算法兜底:「{N} × {A}」直接并列 + 通用 tagline      │
└─────────────────────────────────────────────────────────┘
```

| 层级 | 覆盖数量 | 命名性质 | 手工成本 |
|---|---|---|---|
| Tier 1 | 36 | 独立命名 | 中(36 × 双语 × 2 行) |
| Tier 2 | 1260 | 模板生成 | 低(9 个模板 × 双语) |
| Tier 3 | 兜底 | 纯并列 | 极低 |

**总手工产出**:36 self-match + 9 faction-pair pattern = **45 个 strings 对**(双语 × title/tagline 各一),约 180 条文本。远低于 1296 的手工成本。

---

## §3 36 Self-match 命名(对角线)

「自我共振」基调:今年的主调与你长期的主调同源,这是**强化**之年。

### 3.1 C 创造系 self-match

| 本命 = 年度 | 中文 | English | Tagline (zh) | Tagline (en) |
|---|---|---|---|---|
| C01 拓荒者 × C01 | **拓荒共振** | **Trail Echo** | 你的开荒本能在今年加倍发声 | Your pioneering instinct doubles down this year |
| C02 匠造人 × C02 | **匠心叠刻** | **Craft Echo** | 把同一件作品再雕一层 | Re-carve the same piece, deeper |
| C03 号召者 × C03 | **号召加倍** | **Vanguard Encore** | 今年的旗帜比过去更大更鲜明 | Your banner flies higher than ever |
| C04 演绎者 × C04 | **双重舞台** | **Twin Stages** | 一个舞台不够,今年有两个 | One stage isn't enough this year |
| C05 守誓者 × C05 | **持戒之年** | **Oath Renewed** | 再次为同一个承诺续约 | Renew your vow to the same promise |
| C06 雕琢师 × C06 | **细刻自己** | **Inner Carving** | 今年的细节是你自己 | The fine work this year is on yourself |
| C07 构形者 × C07 | **再造结构** | **Reshape Encore** | 把上一版结构推翻重来 | Demolish last year's structure, redesign |
| C08 远征者 × C08 | **远征更远** | **Further Way** | 你的远方还没到尽头 | Your distance hasn't reached its edge |
| C09 重铸者 × C09 | **再次重铸** | **Forge Again** | 摧毁是为了第二次再造 | Destroy again, to forge again |
| C10 吟谱者 × C10 | **双声共谱** | **Twin Verses** | 把同一首歌唱出两段声部 | Same song, second voice |
| C11 开蒙者 × C11 | **再次开蒙** | **Second Dawn** | 你点亮的人还没看够 | The eyes you lit are still hungry |
| C12 远望者 × C12 | **远望更远** | **Wider Sky** | 你看到的天空,今年要再宽一格 | Your sky widens another notch |

### 3.2 L 链接系 self-match

| 本命 = 年度 | 中文 | English | Tagline (zh) | Tagline (en) |
|---|---|---|---|---|
| L01 织梦人 × L01 | **双梦交织** | **Dream Echo** | 旧梦未醒,新梦已织 | Old dream not yet faded, new one already woven |
| L02 调律师 × L02 | **再调一次** | **Re-Tune** | 上一次的平衡需要再校一次 | Last year's balance needs retuning |
| L03 搭桥者 × L03 | **双桥并立** | **Twin Bridges** | 同时维护两条联结 | Tend two bridges at once |
| L04 盛宴主 × L04 | **盛宴叠席** | **Festal Echo** | 今年的桌比去年长一倍 | This year's table runs twice as long |
| L05 守护者 × L05 | **守护加深** | **Deeper Guard** | 你护着的人需要你更稳一些 | The one you guard needs you steadier |
| L06 聆听者 × L06 | **深度聆听** | **Deeper Listening** | 今年要听到沉默的下面 | This year, hear below the silence |
| L07 共鸣者 × L07 | **双重共鸣** | **Twin Resonance** | 你和这个人会再次共振 | You'll resonate with this person again |
| L08 见证者 × L08 | **再次见证** | **Witness Again** | 该到场的事再次到场 | Be present, again, where presence matters |
| L09 慰藉者 × L09 | **慰藉之年** | **Year of Comfort** | 今年你的怀抱被人需要 | Your arms are needed this year |
| L10 串联者 × L10 | **再次串联** | **Re-Link** | 把上次断的线接回来 | Rejoin what was cut |
| L11 拥抱者 × L11 | **拥抱加倍** | **Wider Embrace** | 你能容纳的范围今年再扩一圈 | Your embrace extends another ring |
| L12 牵引者 × L12 | **再走前一步** | **Step Further** | 不命令,只是再往前半步 | No command, just half a step further |

### 3.3 T 转化系 self-match

| 本命 = 年度 | 中文 | English | Tagline (zh) | Tagline (en) |
|---|---|---|---|---|
| T01 深潜者 × T01 | **再下一潜** | **Deeper Dive** | 你以为见底了,其实还有一层 | You thought you hit bottom — there's another layer |
| T02 燃灯人 × T02 | **再点一盏** | **Another Flame** | 上一盏快灭了,今年再点一盏 | Last flame is fading, light another |
| T03 炼金师 × T03 | **再炼一次** | **Re-Forge Gold** | 上一炉的金还不够纯 | Last batch isn't pure enough yet |
| T04 解秘者 × T04 | **破解再来** | **Cipher Again** | 同一个谜面,今年看见另一层 | Same riddle, second layer |
| T05 破茧者 × T05 | **二度蜕变** | **Second Molt** | 上一次的蜕只是热身 | Last molting was just the warm-up |
| T06 远观者 × T06 | **更远的远观** | **Further Sight** | 你看的不是来年,是来年的来年 | Not next year — the year after next |
| T07 淬火者 × T07 | **再淬一次** | **Another Forge** | 火热得正好,这次不再退 | The forge runs hot — don't pull back |
| T08 守夜者 × T08 | **夜中再夜** | **Deeper Night** | 你已熬过一个长夜,还有更长的等着 | One long night survived, longer one ahead |
| T09 启示者 × T09 | **闪电再临** | **Another Flash** | 又一次闪电,这次轮到你给别人 | Lightning again — this time, you're the strike |
| T10 招魂者 × T10 | **再次招魂** | **Call Again** | 上次没叫回来的,今年再叫一次 | The one you didn't recall, call again |
| T11 掘井者 × T11 | **再掘一井** | **Deeper Well** | 上一口的水位还没到底 | The last well isn't yet at its true bottom |
| T12 渡舟人 × T12 | **再渡一程** | **Another Crossing** | 那条河有第二段,你要再撑一次篙 | The river has a second bend — pole through it |

---

## §4 9 种 Faction-pair 命名模板

非对角组合(1260 条)按 **(natal faction, annual faction)** 序对分 9 种,每种用一个模板拼接 + 一句主题 tagline。

> 注意:**(C, L) 与 (L, C) 是不同的序对**(本命 vs 年度位顺序不同,语义不同)。

### 4.1 模板表

| Pair | 主题 | 中文模板 | English template | 主题 tagline (zh) | 主题 tagline (en) |
|---|---|---|---|---|---|
| **CC** | 同源开拓 | `{N}・转向{A}` | `{N} into {A}` | 在创造的同一道路上换工具 | Same road of making, different tool |
| **LL** | 同源链接 | `{N}的{A}季` | `Season of {N}-{A}` | 关系深化的同源延伸 | Connection deepening, same key |
| **TT** | 同源转化 | `{N}・通向{A}` | `{N} toward {A}` | 一个转化引出另一个 | One transformation opens the next |
| **CL** | 让造物长出关系 | `{N}的{A}章` | `The {A} chapter of {N}` | 去年的作品,今年要被看见和串联 | Last year's work, this year's audience |
| **CT** | 破立之年 | `{N}・在{A}里` | `{N} inside {A}` | 外面的开拓需要里面的破开 | The outer build needs an inner break |
| **LC** | 关系里的创造 | `{N}之中起{A}` | `{A} rising in {N}` | 从对话和共鸣里长出新作品 | New work rising from dialogue |
| **LT** | 关系中的蜕变 | `{N}里的{A}` | `{A} within {N}` | 最深的转化在关系里发生 | The deepest change happens inside a bond |
| **TC** | 破后的开拓 | `{N}之后的{A}` | `{A} after {N}` | 沉淀够了,该建造了 | Enough sinking — time to build |
| **TL** | 转化中的伴行 | `{N}寻得{A}` | `{N} finds {A}` | 再深的潜也要光 / 这一年是光 | Even the deep dive needs a light |

### 4.2 渲染规则

1. 取本命 `nameZh` (= {N}) 与年度 `nameZh` (= {A})
2. 套入对应 pair 的中文模板,得到 `titleZh`
3. 套入对应 pair 的英文模板,**用 `nameEn`**,得到 `titleEn`
4. 使用对应 pair 的 `taglineZh` / `taglineEn`(不需要插值,因 tagline 是 faction-pair 通用)

### 4.3 示例

输入:本命 C01 拓荒者(Trailblazer)/ 年度 L05 守护者(Guardian)
- Pair = CL
- titleZh = `拓荒者的守护者章`
- titleEn = `The Guardian chapter of Trailblazer`
- taglineZh = `去年的作品,今年要被看见和串联`
- taglineEn = `Last year's work, this year's audience`

输入:本命 T01 深潜者(Deep Diver)/ 年度 C07 构形者(Shaper)
- Pair = TC
- titleZh = `深潜者之后的构形者`
- titleEn = `Shaper after Deep Diver`
- taglineZh = `沉淀够了,该建造了`
- taglineEn = `Enough sinking — time to build`

---

## §5 命名算法(伪代码)

```typescript
function comboName(natalId, annualId, archetypes, comboData): ComboName {
  // Step 1: 对角线?
  if (natalId === annualId) {
    return {
      mode: 'self',
      titleZh: comboData.selfMatch[natalId].titleZh,
      titleEn: comboData.selfMatch[natalId].titleEn,
      taglineZh: comboData.selfMatch[natalId].taglineZh,
      taglineEn: comboData.selfMatch[natalId].taglineEn,
    };
  }

  // Step 2: 取 faction-pair
  const natalArch = archetypes.find(a => a.id === natalId);
  const annualArch = archetypes.find(a => a.id === annualId);
  if (!natalArch || !annualArch) throw new Error('Unknown archetype id');

  const pairCode = natalArch.faction + annualArch.faction; // e.g., 'CL'
  const tmpl = comboData.factionPairs[pairCode];
  if (!tmpl) {
    // Tier 3: fallback
    return {
      mode: 'fallback',
      titleZh: `${natalArch.nameZh} × ${annualArch.nameZh}`,
      titleEn: `${natalArch.nameEn} × ${annualArch.nameEn}`,
      taglineZh: '今年的你是这两种力量的交点',
      taglineEn: 'You stand where two forces meet',
    };
  }

  return {
    mode: pairCode === natalArch.faction + annualArch.faction
        && natalArch.faction === annualArch.faction
      ? 'within'
      : 'cross',
    titleZh: tmpl.templateZh.replace('{N}', natalArch.nameZh).replace('{A}', annualArch.nameZh),
    titleEn: tmpl.templateEn.replace('{N}', natalArch.nameEn).replace('{A}', annualArch.nameEn),
    taglineZh: tmpl.taglineZh,
    taglineEn: tmpl.taglineEn,
  };
}
```

---

## §6 20 组渲染示例

| 本命 | 年度 | Pair | titleZh | taglineZh |
|---|---|---|---|---|
| C01 拓荒者 | C01 拓荒者 | self | 拓荒共振 | 你的开荒本能在今年加倍发声 |
| C01 拓荒者 | C09 重铸者 | CC | 拓荒者・转向重铸者 | 在创造的同一道路上换工具 |
| C01 拓荒者 | L05 守护者 | CL | 拓荒者的守护者章 | 去年的作品,今年要被看见和串联 |
| C01 拓荒者 | T01 深潜者 | CT | 拓荒者・在深潜者里 | 外面的开拓需要里面的破开 |
| C02 匠造人 | C06 雕琢师 | CC | 匠造人・转向雕琢师 | 在创造的同一道路上换工具 |
| C04 演绎者 | L04 盛宴主 | CL | 演绎者的盛宴主章 | 去年的作品,今年要被看见和串联 |
| L01 织梦人 | L01 织梦人 | self | 双梦交织 | 旧梦未醒,新梦已织 |
| L02 调律师 | L07 共鸣者 | LL | 调律师的共鸣者季 | 关系深化的同源延伸 |
| L05 守护者 | C01 拓荒者 | LC | 守护者之中起拓荒者 | 从对话和共鸣里长出新作品 |
| L09 慰藉者 | T10 招魂者 | LT | 慰藉者里的招魂者 | 最深的转化在关系里发生 |
| T01 深潜者 | T01 深潜者 | self | 再下一潜 | 你以为见底了,其实还有一层 |
| T01 深潜者 | T03 炼金师 | TT | 深潜者・通向炼金师 | 一个转化引出另一个 |
| T01 深潜者 | C07 构形者 | TC | 深潜者之后的构形者 | 沉淀够了,该建造了 |
| T07 淬火者 | L02 调律师 | TL | 淬火者寻得调律师 | 再深的潜也要光 / 这一年是光 |
| T05 破茧者 | L09 慰藉者 | TL | 破茧者寻得慰藉者 | 再深的潜也要光 / 这一年是光 |
| T09 启示者 | C11 开蒙者 | TC | 启示者之后的开蒙者 | 沉淀够了,该建造了 |
| C12 远望者 | L03 搭桥者 | CL | 远望者的搭桥者章 | 去年的作品,今年要被看见和串联 |
| C08 远征者 | T06 远观者 | CT | 远征者・在远观者里 | 外面的开拓需要里面的破开 |
| L11 拥抱者 | L11 拥抱者 | self | 拥抱加倍 | 你能容纳的范围今年再扩一圈 |
| L08 见证者 | T05 破茧者 | LT | 见证者里的破茧者 | 最深的转化在关系里发生 |

---

## §7 与下游模块的契约

### 7.1 数据契约

`docs/content/archetypes/combo-naming.json` schema:

```typescript
interface ComboNamingData {
  version: string;
  selfMatch: Record<string, {
    titleZh: string;
    titleEn: string;
    taglineZh: string;
    taglineEn: string;
  }>; // 36 entries, key = archetypeId
  factionPairs: Record<string, {
    pairCode: string; // 'CC' | 'CL' | 'CT' | 'LC' | 'LL' | 'LT' | 'TC' | 'TL' | 'TT'
    natalFaction: 'C' | 'L' | 'T';
    annualFaction: 'C' | 'L' | 'T';
    templateZh: string; // contains {N} {A}
    templateEn: string;
    taglineZh: string;
    taglineEn: string;
  }>; // 9 entries
}
```

### 7.2 函数契约

`apps/web/src/lib/astro/naming.ts`:

```typescript
export interface ComboName {
  mode: 'self' | 'within' | 'cross' | 'fallback';
  titleZh: string;
  titleEn: string;
  taglineZh: string;
  taglineEn: string;
}

export function comboName(
  natalId: string,
  annualId: string,
  archetypes: ArchetypeMeta[],
  data: ComboNamingData
): ComboName;
```

`mode` 语义:
- `self` = natal === annual(对角线)
- `within` = 同 faction 不同 archetype
- `cross` = 跨 faction
- `fallback` = 数据缺失(理论上不应出现,作 defensive 编程)

### 7.3 下游消费者

- **年度角色卡**(PRD §5 模块):卡片标题 = `titleZh / titleEn`(按语言),卡片副标题 = `tagline`
- **/me 页面年度回顾**:用 mode 标示视觉层级(self → 强调动画,cross → 平静呈现)
- **分享卡片**:标题 = `titleZh`,与 archetype 主色调拼合视觉

---

## §8 边界与不在 scope

### 已在 scope:
- 36 self-match 双语命名 + tagline
- 9 faction-pair 模板 + tagline
- TS 函数 + JSON 数据
- 测试覆盖(self / within / cross / fallback)

### 不在本次 scope:
- **如何识别年度原型**(怎么从年盘 / progression 算出哪个是 annual archetype) — 留到独立任务,需 Swiss Ephemeris 接入
- **个别组合的特殊修辞**(如 C01×C09 的特定细节) — 模板足够泛化,不做 case-by-case 加料
- **历史回看模式**(展示过去 N 年的组合轨迹) — UI 任务,本次不涉及
- **A/B 测试不同模板用词** — 留待用户反馈

---

## §9 验收检查清单

- [x] `combo-naming.json` 生成:36 self-match + 9 faction-pair
- [x] `naming.ts` 函数实现:`comboName(natalId, annualId, archetypes, data)`
- [x] `index.ts` 导出 `comboName` + `ComboName` 类型
- [x] `naming.test.ts`:覆盖 self / within / cross / fallback 四个分支(共 23 个 it)
- [x] 1296 组合全矩阵覆盖测试通过(self=36, within=396, cross=864)
- [x] 全套测试通过:64/64(15 手工 + 26 盲测 + 23 命名)
- [x] TypeScript 严格模式无 error

---

## 变更记录

| 版本 | 日期 | 内容 |
|---|---|---|
| v1 | 2026-05-12 | 三层架构(self / faction-pair / fallback);36 self-match 命名;9 模板 |
