'use client';

import * as React from 'react';
import { useTranslations } from 'next-intl';
import type { Planet as PlanetKey, PlanetPosition } from '@/lib/astro/types';
import { cn } from '@/lib/utils';

interface Props {
  planet: PlanetKey;
  position: PlanetPosition;
  onClose: () => void;
}

const planetColors: Record<string, string> = {
  sun: '#E0A82E',
  moon: '#C7C2B8',
  mercury: '#5B7A95',
  venus: '#B8838C',
  mars: '#C26B5C',
  jupiter: '#6B5B95',
  saturn: '#8A8595',
  uranus: '#5B7A95',
  neptune: '#4A3F6B',
  pluto: '#6B5B95',
  northNode: '#C9A876',
  chiron: '#B8838C',
  asc: '#C9A876',
  mc: '#C9A876',
};

export const PlanetInterpretSheet = React.memo(function PlanetInterpretSheet({
  planet,
  position,
  onClose,
}: Props) {
  const t = useTranslations('chart');
  const color = planetColors[planet] ?? '#C9A876';

  const lon = React.useMemo(() => {
    // reconstruct approximate lon from sign + degree for display
    const signs = [
      'Aries','Taurus','Gemini','Cancer','Leo','Virgo',
      'Libra','Scorpio','Sagittarius','Capricorn','Aquarius','Pisces',
    ];
    const idx = signs.indexOf(position.sign);
    if (idx < 0) return null;
    return idx * 30 + (position.degree ?? 0);
  }, [position]);

  return (
    <>
      <div
        className="fixed inset-0 z-modal-bg bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="fixed bottom-0 left-0 right-0 z-modal rounded-t-3xl border-t border-border-subtle bg-bg-card p-6 shadow-glow-gold animate-in slide-in-from-bottom duration-300">
        <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-border-default"
/>

        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <span
              className="inline-block h-3 w-3 rounded-full"
              style={{ backgroundColor: color }}
            />
            <h3 className="font-serif text-h2 text-fg-primary">
              {t(`planet.${planet}`)}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="rounded-xl p-2 text-fg-dim transition hover:bg-bg-elevated hover:text-fg-secondary"
          >
            ✕
          </button>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <InfoCell label={t('sheet.longitude')} value={lon != null ? `${lon.toFixed(1)}°` : '—'} />
          <InfoCell label={t('sign', { defaultValue: position.sign })} value={t(`sign.${position.sign}`)} />
          {position.house ? (
            <InfoCell label={t('sheet.house', { n: position.house })} value={t('sheet.house', { n: position.house })} />
          ) : (
            <InfoCell label={t('sheet.house', { n: 0 })} value={t('sheet.noHouse')} />
          )}
          <InfoCell
            label={t('sheet.retrograde')}
            value={position.retrograde ? '✓' : '—'}
            dim={!position.retrograde}
          />
        </div>
      </div>
    </>
  );
});

function InfoCell({
  label,
  value,
  dim,
}: {
  label: string;
  value: string;
  dim?: boolean;
}) {
  return (
    <div className="rounded-xl bg-bg-elevated p-3">
      <p className="text-micro text-fg-dim">{label}</p>
      <p className={cn('mt-1 text-body font-medium', dim ? 'text-fg-dim' : 'text-fg-primary')}>
        {value}
      </p>
    </div>
  );
}
