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
    <Section id="projects" title={t.projects.title} aside={`${t.projects.items.length}`}>
      <ul className="grid gap-6 md:grid-cols-2">
        {t.projects.items.map((p) => {
          const primary = p.links.find((l) => l.label === 'App') ?? p.links[0];
          return (
            <li key={p.name} className="card flex flex-col overflow-hidden">
              {p.image ? (
                <a
                  href={primary?.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block border-b hairline bg-panel"
                >
                  <Image
                    src={p.image}
                    alt={`${p.name} screenshot`}
                    width={1280}
                    height={800}
                    sizes="(min-width: 768px) 560px, 100vw"
                    className="aspect-[16/9] w-full object-cover object-top"
                  />
                </a>
              ) : (
                <div className="flex aspect-[16/9] flex-col justify-center border-b hairline bg-panel p-6">
                  <Bullets items={p.highlights} />
                </div>
              )}

              <div className="flex flex-1 flex-col p-5">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="text-[17px] font-semibold tracking-tight">{p.name}</h3>
                  <span className="text-[13px] tabular-nums text-dim">{p.period}</span>
                </div>
                <p className="mt-0.5 text-[13px] text-dim">{p.role}</p>
                <p className="mt-3 text-[15px] leading-6 text-muted">{p.summary}</p>

                <div className="mt-auto flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 pt-5 text-[13px]">
                  <p className="text-dim">{p.tech.slice(0, 4).join(', ')}</p>
                  {p.links.length > 0 && (
                    <ul className="flex gap-4 font-medium">
                      {p.links.map((l) => (
                        <li key={l.href}>
                          <a href={l.href} target="_blank" rel="noopener noreferrer" className="link text-muted">
                            {l.label === 'App' || l.label === 'Site' ? domainOf(l.href) : l.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
