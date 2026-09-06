'use client';

import { useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

function readTheme(): Theme {
  const t = document.documentElement.dataset.theme;
  return t === 'light' || t === 'dark' ? t : 'dark';
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme | null>(null);

  // Theme is resolved by the inline script in layout before hydration, so it
  // can only be read on the client after mount.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTheme(readTheme());
  }, []);

  const toggle = () => {
    const next: Theme = (theme ?? readTheme()) === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem('theme', next);
    } catch {
      /* private mode */
    }
    setTheme(next);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
      className="shrink-0 cursor-pointer whitespace-nowrap font-mono text-[12px] text-dim transition-colors hover:text-muted"
    >
      <span className={theme === 'dark' ? 'text-fg' : ''}>dark</span>
      <span className="text-line-strong"> / </span>
      <span className={theme === 'light' ? 'text-fg' : ''}>light</span>
    </button>
  );
}
