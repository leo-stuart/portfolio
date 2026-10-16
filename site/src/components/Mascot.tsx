'use client';

import { useReducedMotionSafe } from '@/hooks/useReducedMotionSafe';
import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion, useScroll, useSpring, useTransform } from 'motion/react';
import { useLanguage } from '@/context/LanguageContext';
import { useActiveSection } from '@/hooks/useActiveSection';
import { mascotLines, clueText, CLUE } from '@/data/mascot';
import { ui } from '@/data/ui';
import { useBoot } from '@/lib/boot';

const IDS = ['about', 'experience', 'projects', 'github', 'skills', 'contact'];
export const SHOW_MASCOT = 'show-mascot';

function Bot({ talking }: { talking: boolean }) {
  return (
    <svg viewBox="0 0 16 16" width="40" height="40" shapeRendering="crispEdges" aria-hidden>
      <rect x="7" y="0" width="2" height="2" fill="var(--c-amber)" />
      <rect x="3" y="2" width="10" height="8" fill="var(--c-fg)" />
      <rect x="4" y="3" width="8" height="6" fill="var(--c-bg)" />
      <rect x="5" y="5" width="2" height="2" fill="var(--c-ok)" />
      <rect x="9" y="5" width="2" height="2" fill="var(--c-ok)" />
      <rect x="6" y="8" width="4" height={talking ? 1 : 0.5} fill="var(--c-ok)" />
      <rect x="4" y="11" width="8" height="3" fill="var(--c-fg)" />
      <rect x="2" y="11" width="1" height="3" fill="var(--c-fg)" />
      <rect x="13" y="11" width="1" height="3" fill="var(--c-fg)" />
      <rect x="5" y="14" width="2" height="2" fill="var(--c-fg)" />
      <rect x="9" y="14" width="2" height="2" fill="var(--c-fg)" />
    </svg>
  );
}

export default function Mascot() {
  const { lang } = useLanguage();
  const s = ui[lang];
  const reduce = useReducedMotionSafe();
  const active = useActiveSection(IDS) ?? 'top';
  const [hidden, setHidden] = useState(true);
  const boot = useBoot();
  const [idx, setIdx] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let h = false;
    try {
      h = localStorage.getItem('mascot-hidden') === '1';
    } catch {}
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setHidden(h);
    const show = () => {
      setHidden(false);
      try {
        localStorage.removeItem('mascot-hidden');
      } catch {}
    };
    window.addEventListener(SHOW_MASCOT, show);
    return () => window.removeEventListener(SHOW_MASCOT, show);
  }, []);

  // New section → first line, show bubble briefly.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIdx(0);
    setOpen(true);
    const id = setTimeout(() => setOpen(false), 5000);
    return () => clearTimeout(id);
  }, [active, lang]);

  const lines = useMemo(() => mascotLines[lang][active] ?? mascotLines[lang].top, [lang, active]);
  const raw = lines[idx % lines.length];
  const text = raw === CLUE ? clueText[lang] : raw;

  useEffect(() => {
    if (open && raw === CLUE) window.dispatchEvent(new Event('mascot-clue'));
  }, [open, raw]);

  const { scrollYProgress } = useScroll();
  const walk = useSpring(useTransform(scrollYProgress, [0, 1], [0, 1]), { stiffness: 60, damping: 20 });
  const left = useTransform(walk, (v) => `calc(${(v * 22).toFixed(2)}vw + 12px)`);

  if (hidden || boot !== 'done') return null;

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: -80, scale: 0.5 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: 'spring', stiffness: 200, damping: 18 }}
      style={reduce ? { left: 12 } : { left }}
      className="fixed bottom-3 z-40 flex flex-col-reverse items-start gap-1 sm:flex-row sm:items-end print:hidden">
      <motion.button
        type="button"
        onClick={() => {
          setIdx((i) => i + 1);
          setOpen(true);
        }}
        aria-label={s.mascotAria}
        animate={reduce ? undefined : { y: [0, -3, 0] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        className="rounded-md p-0.5"
      >
        <Bot talking={open} />
      </motion.button>
      <AnimatePresence>
        {open && (
          <motion.div
            key={text}
            initial={reduce ? false : { opacity: 0, y: 6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4 }}
            role="status"
            className="mb-4 max-w-[210px] sm:mb-8 sm:max-w-[240px] rounded-lg border hairline bg-bg px-3 py-2 font-mono text-[11.5px] leading-snug text-muted shadow-lg"
          >
            {text}
            <button
              type="button"
              onClick={() => {
                setHidden(true);
                try {
                  localStorage.setItem('mascot-hidden', '1');
                } catch {}
              }}
              className="mt-1 block text-[10.5px] text-dim underline hover:text-fg"
            >
              {s.mascotHide}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
