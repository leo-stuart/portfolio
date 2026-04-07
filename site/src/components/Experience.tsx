'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

export default function Experience() {
  const { t } = useLanguage();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section
      id="experience"
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
            02 — {t.experience.title}
          </span>
        </motion.div>

        {/* Timeline */}
        <div style={{ maxWidth: '720px' }}>
          {t.experience.jobs.map((job, i) => (
            <motion.div
              key={i}
              className="timeline-entry"
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.15 }}
              style={{ marginBottom: '48px' }}
            >
              {/* Header */}
              <div style={{ marginBottom: '12px' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', gap: '10px', marginBottom: '4px' }}>
                  <h3
                    style={{
                      fontFamily: 'var(--font-syne), sans-serif',
                      fontSize: '1.1rem',
                      fontWeight: 700,
                      color: '#f0f6ff',
                      margin: 0,
                    }}
                  >
                    {job.role}
                  </h3>
                  <span
                    style={{
                      fontFamily: 'var(--font-jetbrains), monospace',
                      fontSize: '0.75rem',
                      color: '#00d4ff',
                      background: 'rgba(0,212,255,0.08)',
                      border: '1px solid rgba(0,212,255,0.2)',
                      borderRadius: '4px',
                      padding: '1px 8px',
                    }}
                  >
                    {job.company}
                  </span>
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-jetbrains), monospace',
                    fontSize: '0.72rem',
                    color: '#64748b',
                    letterSpacing: '0.04em',
                  }}
                >
                  {job.period} · {job.location}
                </div>
              </div>

              {/* Bullets */}
              <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {job.bullets.map((bullet, j) => (
                  <li
                    key={j}
                    style={{
                      fontFamily: 'var(--font-outfit), sans-serif',
                      fontSize: '0.9rem',
                      color: '#94a3b8',
                      lineHeight: 1.65,
                      display: 'flex',
                      gap: '10px',
                      alignItems: 'flex-start',
                    }}
                  >
                    <span style={{ color: '#00d4ff', marginTop: '6px', flexShrink: 0, fontSize: '0.5rem' }}>◆</span>
                    {bullet}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
