'use client';

import * as React from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/navigation';
import { Button } from '@/components/ui/Button';
import { saveDraft, getDraft } from '@/lib/onboarding/storage';

export default function BirthDatePage() {
  const t = useTranslations('onboarding');
  const router = useRouter();
  const [date, setDate] = React.useState('');
  const [error, setError] = React.useState('');

  React.useEffect(() => {
    const draft = getDraft();
    if (draft?.date) {
      setDate(draft.date);
    }
  }, []);

  const handleNext = React.useCallback(() => {
    if (!date) {
      setError(t('birthDate.errorRequired'));
      return;
    }
    const d = new Date(date);
    const now = new Date();
    const minDate = new Date('1920-01-01');
    if (isNaN(d.getTime()) || d < minDate || d > now) {
      setError(t('birthDate.errorRange'));
      return;
    }
    setError('');
    const draft = getDraft() ?? {};
    saveDraft({ ...draft, date });
    router.push('/onboarding/birth-time');
  }, [date, router, t]);

  return (
    <div className="mx-auto max-w-sm pt-4">
      <h2 className="font-serif text-display-lg text-fg-primary mb-2">
        {t('birthDate.title')}
      </h2>
      <p className="text-body text-fg-secondary mb-8">
        {t('birthDate.subtitle')}
      </p>

      <label className="block text-caption text-fg-dim mb-2">
        {t('birthDate.label')}
      </label>
      <input
        type="date"
        value={date}
        onChange={(e) => {
          setDate(e.target.value);
          setError('');
        }}
        className="h-14 w-full rounded-2xl bg-bg-elevated px-5 text-body text-fg-primary outline-none ring-1 ring-border-subtle transition focus:ring-2 focus:ring-accent-gold"
      />
      {error && (
        <p className="mt-2 text-caption text-accent-rose">{error}</p>
      )}

      <div className="mt-10">
        <Button onClick={handleNext} className="w-full">
          {t('next')}
        </Button>
      </div>
    </div>
  );
}
