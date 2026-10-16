import 'server-only';

import type { Day, Activity, GitHubData } from './github-types';
export type { GitHubData };

const USER = 'leo-stuart';
const UA = { 'User-Agent': 'leostuart.com' };
const REVALIDATE = 60 * 60 * 6;

async function viaGraphQL(token: string): Promise<Day[] | null> {
  const query = `query($u:String!){user(login:$u){contributionsCollection{contributionCalendar{weeks{contributionDays{date contributionCount contributionLevel}}}}}}`;
  const res = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: { ...UA, Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, variables: { u: USER } }),
    next: { revalidate: REVALIDATE },
  });
  if (!res.ok) return null;
  const json = await res.json();
  const weeks = json?.data?.user?.contributionsCollection?.contributionCalendar?.weeks;
  if (!Array.isArray(weeks)) return null;
  const lv: Record<string, number> = { NONE: 0, FIRST_QUARTILE: 1, SECOND_QUARTILE: 2, THIRD_QUARTILE: 3, FOURTH_QUARTILE: 4 };
  return weeks.flatMap((w: { contributionDays: { date: string; contributionCount: number; contributionLevel: string }[] }) =>
    w.contributionDays.map((d) => ({ date: d.date, count: d.contributionCount, level: lv[d.contributionLevel] ?? 0 })),
  );
}

export class ScrapeError extends Error {
  constructor(public status: number) {
    super(`github ${status}`);
  }
}

async function viaScrape(user = USER, strict = false): Promise<Day[] | null> {
  const res = await fetch(`https://github.com/users/${encodeURIComponent(user)}/contributions`, { headers: UA, next: { revalidate: REVALIDATE } });
  if (!res.ok) {
    if (strict) throw new ScrapeError(res.status);
    return null;
  }
  const html = await res.text();
  const counts = new Map<string, number>();
  for (const m of html.matchAll(/<tool-tip[^>]*for="([^"]+)"[^>]*>([^<]*)</g)) {
    const n = /^(\d+) contribution/.exec(m[2].trim());
    counts.set(m[1], n ? Number(n[1]) : 0);
  }
  const days: Day[] = [];
  for (const m of html.matchAll(/<td[^>]*ContributionCalendar-day[^>]*>/g)) {
    const tag = m[0];
    const date = /data-date="([^"]+)"/.exec(tag)?.[1];
    const id = /id="([^"]+)"/.exec(tag)?.[1];
    const level = Number(/data-level="(\d)"/.exec(tag)?.[1] ?? 0);
    if (date) days.push({ date, level, count: (id && counts.get(id)) || 0 });
  }
  days.sort((a, b) => a.date.localeCompare(b.date));
  return days.length > 300 ? days : null;
}

export async function getContributions(user: string) {
  const days = await viaScrape(user, true);
  if (!days) throw new ScrapeError(502);
  return { days, total: days.reduce((n, d) => n + d.count, 0) };
}

type Ev = { type: string; repo: { name: string }; created_at: string; payload: { action?: string; ref_type?: string; number?: number; pull_request?: { title?: string; html_url?: string; merged?: boolean }; release?: { tag_name?: string; html_url?: string } } };

async function activity(token?: string): Promise<Activity[]> {
  const res = await fetch(`https://api.github.com/users/${USER}/events/public?per_page=30`, {
    headers: { ...UA, Accept: 'application/vnd.github+json', ...(token ? { Authorization: `Bearer ${token}` } : {}) },
    next: { revalidate: REVALIDATE },
  });
  if (!res.ok) return [];
  const evs: Ev[] = await res.json();
  const out: Activity[] = [];
  for (const e of evs) {
    const repo = e.repo.name;
    const base = `https://github.com/${repo}`;
    if (e.type === 'PushEvent') out.push({ type: 'push', repo, date: e.created_at, label: 'push', url: base });
    else if (e.type === 'PullRequestEvent' && e.payload.action)
      out.push({ type: 'pr', repo, date: e.created_at, label: `PR #${e.payload.number ?? ''} ${e.payload.pull_request?.merged ? 'merged' : e.payload.action}`.trim(), url: e.payload.pull_request?.html_url ?? `${base}/pull/${e.payload.number}` });
    else if (e.type === 'ReleaseEvent') out.push({ type: 'release', repo, date: e.created_at, label: `release ${e.payload.release?.tag_name ?? ''}`, url: e.payload.release?.html_url ?? base });
    else if (e.type === 'CreateEvent' && e.payload.ref_type === 'repository') out.push({ type: 'create', repo, date: e.created_at, label: 'new repo', url: base });
  }
  // collapse consecutive duplicates (e.g. several pushes to the same repo)
  return out.filter((a, i) => i === 0 || a.repo !== out[i - 1].repo || a.label !== out[i - 1].label).slice(0, 6);
}

export async function getGitHubData(): Promise<GitHubData> {
  const token = process.env.GITHUB_TOKEN;
  let days: Day[] | null = null;
  let source: GitHubData['source'] = 'none';
  try {
    if (token) {
      days = await viaGraphQL(token);
      if (days) source = 'graphql';
    }
    if (!days) {
      days = await viaScrape();
      if (days) source = 'scrape';
    }
  } catch {
    days = null;
  }
  let acts: Activity[] = [];
  try {
    acts = await activity(token);
  } catch {
    acts = [];
  }
  const d = days ?? [];
  return { days: d, total: d.reduce((n, x) => n + x.count, 0), source: d.length ? source : 'none', activity: acts };
}
