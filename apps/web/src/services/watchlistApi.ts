import type { WatchlistResponse } from "./watchlistComparisons";

export async function fetchWatchlist(): Promise<WatchlistResponse | null> {
  try {
    const response = await fetch("/api/watchlist", { cache: "no-store" });
    if (!response.ok) {
      return null;
    }
    return (await response.json()) as WatchlistResponse;
  } catch {
    return null;
  }
}
