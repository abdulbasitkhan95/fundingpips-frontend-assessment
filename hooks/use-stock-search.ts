"use client"

import { useState, useEffect } from "react"
import { searchStocks } from "@/lib/stock-api"
import type { SearchResult } from "@/lib/types"

export function useStockSearch(query: string) {
  const [results, setResults] = useState<SearchResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!query || query.length < 2) {
      setResults([])
      setError(null)
      setIsLoading(false)
      return
    }

    const fetchResults = async () => {
      setIsLoading(true)
      setError(null)

      try {
        console.log("Fetching search results for:", query)
        const searchResults = await searchStocks(query)
        console.log("Search results:", searchResults)
        setResults(searchResults)
      } catch (error) {
        console.error("Failed to search stocks:", error)
        setError("Failed to search stocks")
        setResults([])
      } finally {
        setIsLoading(false)
      }
    }

    const debounceTimer = setTimeout(fetchResults, 300)
    return () => clearTimeout(debounceTimer)
  }, [query])

  return { results, isLoading, error }
}

