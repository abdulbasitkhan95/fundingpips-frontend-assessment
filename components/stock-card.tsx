"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { ArrowUp, ArrowDown, Star } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useStockStore } from "@/hooks/use-stock-store"
import { cn } from "@/lib/utils"
import type { Stock } from "@/lib/types"
import { useToast } from "@/hooks/use-toast"

interface StockCardProps {
  stock: Stock
  showWatchlistButton?: boolean
}

export function StockCard({ stock, showWatchlistButton = true }: StockCardProps) {
  const { watchlist, addToWatchlist, removeFromWatchlist } = useStockStore()
  const { toast } = useToast()
  const [currentPrice, setCurrentPrice] = useState(stock.price)
  const [previousPrice, setPreviousPrice] = useState(stock.price)
  const [isWatched, setIsWatched] = useState(false)

  useEffect(() => {
    setIsWatched(watchlist.some((item) => item.symbol === stock.symbol))
  }, [watchlist, stock.symbol])

  useEffect(() => {
    if (stock.price !== currentPrice) {
      setPreviousPrice(currentPrice)
      setCurrentPrice(stock.price)
    }
  }, [stock.price, currentPrice])

  useEffect(() => {
    
    const interval = setInterval(
      () => {
        const change = (Math.random() - 0.5) * 2
        const newPrice = Number.parseFloat((stock.price + change).toFixed(2))
        stock.price = newPrice
        stock.change = Number.parseFloat((newPrice - stock.previousClose).toFixed(2))
        stock.changePercent = Number.parseFloat(((stock.change / stock.previousClose) * 100).toFixed(2))
        setCurrentPrice(newPrice)
      },
      5000 + Math.random() * 5000,
    ) 

    return () => clearInterval(interval)
  }, [stock])

  const handleWatchlistToggle = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (isWatched) {
      removeFromWatchlist(stock.symbol)
      toast({
        title: "Removed from watchlist",
        description: `${stock.symbol} has been removed from your watchlist`,
      })
    } else {
      addToWatchlist(stock)
      toast({
        title: "Added to watchlist",
        description: `${stock.symbol} has been added to your watchlist`,
      })
    }
  }

  const priceChanged = previousPrice !== currentPrice
  const priceIncreased = currentPrice > previousPrice

  return (
    <Card
      className={cn(
        "transition-all duration-200 hover:shadow-md",
        priceChanged && (priceIncreased ? "bg-green-50 dark:bg-green-950/20" : "bg-red-50 dark:bg-red-950/20"),
      )}
    >
      <CardContent className="p-4 flex justify-between items-center">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="font-bold">{stock.symbol}</h3>
            <span className="text-sm text-muted-foreground">{stock.name}</span>
          </div>
        </div>

        <div className="flex flex-col items-end">
          <div className="text-lg font-semibold">${currentPrice.toFixed(2)}</div>
          <div
            className={cn(
              "flex items-center text-sm",
              stock.change >= 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400",
            )}
          >
            {stock.change >= 0 ? <ArrowUp className="h-3 w-3 mr-1" /> : <ArrowDown className="h-3 w-3 mr-1" />}
            {stock.change.toFixed(2)} ({stock.changePercent.toFixed(2)}%)
          </div>
        </div>

        {showWatchlistButton && (
          <Button variant="ghost" size="icon" className="ml-2" onClick={handleWatchlistToggle}>
            <Star className={cn("h-5 w-5", isWatched ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground")} />
            <span className="sr-only">{isWatched ? "Remove from watchlist" : "Add to watchlist"}</span>
          </Button>
        )}
      </CardContent>
    </Card>
  )
}

