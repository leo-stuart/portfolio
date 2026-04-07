'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

const PROJECT_IMAGES: Record<string, string> = {
  Monity: '/projects/monity.png',
  AlgoFlow: '/projects/algoflow.png',
  Postable: '/projects/postable.png',
  sofIA: '/projects/sofia.png',
};

function ProjectImage({ name }: { name: string }) {
  const [mounted, setMounted] = useState(false);
  const [failed, setFailed] = useState(false);
  const src = PROJECT_IMAGES[name];

  useEffect(() => { setMounted(true); }, []);

  if (!src || !mounted || failed) {
    return (
      <div
        style={{
          width: '100%',
          height: '200px',
          borderRadius: '8px',
          background: 'rgba(7, 11, 20, 0.8)',
          border: '1px solid rgba(0,212,255,0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          position: 'relative',
          flexShrink: 0,
        }}
      >
        {/* Grid pattern */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'linear-gradient(rgba(0,212,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.04) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }} />
        {/* Radial fade */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at center, transparent 30%, rgba(7,11,20,0.7) 100%)',
        }} />
        <span style={{
          position: 'relative',
          fontFamily: 'var(--font-jetbrains), monospace',
          fontSize: '0.8rem',
          color: 'rgba(0,212,255,0.3)',
          letterSpacing: '0.1em',
        }}>
          {name.toLowerCase()}.preview
        </span>
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={`${name} preview`}
      onError={() => setFailed(true)}
      style={{
        width: '100%',
        height: '200px',
        objectFit: 'cover',
        objectPosition: 'top',
        borderRadius: '8px',
        border: '1px solid rgba(0,212,255,0.1)',
        display: 'block',
        flexShrink: 0,
      }}
    />
  );
}

export default function Projects() {
  const { t } = useLanguage();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section
      id="projects"
      ref={ref}
      style={{ padding: '96px 24px', maxWidth: '1200px', margin: '0 auto' }}
    >
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
            display: 'block',
            marginBottom: '12px',
          }}
        >
          03 — {t.projects.title}
        </span>
        <h2
          style={{
            fontFamily: 'var(--font-syne), sans-serif',
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 800,
            color: '#f0f6ff',
            letterSpacing: '-0.02em',
            margin: 0,
          }}
        >
          {t.projects.title}
        </h2>
      </motion.div>

      {/* Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 480px), 1fr))',
          gap: '20px',
        }}
      >
        {t.projects.items.map((project, i) => (
          <motion.div
            key={project.name}
            initial={{ opacity: 0, y: 32 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: i * 0.1 }}
            className="project-card"
            style={{
              background: 'rgba(13, 24, 39, 0.7)',
              border: '1px solid rgba(0,212,255,0.1)',
              borderRadius: '12px',
              padding: '0',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              cursor: 'default',
            }}
          >
            {/* Screenshot */}
            <div style={{ padding: '12px 12px 0' }}>
              <ProjectImage name={project.name} />
            </div>

            {/* Content */}
            <div style={{ padding: '20px 24px 24px', display: 'flex', flexDirection: 'column', gap: '14px', flexGrow: 1 }}>
              {/* Card header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px' }}>
                <div>
                  <h3
                    style={{
                      fontFamily: 'var(--font-syne), sans-serif',
                      fontSize: '1.2rem',
                      fontWeight: 700,
                      color: '#f0f6ff',
                      margin: '0 0 3px',
                      letterSpacing: '-0.01em',
                    }}
                  >
                    {project.name}
                  </h3>
                  <span
                    style={{
                      fontFamily: 'var(--font-jetbrains), monospace',
                      fontSize: '0.68rem',
                      color: '#64748b',
                      letterSpacing: '0.04em',
                    }}
                  >
                    {project.role}
                  </span>
                </div>

                {/* Metric badge */}
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <div
                    style={{
                      fontFamily: 'var(--font-syne), sans-serif',
                      fontSize: '1.3rem',
                      fontWeight: 800,
                      color: '#00d4ff',
                      textShadow: '0 0 20px rgba(0,212,255,0.35)',
                      lineHeight: 1,
                    }}
                  >
                    {project.metric}
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-jetbrains), monospace',
                      fontSize: '0.58rem',
                      color: '#64748b',
                      letterSpacing: '0.06em',
                      marginTop: '2px',
                    }}
                  >
                    {project.metricLabel}
                  </div>
                </div>
              </div>

              {/* Description */}
              <p
                style={{
                  fontFamily: 'var(--font-outfit), sans-serif',
                  fontSize: '0.875rem',
                  color: '#94a3b8',
                  lineHeight: 1.7,
                  margin: 0,
                  flexGrow: 1,
                }}
              >
                {project.description}
              </p>

              {/* Impact */}
              <div
                style={{
                  fontFamily: 'var(--font-jetbrains), monospace',
                  fontSize: '0.7rem',
                  color: '#00ff9d',
                  background: 'rgba(0, 255, 157, 0.05)',
                  border: '1px solid rgba(0, 255, 157, 0.15)',
                  borderRadius: '6px',
                  padding: '7px 12px',
                  letterSpacing: '0.02em',
                }}
              >
                ↑ {project.impact}
              </div>

              {/* Tech tags */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {project.tech.map((tag) => (
                  <span key={tag} className="tech-tag">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Links */}
              {(project.github || project.live || project.landing) && (
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', paddingTop: '2px' }}>
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        fontFamily: 'var(--font-jetbrains), monospace',
                        fontSize: '0.72rem',
                        color: '#64748b',
                        textDecoration: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px',
                        transition: 'color 0.2s',
                      }}
                      onMouseEnter={e => (e.currentTarget.style.color = '#00d4ff')}
                      onMouseLeave={e => (e.currentTarget.style.color = '#64748b')}
                    >
                      <svg width="13" height="13" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                      </svg>
                      GitHub
                    </a>
                  )}
                  {project.landing && (
                    <a
                      href={project.landing}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        fontFamily: 'var(--font-jetbrains), monospace',
                        fontSize: '0.72rem',
                        color: '#64748b',
                        textDecoration: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        transition: 'color 0.2s',
                      }}
                      onMouseEnter={e => (e.currentTarget.style.color = '#00d4ff')}
                      onMouseLeave={e => (e.currentTarget.style.color = '#64748b')}
                    >
                      ◎ Website
                    </a>
                  )}
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        fontFamily: 'var(--font-jetbrains), monospace',
                        fontSize: '0.72rem',
                        color: '#00d4ff',
                        textDecoration: 'none',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        background: 'rgba(0,212,255,0.08)',
                        border: '1px solid rgba(0,212,255,0.2)',
                        borderRadius: '4px',
                        padding: '2px 9px',
                        transition: 'background 0.2s, box-shadow 0.2s',
                      }}
                      onMouseEnter={e => {
                        (e.currentTarget as HTMLElement).style.background = 'rgba(0,212,255,0.18)';
                        (e.currentTarget as HTMLElement).style.boxShadow = '0 0 12px rgba(0,212,255,0.2)';
                      }}
                      onMouseLeave={e => {
                        (e.currentTarget as HTMLElement).style.background = 'rgba(0,212,255,0.08)';
                        (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                      }}
                    >
                      ↗ Live Demo
                    </a>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
