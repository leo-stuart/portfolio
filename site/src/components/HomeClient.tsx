'use client';

import { LanguageProvider } from '@/context/LanguageContext';
import Masthead from '@/components/Masthead';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Experience from '@/components/Experience';
import Projects from '@/components/Projects';
import Skills from '@/components/Skills';
import Contact from '@/components/Contact';
import GitHubActivity from '@/components/GitHubActivity';
import type { GitHubData } from '@/lib/github-types';
import CommandPalette from '@/components/CommandPalette';

export default function HomeClient({ github }: { github: GitHubData }) {
  return (
    <LanguageProvider>
      <Masthead />
      <main className="mx-auto w-full max-w-[1200px] px-5 pb-16 sm:px-8">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <GitHubActivity data={github} />
        <Skills />
        <Contact />
      </main>
      <CommandPalette />
    </LanguageProvider>
  );
}
