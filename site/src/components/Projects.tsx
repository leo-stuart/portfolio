'use client';

import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import Section, { Bullets } from './Section';

function domainOf(href: string) {
  try {
    return new URL(href).host.replace(/^www\./, '');
  } catch {
    return href;
  }
}

export default function Projects() {
  const { t } = useLanguage();

  return (
    <Section id="projects" title={t.projects.title} meta={`${t.projects.items.length}`}>
      <ol className="flex flex-col">
        {t.projects.items.map((p, i) => {
          const primary = p.links.find((l) => l.label === 'app') ?? p.links[0];
          return (
            <li
              key={p.name}
              className={['py-10 first:pt-0 last:pb-0', i > 0 ? 'border-t hairline' : ''].join(' ')}
            >
              {p.image && primary && (
                <a
                  href={primary.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group mb-6 block overflow-hidden rounded-lg border hairline bg-panel transition-colors hover:border-line-strong"
                >
                  <div className="flex h-8 items-center justify-between border-b hairline px-3 font-mono text-[11px] text-dim">
                    <span className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-line-strong" />
                      {domainOf(primary.href)}
                    </span>
                    <span className="transition-colors group-hover:text-fg">↗</span>
                  </div>
                  <Image
                    src={p.image}
                    alt={`${p.name} screenshot`}
                    width={1280}
                    height={800}
                    sizes="(min-width: 1024px) 680px, 100vw"
                    className="aspect-[16/7] w-full object-cover object-top opacity-90 transition-opacity duration-300 group-hover:opacity-100"
                  />
                </a>
              )}

              <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                <h3 className="text-[17px] font-medium leading-6 tracking-tight">{p.name}</h3>
                <span className="font-mono text-[12px] tabular-nums text-dim">{p.period}</span>
              </div>
              <p className="mt-0.5 font-mono text-[12px] text-dim">{p.role}</p>

              <p className="mt-4 max-w-[62ch] text-[15px] leading-7 text-muted">{p.summary}</p>

              <div className="mt-4">
                <Bullets items={p.highlights} />
              </div>

              <div className="mt-5 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 font-mono text-[12px]">
                <p className="leading-6 text-dim">{p.tech.join(' · ')}</p>
                {p.links.length > 0 && (
                  <ul className="flex gap-4">
                    {p.links.map((l) => (
                      <li key={l.href}>
                        <a href={l.href} target="_blank" rel="noopener noreferrer" className="link text-muted">
                          {l.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </Section>
  );
}
