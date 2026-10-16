'use client';

import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { ui, slug } from '@/data/ui';

type Line = { k: 'in' | 'out' | 'note'; t: string };

export default function AgentTerm({ onOpenProject }: { onOpenProject: (id: string) => void }) {
  const { t, lang } = useLanguage();
  const s = ui[lang];
  const [lines, setLines] = useState<Line[]>([{ k: 'note', t: s.agentBanner }]);
  const [val, setVal] = useState('');
  const [hist, setHist] = useState<string[]>([]);
  const [hi, setHi] = useState(-1);
  const input = useRef<HTMLInputElement>(null);
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => input.current?.focus(), []);
  useEffect(() => {
    box.current?.scrollTo({ top: box.current.scrollHeight });
  }, [lines]);

  const answer = (raw: string): string[] | 'clear' => {
    const [cmd, ...rest] = raw.trim().split(/\s+/);
    const arg = rest.join(' ').toLowerCase();
    const fact = (label: string) => t.about.facts.find((f) => f.label === label)?.value;
    switch ((cmd ?? '').toLowerCase()) {
      case '':
        return [];
      case 'help':
        return s.agentHelp;
      case 'whoami':
        return [`${t.hero.name} · ${t.hero.role}`, fact(lang === 'pt' ? 'agora' : 'now') ?? '', `${lang === 'pt' ? 'foco' : 'focus'}: ${fact(lang === 'pt' ? 'foco' : 'focus') ?? ''}`, fact(lang === 'pt' ? 'local' : 'location') ?? ''].filter(Boolean);
      case 'stack':
        return t.skills.groups.map((g) => `${g.label.padEnd(10)} ${g.items.join(', ')}`);
      case 'projects':
      case 'ls':
        return t.projects.items.map((p) => `${slug(p.name).padEnd(24)} ${p.period}`).concat(s.agentOpenHint);
      case 'open': {
        const p = t.projects.items.find((x) => slug(x.name) === slug(arg) || x.name.toLowerCase().startsWith(arg));
        if (!p || !arg) return [s.agentNoProject];
        setTimeout(() => onOpenProject(slug(p.name)), 250);
        return [`→ ${p.name}`];
      }
      case 'contact':
        return [`email    ${t.contact.email}`, ...t.contact.links.map((l) => `link     ${l.href}`)];
      case 'stats':
        return t.stats.map((x) => `${x.value.padEnd(9)} ${x.label}`);
      case 'clear':
        return 'clear';
      case 'sudo':
        return [s.agentSudo];
      default:
        return [`${s.agentUnknown}: ${cmd}. ${s.agentTryHelp}`];
    }
  };

  const run = () => {
    const raw = val;
    setVal('');
    setHi(-1);
    if (raw.trim()) setHist((h) => [raw, ...h].slice(0, 20));
    const out = answer(raw);
    if (out === 'clear') return setLines([]);
    setLines((l) => [...l, { k: 'in', t: raw }, ...out.map((t) => ({ k: 'out' as const, t }))]);
  };

  return (
    <div className="font-mono text-[12px]">
      <div ref={box} className="max-h-[46vh] min-h-[180px] overflow-y-auto px-4 py-3 leading-6" aria-live="polite">
        {lines.map((l, i) => (
          <p key={i} className={`whitespace-pre-wrap break-words ${l.k === 'in' ? 'text-fg' : l.k === 'note' ? 'text-amber' : 'text-muted'}`}>
            {l.k === 'in' ? <><span className="text-ok">leo@agent $</span> {l.t}</> : l.t}
          </p>
        ))}
      </div>
      <div className="flex items-center gap-2 border-t hairline px-4">
        <span className="whitespace-nowrap text-ok">leo@agent $</span>
        <input
          ref={input}
          value={val}
          onChange={(e) => setVal(e.target.value)}
          aria-label={s.agentInput}
          spellCheck={false}
          autoComplete="off"
          onKeyDown={(e) => {
            if (e.key !== 'Escape') e.stopPropagation();
            if (e.key === 'Enter') run();
            else if (e.key === 'ArrowUp' && hist.length) {
              e.preventDefault();
              const n = Math.min(hi + 1, hist.length - 1);
              setHi(n);
              setVal(hist[n]);
            } else if (e.key === 'ArrowDown') {
              e.preventDefault();
              const n = Math.max(hi - 1, -1);
              setHi(n);
              setVal(n < 0 ? '' : hist[n]);
            }
          }}
          className="h-11 w-full bg-transparent outline-none"
        />
      </div>
    </div>
  );
}
