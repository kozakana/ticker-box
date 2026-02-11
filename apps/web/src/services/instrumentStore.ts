import type { Instrument, InstrumentStatus, InstrumentType } from "./watchlistComparisons";

type RegisterInput = {
  symbol: string;
  name: string;
  type: InstrumentType;
};

const instrumentRegistry = new Map<string, Instrument>();

export function getInstrument(symbol: string): Instrument | null {
  return instrumentRegistry.get(symbol) ?? null;
}

export function registerInstrument(input: RegisterInput): { instrument: Instrument; isNew: boolean } {
  const existing = instrumentRegistry.get(input.symbol);
  if (existing) {
    return { instrument: existing, isNew: false };
  }

  const instrument: Instrument = {
    id: `inst_${input.symbol.toLowerCase()}`,
    symbol: input.symbol,
    name: input.name,
    type: input.type,
    status: "active" as InstrumentStatus,
  };

  instrumentRegistry.set(input.symbol, instrument);
  void triggerBackfill(instrument);

  return { instrument, isNew: true };
}

async function triggerBackfill(instrument: Instrument): Promise<void> {
  // Placeholder for backfill trigger (e.g., enqueue Lambda/EventBridge).
  // For now, this is a no-op hook to be wired in Phase 2 infra.
  void instrument;
}
