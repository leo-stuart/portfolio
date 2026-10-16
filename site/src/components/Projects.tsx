'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, MotionConfig } from 'motion/react';
import { useLanguage } from '@/context/LanguageContext';
import type { Project } from '@/data/content';
import { ui, slug } from '@/data/ui';
import Section, { Bullets } from './Section';

function domainOf(href: string) {
  try {
    return new URL(href).host.replace(/^www\./, '');
  } catch {
    return href;
  }
}

const isLive = (p: Project) =>
  /present|atual/i.test(p.period) || p.links.some((l) => ['App', 'Site', 'Demo'].includes(l.label));

export const OPEN_PROJECT = 'open-project';

export default function Projects() {
  const { t, lang } = useLanguage();
  const s = ui[lang];
  const [open, setOpen] = useState<string | null>(null);
  const [peek, setPeek] = useState<string | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);
  const current = t.projects.items.find((p) => slug(p.name) === open);

  useEffect(() => {
    const onOpen = (e: Event) => {
      lastFocus.current = null;
      setOpen((e as CustomEvent<string>).detail);
    };
    window.addEventListener(OPEN_PROJECT, onOpen);
    return () => window.removeEventListener(OPEN_PROJECT, onOpen);
  }, []);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(null);
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
      lastFocus.current?.focus();
    };
  }, [open]);

  return (
    <MotionConfig reducedMotion="user" transition={{ type: 'spring', stiffness: 380, damping: 34 }}>
      <Section id="projects" title={t.projects.title} aside={<span className="font-mono">{t.projects.items.length} deploys</span>}>
        <p className="mb-3 font-mono text-[12px] text-dim">{s.ledgerHint}</p>
        <div className="card overflow-hidden">
          <div className="hidden grid-cols-[110px_minmax(0,1.2fr)_minmax(0,1.4fr)_170px] gap-4 border-b hairline bg-panel px-5 py-2 sm:grid">
            {s.ledgerCols.map((c) => (
              <span key={c} className="mono-label">{c}</span>
            ))}
          </div>
          <ul>
            {t.projects.items.map((p) => {
              const id = slug(p.name);
              const live = isLive(p);
              return (
                <motion.li
                  key={p.name}
                  layoutId={`row-${id}`}
                  className="relative border-b hairline bg-bg last:border-b-0"
                  onMouseEnter={() => setPeek(id)}
                  onMouseLeave={() => setPeek((v) => (v === id ? null : v))}
                  onFocus={() => setPeek(id)}
                  onBlur={() => setPeek((v) => (v === id ? null : v))}
                >
                  <button
                    type="button"
                    onClick={(e) => {
                      lastFocus.current = e.currentTarget;
                      setOpen(id);
                    }}
                    aria-haspopup="dialog"
                    className="grid w-full grid-cols-[1fr_auto] gap-x-4 gap-y-1 px-5 py-3.5 text-left transition-colors hover:bg-panel sm:grid-cols-[110px_minmax(0,1.2fr)_minmax(0,1.4fr)_170px] sm:items-center"
                  >
                    <span className={`order-2 font-mono text-[12px] sm:order-none ${live ? 'text-ok' : 'text-amber'}`}>
                      ● {live ? s.statusLive : s.statusDone}
                    </span>
                    <motion.span layoutId={`name-${id}`} className="order-1 font-semibold tracking-tight sm:order-none">
                      {p.name}
                    </motion.span>
                    <span className="order-3 col-span-2 truncate font-mono text-[12px] text-dim sm:order-none sm:col-span-1">
                      {p.tech.slice(0, 3).join(' · ')}
                    </span>
                    <span className="order-4 col-span-2 font-mono text-[12px] tabular-nums text-dim sm:order-none sm:col-span-1">{p.period}</span>
                  </button>
                  <AnimatePresence>
                    {peek === id && !open && p.image && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 4 }}
                        transition={{ duration: 0.18 }}
                        aria-hidden
                        className="pointer-events-none absolute bottom-full right-6 z-30 mb-2 hidden w-[280px] overflow-hidden rounded-lg border hairline bg-bg shadow-2xl lg:block"
                      >
                        <Image src={p.image} alt="" width={560} height={315} sizes="280px" className="aspect-[16/9] w-full object-cover object-top" />
                        <div className="flex items-center justify-between px-3 py-2 font-mono text-[11px]">
                          <span className="text-dim">{slug(p.name)}</span>
                          <span className="deploy-status flex items-center gap-1.5">
                            <span className={`h-1.5 w-1.5 rounded-full ${live ? 'bg-ok' : 'bg-amber'}`} />
                            <span className="deploy-building inline-block text-amber">building…</span>
                            <span className={`deploy-done ${live ? 'text-ok' : 'text-amber'}`}>{live ? s.statusLive : s.statusDone}</span>
                          </span>
                        </div>
                        <span className="deploy-bar block h-0.5 origin-left bg-ok" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.li>
              );
            })}
          </ul>
        </div>

        <AnimatePresence>
          {current && (
            <div className="fixed inset-0 z-[60] flex items-end justify-center p-0 sm:items-center sm:p-6">
              <motion.div
                className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setOpen(null)}
              />
              <motion.div
                layoutId={`row-${slug(current.name)}`}
                role="dialog"
                aria-modal="true"
                aria-labelledby="project-title"
                className="relative max-h-[92vh] w-full max-w-[720px] overflow-y-auto rounded-t-2xl border hairline bg-bg shadow-2xl sm:rounded-2xl"
              >
                {current.image && (
                  <Image
                    src={current.image}
                    alt={`${current.name} screenshot`}
                    width={1280}
                    height={800}
                    sizes="720px"
                    className="aspect-[16/9] w-full border-b hairline object-cover object-top"
                  />
                )}
                <div className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <motion.h3 id="project-title" layoutId={`name-${slug(current.name)}`} className="text-[22px] font-semibold tracking-tight">
                        {current.name}
                      </motion.h3>
                      <p className="mt-1 font-mono text-[12px] text-dim">
                        <span className={isLive(current) ? 'text-ok' : 'text-amber'}>● {isLive(current) ? s.statusLive : s.statusDone}</span>
                        {'  ·  '}
                        {current.role} · {current.period}
                      </p>
                    </div>
                    <button ref={closeRef} type="button" onClick={() => setOpen(null)} className="btn btn-secondary h-9 px-3 font-mono text-[12px]">
                      esc · {s.close}
                    </button>
                  </div>
                  <p className="mt-4 text-[15px] leading-7 text-muted">{current.summary}</p>
                  {current.highlights.length > 0 && (
                    <div className="mt-4">
                      <Bullets items={current.highlights} />
                    </div>
                  )}
                  <p className="mt-5 font-mono text-[12px] text-dim">{current.tech.join(' · ')}</p>
                  {current.links.length > 0 && (
                    <ul className="mt-5 flex flex-wrap gap-3">
                      {current.links.map((l) => (
                        <li key={l.href}>
                          <a href={l.href} target="_blank" rel="noopener noreferrer" className="btn btn-secondary h-9 text-[13px]">
                            {l.label === 'App' || l.label === 'Site' ? domainOf(l.href) : l.label} ↗
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </Section>
    </MotionConfig>
  );
}
