'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

export default function Hero() {
  const { t } = useLanguage();
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const roles = t.hero.roles;
    const current = roles[roleIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && displayed.length < current.length) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 60);
    } else if (!isDeleting && displayed.length === current.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2200);
    } else if (isDeleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 35);
    } else if (isDeleting && displayed.length === 0) {
      setIsDeleting(false);
      setRoleIndex((roleIndex + 1) % roles.length);
    }

    return () => clearTimeout(timeout);
  }, [displayed, isDeleting, roleIndex, t.hero.roles]);

  // Reset when language changes
  useEffect(() => {
    setRoleIndex(0);
    setDisplayed('');
    setIsDeleting(false);
  }, [t]);

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
  };

  const item = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7 } },
  };

  return (
    <section
      id="hero"
      className="grid-bg"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        padding: '80px 24px 48px',
      }}
    >
      {/* Scanlines */}
      <div className="scanlines" />

      {/* Radial glow */}
      <div
        style={{
          position: 'absolute',
          top: '30%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '80vw',
          height: '60vh',
          background: 'radial-gradient(ellipse at center, rgba(0,212,255,0.07) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        style={{
          position: 'relative',
          zIndex: 2,
          maxWidth: '900px',
          width: '100%',
        }}
      >
        {/* Eyebrow */}
        <motion.div variants={item} style={{ marginBottom: '20px' }}>
          <span
            style={{
              fontFamily: 'var(--font-jetbrains), monospace',
              fontSize: '0.875rem',
              color: '#00d4ff',
              letterSpacing: '0.08em',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <span style={{ opacity: 0.5 }}>{'>'}</span>
            {t.hero.eyebrow.replace('> ', '')}
          </span>
        </motion.div>

        {/* Name */}
        <motion.h1
          variants={item}
          style={{
            fontFamily: 'var(--font-syne), sans-serif',
            fontSize: 'clamp(1.6rem, 8vw, 6.5rem)',
            fontWeight: 800,
            lineHeight: 0.95,
            letterSpacing: '-0.03em',
            marginBottom: '16px',
            color: '#f0f6ff',
          }}
        >
          LEONARDO
          <br />
          <span style={{ color: '#00d4ff', textShadow: '0 0 40px rgba(0,212,255,0.3)' }}>
            STUART
          </span>
        </motion.h1>

        {/* Typewriter role */}
        <motion.div variants={item} style={{ marginBottom: '24px', minHeight: '2.5rem' }}>
          <span
            style={{
              fontFamily: 'var(--font-syne), sans-serif',
              fontSize: 'clamp(1.2rem, 3vw, 1.9rem)',
              fontWeight: 600,
              color: '#94a3b8',
              letterSpacing: '-0.01em',
            }}
          >
            {displayed}
            <span
              style={{
                display: 'inline-block',
                width: '2px',
                height: '1.1em',
                background: '#00d4ff',
                marginLeft: '3px',
                verticalAlign: 'middle',
                animation: 'blink 1s step-end infinite',
                boxShadow: '0 0 8px rgba(0,212,255,0.7)',
              }}
            />
          </span>
        </motion.div>

        {/* Tagline */}
        <motion.p
          variants={item}
          style={{
            fontFamily: 'var(--font-outfit), sans-serif',
            fontSize: 'clamp(1rem, 2vw, 1.15rem)',
            color: '#64748b',
            maxWidth: '560px',
            lineHeight: 1.7,
            marginBottom: '40px',
          }}
        >
          {t.hero.tagline}
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={item}
          style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', marginBottom: '48px' }}
        >
          <a
            href="#projects"
            style={{
              fontFamily: 'var(--font-outfit), sans-serif',
              fontSize: '0.9rem',
              fontWeight: 600,
              background: '#00d4ff',
              color: '#070b14',
              padding: '12px 28px',
              borderRadius: '8px',
              textDecoration: 'none',
              letterSpacing: '0.01em',
              transition: 'box-shadow 0.2s, transform 0.2s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.boxShadow = '0 0 32px rgba(0,212,255,0.4)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            {t.hero.viewWork} →
          </a>
          <a
            href="#contact"
            style={{
              fontFamily: 'var(--font-outfit), sans-serif',
              fontSize: '0.9rem',
              fontWeight: 500,
              background: 'transparent',
              color: '#f0f6ff',
              padding: '12px 28px',
              borderRadius: '8px',
              border: '1px solid rgba(255,255,255,0.15)',
              textDecoration: 'none',
              letterSpacing: '0.01em',
              transition: 'border-color 0.2s, transform 0.2s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'rgba(0,212,255,0.4)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            {t.hero.getInTouch}
          </a>
        </motion.div>

        {/* Social links */}
        <motion.div variants={item} style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <a
            href="https://github.com/leo-stuart"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#64748b', textDecoration: 'none', transition: 'color 0.2s', display: 'flex', alignItems: 'center', gap: '6px' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#00d4ff')}
            onMouseLeave={e => (e.currentTarget.style.color = '#64748b')}
          >
            <GitHubIcon />
            <span style={{ fontFamily: 'var(--font-jetbrains), monospace', fontSize: '0.75rem' }}>
              leo-stuart
            </span>
          </a>
          <a
            href="https://linkedin.com/in/leonardo-stuart"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#64748b', textDecoration: 'none', transition: 'color 0.2s', display: 'flex', alignItems: 'center', gap: '6px' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#00d4ff')}
            onMouseLeave={e => (e.currentTarget.style.color = '#64748b')}
          >
            <LinkedInIcon />
            <span style={{ fontFamily: 'var(--font-jetbrains), monospace', fontSize: '0.75rem' }}>
              leonardo-stuart
            </span>
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        style={{
          position: 'absolute',
          bottom: '32px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
          zIndex: 2,
        }}
      >
        <span style={{ fontFamily: 'var(--font-jetbrains), monospace', fontSize: '0.65rem', color: '#374151', letterSpacing: '0.1em' }}>
          scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          style={{ width: '1px', height: '40px', background: 'linear-gradient(to bottom, #00d4ff, transparent)' }}
        />
      </motion.div>
    </section>
  );
}

function GitHubIcon() {
  return (
    <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}
