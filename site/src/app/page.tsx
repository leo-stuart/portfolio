'use client';

import { LanguageProvider } from '@/context/LanguageContext';
import Masthead from '@/components/Masthead';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Experience from '@/components/Experience';
import Projects from '@/components/Projects';
import Skills from '@/components/Skills';
import Contact from '@/components/Contact';

export default function Home() {
  return (
    <LanguageProvider>
      <Masthead />
      <main className="mx-auto w-full max-w-[1200px] px-5 pb-16 sm:px-8">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Contact />
      </main>
    </LanguageProvider>
  );
}
