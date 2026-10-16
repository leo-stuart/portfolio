'use client';

import { useEffect, useState } from 'react';
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
      t = setTimeout(() => setToast(null), 3800);
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
    <div className="pointer-events-none fixed inset-x-0 top-16 z-[80] flex justify-center px-4" aria-live="polite">
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="pointer-events-auto rounded-lg border border-ok bg-bg px-4 py-2.5 font-mono text-[12.5px] shadow-xl"
          >
            <span className="text-ok">★ {s.secretFound}</span> {SECRET_INFO[lang][toast].name}
            <span className="ml-2 text-dim">
              secrets {found.length}/{SECRETS.length}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
