'use client';

import { useLanguage } from '@/context/LanguageContext';
import Section, { Row } from './Section';

export default function Awards() {
  const { t } = useLanguage();
  const edu = t.education;

  return (
    <Section id="education" title={`${edu.title} & ${t.awards.title.toLowerCase()}`}>
      <div className="border-t hairline">
        <Row left={edu.period}>
          <p className="text-[14px] leading-6">
            {edu.degree}
            <span className="text-dim"> — </span>
            <span className="text-muted">{edu.school}</span>
          </p>
          <p className="font-mono text-[12px] text-dim">{edu.note}</p>
        </Row>
        {t.awards.items.map((a) => (
          <Row key={a.title} left={a.date}>
            <p className="text-[14px] leading-6">
              {a.title}
              <span className="text-dim"> — </span>
              <span className="text-accent">{a.place}</span>
            </p>
          </Row>
        ))}
      </div>
    </Section>
  );
}
