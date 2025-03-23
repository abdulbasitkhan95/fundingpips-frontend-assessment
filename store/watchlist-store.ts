"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { Stock } from "@/lib/types"

interface WatchlistState {
  watchlist: Stock[]
  addToWatchlist: (stock: Stock) => void
  removeFromWatchlist: (symbol: string) => void
  isInWatchlist: (symbol: string) => boolean
}

export const useWatchlistStore = create<WatchlistState>()(
  persist(
    (set, get) => ({
      watchlist: [],

      addToWatchlist: (stock) => {
        const { watchlist } = get()
        const isAlreadyInWatchlist = watchlist.some((item) => item.symbol === stock.symbol)

        if (!isAlreadyInWatchlist) {
          set({ watchlist: [...watchlist, stock] })
        }
      },

      removeFromWatchlist: (symbol) => {
        const { watchlist } = get()
        set({ watchlist: watchlist.filter((stock) => stock.symbol !== symbol) })
      },

      isInWatchlist: (symbol) => {
        const { watchlist } = get()
        return watchlist.some((stock) => stock.symbol === symbol)
      },
    }),
    {
      name: "stock-tracker-watchlist",
    },
  ),
)

