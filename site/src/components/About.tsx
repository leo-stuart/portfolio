'use client';

import { useLanguage } from '@/context/LanguageContext';
import Section, { Row } from './Section';

export default function About() {
  const { t } = useLanguage();

  return (
    <Section id="about" title={t.about.title}>
      <p className="text-[18px] leading-[1.6]">{t.about.bio}</p>

      <dl className="mt-8 border-t hairline">
        {t.about.facts.map((f) => (
          <Row key={f.label} left={f.label}>
            {f.value}
          </Row>
        ))}
      </dl>
    </Section>
  );
}
