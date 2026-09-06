import type { ReactNode } from 'react';

interface SectionProps {
  id?: string;
  title: string;
  aside?: ReactNode;
  children: ReactNode;
}

export default function Section({ id, title, aside, children }: SectionProps) {
  return (
    <section id={id} className="scroll-mt-16 border-t hairline py-14 sm:py-16">
      <div className="mb-8 flex items-end justify-between gap-6">
        <h2 className="text-[22px] font-semibold tracking-tight">{title}</h2>
        {aside && <div className="text-[13px] text-dim">{aside}</div>}
      </div>
      {children}
    </section>
  );
}

export function Row({ left, children }: { left: ReactNode; children: ReactNode }) {
  return (
    <div className="grid gap-y-0.5 border-b hairline py-3 last:border-b-0 sm:grid-cols-[120px_1fr] sm:gap-x-5">
      <dt className="text-[13px] leading-6 text-dim">{left}</dt>
      <dd className="min-w-0 text-[15px] leading-6">{children}</dd>
    </div>
  );
}

export function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="dash-list flex flex-col gap-1.5 text-[15px] leading-6 text-muted">
      {items.map((b) => (
        <li key={b}>{b}</li>
      ))}
    </ul>
  );
}
