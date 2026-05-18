'use client';

import { useState, useEffect } from 'react';
import { getDraft, buildBirthData } from '@/lib/onboarding/storage';
import type { NatalChartResult } from '@/lib/astro/compute/compute-chart';

export function useNatalChart() {
  const [result, setResult] = useState<NatalChartResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;
    async function run() {
      const draft = getDraft();
      const birth = buildBirthData(draft ?? {});
      if (!birth) {
        setLoading(false);
        setError('missing');
        return;
      }
      try {
        const { computeNatalChart } = await import(
          '@/lib/astro/compute/compute-chart'
        );
        const r = await computeNatalChart(birth);
        if (!cancelled) {
          setResult(r);
          setLoading(false);
        }
      } catch (e) {
        if (!cancelled) {
          setError(String(e));
          setLoading(false);
        }
      }
    }
    run();
    return () => {
      cancelled = true;
    };
  }, []);

  return { result, loading, error };
}
