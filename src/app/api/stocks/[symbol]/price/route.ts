import { NextResponse } from "next/server"
import { getStockPrice } from "@/lib/stock-api"

export async function GET(request: Request, { params }: { params: { symbol: string } }) {
  const { symbol } = params

  if (!symbol) {
    return NextResponse.json({ error: "Symbol is required" }, { status: 400 })
  }

  try {
    const price = await getStockPrice(symbol)
    return NextResponse.json(price)
  } catch (error) {
    console.error(`Error fetching price for ${symbol}:`, error)
    return NextResponse.json({ error: `Failed to fetch price for ${symbol}` }, { status: 500 })
  }
}

