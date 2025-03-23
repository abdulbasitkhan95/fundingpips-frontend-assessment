import Link from "next/link"
import { ArrowUp, ArrowDown, TrendingUp, BarChart3 } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getTrendingStocks } from "@/lib/stock-api"

export default async function TrendingStocks() {
  const trendingStocks = await getTrendingStocks()

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-semibold">Market Movers</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {trendingStocks.map((stock) => {
          const priceChange = stock.price - stock.previousClose
          const percentChange = (priceChange / stock.previousClose) * 100
          const isPositive = priceChange >= 0

          return (
            <Link href={`/stocks/${stock.symbol}`} key={stock.symbol}>
              <Card
                className={`hover:shadow-md transition-all duration-200 border-l-4 ${
                  isPositive ? "border-l-green-500" : "border-l-red-500"
                } h-full`}
              >
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{stock.symbol}</CardTitle>
                      <CardDescription className="line-clamp-1">{stock.name}</CardDescription>
                    </div>
                    <Badge variant={isPositive ? "default" : "destructive"} className="ml-2">
                      {isPositive ? "+" : ""}
                      {percentChange.toFixed(2)}%
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <div className="text-2xl font-bold">${stock.price.toFixed(2)}</div>
                    <div className={`flex items-center ${isPositive ? "text-green-500" : "text-red-500"}`}>
                      {isPositive ? <ArrowUp className="h-4 w-4 mr-1" /> : <ArrowDown className="h-4 w-4 mr-1" />}$
                      {Math.abs(priceChange).toFixed(2)}
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
                    <div className="flex flex-col">
                      <span className="text-muted-foreground">Volume</span>
                      <span>{(stock.volume / 1000000).toFixed(1)}M</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-muted-foreground">Market Cap</span>
                      <span>${(stock.marketCap / 1000000000).toFixed(1)}B</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-muted-foreground">P/E Ratio</span>
                      <span>{stock.peRatio.toFixed(2)}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-muted-foreground">52W Range</span>
                      <span>
                        ${stock.yearLow.toFixed(0)} - ${stock.yearHigh.toFixed(0)}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-center">
                    <BarChart3 className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Click for detailed analysis</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

