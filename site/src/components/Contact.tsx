'use client';

import { useLanguage } from '@/context/LanguageContext';
import Section from './Section';

export default function Contact() {
  const { t } = useLanguage();

  return (
    <>
      <Section id="contact" title={t.contact.title}>
        <p className="text-[18px] leading-[1.6]">{t.contact.text}</p>

        <a
          href={`mailto:${t.contact.email}`}
          className="link mt-6 inline-block font-display text-[24px] font-semibold tracking-tight sm:text-[30px]"
        >
          {t.contact.email}
        </a>

        <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 font-display text-[14px] font-medium text-muted">
          {t.contact.links.map((l) => (
            <li key={l.href}>
              <a href={l.href} target="_blank" rel="noopener noreferrer" className="link">
                {l.label}
              </a>
            </li>
          ))}
          <li>
            <a href="/cv.pdf" target="_blank" rel="noopener noreferrer" className="link">
              cv.pdf
            </a>
          </li>
        </ul>
      </Section>

      <footer className="border-t hairline pt-6 text-[14px] text-dim">
        © {new Date().getFullYear()} {t.contact.footer}
      </footer>
    </>
  );
}
