import type { Instrument } from "./watchlistComparisons";

type AddResult =
  | { ok: true; items: Instrument[] }
  | { ok: false; reason: "duplicate" };

const watchlistItems: Instrument[] = [];

export function getWatchlistItems(): Instrument[] {
  return [...watchlistItems];
}

export function addToWatchlist(instrument: Instrument): AddResult {
  if (watchlistItems.some((item) => item.symbol === instrument.symbol)) {
    return { ok: false, reason: "duplicate" };
  }
  watchlistItems.push(instrument);
  return { ok: true, items: getWatchlistItems() };
}

export function removeFromWatchlist(symbol: string): boolean {
  const index = watchlistItems.findIndex((item) => item.symbol === symbol);
  if (index === -1) return false;
  watchlistItems.splice(index, 1);
  return true;
}
