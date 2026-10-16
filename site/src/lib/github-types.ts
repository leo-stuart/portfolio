export type Day = { date: string; count: number; level: number };
export type Activity = { type: 'push' | 'pr' | 'release' | 'create'; repo: string; date: string; label: string; url: string };
export type GitHubData = { days: Day[]; total: number; source: 'graphql' | 'scrape' | 'none'; activity: Activity[] };

