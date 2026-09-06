'use client';

import { useLanguage } from '@/context/LanguageContext';
import Section, { Row } from './Section';

export default function Skills() {
  const { t } = useLanguage();

  return (
    <Section id="skills" title={t.skills.title}>
      <dl className="border-t hairline">
        {t.skills.groups.map((g) => (
          <Row key={g.label} left={g.label}>
            {g.items.join(', ')}
          </Row>
        ))}
      </dl>
    </Section>
  );
}
