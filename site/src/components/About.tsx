'use client';

import { useLanguage } from '@/context/LanguageContext';
import Section, { Row } from './Section';

export default function About() {
  const { t } = useLanguage();
  const edu = t.education;

  return (
    <Section id="about" title={t.about.title}>
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <p className="max-w-[60ch] text-[16px] leading-[1.65] text-muted">{t.about.bio}</p>
          <dl className="mt-8 border-t hairline">
            {t.about.facts.map((f) => (
              <Row key={f.label} left={f.label}>
                {f.value}
              </Row>
            ))}
          </dl>
        </div>

        <div>
          <h3 className="text-[15px] font-medium">{edu.title}</h3>
          <dl className="mt-3 border-t hairline">
            <Row left={edu.period}>
              {edu.degree}, {edu.school}
              <span className="block text-[13px] text-dim">{edu.note}</span>
            </Row>
          </dl>

          <h3 className="mt-10 text-[15px] font-medium">{t.awards.title}</h3>
          <dl className="mt-3 border-t hairline">
            {t.awards.items.map((a) => (
              <Row key={a.title} left={a.date}>
                {a.title}
                <span className="text-dim">, {a.place}</span>
              </Row>
            ))}
          </dl>
        </div>
      </div>
    </Section>
  );
}
