export type Visit = { c: string; city: string | null; lat: number | null; lon: number | null; t: number };
export type VisitStats = { total: number; countries: [string, number][]; recent: Visit[]; now: number };

