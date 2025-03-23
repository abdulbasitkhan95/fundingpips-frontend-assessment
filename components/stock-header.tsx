"use client"

import { useState } from "react"
import { ArrowUp, ArrowDown, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useWatchlistStore } from "@/store/watchlist-store"
import type { Stock } from "@/lib/types"

interface StockHeaderProps {
  stock: Stock
}

export default function StockHeader({ stock }: StockHeaderProps) {
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlistStore()
  const [inWatchlist, setInWatchlist] = useState(isInWatchlist(stock.symbol))

  const handleWatchlistToggle = () => {
    if (inWatchlist) {
      removeFromWatchlist(stock.symbol)
    } else {
      addToWatchlist(stock)
    }
    setInWatchlist(!inWatchlist)
  }

  const price = isNaN(stock.price) ? 0 : stock.price
  const previousClose = isNaN(stock.previousClose) ? price : stock.previousClose

  const priceChange = price - previousClose
  const percentChange = previousClose > 0 ? (priceChange / previousClose) * 100 : 0
  const isPositive = priceChange >= 0

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between">
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-3xl font-bold">{stock.name}</h1>
          <span className="text-lg text-muted-foreground">{stock.symbol}</span>
        </div>
        <div className="flex items-center gap-2 mt-2">
          <span className="text-2xl font-semibold">${price.toFixed(2)}</span>
          <div className={`flex items-center ${isPositive ? "text-green-500" : "text-red-500"}`}>
            {isPositive ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}
            <span className="ml-1">
              ${Math.abs(priceChange).toFixed(2)} ({Math.abs(percentChange).toFixed(2)}%)
            </span>
          </div>
        </div>
      </div>

      <Button variant={inWatchlist ? "outline" : "default"} className="mt-4 md:mt-0" onClick={handleWatchlistToggle}>
        <Star className={`mr-2 h-4 w-4 ${inWatchlist ? "fill-primary" : ""}`} />
        {inWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
      </Button>
    </div>
  )
}

