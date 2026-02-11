import type { WatchlistItem } from "./watchlistComparisons";
import { getSortPreference, setSortPreference } from "./watchlistStore";

type SortKey = "1d" | "1w" | "1m" | "3m" | "6m" | "1y" | "ytd";

type SortState = {
  sortKey: SortKey;
  items: WatchlistItem[];
};

export function initializeSortState(items: WatchlistItem[]): SortState {
  const sortKey = getSortPreference();
  return {
    sortKey,
    items: sortItems(items, sortKey),
  };
}

export function applySort(items: WatchlistItem[], sortKey: SortKey): SortState {
  setSortPreference(sortKey);
  return {
    sortKey,
    items: sortItems(items, sortKey),
  };
}

function sortItems(items: WatchlistItem[], sortKey: SortKey): WatchlistItem[] {
  return [...items].sort((a, b) => {
    const aValue = getComparisonValue(a, sortKey);
    const bValue = getComparisonValue(b, sortKey);
    return bValue - aValue;
  });
}

function getComparisonValue(item: WatchlistItem, sortKey: SortKey): number {
  const match = item.comparisons.find((entry) => entry.period === sortKey);
  return match?.percent_change ?? Number.NEGATIVE_INFINITY;
}
