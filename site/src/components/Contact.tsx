'use client';

import { useLanguage } from '@/context/LanguageContext';
import Section from './Section';

export default function Contact() {
  const { t } = useLanguage();

  return (
    <>
      <Section id="contact" title={t.contact.title}>
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-16">
          <p className="max-w-[56ch] text-[16px] leading-[1.65] text-muted">{t.contact.text}</p>
          <div>
            <a href={`mailto:${t.contact.email}`} className="btn btn-primary">
              {t.contact.email}
            </a>
            <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-[14px] text-muted">
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
          </div>
        </div>
      </Section>

      <footer className="border-t hairline pt-6 text-[13px] text-dim">
        © {new Date().getFullYear()} {t.contact.footer}
      </footer>
    </>
  );
}
