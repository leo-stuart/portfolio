'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { type Lang, content } from '@/data/content';

interface LanguageContextType {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: typeof content['en'];
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('en');

  useEffect(() => {
    if (navigator.language.startsWith('pt')) {
      setLang('pt');
    }
  }, []);
  return (
    <LanguageContext.Provider value={{ lang, setLang, t: content[lang] as typeof content['en'] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}
