'use client';

import { useLanguage } from '@/context/LanguageContext';

export default function LangToggle() {
  const { lang, setLang } = useLanguage();
  return (
    <button
      type="button"
      onClick={() => setLang(lang === 'en' ? 'pt' : 'en')}
      aria-label={lang === 'en' ? 'Mudar para português' : 'Switch to English'}
      className="shrink-0 cursor-pointer whitespace-nowrap font-mono text-[12px] text-dim transition-colors hover:text-muted"
    >
      <span className={lang === 'en' ? 'text-fg' : ''}>en</span>
      <span className="text-line-strong"> / </span>
      <span className={lang === 'pt' ? 'text-fg' : ''}>pt</span>
    </button>
  );
}
