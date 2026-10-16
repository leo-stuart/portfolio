'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'motion/react';
import { useLanguage } from '@/context/LanguageContext';
import { ui } from '@/data/ui';

const DIFF = ['+ export function checkout()', '+   await pay(card)', '-   legacyPay()'];
const SCEN = ['pay with card', 'declined card', 'empty cart'];

export default function Pipeline() {
  const { lang } = useLanguage();
  const s = ui[lang];
  const reduce = useReducedMotion();
  const [step, setStep] = useState(3);
  const ref = useRef<HTMLDivElement>(null);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-1, 1], [3, -3]), { stiffness: 120, damping: 20 });
  const ry = useSpring(useTransform(mx, [-1, 1], [-4, 4]), { stiffness: 120, damping: 20 });

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setStep((v) => (v + 1) % 5), 1400);
    return () => clearInterval(id);
  }, [reduce]);

  const shown = reduce ? 3 : step;

  function onMove(e: React.PointerEvent) {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width) * 2 - 1);
    my.set(((e.clientY - r.top) / r.height) * 2 - 1);
  }

  return (
    <motion.div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={() => {
        mx.set(0);
        my.set(0);
      }}
      style={reduce ? undefined : { rotateX: rx, rotateY: ry, transformPerspective: 900 }}
      role="img"
      aria-label={s.pipelineAria}
      className="card mt-10 overflow-hidden bg-bg/90 font-mono text-[12px] backdrop-blur-sm"
    >
      <div className="flex items-center justify-between border-b hairline px-4 py-2">
        <span className="mono-label">~/{s.pipelineLabel}</span>
        <span className="flex gap-1.5" aria-hidden>
          <i className="h-2 w-2 rounded-full bg-line-strong" />
          <i className="h-2 w-2 rounded-full bg-line-strong" />
          <i className="h-2 w-2 rounded-full bg-line-strong" />
        </span>
      </div>

      <ol className="grid grid-cols-4 gap-px bg-line" aria-hidden>
        {s.steps.map((label, i) => {
          const done = shown > i;
          const active = shown === i;
          const color = i === 3 && (done || active) ? 'text-ok' : done ? 'text-fg' : active ? 'text-amber' : 'text-dim';
          return (
            <li key={label} className="relative bg-bg px-3 py-2.5">
              <span className={`flex items-center gap-1.5 transition-colors ${color}`}>
                <span>{i === 3 ? (done || active ? '✓' : '○') : done ? '●' : active ? '◐' : '○'}</span>
                <span className="truncate">{label}</span>
              </span>
              <motion.span
                className="absolute inset-x-0 bottom-0 h-px origin-left bg-ok"
                initial={false}
                animate={{ scaleX: done ? 1 : active ? 0.5 : 0, backgroundColor: active && i < 3 ? 'var(--c-amber)' : 'var(--c-ok)' }}
                transition={{ duration: reduce ? 0 : 0.6, ease: 'easeOut' }}
              />
            </li>
          );
        })}
      </ol>

      <div className="grid min-h-[92px] gap-1 px-4 py-3 leading-5" aria-hidden>
        {(shown === 0 || shown === 4) &&
          DIFF.map((l, i) => (
            <motion.p key={'d' + i} initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: reduce ? 0 : i * 0.15 }} className={l.startsWith('+') ? 'text-ok' : 'text-amber'}>
              {l}
            </motion.p>
          ))}
        {shown === 1 &&
          SCEN.map((l, i) => (
            <motion.p key={'s' + i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.15 }} className="text-muted">
              <span className="text-amber">›</span> scenario: {l}
            </motion.p>
          ))}
        {(shown === 2 || shown === 3) &&
          SCEN.map((l, i) => (
            <motion.p key={'t' + i} initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.2 }} className="text-muted">
              <span className={shown === 3 || i < 2 ? 'text-ok' : 'text-amber'}>{shown === 3 || i < 2 ? '✓' : '…'}</span> {l}
              {shown === 3 && i === 2 && <span className="ml-2 text-ok">3/3 passed</span>}
            </motion.p>
          ))}
      </div>
    </motion.div>
  );
}
