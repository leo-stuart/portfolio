'use client';

import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';

export default function Hero() {
  const { t, lang } = useLanguage();
  const at = lang === 'pt' ? 'na' : 'at';

  return (
    <section
      id="top"
      className="grid gap-y-8 pt-12 pb-14 sm:pt-16 lg:grid-cols-[200px_minmax(0,1fr)] lg:gap-x-16 lg:pt-24 lg:pb-20"
    >
      <div>
        <Image
          src="/photo.jpg"
          alt="Leonardo Stuart"
          width={160}
          height={160}
          priority
          className="h-20 w-20 rounded-[4px] object-cover lg:h-40 lg:w-40"
        />
      </div>

      <div className="min-w-0">
        <h1 className="font-display text-[44px] font-bold leading-[0.95] tracking-[-0.035em] sm:text-[64px] lg:text-[76px]">
          {t.hero.name}
        </h1>
        <p className="mt-4 font-display text-[16px] text-muted sm:text-[17px]">
          {t.hero.role} {at} {t.hero.now}, {t.hero.status}
        </p>

        <p className="mt-10 max-w-[26ch] text-[26px] leading-[1.3] tracking-[-0.01em] sm:text-[30px]">
          {t.hero.headline}
        </p>
        <p className="mt-6 max-w-[62ch] text-[18px] leading-[1.6] text-muted">{t.hero.summary}</p>

        <dl className="mt-12 border-y hairline">
          {t.stats.map((s) => (
            <div
              key={s.label}
              className="grid items-baseline gap-x-8 gap-y-1 border-b hairline py-5 last:border-b-0 sm:grid-cols-[minmax(0,300px)_1fr]"
            >
              <dd className="font-display text-[34px] font-semibold leading-none tracking-[-0.02em] tabular-nums sm:text-[40px]">
                {s.value}
              </dd>
              <dt className="font-serif text-[17px] leading-snug text-muted">{s.label}</dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
