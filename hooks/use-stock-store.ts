"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { Stock, StockSearchResult } from "@/lib/types"

interface StockState {
  watchlist: Stock[]
  recentSearches: StockSearchResult[]
  addToWatchlist: (stock: Stock) => void
  removeFromWatchlist: (symbol: string) => void
  addRecentSearch: (stock: StockSearchResult) => void
}

export const useStockStore = create<StockState>()(
  persist(
    (set) => ({
      watchlist: [],
      recentSearches: [],

      addToWatchlist: (stock) =>
        set((state) => {
          if (state.watchlist.some((item) => item.symbol === stock.symbol)) {
            return state
          }
          return { watchlist: [...state.watchlist, stock] }
        }),

      removeFromWatchlist: (symbol) =>
        set((state) => ({
          watchlist: state.watchlist.filter((stock) => stock.symbol !== symbol),
        })),

      addRecentSearch: (stock) =>
        set((state) => {
          const filtered = state.recentSearches.filter((item) => item.symbol !== stock.symbol)
          return {
            recentSearches: [stock, ...filtered].slice(0, 10),
          }
        }),
    }),
    {
      name: "stock-storage",
    },
  ),
)

