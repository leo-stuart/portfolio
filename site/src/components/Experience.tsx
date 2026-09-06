'use client';

import { useLanguage } from '@/context/LanguageContext';
import Section, { Bullets } from './Section';

export default function Experience() {
  const { t } = useLanguage();

  return (
    <Section id="experience" title={t.experience.title} meta={`${t.experience.jobs.length}`}>
      <ol className="flex flex-col">
        {t.experience.jobs.map((job, i) => {
          const current = i === 0;
          return (
            <li
              key={`${job.company}-${job.period}`}
              className={['py-7 first:pt-0 last:pb-0', i > 0 ? 'border-t hairline' : ''].join(' ')}
            >
              <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                <h3 className="text-[16px] font-medium leading-6">
                  {job.url ? (
                    <a href={job.url} target="_blank" rel="noopener noreferrer" className="link">
                      {job.company}
                    </a>
                  ) : (
                    job.company
                  )}
                  <span className="font-normal text-muted"> — {job.role}</span>
                </h3>
                <span className="font-mono text-[12px] tabular-nums text-dim">
                  {current && <span className="text-accent">● </span>}
                  {job.period}
                </span>
              </div>
              <p className="mt-0.5 font-mono text-[12px] text-dim">{job.location}</p>
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
