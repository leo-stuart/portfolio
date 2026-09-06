'use client';

import { useLanguage } from '@/context/LanguageContext';
import Section from './Section';

export default function Contact() {
  const { t } = useLanguage();

  return (
    <>
      <Section id="contact" title={t.contact.title}>
        <p className="max-w-[58ch] text-[15px] leading-7 text-muted">{t.contact.text}</p>

        <a
          href={`mailto:${t.contact.email}`}
          className="link mt-6 inline-block font-mono text-[20px] tracking-tight text-fg sm:text-[24px]"
        >
          {t.contact.email}
        </a>

        <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 font-mono text-[13px] text-muted">
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

      <footer className="flex flex-wrap items-center justify-between gap-2 border-t hairline pt-6 font-mono text-[12px] text-dim">
        <span>
          © {new Date().getFullYear()} {t.contact.footer}
        </span>
        <a
          href={`https://github.com/leo-stuart/portfolio/commit/${process.env.NEXT_PUBLIC_COMMIT_SHA}`}
          target="_blank"
          rel="noopener noreferrer"
          className="link tabular-nums"
        >
          {process.env.NEXT_PUBLIC_COMMIT_SHA} · {process.env.NEXT_PUBLIC_BUILD_DATE}
        </a>
      </footer>
    </>
  );
}
