'use client';

import { useSyncExternalStore } from 'react';

const Q = '(prefers-reduced-motion: reduce)';

/** Hydration-safe reduced-motion flag: false on the server and first client render. */
export function useReducedMotionSafe() {
  return useSyncExternalStore(
    (cb) => {
      const m = window.matchMedia(Q);
      m.addEventListener('change', cb);
      return () => m.removeEventListener('change', cb);
    },
    () => window.matchMedia(Q).matches,
    () => false,
  );
}
