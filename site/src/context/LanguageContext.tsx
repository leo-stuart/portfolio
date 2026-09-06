'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { type Lang, type Content, content } from '@/data/content';

interface LanguageContextType {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: Content;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('en');

  // Browser locale is only known after hydration, so this must live in an effect.
  useEffect(() => {
    if (navigator.language.startsWith('pt')) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLang('pt');
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: content[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}
