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

function joinNatural(items: string[], and: string) {
  if (items.length <= 1) return items.join('');
  return `${items.slice(0, -1).join(', ')} ${and} ${items[items.length - 1]}`;
}

export default function Projects() {
  const { t, lang } = useLanguage();
  const builtWith = lang === 'pt' ? 'Feito com' : 'Built with';
  const and = lang === 'pt' ? 'e' : 'and';

  return (
    <Section id="projects" title={t.projects.title} meta={`${t.projects.items.length}`}>
      <ol className="flex flex-col gap-14">
        {t.projects.items.map((p) => {
          const primary = p.links.find((l) => l.label === 'App') ?? p.links[0];
          return (
            <li key={p.name}>
              {p.image && primary && (
                <figure className="mb-6">
                  <a href={primary.href} target="_blank" rel="noopener noreferrer" className="block">
                    <Image
                      src={p.image}
                      alt={`${p.name} screenshot`}
                      width={1280}
                      height={800}
                      sizes="(min-width: 1024px) 640px, 100vw"
                      className="aspect-[16/9] w-full rounded-[3px] border hairline object-cover object-top"
                    />
                  </a>
                  <figcaption className="mt-2 text-[14px] italic text-dim">
                    {domainOf(primary.href)}, {p.period}
                  </figcaption>
                </figure>
              )}

              <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                <h3 className="font-display text-[22px] font-semibold leading-tight tracking-tight">{p.name}</h3>
                {!p.image && (
                  <span className="font-display text-[13px] font-medium tabular-nums text-dim">{p.period}</span>
                )}
              </div>
              <p className="mt-0.5 text-[17px] italic text-muted">{p.role}</p>

              <p className="mt-4 text-[18px] leading-[1.6]">{p.summary}</p>

              <div className="mt-4">
                <Bullets items={p.highlights} />
              </div>

              <p className="mt-4 text-[15px] leading-relaxed text-dim">
                {builtWith} {joinNatural(p.tech, and)}.
              </p>

              {p.links.length > 0 && (
                <ul className="mt-2 flex flex-wrap gap-x-5 font-display text-[14px] font-medium">
                  {p.links.map((l) => (
                    <li key={l.href}>
                      <a href={l.href} target="_blank" rel="noopener noreferrer" className="link">
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          );
        })}
      </ol>
    </Section>
  );
}
