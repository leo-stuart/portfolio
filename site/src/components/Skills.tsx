'use client';

import { useLanguage } from '@/context/LanguageContext';
import Section from './Section';

export default function Skills() {
  const { t } = useLanguage();

  return (
    <Section id="skills" title={t.skills.title}>
      <dl className="grid gap-x-10 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
        {t.skills.groups.map((g) => (
          <div key={g.label} className="border-t hairline pt-3">
            <dt className="text-[13px] text-dim">{g.label}</dt>
            <dd className="mt-1 text-[15px] leading-6">{g.items.join(', ')}</dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
