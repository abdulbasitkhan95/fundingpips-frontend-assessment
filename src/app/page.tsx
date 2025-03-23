import { Suspense } from "react"
import { SearchBar } from "@/components/search-bar"
import { StockList } from "@/components/stock-list"
import { WatchlistSection } from "@/components/watchlist-section"
import { MarketOverview } from "@/components/market-overview"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6 text-primary">FundingPips</h1>

      <SearchBar />

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Tabs defaultValue="market" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="market">Market Overview</TabsTrigger>
              <TabsTrigger value="trending">Trending</TabsTrigger>
            </TabsList>
            <TabsContent value="market">
              <Suspense fallback={<MarketOverviewSkeleton />}>
                <MarketOverview />
              </Suspense>
            </TabsContent>
            <TabsContent value="trending">
              <Suspense fallback={<StockListSkeleton />}>
                <StockList type="trending" />
              </Suspense>
            </TabsContent>
          </Tabs>
        </div>

        <div className="lg:col-span-1">
          <h2 className="text-2xl font-semibold mb-4">Your Watchlist</h2>
          <WatchlistSection />
        </div>
      </div>
    </main>
  )
}

function MarketOverviewSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-[200px] w-full rounded-lg" />
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {[...Array(6)].map((_, i) => (
          <Skeleton key={i} className="h-24 rounded-lg" />
        ))}
      </div>
    </div>
  )
}

function StockListSkeleton() {
  return (
    <div className="space-y-4">
      {[...Array(5)].map((_, i) => (
        <Skeleton key={i} className="h-20 w-full rounded-lg" />
      ))}
    </div>
  )
}

