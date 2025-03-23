import { Suspense } from "react"
import { notFound } from "next/navigation"
import { getStockDetails, getHistoricalData } from "@/lib/stock-api"
import { StockHeader } from "@/components/stock-header"
import { PriceChart } from "@/components/price-chart"
import { StockStats } from "@/components/stock-stats"
import { StockNews } from "@/components/stock-news"
import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"
import { AlertCircle } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export async function generateMetadata({ params }: { params: { symbol: string } }) {
  const { symbol } = params

  try {
    const stockDetails = await getStockDetails(symbol)
    return {
      title: `${stockDetails.name} (${stockDetails.symbol}) - Funding Pips`,
      description: `Real-time data and analysis for ${stockDetails.name} stock`,
    }
  } catch (error) {
    return {
      title: "Stock Details - Funding Pips",
      description: "View detailed stock information and analysis",
    }
  }
}

export default async function StockPage({ params }: { params: { symbol: string } }) {
  const { symbol } = params

  try {
    let stockDetails
    try {
      stockDetails = await getStockDetails(symbol)
    } catch (error) {
      console.error(`Error fetching stock details for ${symbol}:`, error)
      notFound()
    }

    return (
      <main className="container mx-auto px-4 py-8">
        <StockHeader stock={stockDetails} />

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Tabs defaultValue="1D" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="1D">1D</TabsTrigger>
                <TabsTrigger value="1W">1W</TabsTrigger>
                <TabsTrigger value="1M">1M</TabsTrigger>
                <TabsTrigger value="3M">3M</TabsTrigger>
                <TabsTrigger value="1Y">1Y</TabsTrigger>
                <TabsTrigger value="5Y">5Y</TabsTrigger>
              </TabsList>

              {["1D", "1W", "1M", "3M", "1Y", "5Y"].map((period) => (
                <TabsContent key={period} value={period}>
                  <Suspense fallback={<Skeleton className="h-[400px] w-full rounded-lg" />}>
                    <ChartContainer symbol={symbol} period={period} />
                  </Suspense>
                </TabsContent>
              ))}
            </Tabs>

            <div className="mt-8">
              <h2 className="text-2xl font-semibold mb-4">Latest News</h2>
              <Suspense fallback={<NewsSkeleton />}>
                <StockNews symbol={symbol} />
              </Suspense>
            </div>
          </div>

          <div className="lg:col-span-1">
            <h2 className="text-2xl font-semibold mb-4">Stats</h2>
            <StockStats stock={stockDetails} />
          </div>
        </div>
      </main>
    )
  } catch (error) {
    console.error(`Error in StockPage for ${symbol}:`, error)
    notFound()
  }
}

async function ChartContainer({ symbol, period }: { symbol: string; period: string }) {
  try {
    const historicalData = await getHistoricalData(symbol, period)

    if (historicalData.length === 0) {
      return (
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2 justify-center">
              <AlertCircle size={18} />
              <p className="text-muted-foreground">Historical data not available for this time period</p>
            </div>
          </CardContent>
        </Card>
      )
    }

    return <PriceChart data={historicalData} />
  } catch (error) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-2 justify-center text-destructive">
            <AlertCircle size={18} />
            <p>Failed to load chart data. Please try again later.</p>
          </div>
        </CardContent>
      </Card>
    )
  }
}

function NewsSkeleton() {
  return (
    <div className="space-y-4">
      {[...Array(3)].map((_, i) => (
        <Skeleton key={i} className="h-24 w-full rounded-lg" />
      ))}
    </div>
  )
}

