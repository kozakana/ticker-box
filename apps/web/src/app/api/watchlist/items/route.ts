import { NextResponse } from "next/server";
import { addToWatchlist } from "../../../../services/watchlistStore";
import { registerInstrument } from "../../../../services/instrumentStore";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body || typeof body.symbol !== "string" || typeof body.name !== "string" || typeof body.type !== "string") {
    return NextResponse.json({ error: "symbol, name, and type are required" }, { status: 400 });
  }

  if (body.type !== "stock" && body.type !== "index") {
    return NextResponse.json({ error: "type must be stock or index" }, { status: 400 });
  }

  const { instrument } = registerInstrument({
    symbol: body.symbol.toUpperCase(),
    name: body.name,
    type: body.type,
  });

  const result = addToWatchlist(instrument);
  if (!result.ok) {
    return NextResponse.json({ error: "duplicate symbol" }, { status: 409 });
  }

  return NextResponse.json({ items: result.items }, { status: 201 });
}
