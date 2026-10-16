'use client';

import { useRef, type ReactNode } from 'react';
import { AnimatePresence, motion, useInView } from 'motion/react';
import { useReducedMotionSafe } from '@/hooks/useReducedMotionSafe';

/** Title appears token by token, like an LLM stream. */
export function TokenStream({ text }: { text: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const seen = useInView(ref, { once: true, margin: '-60px' });
  const reduce = useReducedMotionSafe();
  const tokens = text.split(/(\s+)/);
  return (
    <span ref={ref} aria-label={text}>
      {tokens.map((tok, i) => (
        <motion.span
          key={i}
          aria-hidden
          initial={false}
          animate={reduce || seen ? { opacity: 1, filter: 'blur(0px)' } : { opacity: 0, filter: 'blur(3px)' }}
          transition={{ delay: reduce ? 0 : i * 0.05, duration: 0.25 }}
          className="inline-block whitespace-pre"
        >
          {tok}
        </motion.span>
      ))}
    </span>
  );
}

/** Skeleton lines that resolve into the real content when the section scrolls in. */
export function Streamed({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const seen = useInView(ref, { once: true, margin: '-80px' });
  const reduce = useReducedMotionSafe();
  const show = reduce || seen;
  return (
    <div ref={ref} className="relative">
      <motion.div
        initial={false}
        animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
        transition={{ duration: reduce ? 0 : 0.45, delay: reduce ? 0 : 0.25, ease: 'easeOut' }}
      >
        {children}
      </motion.div>
      <AnimatePresence>
        {!show && (
          <motion.div aria-hidden exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="pointer-events-none absolute inset-x-0 top-0 grid gap-3">
            {[92, 78, 85, 60].map((w, i) => (
              <span key={i} className="skeleton h-3 rounded" style={{ width: `${w}%` }} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
