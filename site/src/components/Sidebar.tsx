'use client';

import { useMemo } from 'react';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import { useActiveSection } from '@/hooks/useActiveSection';
import Clock from './Clock';
import LangToggle from './LangToggle';

export default function Sidebar() {
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
    <aside className="hidden lg:flex lg:sticky lg:top-0 lg:h-screen lg:flex-col lg:py-14">
      <a href="#top" className="flex items-center gap-3">
        <Image
          src="/photo.jpg"
          alt=""
          width={40}
          height={40}
          priority
          className="h-10 w-10 rounded-md border hairline object-cover"
        />
        <span className="leading-tight">
          <span className="block text-[15px] font-medium tracking-tight">{t.hero.name}</span>
          <span className="block font-mono text-[12px] text-dim">{t.hero.role}</span>
        </span>
      </a>

      <p className="mt-6 font-mono text-[12px] text-muted">
        <span className="text-dim">{t.about.facts[0].label} </span>
        {t.hero.now}
      </p>

      <nav className="mt-12" aria-label="Sections">
        <ul className="flex flex-col gap-1.5 font-mono text-[13px]">
          {nav.map((n) => {
            const isActive = active === n.id;
            return (
              <li key={n.id}>
                <a
                  href={`#${n.id}`}
                  aria-current={isActive ? 'location' : undefined}
                  className={[
                    'group flex items-center gap-3 py-0.5 transition-colors',
                    isActive ? 'text-fg' : 'text-dim hover:text-muted',
                  ].join(' ')}
                >
                  <span
                    aria-hidden
                    className={[
                      'h-px transition-all duration-200',
                      isActive ? 'w-6 bg-accent' : 'w-3 bg-line-strong group-hover:w-5',
                    ].join(' ')}
                  />
                  {n.label}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="mt-auto flex flex-col gap-5 font-mono text-[12px]">
        <ul className="flex flex-col gap-1.5 text-muted">
          <li>
            <a href={`mailto:${t.contact.email}`} className="link">
              {t.contact.email}
            </a>
          </li>
          <li>
            <a href="https://github.com/leo-stuart" target="_blank" rel="noopener noreferrer" className="link">
              github
            </a>
            <span className="text-dim"> · </span>
            <a
              href="https://linkedin.com/in/leonardo-stuart"
              target="_blank"
              rel="noopener noreferrer"
              className="link"
            >
              linkedin
            </a>
            <span className="text-dim"> · </span>
            <a href="/cv.pdf" target="_blank" rel="noopener noreferrer" className="link">
              {t.nav.cv}.pdf
            </a>
          </li>
        </ul>

        <div className="flex items-center justify-between gap-3 border-t hairline pt-4 text-dim">
          <span className="flex items-center gap-2 truncate whitespace-nowrap">
            <span className="status-dot" aria-hidden />
            {t.hero.status.split(',')[0]}
            <span className="text-line-strong"> · </span>
            <Clock />
          </span>
          <LangToggle />
        </div>
      </div>
    </aside>
  );
}
