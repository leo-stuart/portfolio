'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

export default function Navigation() {
  const { lang, setLang, t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { label: t.nav.about, href: '#about' },
    { label: t.nav.experience, href: '#experience' },
    { label: t.nav.projects, href: '#projects' },
    { label: t.nav.skills, href: '#skills' },
    { label: t.nav.contact, href: '#contact' },
  ];

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        transition: 'background 0.3s, border-color 0.3s, backdrop-filter 0.3s',
        background: scrolled ? 'rgba(7, 11, 20, 0.9)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(0,212,255,0.1)' : '1px solid transparent',
      }}
    >
      <nav style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Logo */}
        <a href="#" style={{ textDecoration: 'none' }}>
          <span
            style={{
              fontFamily: 'var(--font-jetbrains), monospace',
              fontSize: '1rem',
              color: '#00d4ff',
              fontWeight: 600,
              letterSpacing: '-0.02em',
            }}
          >
            {'<LS />'}
          </span>
        </a>

        {/* Desktop links */}
        <div style={{ alignItems: 'center', gap: '32px' }} className="hidden md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              style={{
                fontFamily: 'var(--font-outfit), sans-serif',
                fontSize: '0.875rem',
                color: '#94a3b8',
                textDecoration: 'none',
                letterSpacing: '0.01em',
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = '#f0f6ff')}
              onMouseLeave={e => (e.currentTarget.style.color = '#94a3b8')}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Right side */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* Language toggle */}
          <button
            onClick={() => setLang(lang === 'en' ? 'pt' : 'en')}
            style={{
              fontFamily: 'var(--font-jetbrains), monospace',
              fontSize: '0.75rem',
              background: 'rgba(0,212,255,0.08)',
              border: '1px solid rgba(0,212,255,0.2)',
              borderRadius: '6px',
              color: '#00d4ff',
              padding: '4px 10px',
              cursor: 'pointer',
              letterSpacing: '0.05em',
              transition: 'background 0.2s, box-shadow 0.2s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(0,212,255,0.15)';
              e.currentTarget.style.boxShadow = '0 0 12px rgba(0,212,255,0.2)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'rgba(0,212,255,0.08)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            {lang === 'en' ? 'EN' : 'PT'}
          </button>

          {/* CV download */}
          <a
            href="/cv.pdf"
            download
            style={{
              fontFamily: 'var(--font-outfit), sans-serif',
              fontSize: '0.8rem',
              background: 'rgba(0,212,255,0.1)',
              border: '1px solid rgba(0,212,255,0.3)',
              borderRadius: '6px',
              color: '#00d4ff',
              padding: '6px 14px',
              textDecoration: 'none',
              transition: 'background 0.2s, box-shadow 0.2s',
            }}
            className="hidden md:inline-flex items-center gap-1"
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(0,212,255,0.18)';
              e.currentTarget.style.boxShadow = '0 0 16px rgba(0,212,255,0.2)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'rgba(0,212,255,0.1)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            ↓ {t.nav.downloadCV}
          </a>

          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', padding: '4px' }}
            className="md:hidden"
          >
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
              {menuOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              ) : (
                <>
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </>
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            background: 'rgba(7, 11, 20, 0.98)',
            borderBottom: '1px solid rgba(0,212,255,0.1)',
            padding: '16px 24px 20px',
          }}
          className="md:hidden"
        >
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{
                display: 'block',
                color: '#94a3b8',
                textDecoration: 'none',
                padding: '10px 0',
                fontSize: '0.95rem',
                borderBottom: '1px solid rgba(255,255,255,0.05)',
              }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="/cv.pdf"
            download
            style={{
              display: 'block',
              color: '#00d4ff',
              textDecoration: 'none',
              padding: '12px 0 0',
              fontSize: '0.875rem',
            }}
          >
            ↓ {t.nav.downloadCV}
          </a>
        </motion.div>
      )}
    </motion.header>
  );
}
