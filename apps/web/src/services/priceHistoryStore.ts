import type { PriceBar } from "./watchlistComparisons";

type PriceHistoryStore = {
  getHistory: (symbol: string) => Promise<PriceBar[]>;
};

export const priceHistoryStore: PriceHistoryStore = {
  async getHistory(symbol: string) {
    void symbol;
    return [];
  },
};
