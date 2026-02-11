import { getConfig } from "./config";
import { fetchOhlcHistory } from "./provider";
import { writePriceHistory } from "./icebergWriter";

export async function handler(): Promise<void> {
  const config = getConfig();
  const symbols = ["AAPL", "SPX"]; // placeholder seed list

  for (const symbol of symbols) {
    const history = await fetchOhlcHistory(symbol);
    await writePriceHistory(config, symbol, history);
  }
}
