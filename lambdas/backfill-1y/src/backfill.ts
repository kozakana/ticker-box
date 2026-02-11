import { fetchOhlcHistory } from "../../price-ingest/src/provider";

export async function backfillOneYear(symbol: string): Promise<void> {
  await fetchOhlcHistory(symbol);
}
