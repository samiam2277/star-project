export interface OnboardingDraft {
  date?: string; // YYYY-MM-DD
  time?: string; // HH:mm
  utcOffsetHours?: number;
  lat?: number;
  lon?: number;
  birthTimeKnown?: boolean;
  birthLocationKnown?: boolean;
  cityId?: string;
}

const STORAGE_KEY = 'stellarlog:birthData';

export function saveDraft(draft: OnboardingDraft): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
  } catch {
    // ignore storage errors
  }
}

export function getDraft(): OnboardingDraft | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as OnboardingDraft;
  } catch {
    return null;
  }
}

export function clearDraft(): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}

export function buildBirthData(draft: OnboardingDraft): {
  date: string;
  time?: string;
  utcOffsetHours: number;
  lat?: number;
  lon?: number;
} | null {
  if (!draft.date) return null;
  return {
    date: draft.date,
    time: draft.birthTimeKnown ? draft.time : undefined,
    utcOffsetHours: draft.utcOffsetHours ?? 8,
    lat: draft.birthLocationKnown ? draft.lat : undefined,
    lon: draft.birthLocationKnown ? draft.lon : undefined,
  };
}
