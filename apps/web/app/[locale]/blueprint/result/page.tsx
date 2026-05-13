import { useTranslations } from 'next-intl';
import { PageHeader } from '@/components/nav/PageHeader';
import { BottomTab } from '@/components/nav/BottomTab';
import {
  ArchetypeHero,
  DefinitionQuote,
  TalentZone,
  ShadowZone,
  EvolutionPath,
  NextSteps,
} from '@/components/blueprint';
import { mockBlueprint } from '@/components/blueprint/data';

export default function BlueprintResultPage() {
  const t = useTranslations('blueprint');
  const data = mockBlueprint;

  return (
    <div className="relative min-h-screen bg-bg-deep pb-24">
      <PageHeader title={t('title')} onBack={() => history.back()} />

      <main className="flex flex-col">
        {/* Section 1: 原型主视觉 */}
        <ArchetypeHero
          nameZh={data.primaryArchetype.nameZh}
          nameEn={data.primaryArchetype.nameEn}
          number={data.primaryArchetype.number}
          themeColor={data.primaryArchetype.themeColor}
        />

        {/* Section 2: 定义引述 */}
        <DefinitionQuote text={data.primaryArchetype.definition} />

        {/* Section 3: 天赋区 */}
        <TalentZone items={data.talentZone} />

        {/* Section 4: 阴影区 */}
        <ShadowZone items={data.shadowZone} tips={data.shadowTips} />

        {/* Section 5: 进化路径 */}
        <EvolutionPath data={data.evolutionPath} />

        {/* Section 6-9 占位 */}
        <section className="flex flex-col items-center gap-2 px-6 py-10 text-fg-dim">
          <span className="text-caption">潜能雷达 · 年度角色卡 · 平行人生 · PDF</span>
          <span className="text-micro">（Section 6-9 后续迭代）</span>
        </section>

        {/* Section 10: 闭环 CTA */}
        <NextSteps items={data.nextSteps} />

        {/* Section 11: 元数据 */}
        <section className="flex flex-col items-center gap-2 px-6 py-8 text-fg-dim">
          <span className="text-caption">生成于 {data.generatedAt}</span>
          <span className="text-micro">基于 archetype-lib v1.0</span>
          <button className="mt-2 text-caption text-accent-gold hover:underline">
            我的出生信息变了？
          </button>
        </section>
      </main>

      <BottomTab />
    </div>
  );
}
