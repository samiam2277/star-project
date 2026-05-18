'use client';

import * as React from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/navigation';
import { Button } from '@/components/ui/Button';
import { saveDraft, getDraft } from '@/lib/onboarding/storage';
import { cities, findCityById } from '@/lib/onboarding/cities';

export default function BirthPlacePage() {
  const t = useTranslations('onboarding');
  const router = useRouter();
  const [cityId, setCityId] = React.useState('');
  const [unknown, setUnknown] = React.useState(false);

  React.useEffect(() => {
    const draft = getDraft();
    if (draft?.cityId) {
      setCityId(draft.cityId);
    }
    if (draft?.birthLocationKnown === false) {
      setUnknown(true);
    }
  }, []);

  const handleFinish = React.useCallback(() => {
    const city = findCityById(cityId);
    const draft = getDraft() ?? {};
    saveDraft({
      ...draft,
      cityId: unknown ? undefined : cityId,
      lat: unknown ? undefined : city?.lat,
      lon: unknown ? undefined : city?.lon,
      utcOffsetHours: unknown ? 8 : city?.utcOffsetHours ?? 8,
      birthLocationKnown: !unknown,
    });
    router.push('/chart');
  }, [cityId, unknown, router]);

  return (
    <div className="mx-auto max-w-sm pt-4">
      <h2 className="font-serif text-display-lg text-fg-primary mb-2">
        {t('birthPlace.title')}
      </h2>
      <p className="text-body text-fg-secondary mb-8">
        {t('birthPlace.subtitle')}
      </p>

      <label className="block text-caption text-fg-dim mb-2">
        {t('birthPlace.label')}
      </label>
      <select
        value={cityId}
        disabled={unknown}
        onChange={(e) => setCityId(e.target.value)}
        className="h-14 w-full appearance-none rounded-2xl bg-bg-elevated px-5 text-body text-fg-primary outline-none ring-1 ring-border-subtle transition focus:ring-2 focus:ring-accent-gold disabled:opacity-40"
      >
        <option value="">{t('birthPlace.placeholder')}</option>
        {cities.map((c) => (
          <option key={c.id} value={c.id}>
            {c.nameZh} / {c.nameEn}
          </option>
        ))}
      </select>

      <label className="mt-4 flex items-center gap-3 rounded-xl bg-bg-card p-4">
        <input
          type="checkbox"
          checked={unknown}
          onChange={(e) => {
            const checked = e.target.checked;
            setUnknown(checked);
            if (checked) setCityId('');
          }}
          className="h-5 w-5 accent-accent-gold"
        />
        <div>
          <p className="text-body text-fg-primary">{t('birthPlace.unknownLabel')}</p>
          <p className="text-caption text-fg-dim">{t('birthPlace.unknownHint')}</p>
        </div>
      </label>

      <p className="mt-3 text-micro text-fg-dim">
        {t('birthPlace.missing')}
      </p>

      <div className="mt-10">
        <Button onClick={handleFinish} className="w-full">
          {t('finish')}
        </Button>
      </div>
    </div>
  );
}
