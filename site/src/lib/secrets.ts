'use client';

import { useSyncExternalStore } from 'react';
import type { Lang } from '@/data/content';

export const SECRETS = ['konami', 'neon', 'sudo', 'avatar', 'clue', 'pipeline', 'heatmap'] as const;
export type SecretId = (typeof SECRETS)[number];

export const SECRET_INFO: Record<Lang, Record<SecretId, { name: string; hint: string }>> = {
  en: {
    konami: { name: 'Konami code', hint: 'Old-school gamers know the sequence. ↑↑…' },
    neon: { name: 'Secret checkout', hint: 'Pay in ⌘K with the most famous test card.' },
    sudo: { name: 'sudo', hint: 'Recruiters have root access in ⌘K.' },
    avatar: { name: 'Poke', hint: 'The photo is ticklish. Try a few clicks.' },
    clue: { name: 'Bot whisper', hint: 'Keep clicking the bot in Projects.' },
    pipeline: { name: 'Director’s cut', hint: 'Watch every pipeline story in the hero.' },
    heatmap: { name: 'Busiest day', hint: 'One GitHub square is greener than the rest.' },
  },
  pt: {
    konami: { name: 'Código Konami', hint: 'Gamers das antigas sabem a sequência. ↑↑…' },
    neon: { name: 'Checkout secreto', hint: 'Pague no ⌘K com o cartão de teste mais famoso.' },
    sudo: { name: 'sudo', hint: 'Recrutadores têm acesso root no ⌘K.' },
    avatar: { name: 'Cutucada', hint: 'A foto sente cócegas. Tente alguns cliques.' },
    clue: { name: 'Sussurro do robô', hint: 'Continue clicando no robô em Projetos.' },
    pipeline: { name: 'Versão do diretor', hint: 'Assista a todas as histórias do pipeline no topo.' },
    heatmap: { name: 'Dia mais movimentado', hint: 'Um quadrado do GitHub é mais verde que os outros.' },
  },
};

const KEY = 'secrets';
const EVT = 'secrets-change';
const EMPTY: SecretId[] = [];
let cache: { raw: string | null; list: SecretId[] } = { raw: null, list: EMPTY };

function read(): SecretId[] {
  let raw: string | null = null;
  try {
    raw = localStorage.getItem(KEY);
  } catch {}
  if (raw === cache.raw) return cache.list;
  let list: SecretId[] = EMPTY;
  try {
    const parsed = JSON.parse(raw ?? '[]');
    if (Array.isArray(parsed)) list = parsed.filter((x): x is SecretId => (SECRETS as readonly string[]).includes(x));
  } catch {}
  cache = { raw, list };
  return list;
}

export function unlock(id: SecretId) {
  const list = read();
  if (list.includes(id)) return;
  try {
    localStorage.setItem(KEY, JSON.stringify([...list, id]));
  } catch {
    cache = { raw: '__mem__' + Date.now(), list: [...list, id] };
  }
  window.dispatchEvent(new CustomEvent(EVT, { detail: id }));
  window.dispatchEvent(new CustomEvent('secret-found', { detail: id }));
}

function subscribe(cb: () => void) {
  window.addEventListener(EVT, cb);
  window.addEventListener('storage', cb);
  return () => {
    window.removeEventListener(EVT, cb);
    window.removeEventListener('storage', cb);
  };
}

export function useSecrets() {
  return useSyncExternalStore(subscribe, read, () => EMPTY);
}

export function setNeon(on: boolean) {
  if (on) document.documentElement.dataset.neon = '';
  else delete document.documentElement.dataset.neon;
  try {
    localStorage.setItem('neon', on ? '1' : '0');
  } catch {}
}
