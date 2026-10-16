'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView } from 'motion/react';
import { useLanguage } from '@/context/LanguageContext';
import { useReducedMotionSafe } from '@/hooks/useReducedMotionSafe';
import { LAND, MAP_W, MAP_H, LAT_TOP, LAT_SPAN } from '@/data/worldPixels';
import { ui } from '@/data/ui';
import Section from './Section';

import type { VisitStats } from '@/lib/visit-types';

type Geo = { country: string | null; city: string | null; lat: number | null; lon: number | null; stats: VisitStats | null };
const BH = { lat: -19.92, lon: -43.94 };
const CELL = 8;
const W = MAP_W * CELL;
const H = MAP_H * CELL;

const project = (lat: number, lon: number) => ({ x: ((lon + 180) / 360) * W, y: ((LAT_TOP - lat) / LAT_SPAN) * H });
const landCells: { x: number; y: number }[] = [];
for (let i = 0; i < LAND.length; i++) if (LAND[i] === '1') landCells.push({ x: (i % MAP_W) * CELL + CELL / 2, y: Math.floor(i / MAP_W) * CELL + CELL / 2 });

function arc(ctx: CanvasRenderingContext2D, a: { x: number; y: number }, b: { x: number; y: number }, t: number) {
  const mx = (a.x + b.x) / 2;
  const my = (a.y + b.y) / 2 - Math.hypot(b.x - a.x, b.y - a.y) * 0.35;
  ctx.beginPath();
  const steps = 32;
  for (let i = 0; i <= steps * t; i++) {
    const u = i / steps;
    const x = (1 - u) * (1 - u) * a.x + 2 * (1 - u) * u * mx + u * u * b.x;
    const y = (1 - u) * (1 - u) * a.y + 2 * (1 - u) * u * my + u * u * b.y;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.stroke();
}

function regionName(code: string, lang: 'en' | 'pt') {
  try {
    return new Intl.DisplayNames([lang === 'pt' ? 'pt-BR' : 'en'], { type: 'region' }).of(code) ?? code;
  } catch {
    return code;
  }
}

export default function VisitorMap() {
  const { lang } = useLanguage();
  const s = ui[lang];
  const ref = useRef<HTMLCanvasElement>(null);
  const inView = useInView(ref, { margin: '0px' });
  const reduce = useReducedMotionSafe();
  const [geo, setGeo] = useState<Geo | null>(null);

  useEffect(() => {
    const load = (ping: boolean) =>
      fetch(ping ? '/api/geo?ping=1' : '/api/geo')
        .then((r) => (r.ok ? r.json() : null))
        .then((g: Geo | null) => g && setGeo(g))
        .catch(() => {});
    load(false);
    // Keep presence fresh while the tab is visible.
    const id = setInterval(() => document.visibilityState === 'visible' && load(true), 30_000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const c = ref.current;
    const ctx = c?.getContext('2d');
    if (!c || !ctx) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    c.width = W * dpr;
    c.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const css = getComputedStyle(document.documentElement);
    const col = (v: string) => css.getPropertyValue(v).trim() || '#888';
    const ok = col('--c-ok');
    const amber = col('--c-amber');
    const line = col('--c-line-strong');
    const bh = project(BH.lat, BH.lon);
    const me = geo?.lat != null && geo?.lon != null ? project(geo.lat, geo.lon) : null;
    type Ping = { from: { x: number; y: number }; born: number };
    const recent = (geo?.stats?.recent ?? []).filter((v) => v.lat != null && v.lon != null).map((v) => project(v.lat!, v.lon!));
    const real = geo?.stats != null;
    let k = 0;
    let pings: Ping[] = [];
    let raf = 0;
    let last = 0;

    const draw = (now: number) => {
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = line;
      for (const p of landCells) ctx.fillRect(p.x - 1.5, p.y - 1.5, 3, 3);
      ctx.lineWidth = 1.25;
      if (!reduce) {
        if (now - last > 900) {
          last = now;
          if (real) {
            if (recent.length) pings.push({ from: recent[k++ % recent.length], born: now });
          } else pings.push({ from: landCells[Math.floor(Math.random() * landCells.length)], born: now });
        }
        pings = pings.filter((p) => now - p.born < 2600);
        for (const p of pings) {
          const t = Math.min(1, (now - p.born) / 1400);
          const fade = 1 - Math.max(0, (now - p.born - 1400) / 1200);
          ctx.globalAlpha = 0.55 * fade;
          ctx.strokeStyle = amber;
          arc(ctx, p.from, bh, t);
          ctx.fillStyle = amber;
          ctx.beginPath();
          ctx.arc(p.from.x, p.from.y, 2 + (1 - fade) * 6, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.globalAlpha = 1;
      }
      if (me) {
        ctx.strokeStyle = ok;
        ctx.globalAlpha = 0.9;
        arc(ctx, me, bh, 1);
        ctx.fillStyle = ok;
        ctx.beginPath();
        ctx.arc(me.x, me.y, 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      }
      const pulse = reduce ? 0 : (Math.sin(now / 300) + 1) * 2;
      ctx.fillStyle = ok;
      ctx.beginPath();
      ctx.arc(bh.x, bh.y, 4 + pulse, 0, Math.PI * 2);
      ctx.globalAlpha = 0.35;
      ctx.fill();
      ctx.globalAlpha = 1;
      ctx.beginPath();
      ctx.arc(bh.x, bh.y, 3.5, 0, Math.PI * 2);
      ctx.fill();
      if (!reduce && inView) raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, [geo, reduce, inView]);

  const country = geo?.country ? regionName(geo.country, lang) : null;

  return (
    <Section id="visitors" title={s.mapTitle} aside={<span className="font-mono">→ Belo Horizonte</span>}>
      <div className="card overflow-hidden p-4 sm:p-6">
        <p className="font-mono text-[13px]">
          {country ? (
            <>
              <span className="text-ok">●</span> {s.mapYou} <span className="text-ok">{geo?.city ? `${geo.city}, ` : ''}{country}</span>
            </>
          ) : (
            <span className="text-dim">{s.mapUnknown}</span>
          )}
        </p>
        <canvas ref={ref} role="img" aria-label={s.mapAria} className="mt-4 h-auto w-full" style={{ aspectRatio: `${W} / ${H}` }} />
        {geo?.stats ? (
          <div className="mt-4 grid gap-3 font-mono text-[12px] sm:grid-cols-[auto_auto_1fr] sm:items-start sm:gap-8">
            <p>
              <span className="text-[20px] font-semibold text-fg tabular-nums">{geo.stats.now}</span> <span className="text-ok">●</span> <span className="text-dim">{s.mapNow}</span>
            </p>
            <p>
              <span className="text-[20px] font-semibold text-fg tabular-nums">{geo.stats.total.toLocaleString(lang === 'pt' ? 'pt-BR' : 'en-US')}</span> <span className="text-dim">{s.mapTotal}</span>
            </p>
            <ul className="flex flex-wrap gap-x-4 gap-y-1 text-muted">
              {geo.stats.countries.slice(0, 6).map(([c, n]) => (
                <li key={c}>
                  {regionName(c, lang)} <span className="text-fg tabular-nums">{n}</span>
                </li>
              ))}
            </ul>
            <p className="text-[11px] text-dim sm:col-span-3">
              <span className="text-amber">●</span> {s.mapLegendReal}
            </p>
          </div>
        ) : (
          <p className="mt-3 font-mono text-[11px] text-dim">
            <span className="text-amber">●</span> {s.mapLegend}
          </p>
        )}
      </div>
    </Section>
  );
}
