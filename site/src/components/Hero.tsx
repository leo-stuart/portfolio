'use client';

import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section id="top" className="pt-10 pb-14 sm:pt-14 lg:pt-14 lg:pb-16">
      <div className="flex items-center gap-4 lg:hidden">
        <Image
          src="/photo.jpg"
          alt=""
          width={48}
          height={48}
          priority
          className="h-12 w-12 rounded-md border hairline object-cover"
        />
        <div>
          <p className="text-[16px] font-medium tracking-tight">{t.hero.name}</p>
          <p className="font-mono text-[12px] text-dim">
            {t.hero.role} · {t.hero.status}
          </p>
        </div>
      </div>

      <h1 className="mt-8 max-w-[18ch] text-[34px] font-medium leading-[1.12] tracking-[-0.025em] sm:text-[42px] lg:mt-0 lg:text-[46px]">
        {t.hero.headline}
      </h1>

      <p className="mt-6 max-w-[58ch] text-[15px] leading-7 text-muted sm:text-[16px]">{t.hero.summary}</p>

      <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-lg border hairline bg-line sm:grid-cols-4">
        {t.stats.map((s) => (
          <div key={s.label} className="bg-bg px-4 py-4">
            <dd className="font-mono text-[22px] leading-none tabular-nums tracking-tight text-fg">{s.value}</dd>
            <dt className="mt-2 text-[12px] leading-snug text-dim">{s.label}</dt>
          </div>
        ))}
      </dl>
    </section>
  );
}
