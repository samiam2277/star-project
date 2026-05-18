'use client';

import * as React from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/navigation';
import { Button } from '@/components/ui/Button';
import { saveDraft, getDraft } from '@/lib/onboarding/storage';

export default function BirthTimePage() {
  const t = useTranslations('onboarding');
  const router = useRouter();
  const [time, setTime] = React.useState('');
  const [unknown, setUnknown] = React.useState(false);

  React.useEffect(() => {
    const draft = getDraft();
    if (draft?.time) {
      setTime(draft.time);
    }
    if (draft?.birthTimeKnown === false) {
      setUnknown(true);
      setTime('');
    }
  }, []);

  const handleNext = React.useCallback(() => {
    const draft = getDraft() ?? {};
    saveDraft({
      ...draft,
      time: unknown ? undefined : time,
      birthTimeKnown: !unknown,
    });
    router.push('/onboarding/birth-place');
  }, [time, unknown, router]);

  return (
    <div className="mx-auto max-w-sm pt-4">
      <h2 className="font-serif text-display-lg text-fg-primary mb-2">
        {t('birthTime.title')}
      </h2>
      <p className="text-body text-fg-secondary mb-8">
        {t('birthTime.subtitle')}
      </p>

      <label className="block text-caption text-fg-dim mb-2">
        {t('birthTime.label')}
      </label>
      <input
        type="time"
        value={time}
        disabled={unknown}
        onChange={(e) => setTime(e.target.value)}
        className="h-14 w-full rounded-2xl bg-bg-elevated px-5 text-body text-fg-primary outline-none ring-1 ring-border-subtle transition focus:ring-2 focus:ring-accent-gold disabled:opacity-40"
      />

      <label className="mt-4 flex items-center gap-3 rounded-xl bg-bg-card p-4">
        <input
          type="checkbox"
          checked={unknown}
          onChange={(e) => {
            const checked = e.target.checked;
            setUnknown(checked);
            if (checked) setTime('');
          }}
          className="h-5 w-5 accent-accent-gold"
        />
        <div>
          <p className="text-body text-fg-primary">{t('birthTime.unknownLabel')}</p>
          <p className="text-caption text-fg-dim">{t('birthTime.unknownHint')}</p>
        </div>
      </label>

      <div className="mt-10">
        <Button onClick={handleNext} className="w-full">
          {t('next')}
        </Button>
      </div>
    </div>
  );
}
