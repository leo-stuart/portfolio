'use client';

import { useReducedMotionSafe } from '@/hooks/useReducedMotionSafe';
import { useRef } from 'react';
import { motion, useScroll, useTransform, type MotionValue } from 'motion/react';
import { useLanguage } from '@/context/LanguageContext';
import { ui } from '@/data/ui';
import Section from './Section';

// Each funnel stage pairs with something already on the site (stat or project). No new numbers.
const MAP = [
  { stat: 0, project: null },
  { stat: null, project: 'Courty' },
  { stat: 2, project: 'testa' },
  { stat: 1, project: null },
] as const;

function Stage({ i, progress, children }: { i: number; progress: MotionValue<number>; children: React.ReactNode }) {
  const start = i / 4;
  const opacity = useTransform(progress, [start, start + 0.18], [0.25, 1]);
  const scaleX = useTransform(progress, [start, start + 0.22], [0, 1]);
  const x = useTransform(progress, [start, start + 0.18], [-12, 0]);
  return (
    <motion.li style={{ opacity, x }} className="grid gap-3 sm:grid-cols-[180px_minmax(0,1fr)] sm:gap-6">
      <div>
        <div className="h-2 overflow-hidden rounded-full bg-line" style={{ width: `${100 - i * 18}%` }}>
          <motion.div style={{ scaleX }} className={`h-full origin-left ${i === 3 ? 'bg-ok' : 'bg-amber'}`} />
        </div>
      </div>
      <div className="min-w-0">{children}</div>
    </motion.li>
  );
}

export default function Funnel() {
  const { t, lang } = useLanguage();
  const s = ui[lang];
  const ref = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotionSafe();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.55'] });
  const full = useTransform(scrollYProgress, () => 1);
  const progress = reduce ? full : scrollYProgress;

  return (
    <Section id="funnel" title={s.funnelTitle} aside={<span className="font-mono">{s.funnelAside}</span>}>
      <ol ref={ref} className="grid gap-8">
        {MAP.map((m, i) => {
          const stat = m.stat !== null ? t.stats[m.stat] : null;
          const proj = m.project ? t.projects.items.find((p) => p.name === m.project) : null;
          return (
            <Stage key={i} i={i} progress={progress}>
              <p className="font-mono text-[12px] uppercase tracking-wider text-dim">
                {String(i + 1).padStart(2, '0')} · <span className={i === 3 ? 'text-ok' : 'text-amber'}>{s.funnelSteps[i]}</span>
              </p>
              <p className="mt-1 text-[15px] text-muted">{s.funnelCopy[i]}</p>
              {stat && (
                <p className="mt-2">
                  <span className="text-[26px] font-semibold tracking-tight tabular-nums">{stat.value}</span>{' '}
                  <span className="text-[14px] text-muted">{stat.label}</span>
                </p>
              )}
              {proj && (
                <button
                  type="button"
                  onClick={() => window.dispatchEvent(new CustomEvent('open-project', { detail: proj.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') }))}
                  className="mt-2 text-left"
                >
                  <span className="link font-semibold">{proj.name}</span>
                  <span className="mt-0.5 block text-[14px] leading-6 text-muted">{proj.summary}</span>
                </button>
              )}
            </Stage>
          );
        })}
      </ol>
    </Section>
  );
}
