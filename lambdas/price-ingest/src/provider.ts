export type OhlcBar = {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
};

export async function fetchOhlcHistory(symbol: string): Promise<OhlcBar[]> {
  void symbol;
  return [];
}
