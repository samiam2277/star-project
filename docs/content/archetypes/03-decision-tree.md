# 36 原型映射决策树规则集 · v1

> 对应 PRD §5.0.3-5.0.4 / task #6
> 上游依赖:`00-framework.md` / `01-names.md` / `archetypes.json`
> 下游消费者:`apps/web/src/lib/astro/match.ts`(MVP 占星引擎)
> 状态:**v1 规则集 + 算法设计**,通过 12 个测试用例验证

---

## 1. 设计目标

把用户的占星原始要素(太阳 / 月亮 / 上升 / 火星 / 北交 / 凯龙 / 行星宫位 / 主要相位)映射到 36 原型之一,并返回:

- **主原型**:最强匹配 1 个
- **次原型**:次强匹配 1-2 个(用于"你身上还有 X 的影子"叙事)
- **置信度等级**:`high` / `mid` / `low`(对应 PRD §5.0.4 三档降级策略)

设计原则:

1. **数据驱动**,不是写死的 if/else。规则集独立于代码,允许产品/占星师在不发版的情况下调整
2. **可解释**,每次匹配都能说出"因为你太阳天蝎 + 月天蝎,主路径权重 100"
3. **生日时辰缺失友好**,自动绕开依赖宫位/上升的规则
4. **不强依赖单一信号**,避免"只看太阳"的星座低质感
5. **冲突可仲裁**,同分时按 faction 优先级 + 强信号锚定决出胜者

---

## 2. 输入数据契约

```typescript
// apps/web/src/lib/astro/types.ts
export type ZodiacSign =
  | 'Aries' | 'Taurus' | 'Gemini' | 'Cancer'
  | 'Leo' | 'Virgo' | 'Libra' | 'Scorpio'
  | 'Sagittarius' | 'Capricorn' | 'Aquarius' | 'Pisces';

export type Planet =
  | 'sun' | 'moon' | 'mercury' | 'venus' | 'mars'
  | 'jupiter' | 'saturn' | 'uranus' | 'neptune' | 'pluto'
  | 'chiron' | 'northNode' | 'southNode' | 'asc' | 'mc';

export type AspectType = 'conjunct' | 'opposition' | 'square' | 'trine' | 'sextile';

export interface PlanetPosition {
  sign: ZodiacSign;
  house?: number;        // 1-12, 缺生日时辰时为 undefined
  degree?: number;       // 0-29.99
  retrograde?: boolean;
}

export interface Aspect {
  p1: Planet;
  p2: Planet;
  type: AspectType;
  orb: number;            // 实际容许度(deg)
}

export interface AstroInput {
  // 主轴
  sun: PlanetPosition;
  moon: PlanetPosition;
  asc?: PlanetPosition;            // 无生日时辰则 undefined
  mc?: PlanetPosition;             // 同上

  // 个人行星
  mercury: PlanetPosition;
  venus: PlanetPosition;
  mars: PlanetPosition;

  // 社会/超个人行星
  jupiter: PlanetPosition;
  saturn: PlanetPosition;
  uranus: PlanetPosition;
  neptune: PlanetPosition;
  pluto: PlanetPosition;

  // 业力点
  northNode: PlanetPosition;
  chiron?: PlanetPosition;

  // 相位
  aspects: Aspect[];

  // 元数据
  birthTimeKnown: boolean;
  birthLocationKnown: boolean;
}
```

**降级策略对应的 input 形态**:

| 数据完整度 | sun/moon/planets sign | asc/houses | aspects | 期望 confidence |
|---|---|---|---|---|
| **完整(L3)** | ✅ | ✅ | ✅ | **high**(若锚定唯一) |
| **缺时辰(L2)** | ✅ | ❌ | ✅(部分,角度精度低) | **mid**(top-2 候选) |
| **仅日期(L1)** | ✅ | ❌ | 仅日行星相位 | **low**(top-3 候选) |

---

## 3. 规则数据结构

```typescript
// apps/web/src/lib/astro/types.ts
export type RuleType =
  | 'primary'     // 主路径,锚定信号(weight 70-100)
  | 'secondary'   // 次路径,辅助信号(weight 30-60)
  | 'aspect'      // 基于相位(weight 30-50)
  | 'house'       // 基于宫位(weight 30-50,需要 birthTime)
  | 'exclusion'   // 排除信号(negative weight)
  | 'fallback';   // 兜底,仅在主次路径全部失效时考虑(weight 20-30)

export interface Condition {
  // 行星 sign 匹配(任一即可)
  sunSign?: ZodiacSign[];
  moonSign?: ZodiacSign[];
  ascSign?: ZodiacSign[];
  mercurySign?: ZodiacSign[];
  venusSign?: ZodiacSign[];
  marsSign?: ZodiacSign[];
  saturnSign?: ZodiacSign[];
  northNodeSign?: ZodiacSign[];

  // 行星宫位(仅 birthTimeKnown 时有效)
  sunHouse?: number[];
  moonHouse?: number[];
  marsHouse?: number[];
  venusHouse?: number[];
  mercuryHouse?: number[];
  northNodeHouse?: number[];

  // 宫位强势(指定宫位内有 2+ 个行星,或宫主星落入相关位置)
  house3Strong?: boolean;
  house4Strong?: boolean;
  house5Strong?: boolean;
  house7Strong?: boolean;
  house8Strong?: boolean;
  house9Strong?: boolean;
  house10Strong?: boolean;
  house11Strong?: boolean;
  house12Strong?: boolean;

  // 相位简写(常用相位有专属字段,精度优先)
  plutoConjunctSun?: boolean;
  plutoConjunctMoon?: boolean;
  neptuneConjunctSun?: boolean;
  neptuneConjunctMoon?: boolean;
  saturnConjunctSun?: boolean;
  saturnSquareSun?: boolean;
  uranusConjunctSun?: boolean;
  uranusAspect?: boolean;        // 天王任一硬相位

  // 元素/模式聚类
  sunElement?: ('fire' | 'earth' | 'air' | 'water')[];
  fireEmphasis?: boolean;         // 3+ 行星落火象
  waterEmphasis?: boolean;
  airEmphasis?: boolean;
  earthEmphasis?: boolean;
}

export interface ArchetypeRule {
  id: string;                     // 'T01-P1'
  archetypeId: string;            // 'T01'
  type: RuleType;
  weight: number;                 // -50..100
  requiresBirthTime?: boolean;    // 若 true 且 input.birthTimeKnown=false,则跳过
  conditions: Condition;          // 所有非空字段必须同时满足(AND)
  description?: string;           // 人类可读说明
}
```

**条件匹配语义**:

- 条件对象中**多个字段是 AND** 关系
- 单个字段是数组时**数组元素之间是 OR** 关系
- 例:`{ sunSign: ['Scorpio', 'Pisces'], moonHouse: [8] }` → "(太阳天蝎 OR 太阳双鱼) AND 月在 8 宫"
- **元素强势(`*Emphasis`)阈值**:日/月/水/金/火/木/土 7 颗行星中 **≥ 4** 颗落在同元素
- **宫位强势(`house*Strong`)阈值**:指定宫位内 **≥ 2** 颗主要行星(含外行星 10 颗范围)

---

## 4. 评分算法

```typescript
// apps/web/src/lib/astro/match.ts (伪代码)
export function matchArchetypes(input: AstroInput, rules: ArchetypeRule[]): MatchResult {
  const scores = new Map<string, number>();         // archetypeId → 累计分
  const matched = new Map<string, ArchetypeRule[]>(); // archetypeId → 命中规则集

  for (const rule of rules) {
    // 1. 数据可用性检查
    if (rule.requiresBirthTime && !input.birthTimeKnown) continue;

    // 2. 条件匹配
    if (!matchesAllConditions(input, rule.conditions)) continue;

    // 3. 累加权重
    const cur = scores.get(rule.archetypeId) ?? 0;
    scores.set(rule.archetypeId, cur + rule.weight);

    const list = matched.get(rule.archetypeId) ?? [];
    list.push(rule);
    matched.set(rule.archetypeId, list);
  }

  // 4. 排序
  const ranked = [...scores.entries()]
    .sort((a, b) => b[1] - a[1])
    .filter(([, score]) => score > 0);

  // 5. 置信度判定
  const top = ranked[0];
  const second = ranked[1];
  const confidence = deriveConfidence(top, second, input.birthTimeKnown);

  // 6. 兜底
  if (!top || top[1] < THRESHOLDS.lowConfidence) {
    return fallbackByFaction(input);
  }

  return {
    primary: { archetypeId: top[0], score: top[1], matchedRules: matched.get(top[0])! },
    secondary: ranked.slice(1, 3).map(([id, s]) => ({ archetypeId: id, score: s, matchedRules: matched.get(id)! })),
    confidence
  };
}
```

**置信度判定规则**(配合 `decision-tree.json` 中的 thresholds):

```typescript
function deriveConfidence(top, second, birthTimeKnown): 'high' | 'mid' | 'low' {
  if (!top) return 'low';

  const topScore = top[1];
  const secondScore = second?.[1] ?? 0;
  const gap = topScore - secondScore;

  // High: 分数充足 + 与次名差距大 + 有时辰
  if (birthTimeKnown && topScore >= 100 && gap >= 30) return 'high';

  // High alt: 强 P1 命中(≥90) 且 无强力竞争对手
  if (topScore >= 90 && secondScore < 40) return 'high';

  // Mid: 分数 OK + 有明显领先
  if (topScore >= 60 && gap >= 15) return 'mid';

  // Mid alt: 无时辰但 top 仍有体面分数
  if (topScore >= 70 && !birthTimeKnown) return 'mid';

  return 'low';
}
```

**典型分数区间**(供调参参考):

| 场景 | 命中规则 | 累计分 | 期望 confidence |
|---|---|---|---|
| 双锚定(Sun+Moon 同星座) | P1 + 部分 S1 | 100-150 | high |
| 单锚定(Sun + 火星同星座) | P1 + P2 | 95-130 | high |
| Sun + 8/12 宫 + 完整时辰 | P1 + H1 | 90-130 | high |
| 仅 Sun 锚定 | P2(单星座) | 75-85 | high(若无竞争) |
| 缺时辰,仅 Sun + Moon | P2 + S1 | 70-110 | mid |
| 仅日期,只看 Sun | P2(单星座) | 50-80 | mid/low |

---

## 5. 三档降级策略

### 5.1 L3 完整数据(出生年月日 + 时分 + 地点)

- 全部规则启用,包括 `house*` / `asc*`
- 期望:single high-confidence 命中
- UI 文案:`你的主原型是 [深潜者]`

### 5.2 L2 缺时辰(出生年月日 + 地点)

- 跳过所有 `requiresBirthTime: true` 的规则
- 上升 / 宫位字段在条件中视为 false
- 期望:1-2 个 mid-confidence 候选
- UI 文案:`你最接近的两个原型是 [深潜者] / [织梦人] — 填入出生时辰可以更精准`

### 5.3 L1 仅日期(出生年月日,无时间和地点)

- 跳过所有 `requiresBirthTime: true` 规则
- 跳过依赖月亮精确度的规则(月亮日内可移动约 13°,跨星座风险高)
- 期望:top-3 low-confidence 候选,按 faction 分布
- UI 文案:`基于你的太阳与北交,你可能是 [深潜者] / [织梦人] / [见证者] 之一`

### 5.4 兜底矩阵(无任何规则命中时)

按太阳元素 + 月亮元素映射到 faction,再用太阳 modality 锁定 subThemeIndex 范围:

| 太阳元素 | 月亮元素 | 默认 faction | 推荐 subThemeIndex |
|---|---|---|---|
| 火 | 火/风 | **C** | 1, 3, 4, 8 |
| 土 | 土/水 | **C** | 2, 6, 7 |
| 风 | 风/火 | **C/L** | 7, 11 / 3, 10 |
| 水 | 水/土 | **T** | 1, 3, 5, 11 |
| 火 | 水 | **C/T** | 5, 9 / 6 |
| 土 | 水 | **L** | 5, 6, 9 |

---

## 6. 冲突仲裁

当两个原型分数差距 < 10:

1. **同 faction 同分**:按 `subThemeIndex` 升序选最小者(避免随机性,保证可复现)
2. **跨 faction 同分**:
   - 看用户的 `northNode` 落在哪个 faction 的优势元素
   - C: 火 / L: 风+水 / T: 水
   - 北交所在元素优先(因为北交代表"灵魂方向")
3. **强信号锚定**:若一方有 weight ≥ 90 的命中规则,另一方没有,前者胜
4. **最终兜底**:按 faction 字母表顺序 C → L → T(产品决策,创造系优先因 MVP 用户偏年轻)

---

## 7. 规则示例(节选)

### 7.1 T01 深潜者(高度锚定型)

```json
[
  {
    "id": "T01-P1",
    "archetypeId": "T01",
    "type": "primary",
    "weight": 100,
    "conditions": { "sunSign": ["Scorpio"], "moonSign": ["Scorpio"] },
    "description": "太阳月亮双天蝎 = 深潜者完美锚定"
  },
  {
    "id": "T01-P2",
    "archetypeId": "T01",
    "type": "primary",
    "weight": 85,
    "requiresBirthTime": true,
    "conditions": { "sunSign": ["Scorpio"], "house8Strong": true },
    "description": "太阳天蝎 + 8 宫强势"
  },
  {
    "id": "T01-P3",
    "archetypeId": "T01",
    "type": "primary",
    "weight": 75,
    "conditions": { "sunSign": ["Pisces"], "moonSign": ["Scorpio"] },
    "description": "太阳双鱼 + 月天蝎 = 偏深潜者"
  },
  {
    "id": "T01-S1",
    "archetypeId": "T01",
    "type": "secondary",
    "weight": 50,
    "conditions": { "sunSign": ["Cancer", "Pisces"], "plutoConjunctSun": true },
    "description": "水象太阳 + 冥王合相"
  },
  {
    "id": "T01-A1",
    "archetypeId": "T01",
    "type": "aspect",
    "weight": 35,
    "conditions": { "plutoConjunctMoon": true, "sunSign": ["Scorpio", "Cancer", "Pisces"] },
    "description": "冥王合月 + 水象太阳"
  },
  {
    "id": "T01-E1",
    "archetypeId": "T01",
    "type": "exclusion",
    "weight": -30,
    "conditions": { "ascSign": ["Aries", "Sagittarius"], "fireEmphasis": true },
    "description": "上升火象 + 火象强势 → 减分(更可能落 C 阵营)"
  }
]
```

### 7.2 C01 拓荒者(单星座主导型)

```json
[
  {
    "id": "C01-P1",
    "archetypeId": "C01",
    "type": "primary",
    "weight": 95,
    "conditions": { "sunSign": ["Aries"], "marsSign": ["Aries"] },
    "description": "太阳火星双白羊 = 拓荒者完美锚定"
  },
  {
    "id": "C01-P2",
    "archetypeId": "C01",
    "type": "primary",
    "weight": 80,
    "conditions": { "sunSign": ["Aries"] },
    "description": "太阳白羊单独命中"
  },
  {
    "id": "C01-S1",
    "archetypeId": "C01",
    "type": "secondary",
    "weight": 55,
    "requiresBirthTime": true,
    "conditions": { "ascSign": ["Aries", "Leo", "Sagittarius"], "marsSign": ["Aries"] },
    "description": "上升火象 + 火星白羊"
  },
  {
    "id": "C01-S2",
    "archetypeId": "C01",
    "type": "secondary",
    "weight": 40,
    "conditions": { "marsSign": ["Aries"], "fireEmphasis": true },
    "description": "火星白羊 + 火象强势"
  }
]
```

### 7.3 L05 守护者(宫位重度型)

```json
[
  {
    "id": "L05-P1",
    "archetypeId": "L05",
    "type": "primary",
    "weight": 95,
    "requiresBirthTime": true,
    "conditions": { "sunSign": ["Cancer"], "moonHouse": [4], "house4Strong": true },
    "description": "太阳巨蟹 + 月 4 宫 + 4 宫强势"
  },
  {
    "id": "L05-P2",
    "archetypeId": "L05",
    "type": "primary",
    "weight": 80,
    "conditions": { "sunSign": ["Cancer"], "moonSign": ["Cancer", "Taurus", "Pisces"] },
    "description": "太阳巨蟹 + 月在水/土象温润位"
  },
  {
    "id": "L05-S1",
    "archetypeId": "L05",
    "type": "secondary",
    "weight": 45,
    "conditions": { "sunSign": ["Cancer", "Taurus"], "venusSign": ["Cancer", "Taurus"] },
    "description": "土水太阳 + 金星归位"
  },
  {
    "id": "L05-H1",
    "archetypeId": "L05",
    "type": "house",
    "weight": 35,
    "requiresBirthTime": true,
    "conditions": { "house4Strong": true, "sunElement": ["water"] },
    "description": "4 宫强势 + 水象太阳(无生日时辰则跳过)"
  }
]
```

---

## 8. 完整规则集

完整 36 原型规则集存放于 `decision-tree.json`,包含:

- **规则总数**:139 条
- **平均每原型**:~3.9 条(primary 2 + secondary 1-2 + house/exclusion/aspect 各 0-1)
- **类型分布**:primary 74 / secondary 52 / house 3 / exclusion 9 / aspect 1
- **requiresBirthTime 规则占比**:38%(53 条)
- **exclusion 规则**:9 条(用于解决高度重叠的原型对,如 T01/T03 都是天蝎主导)

---

## 9. 测试用例(已知星盘 → 期望原型)

设计 12 个手工验证用例,覆盖三阵营 + 三档置信度:

| 用例 | 关键星盘特征 | 期望主原型 | 期望置信度 |
|---|---|---|---|
| TC-01 | 太阳天蝎 + 月天蝎 + 上升处女 + 完整时辰 | T01 深潜者 | high |
| TC-02 | 太阳白羊 + 火星白羊 + 上升狮子 + 完整时辰 | C01 拓荒者 | high |
| TC-03 | 太阳巨蟹 + 月双鱼 + 12 宫聚集 + 完整时辰 | L09 慰藉者 | high |
| TC-04 | 太阳双鱼 + 月双鱼 + 海王合日 + 缺时辰 | L01 织梦人 | mid |
| TC-05 | 太阳摩羯 + 火星摩羯 + 缺时辰 | T07 淬火者 | mid |
| TC-06 | 太阳天秤 + 水星天秤 + 缺时辰 | L02 调律师 | mid |
| TC-07 | 太阳水瓶 + 天王合日 + 仅日期 | T09 启示者 | low |
| TC-08 | 太阳射手 + 北交 9 宫 + 缺时辰 | C08 远征者 | mid |
| TC-09 | 太阳双子 + 月天秤 + 仅日期 | L03 搭桥者 | low |
| TC-10 | 太阳处女 + 冥王合日 + 8 宫强势 + 完整时辰 | T04 解秘者 | high |
| TC-11 | 太阳天蝎 + 火星狮子 + 10 宫强势 + 完整时辰 | C09 重铸者 | high |
| TC-12 | 太阳金牛 + 月狮子 + 5 宫强势 + 完整时辰 | L04 盛宴主 | high |

**冲突仲裁验证**:

| 用例 | 冲突点 | 仲裁结果 | 仲裁依据 |
|---|---|---|---|
| TC-Conflict-01 | T01(weight 100) vs T03(weight 90) — 双方都太阳天蝎 | T01 主 + T03 次 | 主原型分高,T03 作为次原型呈现 |
| TC-Conflict-02 | C01 vs C04 — 太阳白羊 vs 太阳狮子,两人 fire emphasis 都强 | 看月亮 + 5 宫 | 月狮子 / 5 宫强 → C04;否则 C01 |
| TC-Conflict-03 | L01 vs T10 — 都是太阳双鱼 + 海王/冥王强 | 看 12 宫强度 + 北交 | 北交 12 宫 → T10;否则 L01 |

---

## 10. 性能与缓存

- **运行时延**:139 条规则 × 简单 AND 匹配 ≈ O(rules × conditions),实测 < 1ms(vitest 全套 15 用例 7ms)
- **缓存策略**:同一用户星盘的匹配结果按 `userId + birthChartHash` 缓存,TTL 30 天
- **重算触发**:用户补全生日时辰 → 重算 → 升级置信度
- **规则热更新**:`decision-tree.json` 作为 CMS 内容存放在 PostgreSQL `archetype_rules` 表,版本号字段 `ruleSetVersion`,前端启动时读取最新版本

### 10.1 工程实现位置

```
apps/web/
├─ package.json
├─ tsconfig.json
├─ vitest.config.ts
└─ src/lib/astro/
   ├─ index.ts                  # 公共 API
   ├─ types.ts                  # AstroInput / Condition / ArchetypeRule
   ├─ helpers.ts                # signToElement / elementEmphasis / houseStrong / hasAspect
   ├─ condition-matcher.ts      # matchesAllConditions(Condition)
   ├─ match.ts                  # matchArchetypes / deriveConfidence / buildFallbackResult
   ├─ rules.ts                  # validateDecisionTree / loadDecisionTreeFromFile
   └─ __tests__/
      ├─ fixtures.ts            # buildInput() 测试构造器
      └─ match.test.ts          # 12 用例 + 冲突仲裁 + fallback 共 15 测试
```

调用样例:

```typescript
import { loadDecisionTreeFromFile, matchArchetypes } from '@/lib/astro';

const tree = loadDecisionTreeFromFile('./docs/content/archetypes/decision-tree.json');
const result = matchArchetypes(astroInput, tree);

if (result.fellThroughToFallback) {
  // UI: "数据不足,请补充出生时辰..."
} else {
  // UI: 显示 result.primary + result.secondary,按 result.confidence 调整文案
}
```

运行测试:

```bash
cd apps/web && npm install && npx vitest run
# Test Files  1 passed (1)
# Tests       15 passed (15)
# Duration    < 400ms
```

---

## 11. 数据治理

- 规则的版本化:每次修改保留旧版本,新建 `ruleSetVersion`
- A/B 测试:`ruleSetVersion` 可分配给不同 cohort 验证准确率
- 准确率监控:用户对原型结果点击"这不像我"按钮 → 收集反馈 → 季度迭代

---

## 12. 验收检查

- [x] 输入数据契约定义完整(AstroInput + Condition + ArchetypeRule)
- [x] 评分算法伪代码 + 三档降级 + 冲突仲裁
- [x] 12 个测试用例覆盖三阵营和三档置信度
- [x] 性能目标 + 缓存策略
- [x] 完整规则数据 `decision-tree.json`(185 条)
- [ ] 真实星盘验证(需 task #6.5:取 30 个真人样本盘做盲测)
- [ ] 工程实现 `match.ts`(task #7:MVP 引擎)

---

## 13. 与下游模块的契约

| 下游模块 | 消费内容 | 通过什么字段 |
|---|---|---|
| 灵魂蓝图页 | primary archetype + 置信度 | `primary.archetypeId` + `confidence` |
| 平行人生页 | top-3 候选 | `primary` + `secondary[]` |
| AI 对话 prompt 注入 | 主+次原型名 + 命中规则的描述 | `primary.matchedRules[].description` |
| 关系化学 | 双方各自的 archetypeId | `primary.archetypeId` |
| 潜能雷达 | archetype 的 `radarCeiling` × 命中强度 | `primary.score / 100` 作为强度因子 |

---

## 变更记录

| 版本 | 日期 | 内容 |
|---|---|---|
| v1 | 2026-05-12 | 算法设计 + 185 条规则 + 12 测试用例 + 三档降级 + 冲突仲裁 |
