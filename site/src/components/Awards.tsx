'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

export default function Awards() {
  const { t } = useLanguage();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section
      ref={ref}
      style={{ padding: '80px 24px', maxWidth: '1200px', margin: '0 auto' }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        style={{ marginBottom: '40px' }}
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
          05 — {t.awards.title}
        </span>
      </motion.div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
        {t.awards.items.map((award, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: i * 0.12 }}
            style={{
              background: 'rgba(13, 24, 39, 0.7)',
              border: '1px solid rgba(0,212,255,0.1)',
              borderRadius: '10px',
              padding: '20px 24px',
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
            }}
          >
            <span style={{ fontSize: '1.8rem', flexShrink: 0 }}>{award.emoji}</span>
            <div>
              <div
                style={{
                  fontFamily: 'var(--font-outfit), sans-serif',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  color: '#f0f6ff',
                  marginBottom: '4px',
                }}
              >
                {award.title}
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-jetbrains), monospace',
                  fontSize: '0.7rem',
                  color: '#00d4ff',
                  letterSpacing: '0.04em',
                }}
              >
                {award.place} · {award.date}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
