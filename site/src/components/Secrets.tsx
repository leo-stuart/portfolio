'use client';

import { useEffect, useRef, useState } from 'react';
import { useReducedMotionSafe } from '@/hooks/useReducedMotionSafe';
import { AnimatePresence, motion } from 'motion/react';
import { useLanguage } from '@/context/LanguageContext';
import { SECRETS, SECRET_INFO, unlock, useSecrets, setNeon, type SecretId } from '@/lib/secrets';
import { ui } from '@/data/ui';

const KONAMI = ['arrowup', 'arrowup', 'arrowdown', 'arrowdown', 'arrowleft', 'arrowright', 'arrowleft', 'arrowright', 'b', 'a'];

export default function Secrets() {
  const { lang } = useLanguage();
  const s = ui[lang];
  const found = useSecrets();
  const [toast, setToast] = useState<SecretId | null>(null);
  const [rain, setRain] = useState(false);
  const reduce = useReducedMotionSafe();
  const reduceRef = useRef(reduce);
  useEffect(() => {
    reduceRef.current = reduce;
  }, [reduce]);

  useEffect(() => {
    try {
      if (localStorage.getItem('neon') === '1') setNeon(true);
    } catch {}
    let pos = 0;
    const onKey = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase();
      pos = k === KONAMI[pos] ? pos + 1 : k === KONAMI[0] ? 1 : 0;
      if (pos === KONAMI.length) {
        pos = 0;
        unlock('konami');
        document.documentElement.animate?.([{ filter: 'hue-rotate(0deg)' }, { filter: 'hue-rotate(360deg)' }], { duration: 1200 });
      }
    };
    const stories = new Set<number>();
    const onStory = (e: Event) => {
      stories.add((e as CustomEvent<number>).detail);
      if (stories.size >= 3) unlock('pipeline');
    };
    const onClue = () => unlock('clue');
    const onHeat = () => unlock('heatmap');
    let t: ReturnType<typeof setTimeout>;
    const onFound = (e: Event) => {
      setToast((e as CustomEvent<SecretId>).detail);
      clearTimeout(t);
      t = setTimeout(() => setToast(null), 4500);
      try {
        const n = JSON.parse(localStorage.getItem('secrets') ?? '[]').length;
        if (n >= SECRETS.length && !reduceRef.current) setRain(true);
      } catch {}
    };
    window.addEventListener('keydown', onKey);
    window.addEventListener('pipeline-story', onStory);
    window.addEventListener('mascot-clue', onClue);
    window.addEventListener('heatmap-busiest', onHeat);
    window.addEventListener('secret-found', onFound);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('pipeline-story', onStory);
      window.removeEventListener('mascot-clue', onClue);
      window.removeEventListener('heatmap-busiest', onHeat);
      window.removeEventListener('secret-found', onFound);
      clearTimeout(t);
    };
  }, []);

  return (
    <>
      <div className="pointer-events-none fixed right-4 top-16 z-[80] w-[min(300px,calc(100vw-2rem))]" aria-live="polite">
        <AnimatePresence>
          {toast && (
            <motion.div
              key={toast}
              initial={{ x: 340, rotate: 3 }}
              animate={{ x: 0, rotate: 0 }}
              exit={{ x: 340, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 260, damping: 24 }}
              className="receipt pointer-events-auto bg-bg px-4 pb-5 pt-4 font-mono text-[12px] shadow-xl"
            >
              <p className="text-center text-[11px] uppercase tracking-[0.2em] text-dim">{s.achTitle}</p>
              <p className="mt-2 text-center text-[15px] font-semibold text-ok">★ {SECRET_INFO[lang][toast].name}</p>
              <div className="my-3 border-t border-dashed border-line-strong" />
              <p className="flex justify-between text-muted">
                <span>secret</span>
                <span>#{SECRETS.indexOf(toast) + 1}</span>
              </p>
              <p className="flex justify-between text-muted">
                <span>{s.achProgress}</span>
                <span className="text-fg">
                  {found.length}/{SECRETS.length}
                </span>
              </p>
              <p className="flex justify-between text-muted">
                <span>{s.achTime}</span>
                <span>{new Date().toLocaleTimeString(lang === 'pt' ? 'pt-BR' : 'en-US', { hour: '2-digit', minute: '2-digit' })}</span>
              </p>
              <p className="mt-3 text-center text-[10.5px] text-dim">{found.length === SECRETS.length ? s.achAll : s.achThanks}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {rain && <PixelRain onDone={() => setRain(false)} />}
    </>
  );
}

function PixelRain({ onDone }: { onDone: () => void }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current;
    const ctx = c?.getContext('2d');
    if (!c || !ctx) return;
    c.width = window.innerWidth;
    c.height = window.innerHeight;
    const css = getComputedStyle(document.documentElement);
    const colors = ['--c-ok', '--c-amber', '--c-accent', '--c-fg'].map((v) => css.getPropertyValue(v).trim());
    const ps = Array.from({ length: 160 }, () => ({
      x: Math.random() * c.width,
      y: -Math.random() * c.height,
      v: 2 + Math.random() * 5,
      s: 3 + Math.floor(Math.random() * 3) * 2,
      c: colors[Math.floor(Math.random() * colors.length)],
    }));
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      ctx.clearRect(0, 0, c.width, c.height);
      for (const p of ps) {
        p.y += p.v;
        ctx.fillStyle = p.c;
        ctx.fillRect(Math.round(p.x), Math.round(p.y), p.s, p.s);
      }
      if (now - start < 3500) raf = requestAnimationFrame(tick);
      else onDone();
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onDone]);
  return <canvas ref={ref} aria-hidden className="pointer-events-none fixed inset-0 z-[90]" />;
}

export function SecretsCounter() {
  const found = useSecrets();
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new CustomEvent('open-palette', { detail: 'secrets' }))}
      className="font-mono text-[12px] text-dim transition-colors hover:text-fg"
    >
      <span className={found.length === SECRETS.length ? 'text-ok' : 'text-amber'}>★</span> secrets {found.length}/{SECRETS.length}
    </button>
  );
}
