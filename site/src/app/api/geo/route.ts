import { NextResponse, type NextRequest } from 'next/server';

export const dynamic = 'force-dynamic';

// Vercel adds these geo headers on every request; locally they are absent.
export function GET(req: NextRequest) {
  const h = req.headers;
  const num = (v: string | null) => (v && !Number.isNaN(Number(v)) ? Number(v) : null);
  const city = h.get('x-vercel-ip-city');
  return NextResponse.json(
    {
      country: h.get('x-vercel-ip-country'),
      city: city ? decodeURIComponent(city) : null,
      lat: num(h.get('x-vercel-ip-latitude')),
      lon: num(h.get('x-vercel-ip-longitude')),
    },
    { headers: { 'Cache-Control': 'private, no-store' } },
  );
}
