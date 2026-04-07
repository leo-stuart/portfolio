'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

export default function Contact() {
  const { t } = useLanguage();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section
      id="contact"
      ref={ref}
      style={{
        padding: '120px 24px 80px',
        borderTop: '1px solid rgba(0,212,255,0.06)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background radial */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '60vw',
          height: '40vh',
          background: 'radial-gradient(ellipse at bottom, rgba(0,212,255,0.05) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: '24px' }}
        >
          <span
            style={{
              fontFamily: 'var(--font-jetbrains), monospace',
              fontSize: '0.75rem',
              color: '#00d4ff',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
            }}
          >
            06 — Contact
          </span>
        </motion.div>

        {/* Big headline */}
        <motion.h2
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          style={{
            fontFamily: 'var(--font-syne), sans-serif',
            fontSize: 'clamp(2.4rem, 6vw, 5rem)',
            fontWeight: 800,
            letterSpacing: '-0.03em',
            lineHeight: 1,
            marginBottom: '20px',
          }}
        >
          <span style={{ color: '#f0f6ff' }}>
            {t.contact.title.split(' ').slice(0, -1).join(' ')}{' '}
          </span>
          <span style={{ color: '#00d4ff', textShadow: '0 0 40px rgba(0,212,255,0.3)' }}>
            {t.contact.title.split(' ').slice(-1)[0]}
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            fontFamily: 'var(--font-outfit), sans-serif',
            fontSize: '1rem',
            color: '#64748b',
            marginBottom: '48px',
          }}
        >
          {t.contact.subtitle}
        </motion.p>

        {/* Email CTA */}
        <motion.a
          href={`mailto:${t.contact.email}`}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            fontFamily: 'var(--font-outfit), sans-serif',
            fontSize: '1rem',
            fontWeight: 600,
            color: '#070b14',
            background: '#00d4ff',
            padding: '16px 36px',
            borderRadius: '8px',
            textDecoration: 'none',
            transition: 'box-shadow 0.2s, transform 0.2s',
            marginBottom: '48px',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLElement).style.boxShadow = '0 0 40px rgba(0,212,255,0.4)';
            (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.boxShadow = 'none';
            (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
          }}
        >
          <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
            <polyline points="22,6 12,13 2,6" />
          </svg>
          {t.contact.emailLabel}
        </motion.a>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          style={{ display: 'flex', justifyContent: 'center', gap: '28px', marginBottom: '64px' }}
        >
          {[
            { label: 'GitHub', href: 'https://github.com/leo-stuart', icon: '⌘' },
            { label: 'LinkedIn', href: 'https://linkedin.com/in/leonardo-stuart', icon: '◈' },
            { label: t.contact.email, href: `mailto:${t.contact.email}`, icon: '✉' },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith('http') ? '_blank' : undefined}
              rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              style={{
                fontFamily: 'var(--font-jetbrains), monospace',
                fontSize: '0.75rem',
                color: '#64748b',
                textDecoration: 'none',
                letterSpacing: '0.05em',
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = '#00d4ff')}
              onMouseLeave={e => (e.currentTarget.style.color = '#64748b')}
            >
              {link.label}
            </a>
          ))}
        </motion.div>

        {/* Footer */}
        <div
          style={{
            fontFamily: 'var(--font-jetbrains), monospace',
            fontSize: '0.7rem',
            color: '#374151',
            letterSpacing: '0.06em',
          }}
        >
          {t.contact.footer}
        </div>
      </div>
    </section>
  );
}
