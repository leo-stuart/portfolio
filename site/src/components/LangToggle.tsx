'use client';

import { useLanguage } from '@/context/LanguageContext';

export default function LangToggle() {
  const { lang, setLang } = useLanguage();
  return (
    <button
      type="button"
      onClick={() => setLang(lang === 'en' ? 'pt' : 'en')}
      aria-label={lang === 'en' ? 'Mudar para português' : 'Switch to English'}
      className="shrink-0 cursor-pointer whitespace-nowrap font-display text-[14px] text-muted transition-colors hover:text-fg"
    >
      {lang === 'en' ? 'Português' : 'English'}
    </button>
  );
}
