import type { ReactNode } from 'react';

interface SectionProps {
  id?: string;
  title: string;
  meta?: string;
  children: ReactNode;
}

export default function Section({ id, title, meta, children }: SectionProps) {
  return (
    <section id={id} className="scroll-mt-20 border-t hairline pt-8 pb-14 sm:pt-10 sm:pb-16 lg:scroll-mt-10">
      <div className="mb-8 flex items-baseline justify-between gap-4">
        <h2 className="text-[20px] font-medium tracking-tight">{title}</h2>
        {meta && <span className="font-mono text-[12px] tabular-nums text-dim">{meta}</span>}
      </div>
      {children}
    </section>
  );
}

export function Row({ left, children }: { left: ReactNode; children: ReactNode }) {
  return (
    <div className="grid gap-1 border-b hairline py-3 last:border-b-0 sm:grid-cols-[140px_1fr] sm:gap-6">
      <div className="font-mono text-[12px] leading-6 text-dim">{left}</div>
      <div className="min-w-0">{children}</div>
    </div>
  );
}

export function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-col gap-2">
      {items.map((b) => (
        <li key={b} className="flex gap-3 text-[14px] leading-6 text-muted">
          <span aria-hidden className="mt-[11px] h-px w-3 shrink-0 bg-line-strong" />
          <span>{b}</span>
        </li>
      ))}
    </ul>
  );
}
