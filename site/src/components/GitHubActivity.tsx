'use client';

import { useRef, useState } from 'react';
import { useInView, useReducedMotion } from 'motion/react';
import { useLanguage } from '@/context/LanguageContext';
import type { GitHubData, Day } from '@/lib/github-types';
import { ui } from '@/data/ui';
import Section from './Section';

const CELL = 11;
const GAP = 3;
const OPACITY = [0, 0.3, 0.5, 0.75, 1];

function fmt(date: string, lang: 'en' | 'pt') {
  return new Date(date + 'T12:00:00Z').toLocaleDateString(lang === 'pt' ? 'pt-BR' : 'en-US', { day: 'numeric', month: 'short', year: 'numeric' });
}

function ago(date: string, lang: 'en' | 'pt') {
  const d = Math.max(0, Math.round((Date.now() - new Date(date).getTime()) / 86400000));
  const rtf = new Intl.RelativeTimeFormat(lang === 'pt' ? 'pt-BR' : 'en', { numeric: 'auto' });
  return rtf.format(-d, 'day');
}

export default function GitHubActivity({ data }: { data: GitHubData }) {
  const { lang } = useLanguage();
  const s = ui[lang];
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const reduce = useReducedMotion();
  const [hover, setHover] = useState<Day | null>(null);

  if (!data.days.length && !data.activity.length) return null;

  const offset = data.days.length ? new Date(data.days[0].date + 'T12:00:00Z').getUTCDay() : 0;
  const weeks = Math.ceil((data.days.length + offset) / 7);
  const max = data.days.reduce((m, d) => Math.max(m, d.count), 0);
  const show = inView || reduce;

  return (
    <Section id="github" title={s.ghTitle} aside={<a className="link font-mono" href="https://github.com/leo-stuart" target="_blank" rel="noopener noreferrer">@leo-stuart ↗</a>}>
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_300px]">
        {data.days.length > 0 && (
          <div className="card min-w-0 p-5">
            <p className="font-mono text-[13px]">
              <span className="text-ok">{data.total.toLocaleString(lang === 'pt' ? 'pt-BR' : 'en-US')}</span>{' '}
              <span className="text-muted">{s.ghTotal}</span>
            </p>
            <div className="mt-4 overflow-x-auto pb-1">
              <svg
                ref={ref}
                width={weeks * (CELL + GAP)}
                height={7 * (CELL + GAP)}
                role="img"
                aria-label={`${data.total} ${s.ghTotal}`}
                className="block"
                onMouseLeave={() => setHover(null)}
              >
                {data.days.map((d, i) => {
                  const idx = i + offset;
                  const col = Math.floor(idx / 7);
                  return (
                    <rect
                      key={d.date}
                      x={col * (CELL + GAP)}
                      y={(idx % 7) * (CELL + GAP)}
                      width={CELL}
                      height={CELL}
                      rx={2.5}
                      className="heat-cell"
                      data-busiest={max > 0 && d.count === max ? '' : undefined}
                      style={{
                        fill: d.level ? 'var(--c-ok)' : 'var(--c-line)',
                        fillOpacity: d.level ? OPACITY[d.level] : 1,
                        opacity: show ? 1 : 0,
                        transform: show ? 'none' : 'scale(0.4)',
                        transformOrigin: `${col * (CELL + GAP) + CELL / 2}px ${(idx % 7) * (CELL + GAP) + CELL / 2}px`,
                        transition: reduce ? 'none' : `opacity 300ms ${col * 12}ms, transform 300ms ${col * 12}ms`,
                      }}
                      onMouseEnter={() => setHover(d)}
                      onClick={() => {
                        setHover(d);
                        if (max > 0 && d.count === max) window.dispatchEvent(new Event('heatmap-busiest'));
                      }}
                    />
                  );
                })}
              </svg>
            </div>
            <p className="mt-3 h-5 font-mono text-[12px] text-dim" aria-live="polite">
              {hover ? `${hover.count} ${hover.count === 1 ? s.ghOne : s.ghMany} · ${fmt(hover.date, lang)}` : s.ghHint}
            </p>
          </div>
        )}
        {data.activity.length > 0 && (
          <div className="card p-5">
            <p className="mono-label">{s.ghFeed}</p>
            <ul className="mt-3 grid gap-2.5">
              {data.activity.map((a, i) => (
                <li key={i} className="font-mono text-[12px] leading-5">
                  <a href={a.url} target="_blank" rel="noopener noreferrer" className="group block">
                    <span className={a.type === 'pr' ? 'text-ok' : a.type === 'release' ? 'text-amber' : 'text-muted'}>{a.label}</span>
                    <span className="text-dim"> · {ago(a.date, lang)}</span>
                    <span className="block truncate text-fg group-hover:underline">{a.repo}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </Section>
  );
}
