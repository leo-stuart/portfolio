import { NextResponse, type NextRequest } from 'next/server';
import { getContributions, ScrapeError } from '@/lib/github';

const HANDLE = /^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i;
const memo = new Map<string, { at: number; data: unknown }>();
const TTL = 6 * 60 * 60 * 1000;

export async function GET(req: NextRequest) {
  const user = (req.nextUrl.searchParams.get('user') ?? '').trim().replace(/^@/, '');
  if (!HANDLE.test(user)) return NextResponse.json({ error: 'invalid' }, { status: 400 });
  const key = user.toLowerCase();
  const hit = memo.get(key);
  const headers = { 'Cache-Control': 'public, s-maxage=21600, stale-while-revalidate=86400' };
  if (hit && Date.now() - hit.at < TTL) return NextResponse.json(hit.data, { headers });
  try {
    const { days, total } = await getContributions(user);
    const data = { user, total, days: days.map((d) => [d.date, d.count, d.level]) };
    if (memo.size > 500) memo.clear();
    memo.set(key, { at: Date.now(), data });
    return NextResponse.json(data, { headers });
  } catch (e) {
    const status = e instanceof ScrapeError ? e.status : 502;
    const error = status === 404 ? 'not_found' : status === 429 ? 'rate_limited' : 'upstream';
    return NextResponse.json({ error }, { status: status === 404 ? 404 : status === 429 ? 429 : 502 });
  }
}
