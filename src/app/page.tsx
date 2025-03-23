import { Suspense } from "react"
import StockSearch from "@/components/stock-search"
import WatchlistSection from "@/components/watchlist-section"
import TrendingStocks from "@/components/trending-stocks"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function HomePage() {
  return (
    <main className="container mx-auto p-4 max-w-7xl">
      <h1 className="text-3xl font-bold mb-6">Funding Pips</h1>

      <StockSearch />

      <Tabs defaultValue="trending" className="mt-8">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="watchlist">My Watchlist</TabsTrigger>
          <TabsTrigger value="trending">Trending</TabsTrigger>
        </TabsList>
        <TabsContent value="watchlist" className="mt-4">
          <Suspense fallback={<div className="h-96 flex items-center justify-center">Loading watchlist...</div>}>
            <WatchlistSection />
          </Suspense>
        </TabsContent>
        <TabsContent value="trending" className="mt-4">
          <Suspense fallback={<div className="h-96 flex items-center justify-center">Loading trending stocks...</div>}>
            <TrendingStocks />
          </Suspense>
        </TabsContent>
      </Tabs>
    </main>
  )
}

