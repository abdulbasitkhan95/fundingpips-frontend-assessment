"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { searchStocks } from "@/lib/stock-api"
import type { SearchResult } from "@/lib/types"

export default function StockSearch() {
  const router = useRouter()
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<SearchResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [showResults, setShowResults] = useState(false)

  useEffect(() => {
    if (!query || query.length < 2) {
      setResults([])
      setIsLoading(false)
      return
    }

    const fetchResults = async () => {
      setIsLoading(true)
      try {
        const searchResults = await searchStocks(query)
        setResults(searchResults)
      } catch (error) {
        console.error("Failed to search stocks:", error)
        setResults([])
      } finally {
        setIsLoading(false)
      }
    }

    const debounceTimer = setTimeout(fetchResults, 300)
    return () => clearTimeout(debounceTimer)
  }, [query])

  const handleSelect = (symbol: string) => {
    setShowResults(false)
    router.push(`/stocks/${symbol}`)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim() && results.length > 0) {
      router.push(`/stocks/${results[0].symbol}`)
      setShowResults(false)
    }
  }

  return (
    <div className="relative">
      <form onSubmit={handleSubmit} className="flex w-full max-w-sm items-center space-x-2">
        <div className="relative w-full">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground pointer-events-none" />
          <input
            type="text"
            placeholder="Search for a stock..."
            className="w-full pl-8 h-10 px-4 py-2 rounded-md border border-input bg-background text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              if (e.target.value.length > 1) {
                setShowResults(true)
              } else {
                setShowResults(false)
              }
            }}
            onClick={() => {
              if (query.length > 1) {
                setShowResults(true)
              }
            }}
          />
        </div>

        <Button type="submit">Search</Button>
      </form>

      {showResults && query.length > 1 && (
        <div className="absolute z-10 w-full max-w-sm mt-1 bg-background border rounded-md shadow-md">
          <div className="py-2">
            {isLoading ? (
              <div className="py-6 text-center text-sm">Loading...</div>
            ) : results.length === 0 ? (
              <div className="py-6 text-center text-sm">No stocks found.</div>
            ) : (
              <div>
                <div className="px-2 py-1.5 text-sm font-semibold">Stocks</div>
                {results.map((stock) => (
                  <div
                    key={stock.symbol}
                    className="flex items-center justify-between px-2 py-1.5 text-sm cursor-pointer hover:bg-muted rounded-sm"
                    onClick={() => handleSelect(stock.symbol)}
                  >
                    <div>
                      <div className="font-medium">{stock.symbol}</div>
                      <div className="text-sm text-muted-foreground">{stock.name}</div>
                    </div>
                    {stock.exchange && <div className="text-xs text-muted-foreground">{stock.exchange}</div>}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

