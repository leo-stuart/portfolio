import { NextResponse, type NextRequest } from 'next/server';
import { track } from '@/lib/visits';

export const dynamic = 'force-dynamic';

// Vercel adds geo headers on every request; locally they are absent.
export async function GET(req: NextRequest) {
  const h = req.headers;
  const num = (v: string | null) => (v && !Number.isNaN(Number(v)) ? Number(v) : null);
  const rawCity = h.get('x-vercel-ip-city');
  let city: string | null = null;
  try {
    city = rawCity ? decodeURIComponent(rawCity) : null;
  } catch {
    city = rawCity;
  }
  const geo = {
    country: h.get('x-vercel-ip-country'),
    city,
    lat: num(h.get('x-vercel-ip-latitude')),
    lon: num(h.get('x-vercel-ip-longitude')),
  };
  const ip = h.get('x-real-ip') ?? h.get('x-forwarded-for')?.split(',')[0]?.trim() ?? null;
  // ?ping=1 refreshes presence only; the first load counts the visit.
  const stats = await track({ ...geo, ip, ua: h.get('user-agent') ?? '', count: req.nextUrl.searchParams.get('ping') !== '1' });
  return NextResponse.json({ ...geo, stats }, { headers: { 'Cache-Control': 'private, no-store' } });
}
