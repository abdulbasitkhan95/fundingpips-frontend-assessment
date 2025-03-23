"use client"

import { useState } from "react"
import { ArrowUp, ArrowDown, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useStockStore } from "@/hooks/use-stock-store"
import { cn } from "@/lib/utils"
import type { Stock } from "@/lib/types"
import { useToast } from "@/hooks/use-toast"

interface StockHeaderProps {
  stock: Stock
}

export function StockHeader({ stock }: StockHeaderProps) {
  const { watchlist, addToWatchlist, removeFromWatchlist } = useStockStore()
  const { toast } = useToast()
  const [isWatched, setIsWatched] = useState(watchlist.some((item) => item.symbol === stock.symbol))

  const handleWatchlistToggle = () => {
    if (isWatched) {
      removeFromWatchlist(stock.symbol)
      setIsWatched(false)
      toast({
        title: "Removed from watchlist",
        description: `${stock.symbol} has been removed from your watchlist`,
      })
    } else {
      addToWatchlist(stock)
      setIsWatched(true)
      toast({
        title: "Added to watchlist",
        description: `${stock.symbol} has been added to your watchlist`,
      })
    }
  }

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-3xl font-bold">{stock.symbol}</h1>
          <Button variant="ghost" size="icon" onClick={handleWatchlistToggle}>
            <Star className={cn("h-5 w-5", isWatched ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground")} />
            <span className="sr-only">{isWatched ? "Remove from watchlist" : "Add to watchlist"}</span>
          </Button>
        </div>
        <p className="text-lg text-muted-foreground">{stock.name}</p>
      </div>

      <div className="flex flex-col items-start md:items-end">
        <div className="text-3xl font-bold">${stock.price.toFixed(2)}</div>
        <div
          className={cn(
            "flex items-center text-lg",
            stock.change >= 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400",
          )}
        >
          {stock.change >= 0 ? <ArrowUp className="h-4 w-4 mr-1" /> : <ArrowDown className="h-4 w-4 mr-1" />}
          {stock.change.toFixed(2)} ({stock.changePercent.toFixed(2)}%)
        </div>
      </div>
    </div>
  )
}

