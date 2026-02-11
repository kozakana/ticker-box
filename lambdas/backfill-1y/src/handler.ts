import { backfillOneYear } from "./backfill";

export async function handler(event: { symbol?: string } = {}): Promise<void> {
  if (!event.symbol) {
    return;
  }

  await backfillOneYear(event.symbol);
}
