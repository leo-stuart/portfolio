'use client';

import { useLanguage } from '@/context/LanguageContext';
import Section, { Row } from './Section';

export default function Awards() {
  const { t } = useLanguage();
  const edu = t.education;
  const joiner = t.nav.about === 'Sobre' ? 'e' : '&';

  return (
    <Section id="education" title={`${edu.title} ${joiner} ${t.awards.title.toLowerCase()}`}>
      <dl className="border-t hairline">
        <Row left={edu.period}>
          {edu.degree}, {edu.school}
          <span className="block text-[15px] italic text-dim">{edu.note}</span>
        </Row>
        {t.awards.items.map((a) => (
          <Row key={a.title} left={a.date}>
            {a.title}
            <span className="text-muted">, {a.place}</span>
          </Row>
        ))}
      </dl>
    </Section>
  );
}
