'use client';

import { useMemo } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useActiveSection } from '@/hooks/useActiveSection';
import Clock from './Clock';
import LangToggle from './LangToggle';
import ThemeToggle from './ThemeToggle';

export default function Masthead() {
  const { t } = useLanguage();

  const nav = useMemo(
    () => [
      { id: 'about', label: t.nav.about },
      { id: 'experience', label: t.nav.experience },
      { id: 'projects', label: t.nav.projects },
      { id: 'skills', label: t.nav.skills },
      { id: 'contact', label: t.nav.contact },
    ],
    [t]
  );
  const ids = useMemo(() => nav.map((n) => n.id), [nav]);
  const active = useActiveSection(ids);

  return (
    <header className="sticky top-0 z-50 border-b hairline bg-bg/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 w-full max-w-[1200px] items-center justify-between gap-6 px-5 text-[14px] sm:px-8">
        <a href="#top" className="font-semibold tracking-tight">
          {t.hero.name}
        </a>

        <nav aria-label="Sections" className="hidden items-center gap-1 md:flex">
          {nav.map((n) => {
            const isActive = active === n.id;
            return (
              <a
                key={n.id}
                href={`#${n.id}`}
                aria-current={isActive ? 'location' : undefined}
                className={[
                  'rounded-md px-3 py-1.5 transition-colors',
                  isActive ? 'bg-panel text-fg' : 'text-muted hover:text-fg',
                ].join(' ')}
              >
                {n.label}
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-4 text-muted">
          <span className="hidden items-center gap-2 tabular-nums text-dim lg:flex">
            <span className="status-dot" aria-hidden />
            <Clock />
          </span>
          <a href="/cv.pdf" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-fg">
            {t.nav.cv}
          </a>
          <ThemeToggle />
          <LangToggle />
        </div>
      </div>
    </header>
  );
}
