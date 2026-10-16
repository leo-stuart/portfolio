'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { useLanguage } from '@/context/LanguageContext';
import { finishBoot, useBoot } from '@/lib/boot';
import { ui } from '@/data/ui';

const TICKS = 40;

export default function BootIntro() {
  const { lang } = useLanguage();
  const s = ui[lang];
  const boot = useBoot();
  const [n, setN] = useState(0); // lines shown
  const [p, setP] = useState(0); // ticks filled

  useEffect(() => {
    if (boot !== 'pending') return;
    const id = setInterval(() => setP((v) => Math.min(TICKS, v + 1)), 45);
    const skip = () => finishBoot();
    window.addEventListener('keydown', skip);
    return () => {
      clearInterval(id);
      window.removeEventListener('keydown', skip);
    };
  }, [boot]);

  useEffect(() => {
    if (boot !== 'pending') return;
    const target = Math.floor((p / TICKS) * s.bootLines.length + 0.01);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (target > n) setN(target);
    if (p >= TICKS) {
      const id = setTimeout(finishBoot, 450);
      return () => clearTimeout(id);
    }
  }, [p, boot, n, s.bootLines.length]);

  return (
    <AnimatePresence>
      {boot === 'pending' && (
        <motion.div
          key="boot"
          className="boot-overlay fixed inset-0 z-[100] flex cursor-pointer items-center justify-center bg-bg px-6"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          onClick={finishBoot}
          role="status"
          aria-label={s.bootAria}
        >
          <div className="w-full max-w-[520px] font-mono text-[13px]">
            <p className="mb-4 text-dim">leo@agent ~ $ boot</p>
            <ul className="grid gap-1.5">
              {s.bootLines.map((l, i) => (
                <li key={l} className={i < n ? 'text-fg' : 'text-dim opacity-40'}>
                  <span className={i < n ? 'text-ok' : 'text-amber'}>{i < n ? '✓' : '…'}</span> {l}
                </li>
              ))}
            </ul>
            <motion.div layoutId="boot-bar" className="mt-6 flex h-3 gap-[3px]">
              {Array.from({ length: TICKS }, (_, i) => (
                <span key={i} className={`flex-1 rounded-[1px] ${i < p ? 'bg-ok' : 'bg-line'}`} />
              ))}
            </motion.div>
            <p className="mt-4 text-[11px] text-dim">{s.bootSkip}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/** The divider in the hero that the boot bar morphs into. */
export function BootBar() {
  const boot = useBoot();
  if (boot !== 'done') return <div className="mt-14 h-px" aria-hidden />;
  return (
    <motion.div layoutId="boot-bar" aria-hidden className="mt-14 flex h-px gap-[3px]">
      {Array.from({ length: TICKS }, (_, i) => (
        <span key={i} className="flex-1 bg-line-strong" />
      ))}
    </motion.div>
  );
}
