import { NextResponse } from "next/server"
import { searchStocks } from "@/lib/stock-api"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get("q")

  if (!query) {
    return NextResponse.json({ error: "Query parameter is required" }, { status: 400 })
  }

  try {
    const results = await searchStocks(query)
    return NextResponse.json(results)
  } catch (error) {
    console.error("Search error:", error)

    if (error.message === "API call limit reached") {
      return NextResponse.json(
        { error: "Search is temporarily unavailable due to API rate limits. Please try again later." },
        { status: 429 },
      )
    }

    return NextResponse.json({ error: "Failed to search stocks. Please try again later." }, { status: 500 })
  }
}

