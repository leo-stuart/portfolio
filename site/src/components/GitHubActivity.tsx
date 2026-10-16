'use client';

import { useReducedMotionSafe } from '@/hooks/useReducedMotionSafe';
import { useEffect, useRef, useState } from 'react';
import { animate, useInView } from 'motion/react';
import { useLanguage } from '@/context/LanguageContext';
import type { GitHubData, Day } from '@/lib/github-types';
import { ui } from '@/data/ui';
import Section from './Section';

const CELL = 11;
const GAP = 3;
const OPACITY = [0, 0.3, 0.5, 0.75, 1];

type Other = { user: string; total: number; map: Map<string, number> };

function CountUp({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotionSafe();
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reduce) {
      el.textContent = to.toLocaleString();
      return;
    }
    const c = animate(0, to, { duration: 1.2, ease: 'easeOut', onUpdate: (v) => (el.textContent = Math.round(v).toLocaleString()) });
    return () => c.stop();
  }, [to, reduce]);
  return <span ref={ref}>0</span>;
}

function Compare({ onResult, s }: { onResult: (o: Other | null) => void; s: (typeof ui)['en'] }) {
  const [val, setVal] = useState('');
  const [state, setState] = useState<'idle' | 'loading' | string>('idle');
  return (
    <form
      className="mt-5 flex flex-wrap items-center gap-2 font-mono text-[12px]"
      onSubmit={async (e) => {
        e.preventDefault();
        const user = val.trim().replace(/^@/, '');
        if (!user) return;
        setState('loading');
        try {
          const r = await fetch(`/api/contributions?user=${encodeURIComponent(user)}`);
          const j = await r.json();
          if (!r.ok) {
            setState(j.error === 'not_found' ? s.cmpNotFound : j.error === 'rate_limited' ? s.cmpRate : j.error === 'invalid' ? s.cmpInvalid : s.cmpError);
            onResult(null);
            return;
          }
          onResult({ user: j.user, total: j.total, map: new Map((j.days as [string, number, number][]).map(([d, , l]) => [d, l])) });
          setState('idle');
        } catch {
          setState(s.cmpError);
        }
      }}
    >
      <label htmlFor="cmp" className="text-dim">{s.cmpLabel}</label>
      <span className="flex items-center rounded-md border hairline px-2">
        <span className="text-dim">@</span>
        <input id="cmp" value={val} onChange={(e) => setVal(e.target.value)} placeholder="octocat" maxLength={39} autoComplete="off" spellCheck={false} className="h-8 w-[140px] bg-transparent px-1 outline-none" />
      </span>
      <button type="submit" disabled={state === 'loading'} className="btn btn-secondary h-8 px-3 text-[12px]">
        {state === 'loading' ? '…' : s.cmpGo}
      </button>
      {state !== 'idle' && state !== 'loading' && <span role="alert" className="text-amber">{state}</span>}
    </form>
  );
}

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
  const reduce = useReducedMotionSafe();
  const [hover, setHover] = useState<Day | null>(null);
  const [other, setOther] = useState<Other | null>(null);

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
              {other && (
                <span className="ml-3 text-amber">
                  vs @{other.user}: <CountUp to={other.total} />
                </span>
              )}
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
                {other &&
                  data.days.map((d, i) => {
                    const lv = other.map.get(d.date) ?? 0;
                    if (!lv) return null;
                    const idx = i + offset;
                    const col = Math.floor(idx / 7);
                    return (
                      <rect
                        key={'o' + d.date}
                        x={col * (CELL + GAP) + 1}
                        y={(idx % 7) * (CELL + GAP) + 1}
                        width={CELL - 2}
                        height={CELL - 2}
                        rx={2}
                        fill="none"
                        stroke="var(--c-amber)"
                        strokeWidth={1.5}
                        pointerEvents="none"
                        style={{ strokeOpacity: OPACITY[lv], opacity: 1, transition: reduce ? 'none' : `opacity 300ms ${col * 10}ms`, animation: reduce ? undefined : `fade-in 400ms ${col * 10}ms both` }}
                      />
                    );
                  })}
              </svg>
            </div>
            <p className="mt-3 h-5 font-mono text-[12px] text-dim" aria-live="polite">
              {hover && other ? `${hover.count} · @${other.user} lvl ${other.map.get(hover.date) ?? 0} · ${fmt(hover.date, lang)}` : hover ? `${hover.count} ${hover.count === 1 ? s.ghOne : s.ghMany} · ${fmt(hover.date, lang)}` : s.ghHint}
            </p>
            <Compare s={s} onResult={setOther} />
            {other && (
              <p className="mt-2 font-mono text-[11px] text-dim">
                <span className="text-ok">■</span> @leo-stuart <span className="ml-3 text-amber">□</span> @{other.user}
              </p>
            )}
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
