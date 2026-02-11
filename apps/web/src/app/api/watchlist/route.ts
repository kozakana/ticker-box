import { NextResponse } from "next/server";
import {
  buildWatchlistResponse,
  type Instrument,
  type PriceBar,
} from "../../../services/watchlistComparisons";

type WatchlistSeedItem = {
  instrument: Instrument;
  prices: PriceBar[];
};

const SAMPLE_ITEMS: WatchlistSeedItem[] = [
  {
    instrument: {
      id: "inst_001",
      symbol: "AAPL",
      name: "Apple Inc.",
      type: "stock",
      status: "active",
    },
    prices: [
      { date: "2025-12-01", open: 188, high: 192, low: 186, close: 190 },
      { date: "2025-12-15", open: 191, high: 196, low: 189, close: 195 },
      { date: "2026-01-02", open: 196, high: 200, low: 194, close: 198 },
      { date: "2026-01-15", open: 198, high: 205, low: 197, close: 203 },
      { date: "2026-02-01", open: 203, high: 210, low: 201, close: 208 },
      { date: "2026-02-10", open: 208, high: 212, low: 206, close: 210 },
    ],
  },
  {
    instrument: {
      id: "inst_002",
      symbol: "SPX",
      name: "S&P 500",
      type: "index",
      status: "active",
    },
    prices: [
      { date: "2025-12-01", open: 4620, high: 4680, low: 4600, close: 4660 },
      { date: "2025-12-15", open: 4660, high: 4720, low: 4640, close: 4705 },
      { date: "2026-01-02", open: 4710, high: 4780, low: 4690, close: 4760 },
      { date: "2026-01-15", open: 4760, high: 4820, low: 4730, close: 4795 },
      { date: "2026-02-01", open: 4795, high: 4880, low: 4770, close: 4860 },
      { date: "2026-02-10", open: 4860, high: 4920, low: 4840, close: 4905 },
    ],
  },
];

export async function GET() {
  const watchlist = buildWatchlistResponse({
    id: "watchlist_default",
    name: "My Watchlist",
    sort_key: "1d",
    items: SAMPLE_ITEMS,
  });

  return NextResponse.json(watchlist);
}
