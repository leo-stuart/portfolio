'use client';

import { useReducedMotionSafe } from '@/hooks/useReducedMotionSafe';
import { useEffect, useState } from 'react';
import { Command } from 'cmdk';
import { AnimatePresence, motion } from 'motion/react';
import { useLanguage } from '@/context/LanguageContext';
import { ui, slug } from '@/data/ui';
import { OPEN_PROJECT } from './Projects';
import { SHOW_MASCOT } from './Mascot';
import { SECRETS, SECRET_INFO, unlock, useSecrets, setNeon } from '@/lib/secrets';

export const OPEN_PALETTE = 'open-palette';

const LOG = [
  '$ testa run --feature checkout',
  '› reading git diff… 3 files changed',
  '› planning scenarios… 3 found',
  '› launching browser (pretend)',
  '  ✓ pay with card',
  '  ✓ declined card shows error',
  '  ✓ empty cart disables checkout',
  '✔ 3/3 passed · 0 flaky · 🎉',
];

function RunLog({ note }: { note: string }) {
  const reduce = useReducedMotionSafe();
  const [n, setN] = useState(reduce ? LOG.length : 0);
  useEffect(() => {
    if (reduce || n >= LOG.length) return;
    const id = setTimeout(() => setN((v) => v + 1), 380);
    return () => clearTimeout(id);
  }, [n, reduce]);
  return (
    <div className="border-t hairline px-4 py-3 font-mono text-[12px] leading-6" aria-live="polite">
      {LOG.slice(0, n).map((l, i) => (
        <p key={i} className={l.includes('✓') || l.startsWith('✔') ? 'text-ok' : l.startsWith('$') ? 'text-fg' : 'text-muted'}>
          {l}
        </p>
      ))}
      {n < LOG.length && <p className="caret text-muted" />}
      <p className="mt-2 text-[11px] text-amber">{note}</p>
    </div>
  );
}

export default function CommandPalette() {
  const { t, lang, setLang } = useLanguage();
  const s = ui[lang];
  const [open, setOpen] = useState(false);
  const [panel, setPanel] = useState<null | 'run' | 'sudo' | 'secrets' | 'pay'>(null);
  const [search, setSearch] = useState('');
  const found = useSecrets();
  const isDeploy = /^deploy\b/i.test(search.trim());
  const isSudo = /^sudo\b/i.test(search.trim());

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    const onOpen = (e: Event) => {
      setOpen(true);
      if ((e as CustomEvent).detail === 'secrets') setPanel('secrets');
    };
    document.addEventListener('keydown', onKey);
    window.addEventListener(OPEN_PALETTE, onOpen);
    return () => {
      document.removeEventListener('keydown', onKey);
      window.removeEventListener(OPEN_PALETTE, onOpen);
    };
  }, []);


  const go = (fn: () => void) => () => {
    setOpen(false);
    setPanel(null);
    setSearch('');
    fn();
  };
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  const ext = (href: string) => window.open(href, '_blank', 'noopener,noreferrer');
  const gh = t.contact.links.find((l) => l.href.includes('github'))?.href ?? 'https://github.com/leo-stuart';
  const li = t.contact.links.find((l) => l.href.includes('linkedin'))?.href ?? 'https://linkedin.com/in/leonardo-stuart';

  const item = 'flex cursor-pointer items-center justify-between gap-3 rounded-md px-2.5 py-2 text-[14px] text-muted';

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={s.openPalette}
        className="fixed bottom-5 right-5 z-40 flex h-12 items-center gap-2 rounded-full border hairline bg-bg px-4 font-mono text-[13px] shadow-lg md:hidden"
      >
        <span className="text-ok">›_</span> {s.openPalette}
      </button>

      <Command.Dialog
        open={open}
        onOpenChange={(o) => {
          setOpen(o);
          if (!o) {
            setPanel(null);
            setSearch('');
          }
        }}
        label={s.openPalette}
        loop
        overlayClassName="fixed inset-0 z-[70] bg-black/40 backdrop-blur-[2px]"
        contentClassName="fixed left-1/2 top-[12vh] z-[71] w-[calc(100%-2rem)] max-w-[560px] -translate-x-1/2 overflow-hidden rounded-xl border hairline bg-bg shadow-2xl"
      >
        <div className="flex items-center gap-2 border-b hairline px-4">
          <span className="font-mono text-ok">›</span>
          <Command.Input value={search} onValueChange={setSearch} placeholder={s.palettePlaceholder} className="h-12 w-full bg-transparent text-[15px] outline-none placeholder:text-dim" />
          <span className="kbd">esc</span>
        </div>
        <Command.List className="max-h-[50vh] overflow-y-auto p-2">
          <Command.Empty className="px-3 py-6 text-center text-[14px] text-dim">{s.paletteEmpty}</Command.Empty>
          <Command.Group heading={s.groupNav}>
            <Command.Item value="projects" keywords={['projetos']} onSelect={go(() => scrollTo('projects'))} className={item}>
              {s.cmdProjects} <span className="font-mono text-[11px] text-dim">projects</span>
            </Command.Item>
            <Command.Item value="contact" keywords={['contato', 'email']} onSelect={go(() => scrollTo('contact'))} className={item}>
              {s.cmdContact} <span className="font-mono text-[11px] text-dim">contact</span>
            </Command.Item>
            <Command.Item value="cv" keywords={['resume', 'curriculo']} onSelect={go(() => ext('/cv.pdf'))} className={item}>
              {s.cmdCv} <span className="font-mono text-[11px] text-dim">cv</span>
            </Command.Item>
            <Command.Item value="language" keywords={['idioma', 'lang', 'pt', 'en']} onSelect={go(() => setLang(lang === 'en' ? 'pt' : 'en'))} className={item}>
              {s.cmdLang} <span className="font-mono text-[11px] text-dim">lang</span>
            </Command.Item>
          </Command.Group>
          <Command.Group heading={s.groupLinks}>
            <Command.Item value="github" onSelect={go(() => ext(gh))} className={item}>
              GitHub ↗ <span className="font-mono text-[11px] text-dim">github</span>
            </Command.Item>
            <Command.Item value="linkedin" onSelect={go(() => ext(li))} className={item}>
              LinkedIn ↗ <span className="font-mono text-[11px] text-dim">linkedin</span>
            </Command.Item>
          </Command.Group>
          <Command.Group heading={s.groupProjects}>
            {t.projects.items.map((p) => (
              <Command.Item
                key={p.name}
                value={`open ${p.name}`}
                onSelect={go(() => {
                  scrollTo('projects');
                  window.dispatchEvent(new CustomEvent(OPEN_PROJECT, { detail: slug(p.name) }));
                })}
                className={item}
              >
                {p.name} <span className="font-mono text-[11px] text-dim">{p.tech.slice(0, 2).join(' · ')}</span>
              </Command.Item>
            ))}
          </Command.Group>
          {isDeploy && (
            <Command.Group heading="ship">
              <Command.Item
                value={search}
                onSelect={() => {
                  if (/^deploy\s+--to\s+prod\b/i.test(search.trim())) {
                    setNeon(true);
                    unlock('neon');
                    setPanel('pay');
                  } else setSearch('deploy --to prod');
                }}
                className={item}
              >
                <span className="font-mono">{s.payItem}</span> <span className="font-mono text-[11px] text-ok">🚀</span>
              </Command.Item>
            </Command.Group>
          )}
          {isSudo && (
            <Command.Group heading="root">
              <Command.Item
                value={search}
                onSelect={() => {
                  if (/^sudo\s+hire\s+leo/i.test(search.trim())) {
                    unlock('sudo');
                    setPanel('sudo');
                  } else setSearch('sudo hire leo');
                }}
                className={item}
              >
                <span className="font-mono">sudo hire leo</span> <span className="font-mono text-[11px] text-amber">#</span>
              </Command.Item>
            </Command.Group>
          )}
          <Command.Group heading={s.groupFun}>
            <Command.Item value="secrets" keywords={['segredos', 'easter']} onSelect={() => setPanel('secrets')} className={item}>
              {s.cmdSecrets} <span className="font-mono text-[11px] text-ok">{found.length}/{SECRETS.length}</span>
            </Command.Item>
            {found.includes('neon') && (
              <Command.Item value="neon" onSelect={go(() => setNeon(!document.documentElement.hasAttribute('data-neon')))} className={item}>
                {s.cmdNeon} <span className="font-mono text-[11px] text-dim">neon</span>
              </Command.Item>
            )}
            <Command.Item value="bot mascot" keywords={['mascote', 'robo']} onSelect={go(() => window.dispatchEvent(new Event(SHOW_MASCOT)))} className={item}>
              {s.cmdBot} <span className="font-mono text-[11px] text-dim">bot</span>
            </Command.Item>
            <Command.Item value="run testa" onSelect={() => setPanel('run')} className={item}>
              <span className="font-mono">{s.cmdRunTesta}</span> <span className="font-mono text-[11px] text-amber">▶</span>
            </Command.Item>
          </Command.Group>
        </Command.List>
        <AnimatePresence>
          {panel && (
            <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden">
              {panel === 'run' && <RunLog note={s.runNote} />}
              {panel === 'pay' && <p className="border-t hairline px-4 py-3 font-mono text-[12px] text-ok">✔ {s.payDone}</p>}
              {panel === 'sudo' && (
                <div className="border-t hairline px-4 py-3 font-mono text-[12px] leading-6">
                  {s.sudoLines.map((l, i) => (
                    <p key={i} className={i === 2 ? 'text-ok' : 'text-muted'}>{l}</p>
                  ))}
                  <a href={`mailto:${t.contact.email}`} className="btn btn-primary mt-3 h-9 text-[13px]">{s.sudoCta}</a>
                </div>
              )}
              {panel === 'secrets' && (
                <div className="border-t hairline px-4 py-3 font-mono text-[12px] leading-6">
                  <p className="text-fg">secrets {found.length}/{SECRETS.length}</p>
                  <ul>
                    {SECRETS.map((id) => (
                      <li key={id} className={found.includes(id) ? 'text-ok' : 'text-dim'}>
                        {found.includes(id) ? `★ ${SECRET_INFO[lang][id].name}` : `☆ ${s.secretsLocked} · ${SECRET_INFO[lang][id].hint}`}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </Command.Dialog>
    </>
  );
}
