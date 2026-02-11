import type { OhlcBar } from "./provider";
import type { LambdaConfig } from "./config";

export async function writePriceHistory(
  config: LambdaConfig,
  symbol: string,
  bars: OhlcBar[]
): Promise<void> {
  void config;
  void symbol;
  void bars;
}
