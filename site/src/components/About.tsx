'use client';

import { useLanguage } from '@/context/LanguageContext';
import Section, { Row } from './Section';

export default function About() {
  const { t } = useLanguage();

  return (
    <Section id="about" title={t.about.title}>
      <p className="max-w-[62ch] text-[15px] leading-7 text-muted">{t.about.bio}</p>

      <dl className="mt-8 border-t hairline">
        {t.about.facts.map((f) => (
          <Row key={f.label} left={<dt>{f.label}</dt>}>
            <dd className="text-[14px] leading-6">{f.value}</dd>
          </Row>
        ))}
      </dl>
    </Section>
  );
}
