import 'server-only';
import { createHash } from 'crypto';
import { Redis } from '@upstash/redis';

import type { Visit, VisitStats } from './visit-types';
export type { VisitStats };

const url = process.env.KV_REST_API_URL;
const token = process.env.KV_REST_API_TOKEN;
const redis = url && token ? new Redis({ url, token }) : null;
// Production data is kept apart from preview/local traffic.
const P = process.env.VERCEL_ENV === 'production' ? 'prod' : 'dev';
const SALT = process.env.VISIT_SALT ?? token ?? '';
const RECENT = 40;
const NOW_WINDOW = 90_000;
const BOT = /bot|crawl|spider|slurp|preview|headless|lighthouse|monitor|curl|wget/i;

const round = (n: number | null) => (n == null ? null : Math.round(n * 10) / 10);

/** Salted, daily-rotating hash: never stores IP or UA. */
function visitorHash(ip: string, ua: string, day: string) {
  return createHash('sha256').update(`${SALT}|${day}|${ip}|${ua}`).digest('hex').slice(0, 24);
}

export async function track(opts: { ip: string | null; ua: string; country: string | null; city: string | null; lat: number | null; lon: number | null; count: boolean }): Promise<VisitStats | null> {
  if (!redis) return null;
  try {
    const now = Date.now();
    if (opts.ip && opts.country && !BOT.test(opts.ua)) {
      const day = new Date(now).toISOString().slice(0, 10);
      const h = visitorHash(opts.ip, opts.ua, day);
      await redis.zadd(`${P}:now`, { score: now, member: h });
      if (opts.count) {
        const fresh = await redis.set(`${P}:seen:${day}:${h}`, 1, { nx: true, ex: 60 * 60 * 26 });
        if (fresh) {
          const v: Visit = { c: opts.country, city: opts.city, lat: round(opts.lat), lon: round(opts.lon), t: now };
          const tx = redis.multi();
          tx.hincrby(`${P}:countries`, opts.country, 1);
          tx.incr(`${P}:total`);
          tx.lpush(`${P}:recent`, JSON.stringify(v));
          tx.ltrim(`${P}:recent`, 0, RECENT - 1);
          await tx.exec();
        }
      }
    }
    const tx = redis.multi();
    tx.zremrangebyscore(`${P}:now`, 0, now - NOW_WINDOW);
    tx.zcard(`${P}:now`);
    tx.get<number>(`${P}:total`);
    tx.hgetall<Record<string, number>>(`${P}:countries`);
    tx.lrange<Visit | string>(`${P}:recent`, 0, RECENT - 1);
    const [, nowCount, total, countries, recent] = (await tx.exec()) as [unknown, number, number | null, Record<string, number> | null, (Visit | string)[]];
    return {
      total: Number(total ?? 0),
      now: Number(nowCount ?? 0),
      countries: Object.entries(countries ?? {})
        .map(([k, v]) => [k, Number(v)] as [string, number])
        .sort((a, b) => b[1] - a[1]),
      recent: (recent ?? []).map((r) => (typeof r === 'string' ? (JSON.parse(r) as Visit) : r)),
    };
  } catch {
    return null;
  }
}
