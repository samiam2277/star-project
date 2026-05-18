'use client';

import { useTranslations } from 'next-intl';

export function ChartLoadingState() {
  const t = useTranslations('chart');
  return (
    <div className="flex h-[64vh] flex-col items-center justify-center gap-4">
      <div className="h-10 w-10 animate-spin rounded-full border-2 border-accent-gold/30 border-t-accent-gold"
/>
      <p className="text-caption text-fg-dim">{t('loading')}</p>
    </div>
  );
}
