export type Period = "1d" | "1w" | "1m" | "3m" | "6m" | "1y" | "ytd";

export type InstrumentType = "stock" | "index";

export type InstrumentStatus = "active" | "delisted";

export type Instrument = {
  id: string;
  symbol: string;
  name: string;
  type: InstrumentType;
  status: InstrumentStatus;
};

export type PriceBar = {
  date: string; // YYYY-MM-DD
  open: number;
  high: number;
  low: number;
  close: number;
};

export type ComparisonMetric = {
  period: Period;
  percent_change: number | null;
  as_of_date: string;
};

export type WatchlistItem = {
  instrument: Instrument;
  comparisons: ComparisonMetric[];
};

export type WatchlistResponse = {
  id: string;
  name: string;
  sort_key: Period;
  items: WatchlistItem[];
};

type WatchlistSeedItem = {
  instrument: Instrument;
  prices: PriceBar[];
};

type BuildWatchlistInput = {
  id: string;
  name: string;
  sort_key: Period;
  items: WatchlistSeedItem[];
};

const PERIODS: Period[] = ["1d", "1w", "1m", "3m", "6m", "1y", "ytd"];

const PERIOD_DAYS: Record<Exclude<Period, "ytd">, number> = {
  "1d": 1,
  "1w": 7,
  "1m": 30,
  "3m": 90,
  "6m": 180,
  "1y": 365,
};

export function buildWatchlistResponse(input: BuildWatchlistInput): WatchlistResponse {
  return {
    id: input.id,
    name: input.name,
    sort_key: input.sort_key,
    items: input.items.map((item) => ({
      instrument: item.instrument,
      comparisons: buildComparisons(item.prices),
    })),
  };
}

export function buildComparisons(prices: PriceBar[]): ComparisonMetric[] {
  if (prices.length === 0) {
    return PERIODS.map((period) => ({
      period,
      percent_change: null,
      as_of_date: "",
    }));
  }

  const sorted = [...prices].sort((a, b) => a.date.localeCompare(b.date));
  const latest = sorted[sorted.length - 1];
  const latestDate = new Date(latest.date);

  return PERIODS.map((period) => {
    const reference = findReferenceBar(sorted, latestDate, period);
    if (!reference) {
      return {
        period,
        percent_change: null,
        as_of_date: latest.date,
      };
    }

    const percent_change = calculatePercentChange(latest.close, reference.close);
    return {
      period,
      percent_change,
      as_of_date: latest.date,
    };
  });
}

function findReferenceBar(prices: PriceBar[], latestDate: Date, period: Period): PriceBar | null {
  if (prices.length === 0) return null;

  if (period === "ytd") {
    const startOfYear = new Date(Date.UTC(latestDate.getUTCFullYear(), 0, 1));
    return findLastOnOrBefore(prices, startOfYear);
  }

  const daysBack = PERIOD_DAYS[period];
  const target = new Date(latestDate);
  target.setUTCDate(target.getUTCDate() - daysBack);
  return findLastOnOrBefore(prices, target);
}

function findLastOnOrBefore(prices: PriceBar[], target: Date): PriceBar | null {
  for (let i = prices.length - 1; i >= 0; i -= 1) {
    const candidate = new Date(prices[i].date);
    if (candidate <= target) {
      return prices[i];
    }
  }
  return null;
}

function calculatePercentChange(latestClose: number, referenceClose: number): number | null {
  if (referenceClose === 0) return null;
  return ((latestClose - referenceClose) / referenceClose) * 100;
}
