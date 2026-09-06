'use client';

import { useLanguage } from '@/context/LanguageContext';
import Section, { Bullets } from './Section';

export default function Experience() {
  const { t } = useLanguage();

  return (
    <Section id="experience" title={t.experience.title}>
      {/* Chronological, so a timeline rule is honest here. */}
      <ol className="relative ml-1 border-l hairline">
        {t.experience.jobs.map((job, i) => {
          const current = i === 0;
          return (
            <li key={`${job.company}-${job.period}`} className="relative pb-10 pl-7 last:pb-0">
              <span
                aria-hidden
                className={[
                  'absolute -left-[5px] top-[9px] h-[9px] w-[9px] rounded-full ring-4 ring-bg',
                  current ? 'bg-accent' : 'bg-line-strong',
                ].join(' ')}
              />
              <p className="font-display text-[13px] font-medium tabular-nums text-dim">{job.period}</p>
              <h3 className="mt-1 font-display text-[21px] font-semibold leading-tight tracking-tight">
                {job.url ? (
                  <a href={job.url} target="_blank" rel="noopener noreferrer" className="link">
                    {job.company}
                  </a>
                ) : (
                  job.company
                )}
              </h3>
              <p className="mt-0.5 text-[17px] italic text-muted">
                {job.role}, {job.location}
              </p>
              <div className="mt-4">
                <Bullets items={job.bullets} />
              </div>
            </li>
          );
        })}
      </ol>
    </Section>
  );
}
