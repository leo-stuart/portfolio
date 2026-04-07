'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

export default function Skills() {
  const { t } = useLanguage();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section
      id="skills"
      ref={ref}
      style={{
        padding: '96px 24px',
        background: 'rgba(13, 24, 39, 0.3)',
        borderTop: '1px solid rgba(0,212,255,0.06)',
        borderBottom: '1px solid rgba(0,212,255,0.06)',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: '56px' }}
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
            04 — {t.skills.title}
          </span>
        </motion.div>

        {/* Categories */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          {t.skills.categories.map((cat, i) => (
            <motion.div
              key={cat.label}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.08 }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-jetbrains), monospace',
                  fontSize: '0.72rem',
                  color: '#374151',
                  letterSpacing: '0.1em',
                  marginBottom: '12px',
                }}
              >
                {cat.label}
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {cat.items.map((item, j) => (
                  <motion.span
                    key={item}
                    className="tech-tag"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.4, delay: i * 0.06 + j * 0.03 }}
                    style={{ fontSize: '0.8rem', padding: '4px 14px' }}
                  >
                    {item}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
