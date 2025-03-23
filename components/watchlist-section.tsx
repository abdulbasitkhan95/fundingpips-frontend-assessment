"use client"

import { useStockStore } from "@/hooks/use-stock-store"
import { StockCard } from "@/components/stock-card"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"

export function WatchlistSection() {
  const { watchlist } = useStockStore()

  if (!watchlist.length) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <p className="text-muted-foreground mb-2">Your watchlist is empty</p>
          <p className="text-sm text-muted-foreground">
            Search for stocks and add them to your watchlist to track them here
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {watchlist.map((stock) => (
        <Link key={stock.symbol} href={`/stock/${stock.symbol}`}>
          <StockCard stock={stock} showWatchlistButton={true} />
        </Link>
      ))}
    </div>
  )
}

