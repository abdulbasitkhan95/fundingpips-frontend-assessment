import Link from "next/link"
import { getTrendingStocks } from "@/lib/stock-api"
import { StockCard } from "@/components/stock-card"
import { Card, CardContent } from "@/components/ui/card"
import { AlertCircle } from "lucide-react"

interface StockListProps {
  type: "trending" | "gainers" | "losers"
}

export async function StockList({ type }: StockListProps) {
  try {
    const stocks = await getTrendingStocks(type)

    if (!stocks.length) {
      return (
        <Card>
          <CardContent className="p-6">
            <p className="text-center text-muted-foreground">No stocks available</p>
          </CardContent>
        </Card>
      )
    }

    return (
      <div className="space-y-4">
        {stocks.map((stock) => (
          <Link key={stock.symbol} href={`/stock/${stock.symbol}`}>
            <StockCard stock={stock} />
          </Link>
        ))}
      </div>
    )
  } catch (error) {
    console.error("Error in StockList:", error)
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-2 justify-center text-destructive">
            <AlertCircle size={18} />
            <p>Failed to load stock data. Please try again later.</p>
          </div>
        </CardContent>
      </Card>
    )
  }
}

