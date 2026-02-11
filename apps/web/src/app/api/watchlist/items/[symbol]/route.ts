import { NextResponse } from "next/server";
import { removeFromWatchlist } from "../../../../../services/watchlistStore";

type Params = {
  params: {
    symbol: string;
  };
};

export async function DELETE(_request: Request, { params }: Params) {
  const symbol = params.symbol?.toUpperCase();
  if (!symbol) {
    return NextResponse.json({ error: "symbol is required" }, { status: 400 });
  }

  const removed = removeFromWatchlist(symbol);
  if (!removed) {
    return NextResponse.json({ error: "symbol not found" }, { status: 404 });
  }

  return new NextResponse(null, { status: 204 });
}
