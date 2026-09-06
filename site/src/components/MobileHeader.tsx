'use client';

import { useMemo } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useActiveSection } from '@/hooks/useActiveSection';
import LangToggle from './LangToggle';
import ThemeToggle from './ThemeToggle';

export default function MobileHeader() {
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
    <header className="sticky top-0 z-50 border-b hairline bg-bg/90 backdrop-blur-sm lg:hidden">
      <div className="flex h-12 items-center justify-between px-5 font-mono text-[12px] sm:px-8">
        <a href="#top" className="flex items-center gap-2 text-fg">
          <span className="status-dot" aria-hidden />
          leo-stuart
        </a>
        <div className="flex items-center gap-4">
          <a
            href="/cv.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted transition-colors hover:text-fg"
          >
            {t.nav.cv}.pdf
          </a>
          <ThemeToggle />
          <LangToggle />
        </div>
      </div>
      <nav
        aria-label="Sections"
        className="flex gap-5 overflow-x-auto px-5 font-mono text-[12px] sm:px-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {nav.map((n) => {
          const isActive = active === n.id;
          return (
            <a
              key={n.id}
              href={`#${n.id}`}
              aria-current={isActive ? 'location' : undefined}
              className={[
                '-mb-px shrink-0 border-b pb-2.5 transition-colors',
                isActive ? 'border-accent text-fg' : 'border-transparent text-dim hover:text-fg',
              ].join(' ')}
            >
              {n.label}
            </a>
          );
        })}
      </nav>
    </header>
  );
}
