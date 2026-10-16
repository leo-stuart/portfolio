'use client';

import { useSyncExternalStore } from 'react';

// 'pending' only when the inline head script flagged a first-visit boot.
let state: 'pending' | 'done' | null = null;
const subs = new Set<() => void>();

function get() {
  if (state === null) state = document.documentElement.hasAttribute('data-boot') ? 'pending' : 'done';
  return state;
}

export function finishBoot() {
  state = 'done';
  document.documentElement.removeAttribute('data-boot');
  try {
    sessionStorage.setItem('booted', '1');
  } catch {}
  subs.forEach((f) => f());
}

export function useBoot() {
  return useSyncExternalStore(
    (cb) => {
      subs.add(cb);
      return () => subs.delete(cb);
    },
    get,
    () => 'done' as const,
  );
}
