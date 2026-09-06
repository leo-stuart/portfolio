import type { ReactNode } from 'react';

interface SectionProps {
  id?: string;
  title: string;
  meta?: string;
  children: ReactNode;
}

/** Section title sits in the left margin on wide screens, like a margin note. */
export default function Section({ id, title, meta, children }: SectionProps) {
  return (
    <section
      id={id}
      className="grid scroll-mt-20 gap-y-5 border-t hairline py-12 sm:py-14 lg:grid-cols-[200px_minmax(0,1fr)] lg:gap-x-16 lg:py-16"
    >
      <div className="lg:sticky lg:top-20 lg:self-start">
        <h2 className="font-display text-[15px] font-semibold tracking-tight">
          {title}
          {meta && <span className="ml-2 font-normal tabular-nums text-dim">{meta}</span>}
        </h2>
      </div>
      <div className="min-w-0 max-w-[640px]">{children}</div>
    </section>
  );
}

export function Row({ left, children }: { left: ReactNode; children: ReactNode }) {
  return (
    <div className="grid gap-y-1 border-b hairline py-3.5 last:border-b-0 sm:grid-cols-[136px_1fr] sm:gap-x-6">
      <dt className="font-display text-[13px] font-medium leading-6 text-dim">{left}</dt>
      <dd className="min-w-0 text-[17px] leading-6">{children}</dd>
    </div>
  );
}

export function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="dash-list flex flex-col gap-2 text-[17px] leading-[1.55] text-muted">
      {items.map((b) => (
        <li key={b}>{b}</li>
      ))}
    </ul>
  );
}
