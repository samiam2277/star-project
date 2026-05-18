'use client';

import * as React from 'react';
import dynamic from 'next/dynamic';
import { useTranslations } from 'next-intl';
import { PageHeader } from '@/components/nav/PageHeader';
import { BottomTab } from '@/components/nav/BottomTab';
import { PlanetInterpretSheet } from '@/components/chart/PlanetInterpretSheet';
import { ChartLoadingState } from '@/components/chart/ChartLoadingState';
import { Button } from '@/components/ui/Button';
import { useNatalChart } from '@/hooks/useNatalChart';
import type { Planet, PlanetPosition } from '@/lib/astro/types';
import { useRouter } from '@/i18n/navigation';

const NatalChart3D = dynamic(
  () =>
    import('@/components/chart/NatalChart3D').then((m) => ({
      default: m.NatalChart3D,
    })),
  { ssr: false },
);

export default function ChartPage() {
  const t = useTranslations('chart');
  const router = useRouter();
  const { result, loading, error } = useNatalChart();
  const [selected, setSelected] = React.useState<
    { planet: Planet; position: PlanetPosition } | null
  >(null);

  const handlePlanetClick = React.useCallback(
    (planet: Planet) => {
      if (!result) return;
      const pos = result.input[planet as keyof typeof result.input];
      if (!pos || typeof pos !== 'object' || !('sign' in pos)) return;
      setSelected({ planet, position: pos as PlanetPosition });
    },
    [result],
  );

  return (
    <div className="relative min-h-screen bg-bg-deep pb-24">
      <PageHeader title={t('title')} onBack={() => router.push('/today')} />

      <main>
        {loading && <ChartLoadingState />}

        {!loading && error === 'missing' && (
          <div className="flex h-[64vh] flex-col items-center justify-center gap-4 px-6">
            <p className="text-body text-fg-secondary">{t('missingData')}</p>
            <Button onClick={() => router.push('/onboarding/birth-date')}>
              {t('completeOnboarding')}
            </Button>
          </div>
        )}

        {!loading && error && error !== 'missing' && (
          <div className="flex h-[64vh] flex-col items-center justify-center gap-4 px-6">
            <p className="text-body text-fg-secondary">{t('error')}</p>
            <p className="text-caption text-fg-dim">{error}</p>
            <Button onClick={() => window.location.reload()}>{t('retry')}</Button>
          </div>
        )}

        {!loading && !error && result && (
          <>
            <NatalChart3D
              lons={result.lons}
              cusps={result.cusps}
              onPlanetClick={handlePlanetClick}
            />

            <p className="mt-2 px-5 text-center text-caption text-fg-dim">
              {result.cusps == null ? t('info.noHouses') : t('info.interact')}
            </p>
          </>
        )}
      </main>

      <BottomTab />

      {selected && (
        <PlanetInterpretSheet
          planet={selected.planet}
          position={selected.position}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  );
}
