'use client';

import { MotionConfig } from 'motion/react';
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
import Mascot from '@/components/Mascot';
import Secrets, { SecretsCounter } from '@/components/Secrets';
import BootIntro from '@/components/BootIntro';
import VisitorMap from '@/components/VisitorMap';
import CommandPalette from '@/components/CommandPalette';

export default function HomeClient({ github }: { github: GitHubData }) {
  return (
    <LanguageProvider>
      <MotionConfig reducedMotion="user">
      <BootIntro />
      <Masthead />
      <main className="mx-auto w-full max-w-[1200px] px-5 pb-16 sm:px-8">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <GitHubActivity data={github} />
        <VisitorMap />
        <Skills />
        <Contact />
      </main>
      <footer className="mx-auto flex w-full max-w-[1200px] justify-end px-5 pb-24 sm:px-8">
        <SecretsCounter />
      </footer>
      <CommandPalette />
      <Mascot />
      <Secrets />
      </MotionConfig>
    </LanguageProvider>
  );
}
