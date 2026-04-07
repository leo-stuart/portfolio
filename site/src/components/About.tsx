'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

const PLACEHOLDER = (
  <div
    style={{
      width: '200px',
      height: '200px',
      borderRadius: '50%',
      background: 'rgba(7, 11, 20, 0.9)',
      border: '2px solid rgba(0,212,255,0.2)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
      position: 'relative',
      overflow: 'hidden',
      boxShadow: '0 0 40px rgba(0,212,255,0.08)',
    }}
  >
    <div style={{
      position: 'absolute',
      inset: 0,
      backgroundImage: 'linear-gradient(rgba(0,212,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.04) 1px, transparent 1px)',
      backgroundSize: '20px 20px',
    }} />
    <span style={{
      fontFamily: 'var(--font-syne), sans-serif',
      fontSize: '2.5rem',
      fontWeight: 800,
      color: 'rgba(0,212,255,0.3)',
      position: 'relative',
      letterSpacing: '-0.03em',
    }}>
      LS
    </span>
  </div>
);

function ProfilePhoto() {
  const [mounted, setMounted] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  if (!mounted || failed) return PLACEHOLDER;

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/photo.jpg"
      alt="Leonardo Stuart"
      onError={() => setFailed(true)}
      style={{
        width: '200px',
        height: '200px',
        borderRadius: '50%',
        objectFit: 'cover',
        objectPosition: 'center top',
        border: '2px solid rgba(0,212,255,0.25)',
        boxShadow: '0 0 40px rgba(0,212,255,0.12)',
        flexShrink: 0,
        display: 'block',
      }}
    />
  );
}

export default function About() {
  const { t } = useLanguage();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      id="about"
      ref={ref}
      style={{ padding: '96px 24px', maxWidth: '1200px', margin: '0 auto' }}
    >
      {/* Section label */}
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
        transition={{ duration: 0.7, delay: 0 }}
        style={{ marginBottom: '48px' }}
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
          01 — {t.about.title}
        </span>
      </motion.div>

      {/* Top row: photo + bio */}
      <div style={{ display: 'flex', gap: '48px', alignItems: 'center', flexWrap: 'wrap', marginBottom: '48px' }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.7, delay: 0.05 }}
        >
          <ProfilePhoto />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          style={{ flex: 1, minWidth: '260px' }}
        >
          <p
            style={{
              fontFamily: 'var(--font-outfit), sans-serif',
              fontSize: '1.1rem',
              color: '#94a3b8',
              lineHeight: 1.8,
              margin: 0,
            }}
          >
            {t.about.bio}
          </p>
        </motion.div>
      </div>

      {/* Stats row */}
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px' }}
      >
        {t.about.stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
            style={{
              background: 'rgba(13, 24, 39, 0.8)',
              border: '1px solid rgba(0, 212, 255, 0.12)',
              borderRadius: '10px',
              padding: '20px 24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              transition: 'border-color 0.2s',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.borderColor = 'rgba(0,212,255,0.3)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.borderColor = 'rgba(0,212,255,0.12)';
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-outfit), sans-serif',
                fontSize: '0.875rem',
                color: '#64748b',
              }}
            >
              {stat.label}
            </span>
            <span
              style={{
                fontFamily: 'var(--font-syne), sans-serif',
                fontSize: '2rem',
                fontWeight: 800,
                color: '#00d4ff',
                textShadow: '0 0 24px rgba(0,212,255,0.4)',
                letterSpacing: '-0.02em',
              }}
            >
              {stat.value}
            </span>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
