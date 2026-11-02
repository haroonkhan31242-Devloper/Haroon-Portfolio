import { useSyncExternalStore } from 'react';

export type Theme = 'light' | 'dark';

const STORAGE_KEY = 'hk-theme';
const listeners = new Set<() => void>();

const readTheme = (): Theme =>
  document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';

/** Applies the theme to <html>, cross-fading colours briefly, and persists the choice. */
export const setTheme = (theme: Theme) => {
  const root = document.documentElement;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduced) {
    root.classList.add('theme-switching');
    window.setTimeout(() => root.classList.remove('theme-switching'), 400);
  }
  root.setAttribute('data-theme', theme);
  root.style.colorScheme = theme;
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'light' ? '#f5f6f8' : '#0a0c10');
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    /* storage unavailable (private mode) — the choice still applies for this visit */
  }
  listeners.forEach((l) => l());
};

const subscribe = (cb: () => void) => {
  listeners.add(cb);
  return () => listeners.delete(cb);
};

export const useTheme = () => {
  const theme = useSyncExternalStore(subscribe, readTheme, () => 'dark' as Theme);
  return { theme, setTheme, toggleTheme: () => setTheme(theme === 'light' ? 'dark' : 'light') };
};
