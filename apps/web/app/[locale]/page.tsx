import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

export default function HomePage() {
  const t = useTranslations('home');

  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6">
      <div className="max-w-sm text-center">
        <h1 className="font-serif text-display-lg text-fg-primary mb-4">
          {t('heroTitle')}
        </h1>
        <p className="text-body text-fg-secondary mb-10">
          {t('heroSubtitle')}
        </p>

        <div className="flex flex-col gap-3">
          <Link
            href="/onboarding"
            className="inline-flex h-14 items-center justify-center rounded-2xl bg-gradient-to-br from-accent-gold via-[#E5C892] to-accent-gold-deep px-6 text-body font-semibold text-fg-on-gold shadow-glow-gold transition hover:brightness-110 active:scale-[0.97]"
          >
            {t('ctaStart')}
          </Link>

          <button className="inline-flex h-12 items-center justify-center rounded-xl border border-border-default bg-transparent px-6 text-body font-medium text-fg-secondary transition hover:bg-bg-elevated active:scale-[0.97]">
            {t('ctaShare')}
          </button>
        </div>
      </div>
    </main>
  );
}
