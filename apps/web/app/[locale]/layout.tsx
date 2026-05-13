import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { InstallPrompt } from '@/components/pwa/InstallPrompt';
import '../globals.css';

export const metadata: Metadata = {
  title: 'StellarLog — 看见你尚未激活的自己',
  description:
    '海外华人的中英双语灵魂人格平台。灵魂蓝图 · 平行人生 · 潜能雷达 · AI 占星师。',
  manifest: '/manifest.json',
  icons: {
    icon: '/icon.svg',
    apple: '/icon.svg',
  },
};

export function generateStaticParams() {
  return routing.locales.map((locale: string) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className="min-h-screen bg-bg-deep text-fg-primary antialiased">
        <NextIntlClientProvider messages={messages}>
          {children}
          <InstallPrompt />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
