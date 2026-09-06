'use client';

import { LanguageProvider } from '@/context/LanguageContext';
import Masthead from '@/components/Masthead';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Experience from '@/components/Experience';
import Projects from '@/components/Projects';
import Skills from '@/components/Skills';
import Awards from '@/components/Awards';
import Contact from '@/components/Contact';

export default function Home() {
  return (
    <LanguageProvider>
      <Masthead />
      <main className="mx-auto w-full max-w-[1040px] px-5 pb-20 sm:px-8">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Awards />
        <Contact />
      </main>
    </LanguageProvider>
  );
}
