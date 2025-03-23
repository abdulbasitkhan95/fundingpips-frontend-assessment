"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowUp, ArrowDown } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useWatchlistStore } from "@/store/watchlist-store"
import { getLatestPrices } from "@/lib/stock-api"
import type { Stock } from "@/lib/types"

export default function WatchlistSection() {
  const { watchlist, removeFromWatchlist } = useWatchlistStore()
  const [stocks, setStocks] = useState<Stock[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchLatestPrices = async () => {
      if (watchlist.length === 0) {
        setStocks([])
        setIsLoading(false)
        return
      }

      setIsLoading(true)
      try {
        const symbols = watchlist.map((stock) => stock.symbol)
        const latestPrices = await getLatestPrices(symbols)

        const updatedStocks = symbols
          .map((symbol) => {
            const latestData = latestPrices.find((item) => item.symbol === symbol)
            const watchlistData = watchlist.find((item) => item.symbol === symbol)

            return latestData || watchlistData
          })
          .filter(Boolean) as Stock[]

        setStocks(updatedStocks)
      } catch (error) {
        console.error("Failed to fetch latest prices:", error)
        setStocks(watchlist)
      } finally {
        setIsLoading(false)
      }
    }

    fetchLatestPrices()
  }, [watchlist])

  if (isLoading) {
    return <div className="h-96 flex items-center justify-center">Loading watchlist...</div>
  }

  if (stocks.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>My Watchlist</CardTitle>
          <CardDescription>Track your favorite stocks</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-10">
          <p className="text-muted-foreground mb-4">Your watchlist is empty.</p>
          <p className="text-sm text-muted-foreground mb-6">
            Search for stocks and add them to your watchlist to track them here.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>My Watchlist</CardTitle>
        <CardDescription>Track your favorite stocks</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4">Symbol</th>
                <th className="text-left py-3 px-4">Name</th>
                <th className="text-right py-3 px-4">Price</th>
                <th className="text-right py-3 px-4">Change</th>
                <th className="text-right py-3 px-4">% Change</th>
                <th className="text-right py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {stocks.map((stock) => {
                const priceChange = stock.price - stock.previousClose
                const percentChange = (priceChange / stock.previousClose) * 100
                const isPositive = priceChange >= 0

                return (
                  <tr key={stock.symbol} className="border-b hover:bg-muted/50">
                    <td className="py-3 px-4">
                      <Link href={`/stocks/${stock.symbol}`} className="font-medium hover:underline">
                        {stock.symbol}
                      </Link>
                    </td>
                    <td className="py-3 px-4 text-muted-foreground">{stock.name}</td>
                    <td className="py-3 px-4 text-right">${stock.price.toFixed(2)}</td>
                    <td className={`py-3 px-4 text-right ${isPositive ? "text-green-500" : "text-red-500"}`}>
                      <div className="flex items-center justify-end">
                        {isPositive ? <ArrowUp className="h-3 w-3 mr-1" /> : <ArrowDown className="h-3 w-3 mr-1" />}$
                        {Math.abs(priceChange).toFixed(2)}
                      </div>
                    </td>
                    <td className={`py-3 px-4 text-right ${isPositive ? "text-green-500" : "text-red-500"}`}>
                      {isPositive ? "+" : ""}
                      {percentChange.toFixed(2)}%
                    </td>
                    <td className="py-3 px-4 text-right">
                      <Button variant="ghost" size="sm" onClick={() => removeFromWatchlist(stock.symbol)}>
                        Remove
                      </Button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}

