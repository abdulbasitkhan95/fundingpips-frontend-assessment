import { getMarketIndices } from "@/lib/stock-api"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUp, ArrowDown, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"

export async function MarketOverview() {
  try {
    const indices = await getMarketIndices()

    if (!indices.length) {
      return (
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2 justify-center">
              <AlertCircle size={18} />
              <p className="text-muted-foreground">Market data unavailable</p>
            </div>
          </CardContent>
        </Card>
      )
    }

    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {indices.map((index) => (
            <Card key={index.symbol}>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">{index.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{index.price.toFixed(2)}</div>
                <div
                  className={cn(
                    "flex items-center text-sm",
                    index.change >= 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400",
                  )}
                >
                  {index.change >= 0 ? <ArrowUp className="h-3 w-3 mr-1" /> : <ArrowDown className="h-3 w-3 mr-1" />}
                  {index.change.toFixed(2)} ({index.changePercent.toFixed(2)}%)
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <MarketHeatmap />
      </div>
    )
  } catch (error) {
    console.error("Error in MarketOverview:", error)
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-2 justify-center text-destructive">
            <AlertCircle size={18} />
            <p>Failed to load market data. Please try again later.</p>
          </div>
        </CardContent>
      </Card>
    )
  }
}

async function MarketHeatmap() {
  const sectors = await getMarketSectors()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Market Heatmap</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
          {sectors.map((sector) => (
            <div
              key={sector.name}
              className={cn(
                "p-3 rounded-md",
                sector.performance > 1
                  ? "bg-green-100 dark:bg-green-900/30"
                  : sector.performance > 0
                    ? "bg-green-50 dark:bg-green-900/20"
                    : sector.performance > -1
                      ? "bg-red-50 dark:bg-red-900/20"
                      : "bg-red-100 dark:bg-red-900/30",
              )}
            >
              <div className="font-medium">{sector.name}</div>
              <div
                className={cn(
                  "text-sm",
                  sector.performance >= 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400",
                )}
              >
                {sector.performance.toFixed(2)}%
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

async function getMarketSectors() {
  return [
    { name: "Technology", performance: 1.24 },
    { name: "Healthcare", performance: 0.87 },
    { name: "Financials", performance: -0.32 },
    { name: "Consumer Discretionary", performance: 0.56 },
    { name: "Communication Services", performance: 1.45 },
    { name: "Industrials", performance: -0.78 },
    { name: "Energy", performance: -1.23 },
    { name: "Materials", performance: 0.12 },
    { name: "Utilities", performance: -0.45 },
    { name: "Real Estate", performance: -0.92 },
    { name: "Consumer Staples", performance: 0.34 },
  ]
}

