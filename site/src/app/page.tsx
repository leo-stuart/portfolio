'use client';

import { LanguageProvider } from '@/context/LanguageContext';
import Sidebar from '@/components/Sidebar';
import MobileHeader from '@/components/MobileHeader';
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
      <MobileHeader />
      <div className="mx-auto w-full max-w-[1120px] px-5 sm:px-8 lg:grid lg:grid-cols-[248px_minmax(0,1fr)] lg:gap-x-20">
        <Sidebar />
        <main className="min-w-0 max-w-[680px] pb-16">
          <Hero />
          <About />
          <Experience />
          <Projects />
          <Skills />
          <Awards />
          <Contact />
        </main>
      </div>
    </LanguageProvider>
  );
}
