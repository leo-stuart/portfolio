'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'motion/react';
import { useLanguage } from '@/context/LanguageContext';
import { ui } from '@/data/ui';

type L = { t: string; c?: 'ok' | 'amber' | 'dim' | 'fg' };
type Story = { tag: string; short: string; steps: [L[], L[], L[], L[]] };

// Demo data only: illustrative log of an agent using testa (MCP).
const STORIES: Record<'en' | 'pt', Story[]> = {
  en: [
    {
      tag: 'payments · pix checkout', short: 'PIX',
      steps: [
        [{ t: 'src/payments/pix.ts  +42 −6', c: 'fg' }, { t: '+ createPixCharge(order)', c: 'ok' }, { t: 'src/api/webhooks/asaas.ts  +18', c: 'fg' }, { t: '+ on("PAYMENT_RECEIVED")', c: 'ok' }],
        [{ t: 'testa.feature_context()', c: 'fg' }, { t: '› route   /checkout/pix' }, { t: '› POST    /api/webhooks/asaas' }, { t: '› plan    3 scenarios' }],
        [{ t: 'run_scenario("pix checkout")', c: 'fg' }, { t: '✓ QR code visible', c: 'ok' }, { t: '✓ webhook "paid" received', c: 'ok' }, { t: '! needs_human before "Pay"', c: 'amber' }],
        [{ t: '✓ order status → paid', c: 'ok' }, { t: '✓ a11y_audit: 0 violations', c: 'ok' }, { t: '✓ human approved payment', c: 'ok' }, { t: '→ ready to merge', c: 'ok' }],
      ],
    },
    {
      tag: 'payments · failed retry', short: 'retry',
      steps: [
        [{ t: 'src/billing/retry.ts  +31 −4', c: 'fg' }, { t: '+ scheduleRetry(charge, 3)', c: 'ok' }, { t: 'src/jobs/dunning.ts  +12', c: 'fg' }, { t: '- retryNow()', c: 'amber' }],
        [{ t: 'testa.feature_context()', c: 'fg' }, { t: '› route   /account/billing' }, { t: '› mock    card_declined' }, { t: '› plan    2 scenarios' }],
        [{ t: 'run_scenario("declined card")', c: 'fg' }, { t: '✓ banner "payment failed"', c: 'ok' }, { t: '✓ retry scheduled in 24h', c: 'ok' }, { t: '! needs_human before "Retry now"', c: 'amber' }],
        [{ t: '✓ status past_due → active', c: 'ok' }, { t: '✓ a11y_audit: 0 violations', c: 'ok' }, { t: '✓ replay self-healed 1 selector', c: 'ok' }, { t: '→ ready to merge', c: 'ok' }],
      ],
    },
    {
      tag: 'growth · onboarding A/B', short: 'A/B',
      steps: [
        [{ t: 'src/onboarding/steps.tsx  +27', c: 'fg' }, { t: '+ variant B: skip phone step', c: 'ok' }, { t: 'src/flags/experiments.ts  +5', c: 'fg' }, { t: '+ onboarding_v2: 50/50', c: 'ok' }],
        [{ t: 'testa.feature_context()', c: 'fg' }, { t: '› route   /signup' }, { t: '› flag    onboarding_v2=A|B' }, { t: '› plan    2 scenarios' }],
        [{ t: 'run_scenario("signup · B")', c: 'fg' }, { t: '✓ phone step hidden', c: 'ok' }, { t: '✓ event signup_completed', c: 'ok' }, { t: '✓ variant A unchanged', c: 'ok' }],
        [{ t: '✓ ios sim: same flow passes', c: 'ok' }, { t: '✓ a11y_audit: 0 violations', c: 'ok' }, { t: '✓ 2/2 scenarios passed', c: 'ok' }, { t: '→ ready to merge', c: 'ok' }],
      ],
    },
  ],
  pt: [
    {
      tag: 'pagamentos · checkout pix', short: 'PIX',
      steps: [
        [{ t: 'src/payments/pix.ts  +42 −6', c: 'fg' }, { t: '+ createPixCharge(order)', c: 'ok' }, { t: 'src/api/webhooks/asaas.ts  +18', c: 'fg' }, { t: '+ on("PAYMENT_RECEIVED")', c: 'ok' }],
        [{ t: 'testa.feature_context()', c: 'fg' }, { t: '› rota    /checkout/pix' }, { t: '› POST    /api/webhooks/asaas' }, { t: '› plano   3 cenários' }],
        [{ t: 'run_scenario("checkout pix")', c: 'fg' }, { t: '✓ QR code exibido', c: 'ok' }, { t: '✓ webhook "paid" recebido', c: 'ok' }, { t: '! needs_human antes de "Pagar"', c: 'amber' }],
        [{ t: '✓ pedido → pago', c: 'ok' }, { t: '✓ a11y_audit: 0 violações', c: 'ok' }, { t: '✓ pagamento aprovado por humano', c: 'ok' }, { t: '→ pronto para merge', c: 'ok' }],
      ],
    },
    {
      tag: 'pagamentos · retry de falha', short: 'retry',
      steps: [
        [{ t: 'src/billing/retry.ts  +31 −4', c: 'fg' }, { t: '+ scheduleRetry(charge, 3)', c: 'ok' }, { t: 'src/jobs/dunning.ts  +12', c: 'fg' }, { t: '- retryNow()', c: 'amber' }],
        [{ t: 'testa.feature_context()', c: 'fg' }, { t: '› rota    /account/billing' }, { t: '› mock    card_declined' }, { t: '› plano   2 cenários' }],
        [{ t: 'run_scenario("cartão recusado")', c: 'fg' }, { t: '✓ aviso "pagamento falhou"', c: 'ok' }, { t: '✓ retry agendado em 24h', c: 'ok' }, { t: '! needs_human antes de "Tentar agora"', c: 'amber' }],
        [{ t: '✓ status past_due → active', c: 'ok' }, { t: '✓ a11y_audit: 0 violações', c: 'ok' }, { t: '✓ replay corrigiu 1 seletor', c: 'ok' }, { t: '→ pronto para merge', c: 'ok' }],
      ],
    },
    {
      tag: 'growth · onboarding A/B', short: 'A/B',
      steps: [
        [{ t: 'src/onboarding/steps.tsx  +27', c: 'fg' }, { t: '+ variante B: pula telefone', c: 'ok' }, { t: 'src/flags/experiments.ts  +5', c: 'fg' }, { t: '+ onboarding_v2: 50/50', c: 'ok' }],
        [{ t: 'testa.feature_context()', c: 'fg' }, { t: '› rota    /signup' }, { t: '› flag    onboarding_v2=A|B' }, { t: '› plano   2 cenários' }],
        [{ t: 'run_scenario("cadastro · B")', c: 'fg' }, { t: '✓ etapa de telefone oculta', c: 'ok' }, { t: '✓ evento signup_completed', c: 'ok' }, { t: '✓ variante A inalterada', c: 'ok' }],
        [{ t: '✓ ios sim: mesmo fluxo passa', c: 'ok' }, { t: '✓ a11y_audit: 0 violações', c: 'ok' }, { t: '✓ 2/2 cenários passaram', c: 'ok' }, { t: '→ pronto para merge', c: 'ok' }],
      ],
    },
  ],
};

const COLOR = { ok: 'text-ok', amber: 'text-amber', dim: 'text-dim', fg: 'text-fg' };

export default function Pipeline() {
  const { lang } = useLanguage();
  const s = ui[lang];
  const reduce = useReducedMotion();
  const [tick, setTick] = useState(3);
  const step = tick % 6; // 4–5 hold the result
  const story = Math.floor(tick / 6) % STORIES.en.length;
  const ref = useRef<HTMLDivElement>(null);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-1, 1], [3, -3]), { stiffness: 120, damping: 20 });
  const ry = useSpring(useTransform(mx, [-1, 1], [-4, 4]), { stiffness: 120, damping: 20 });

  const [paused, setPaused] = useState(false);
  const [hover, setHover] = useState(false);
  const playing = !reduce && !paused && !hover;

  useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => setTick((v) => v + 1), 1500);
    return () => clearInterval(id);
  }, [playing]);

  const pick = (i: number) => {
    setTick(i * 6);
    window.dispatchEvent(new CustomEvent('pipeline-story', { detail: i }));
  };

  const shown = reduce ? 3 : Math.min(step, 3);
  const st = STORIES[lang][story];

  function onMove(e: React.PointerEvent) {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width) * 2 - 1);
    my.set(((e.clientY - r.top) / r.height) * 2 - 1);
  }

  return (
    <motion.div
      ref={ref}
      onPointerMove={onMove}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => {
        mx.set(0);
        my.set(0);
        setHover(false);
      }}
      onFocus={() => setHover(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setHover(false);
      }}
      style={reduce ? undefined : { rotateX: rx, rotateY: ry, transformPerspective: 900 }}
      className="card mt-10 overflow-hidden bg-bg/90 font-mono text-[12px] backdrop-blur-sm"
    >
      <div className="flex items-center justify-between border-b hairline px-4 py-2">
        <span className="mono-label truncate"><span className="hidden sm:inline">~/{s.pipelineLabel} · </span><span className="text-amber">{st.tag}</span> · demo</span>
        <span className="flex gap-1.5" aria-hidden>
          <i className="h-2 w-2 rounded-full bg-line-strong" />
          <i className="h-2 w-2 rounded-full bg-line-strong" />
          <i className="h-2 w-2 rounded-full bg-line-strong" />
        </span>
      </div>

      <div className="flex flex-wrap items-center gap-1.5 border-b hairline px-3 py-2" role="group" aria-label={s.pipelinePick}>
        {STORIES[lang].map((x, i) => (
          <button
            key={x.tag}
            type="button"
            aria-pressed={i === story}
            onClick={() => pick(i)}
            className={`rounded-full border px-2.5 py-0.5 text-[11px] transition-colors ${i === story ? 'border-ok text-ok' : 'hairline text-dim hover:text-fg'}`}
          >
            {x.short}
          </button>
        ))}
        <span className="ml-auto flex gap-1">
          <button type="button" onClick={() => setTick(story * 6)} aria-label={s.replay} title={s.replay} className="rounded px-1.5 text-dim hover:text-fg">↺</button>
          {!reduce && (
            <button type="button" onClick={() => setPaused((v) => !v)} aria-label={paused ? s.play : s.pause} title={paused ? s.play : s.pause} className="rounded px-1.5 text-dim hover:text-fg">
              {paused ? '▶' : '❚❚'}
            </button>
          )}
        </span>
      </div>
      <p className="sr-only" aria-live="polite">{s.pipelineAria} {st.tag}</p>

      <ol className="grid grid-cols-4 gap-px bg-line" aria-hidden>
        {s.steps.map((label, i) => {
          const done = shown > i;
          const active = shown === i;
          const color = i === 3 && (done || active) ? 'text-ok' : done ? 'text-fg' : active ? 'text-amber' : 'text-dim';
          return (
            <li key={label} className="relative bg-bg px-2 py-2.5 sm:px-3">
              <span className={`flex items-center gap-1 whitespace-nowrap text-[11px] transition-colors sm:gap-1.5 sm:text-[12px] ${color}`}>
                <span>{i === 3 ? (done || active ? '✓' : '○') : done ? '●' : active ? '◐' : '○'}</span>
                <span>{label}</span>
              </span>
              <motion.span
                className="absolute inset-x-0 bottom-0 h-px origin-left bg-ok"
                initial={false}
                animate={{ scaleX: done ? 1 : active ? 0.5 : 0, backgroundColor: active && i < 3 ? 'var(--c-amber)' : 'var(--c-ok)' }}
                transition={{ duration: reduce ? 0 : 0.6, ease: 'easeOut' }}
              />
            </li>
          );
        })}
      </ol>

      <div className="grid min-h-[116px] gap-0.5 px-4 py-3 leading-5" aria-hidden>
        {st.steps[shown].map((l, i) => (
          <motion.p
            key={`${story}-${shown}-${i}`}
            initial={reduce ? false : { opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: reduce ? 0 : i * 0.18 }}
            className={`truncate ${l.c ? COLOR[l.c] : 'text-muted'} ${shown === 3 && i === 3 ? 'font-semibold' : ''}`}
          >
            {l.t}
          </motion.p>
        ))}
      </div>
    </motion.div>
  );
}
