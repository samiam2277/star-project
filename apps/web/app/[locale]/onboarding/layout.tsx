'use client';

import * as React from 'react';
import { usePathname } from 'next/navigation';
import { PageHeader } from '@/components/nav/PageHeader';
import { ProgressBar } from '@/components/onboarding/ProgressBar';

function getStepIndex(pathname: string): number {
  if (pathname.includes('/birth-place')) return 3;
  if (pathname.includes('/birth-time')) return 2;
  return 1;
}

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const step = getStepIndex(pathname ?? '');

  return (
    <div className="relative min-h-screen bg-bg-deep pb-6">
      <PageHeader
        title=""
        onBack={() => {
          if (typeof window !== 'undefined') {
            window.history.back();
          }
        }}
      />

      <div className="flex justify-center py-4">
        <ProgressBar current={step} total={3} />
      </div>

      <div className="px-6">{children}</div>
    </div>
  );
}
