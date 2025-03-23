"use client"

import { createContext, useContext, type ReactNode } from "react"
import { useStockStore } from "@/hooks/use-stock-store"

interface StockContextType {
  watchlist: ReturnType<typeof useStockStore>["watchlist"]
  addToWatchlist: ReturnType<typeof useStockStore>["addToWatchlist"]
  removeFromWatchlist: ReturnType<typeof useStockStore>["removeFromWatchlist"]
  recentSearches: ReturnType<typeof useStockStore>["recentSearches"]
  addRecentSearch: ReturnType<typeof useStockStore>["addRecentSearch"]
}

const StockContext = createContext<StockContextType | undefined>(undefined)

export function StockProvider({ children }: { children: ReactNode }) {
  const { watchlist, addToWatchlist, removeFromWatchlist, recentSearches, addRecentSearch } = useStockStore()

  return (
    <StockContext.Provider
      value={{
        watchlist,
        addToWatchlist,
        removeFromWatchlist,
        recentSearches,
        addRecentSearch,
      }}
    >
      {children}
    </StockContext.Provider>
  )
}

export function useStock() {
  const context = useContext(StockContext)
  if (context === undefined) {
    throw new Error("useStock must be used within a StockProvider")
  }
  return context
}

