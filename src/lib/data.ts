import type { LedgerRow, Market } from "./types";

export const PRODUCT = {
  name: "Closeboard",
  line: "A research desk for sports markets.",
  sub: "We show where the market is wrong, by how much, and whether the process is beating the close — not who wins tonight.",
};

export const SLATE: Market[] = [
  {
    id: "epl-ars-che-shots",
    sport: "Soccer",
    league: "Premier League",
    kickoff: "2026-09-20T15:30:00.000Z",
    home: "Arsenal",
    away: "Chelsea",
    market: "Player shots",
    selection: "Bukayo Saka over 2.5 shots",
    modelProb: 0.618,
    marketProb: 0.552,
    edge: 0.066,
    bestBook: "Pinnacle",
    bestAmerican: -123,
    books: [
      { book: "Pinnacle", american: -123 },
      { book: "Bet365", american: -137 },
      { book: "DraftKings", american: -142 },
    ],
    action: "PLAY",
    reasons: [
      "Saka averages 3.4 shots in home league games with Odegaard starting.",
      "Chelsea have allowed 4.1 shots to opposition right-sided attackers in six away matches.",
    ],
    risks: ["Early Arsenal lead can cap shot volume."],
    sources: ["Opta rolling 6", "lineup news 09:10 UTC"],
    dataQuality: "High",
  },
  {
    id: "laliga-gir-bet-total",
    sport: "Soccer",
    league: "La Liga",
    kickoff: "2026-09-20T17:15:00.000Z",
    home: "Girona",
    away: "Betis",
    market: "Total",
    selection: "Over 2.5 goals",
    modelProb: 0.571,
    marketProb: 0.528,
    edge: 0.043,
    bestBook: "Betfair Exchange",
    bestAmerican: -112,
    books: [
      { book: "Betfair Exchange", american: -112 },
      { book: "Pinnacle", american: -118 },
    ],
    action: "PLAY",
    reasons: ["Both sides generate high shot quality while the match is level."],
    risks: ["Isco deeper in midfield drops chance quality."],
    sources: ["FBref shot maps"],
    dataQuality: "High",
  },
  {
    id: "seriea-fio-bol-1x2",
    sport: "Soccer",
    league: "Serie A",
    kickoff: "2026-09-20T18:45:00.000Z",
    home: "Fiorentina",
    away: "Bologna",
    market: "1X2",
    selection: "Bologna +225",
    modelProb: 0.312,
    marketProb: 0.296,
    edge: 0.016,
    bestBook: "Circa",
    bestAmerican: 238,
    books: [
      { book: "Circa", american: 238 },
      { book: "Pinnacle", american: 225 },
    ],
    action: "PASS",
    reasons: ["Edge is inside the 3.0 pp threshold after vig."],
    risks: ["Number dies at any book worse than +225."],
    sources: ["closing simulation"],
    dataQuality: "Medium",
  },
  {
    id: "nba-nyk-bos-pts",
    sport: "NBA",
    league: "NBA Preseason",
    kickoff: "2026-09-21T23:30:00.000Z",
    home: "Knicks",
    away: "Celtics",
    market: "Player points",
    selection: "Jalen Brunson over 21.5 points",
    modelProb: 0.49,
    marketProb: 0.524,
    edge: -0.034,
    bestBook: "FanDuel",
    bestAmerican: -110,
    books: [
      { book: "FanDuel", american: -110 },
      { book: "DraftKings", american: -118 },
    ],
    action: "PASS",
    reasons: ["Preseason minutes are unannounced. Model cannot price a 28-minute cap."],
    risks: ["Starter minute cap makes the over worse."],
    sources: ["beat reporters"],
    dataQuality: "Thin",
  },
];

export const LEDGER: LedgerRow[] = [
  { id: "l1", publishedAt: "2026-09-19T09:12:00.000Z", settledAt: "2026-09-19T16:55:00.000Z", sport: "Soccer", league: "Premier League", event: "Liverpool vs Crystal Palace", market: "Player shots", selection: "Salah over 3.5 shots", publishedAmerican: -118, closeAmerican: -135, clvCents: 17, result: "WIN", units: 0.91 },
  { id: "l2", publishedAt: "2026-09-19T09:14:00.000Z", settledAt: "2026-09-19T18:10:00.000Z", sport: "Soccer", league: "La Liga", event: "Real Sociedad vs Valencia", market: "Total", selection: "Under 2.5 goals", publishedAmerican: 105, closeAmerican: -102, clvCents: 7, result: "LOSS", units: -1 },
  { id: "l3", publishedAt: "2026-09-18T10:02:00.000Z", settledAt: "2026-09-18T21:40:00.000Z", sport: "Tennis", league: "WTA Osaka", event: "Swiatek vs Keys", market: "Spread", selection: "Keys +3.5 games", publishedAmerican: -110, closeAmerican: -125, clvCents: 15, result: "WIN", units: 0.91 },
  { id: "l4", publishedAt: "2026-09-17T11:20:00.000Z", settledAt: "2026-09-17T20:48:00.000Z", sport: "Soccer", league: "Serie A", event: "Atalanta vs Udinese", market: "Total", selection: "Over 2.5 goals", publishedAmerican: -122, closeAmerican: -141, clvCents: 19, result: "LOSS", units: -1 },
  { id: "l5", publishedAt: "2026-09-16T08:44:00.000Z", settledAt: "2026-09-16T19:58:00.000Z", sport: "Soccer", league: "Ligue 1", event: "Lille vs Rennes", market: "Total", selection: "Over 2.5 goals", publishedAmerican: 100, closeAmerican: -111, clvCents: 11, result: "WIN", units: 1 },
  { id: "l6", publishedAt: "2026-09-14T10:16:00.000Z", settledAt: "2026-09-14T18:22:00.000Z", sport: "Tennis", league: "ATP Beijing", event: "Djokovic vs Fritz", market: "Spread", selection: "Fritz +4.5 games", publishedAmerican: -105, closeAmerican: 100, clvCents: -5, result: "PUSH", units: 0 },
];

export function ledgerStats(rows: LedgerRow[]) {
  const settled = rows.filter((r) => r.result !== "PENDING");
  const plays = settled.filter((r) => r.result !== "PUSH");
  const wins = plays.filter((r) => r.result === "WIN").length;
  const units = settled.reduce((s, r) => s + r.units, 0);
  const clvHits = settled.filter((r) => r.clvCents > 0).length;
  const avgClv = settled.reduce((s, r) => s + r.clvCents, 0) / Math.max(settled.length, 1);
  return {
    sample: settled.length,
    winRate: plays.length ? wins / plays.length : 0,
    units,
    roi: units / Math.max(plays.length, 1),
    beatClose: settled.length ? clvHits / settled.length : 0,
    avgClv,
    passToday: SLATE.filter((m) => m.action === "PASS").length,
    playToday: SLATE.filter((m) => m.action === "PLAY").length,
  };
}

export function getMarket(id: string) {
  return SLATE.find((m) => m.id === id);
}
