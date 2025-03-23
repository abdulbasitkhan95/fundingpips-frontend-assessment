import { Suspense } from "react"
import { notFound } from "next/navigation"
import { getStockDetails } from "@/lib/stock-api"
import StockHeader from "@/components/stock-header"
import PriceChart from "@/components/price-chart"
import StockStats from "@/components/stock-stats"
import StockNews from "@/components/stock-news"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export async function generateMetadata({ params }: { params: Promise<{ symbol: string }> }) {
  const { symbol } = await params

  try {
    const stock = await getStockDetails(symbol)
    return {
      title: `${stock.name} (${stock.symbol}) - Stock Tracker`,
      description: `View stock data for ${stock.name} (${stock.symbol})`,
    }
  } catch (error) {
    return {
      title: "Stock Not Found - Stock Tracker",
      description: "The requested stock could not be found",
    }
  }
}

export default async function StockPage({ params }: { params: Promise<{ symbol: string }> }) {
  const { symbol } = await params

  try {
    const stock = await getStockDetails(symbol)

    return (
      <main className="container mx-auto p-4 max-w-7xl">
        <StockHeader stock={stock} />

        <div className="mt-8">
          <Suspense fallback={<div className="h-96 flex items-center justify-center">Loading chart...</div>}>
            <PriceChart symbol={symbol} />
          </Suspense>
        </div>

        <Tabs defaultValue="stats" className="mt-8">
          <TabsList>
            <TabsTrigger value="stats">Stats</TabsTrigger>
            <TabsTrigger value="news">News</TabsTrigger>
          </TabsList>
          <TabsContent value="stats" className="mt-4">
            <StockStats stock={stock} />
          </TabsContent>
          <TabsContent value="news" className="mt-4">
            <Suspense fallback={<div className="h-96 flex items-center justify-center">Loading news...</div>}>
              <StockNews symbol={symbol} />
            </Suspense>
          </TabsContent>
        </Tabs>
      </main>
    )
  } catch (error) {
    notFound()
  }
}

