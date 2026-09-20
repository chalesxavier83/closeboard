const BASE = "https://api.the-odds-api.com/v4";

export type OddsRegion = "us" | "uk" | "eu" | "au";
export type OddsMarket = "h2h" | "spreads" | "totals";

export type RawOutcome = {
  name: string;
  price: number;
  point?: number;
};

export type RawMarket = {
  key: string;
  outcomes: RawOutcome[];
  last_update?: string;
};

export type RawBookmaker = {
  key: string;
  title: string;
  last_update?: string;
  markets: RawMarket[];
};

export type RawEvent = {
  id: string;
  sport_key: string;
  sport_title: string;
  commence_time: string;
  home_team: string;
  away_team: string;
  bookmakers: RawBookmaker[];
};

export type RawScore = {
  id: string;
  sport_key: string;
  sport_title: string;
  commence_time: string;
  completed: boolean;
  home_team: string;
  away_team: string;
  scores?: { name: string; score: string }[];
  last_update?: string;
};

function headers(apiKey: string) {
  return { "x-api-key": apiKey, Accept: "application/json" };
}

export async function fetchSports(apiKey: string) {
  const res = await fetch(`${BASE}/sports/?apiKey=${apiKey}`, { headers: headers(apiKey), cache: "no-store" });
  if (!res.ok) throw new Error(`sports ${res.status}`);
  return res.json() as Promise<{ key: string; title: string; active: boolean; group: string }[]>;
}

export async function fetchOdds(apiKey: string, sport: string, regions: OddsRegion = "us", markets: OddsMarket[] = ["h2h"]) {
  const params = new URLSearchParams({
    apiKey,
    regions,
    markets: markets.join(","),
    oddsFormat: "american",
    dateFormat: "iso",
  });
  const res = await fetch(`${BASE}/sports/${sport}/odds/?${params}`, { headers: headers(apiKey), cache: "no-store" });
  if (!res.ok) throw new Error(`odds ${res.status}`);
  return res.json() as Promise<RawEvent[]>;
}

export async function fetchScores(apiKey: string, sport: string, daysFrom = 1) {
  const params = new URLSearchParams({ apiKey, dateFormat: "iso", daysFrom: String(daysFrom) });
  const res = await fetch(`${BASE}/sports/${sport}/scores/?${params}`, { headers: headers(apiKey), cache: "no-store" });
  if (!res.ok) throw new Error(`scores ${res.status}`);
  return res.json() as Promise<RawScore[]>;
}

export function bestAmerican(outcomes: RawOutcome[]): number {
  return outcomes.reduce((best, o) => (o.price > best ? o.price : best), outcomes[0]?.price ?? 0);
}

export function impliedFromAmerican(american: number): number {
  if (american >= 0) return 100 / (american + 100);
  return Math.abs(american) / (Math.abs(american) + 100);
}

export function removeVig(p1: number, p2: number): [number, number] {
  const total = p1 + p2;
  if (total <= 0) return [p1, p2];
  return [p1 / total, p2 / total];
}
