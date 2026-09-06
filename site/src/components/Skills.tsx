'use client';

import { useLanguage } from '@/context/LanguageContext';
import Section, { Row } from './Section';

export default function Skills() {
  const { t } = useLanguage();

  return (
    <Section id="skills" title={t.skills.title}>
      <dl className="border-t hairline">
        {t.skills.groups.map((g) => (
          <Row key={g.label} left={<dt>{g.label}</dt>}>
            <dd className="flex flex-wrap gap-x-1 font-mono text-[13px] leading-6 text-muted">
              {g.items.map((item, i) => (
                <span key={item}>
                  {item}
                  {i < g.items.length - 1 && <span className="text-line-strong"> · </span>}
                </span>
              ))}
            </dd>
          </Row>
        ))}
      </dl>
    </Section>
  );
}
