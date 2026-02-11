export type SortKey = "1d" | "1w" | "1m" | "3m" | "6m" | "1y" | "ytd";

export type AddInstrumentInput = {
  symbol: string;
  name: string;
  type: "stock" | "index";
};
