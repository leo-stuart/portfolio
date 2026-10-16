'use client';

import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import Pipeline from './Pipeline';

export default function Hero() {
  const { t, lang } = useLanguage();
  const at = lang === 'pt' ? 'na' : 'at';

  return (
    <section id="top" className="pt-12 sm:pt-16 lg:pt-20">
      <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-16">
        <div className="min-w-0">
          <p className="flex items-center gap-2 text-[14px] text-muted">
            <span className="status-dot" aria-hidden />
            {t.hero.role} {at} {t.hero.now}, {t.hero.status}
          </p>
          <h1 className="mt-5 max-w-[16ch] text-balance text-[38px] font-semibold leading-[1.08] tracking-[-0.03em] sm:text-[52px] lg:text-[58px]">
            {t.hero.headline}
          </h1>
          <p className="mt-6 max-w-[56ch] text-[16px] leading-[1.65] text-muted sm:text-[17px]">
            {t.hero.summary}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#projects" className="btn btn-primary">
              {t.hero.viewWork}
            </a>
            <a href={`mailto:${t.contact.email}`} className="btn btn-secondary">
              {t.hero.getInTouch}
            </a>
          </div>
          <Pipeline />
        </div>

        <div className="relative mx-auto w-full max-w-[420px] lg:max-w-none">
          <Image
            src="/photo.jpg"
            alt="Leonardo Stuart"
            width={1274}
            height={1274}
            priority
            sizes="(min-width: 1024px) 460px, 100vw"
            className="aspect-square w-full rounded-2xl object-cover"
          />
        </div>
      </div>

      <dl className="mt-14 grid gap-px overflow-hidden rounded-xl border hairline bg-line sm:grid-cols-3">
        {t.stats.map((s) => (
          <div key={s.label} className="bg-bg px-6 py-5">
            <dd className="text-[30px] font-semibold leading-none tracking-[-0.02em] tabular-nums">{s.value}</dd>
            <dt className="mt-2 text-[14px] leading-snug text-muted">{s.label}</dt>
          </div>
        ))}
      </dl>
    </section>
  );
}
