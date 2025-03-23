"use client"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useDebounce } from "@/hooks/use-debounce"
import { useStockStore } from "@/hooks/use-stock-store"
import type { StockSearchResult } from "@/lib/types"

export function SearchBar() {
  const router = useRouter()
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<StockSearchResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const debouncedQuery = useDebounce(query, 300)
  const inputRef = useRef<HTMLInputElement>(null)
  const resultsRef = useRef<HTMLDivElement>(null)
  const { recentSearches, addRecentSearch } = useStockStore()

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        resultsRef.current &&
        !resultsRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  useEffect(() => {
    if (debouncedQuery.length < 2) {
      setResults([])
      setError(null)
      return
    }

    const searchStocks = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const response = await fetch(`/api/search?q=${encodeURIComponent(debouncedQuery)}`)
        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error || "Search failed")
        }
        const data = await response.json()
        setResults(data)
        setIsOpen(true)
      } catch (error) {
        console.error("Search error:", error)
        setResults([])
        setError("Unable to search at this time. Please try again later.")
      } finally {
        setIsLoading(false)
      }
    }

    searchStocks()
  }, [debouncedQuery])

  const handleSelectStock = (stock: StockSearchResult) => {
    addRecentSearch(stock)
    router.push(`/stock/${stock.symbol}`)
    setQuery("")
    setResults([])
    setIsOpen(false)
    setError(null)
  }

  const clearSearch = () => {
    setQuery("")
    setResults([])
    setError(null)
    inputRef.current?.focus()
  }

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className="relative flex items-center">
        <Search className="absolute left-3 h-5 w-5 text-muted-foreground" />
        <Input
          ref={inputRef}
          type="text"
          placeholder="Search for stocks by name or symbol..."
          className="pl-10 pr-10"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => {
            if (results.length > 0 || recentSearches.length > 0) {
              setIsOpen(true)
            }
          }}
        />
        {query && (
          <Button variant="ghost" size="icon" className="absolute right-0 h-full" onClick={clearSearch}>
            <X className="h-4 w-4" />
            <span className="sr-only">Clear search</span>
          </Button>
        )}
      </div>

      {isOpen && (
        <div
          ref={resultsRef}
          className="absolute z-10 w-full mt-1 bg-background border rounded-md shadow-lg max-h-80 overflow-y-auto"
        >
          {isLoading ? (
            <div className="p-4 text-center text-muted-foreground">Loading...</div>
          ) : error ? (
            <div className="p-4 text-center text-destructive">{error}</div>
          ) : results.length > 0 ? (
            <ul>
              {results.map((stock) => (
                <li
                  key={stock.symbol}
                  className="px-4 py-2 hover:bg-muted cursor-pointer"
                  onClick={() => handleSelectStock(stock)}
                >
                  <div className="font-medium">{stock.symbol}</div>
                  <div className="text-sm text-muted-foreground">{stock.name}</div>
                </li>
              ))}
            </ul>
          ) : query.length >= 2 ? (
            <div className="p-4 text-center text-muted-foreground">
              No results found. Try searching for popular stocks like AAPL, MSFT, or GOOGL.
            </div>
          ) : recentSearches.length > 0 ? (
            <div>
              <div className="px-4 py-2 text-sm font-medium text-muted-foreground">Recent Searches</div>
              <ul>
                {recentSearches.slice(0, 5).map((stock) => (
                  <li
                    key={stock.symbol}
                    className="px-4 py-2 hover:bg-muted cursor-pointer"
                    onClick={() => handleSelectStock(stock)}
                  >
                    <div className="font-medium">{stock.symbol}</div>
                    <div className="text-sm text-muted-foreground">{stock.name}</div>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      )}
    </div>
  )
}

