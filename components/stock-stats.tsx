import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { Stock } from "@/lib/types"

interface StockStatsProps {
  stock: Stock
}

export default function StockStats({ stock }: StockStatsProps) {
  const safeNumber = (value: number) => {
    return isNaN(value) || !isFinite(value) ? 0 : value
  }

  const stats = [
    { name: "Open", value: `$${safeNumber(stock.open).toFixed(2)}` },
    { name: "High", value: `$${safeNumber(stock.high).toFixed(2)}` },
    { name: "Low", value: `$${safeNumber(stock.low).toFixed(2)}` },
    { name: "Previous Close", value: `$${safeNumber(stock.previousClose).toFixed(2)}` },
    { name: "Volume", value: safeNumber(stock.volume).toLocaleString() },
    { name: "Market Cap", value: `$${(safeNumber(stock.marketCap) / 1000000000).toFixed(2)}B` },
    { name: "P/E Ratio", value: safeNumber(stock.peRatio).toFixed(2) },
    { name: "52 Week High", value: `$${safeNumber(stock.yearHigh).toFixed(2)}` },
    { name: "52 Week Low", value: `$${safeNumber(stock.yearLow).toFixed(2)}` },
    { name: "Dividend Yield", value: `${(safeNumber(stock.dividendYield) * 100).toFixed(2)}%` },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Key Statistics</CardTitle>
        <CardDescription>Important financial metrics for {stock.symbol}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {stats.map((stat) => (
            <div key={stat.name} className="p-4 border rounded-lg">
              <div className="text-sm text-muted-foreground">{stat.name}</div>
              <div className="text-lg font-semibold mt-1">{stat.value}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

