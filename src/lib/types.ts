export type Sport = "Soccer" | "Tennis" | "NBA";
export type MarketType = "1X2" | "Total" | "Spread" | "Player shots" | "Player points";
export type Action = "PLAY" | "PASS";
export type Result = "WIN" | "LOSS" | "PUSH" | "PENDING";

export type BookQuote = {
  book: string;
  american: number;
};

export type Market = {
  id: string;
  sport: Sport;
  league: string;
  kickoff: string;
  home: string;
  away: string;
  market: MarketType;
  selection: string;
  modelProb: number;
  marketProb: number;
  edge: number;
  bestBook: string;
  bestAmerican: number;
  books: BookQuote[];
  action: Action;
  reasons: string[];
  risks: string[];
  sources: string[];
  dataQuality: "High" | "Medium" | "Thin";
};

export type LedgerRow = {
  id: string;
  publishedAt: string;
  settledAt?: string;
  sport: Sport;
  league: string;
  event: string;
  market: MarketType;
  selection: string;
  publishedAmerican: number;
  closeAmerican: number;
  clvCents: number;
  result: Result;
  units: number;
};
