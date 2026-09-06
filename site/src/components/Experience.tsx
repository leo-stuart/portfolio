'use client';

import { useLanguage } from '@/context/LanguageContext';
import Section, { Bullets } from './Section';

export default function Experience() {
  const { t } = useLanguage();

  return (
    <Section id="experience" title={t.experience.title}>
      <ol className="border-t hairline">
        {t.experience.jobs.map((job, i) => (
          <li
            key={`${job.company}-${job.period}`}
            className="grid gap-y-3 border-b hairline py-7 lg:grid-cols-[260px_1fr] lg:gap-x-10"
          >
            <div>
              <h3 className="text-[17px] font-semibold tracking-tight">
                {job.url ? (
                  <a href={job.url} target="_blank" rel="noopener noreferrer" className="link">
                    {job.company}
                  </a>
                ) : (
                  job.company
                )}
              </h3>
              <p className="mt-0.5 text-[15px] text-muted">{job.role}</p>
              <p className="mt-1 text-[13px] tabular-nums text-dim">
                {i === 0 && <span className="text-ok">● </span>}
                {job.period}, {job.location}
              </p>
            </div>
            <div className="max-w-[70ch]">
              <Bullets items={job.bullets} />
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
