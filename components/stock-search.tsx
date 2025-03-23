"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useStockSearch } from "@/hooks/use-stock-search"
// Remove dropdown menu imports
// import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

export default function StockSearch() {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const { results, isLoading } = useStockSearch(query)

  const handleSelect = (symbol: string) => {
    setOpen(false)
    router.push(`/stocks/${symbol}`)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (query.trim() && results.length > 0) {
      router.push(`/stocks/${results[0].symbol}`)
      setOpen(false)
    }
  }

  return (
    <div className="relative">
      <form onSubmit={handleSubmit} className="flex w-full max-w-sm items-center space-x-2">
        <div className="relative w-full">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground pointer-events-none" />
          <Input
            type="text"
            placeholder="Search for a stock..."
            className="w-full pl-8"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              if (e.target.value.length > 1) {
                setOpen(true)
              } else {
                setOpen(false)
              }
            }}
            onClick={() => {
              if (query.length > 1) {
                setOpen(true)
              }
            }}
          />
        </div>

        {query.length > 1 && (
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger className="hidden">{/* Hidden trigger */}</PopoverTrigger>
            <PopoverContent className="w-[300px] p-0" align="start">
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
                        className="flex items-center justify-between px-2 py-1.5 text-sm cursor-pointer hover:bg-accent rounded-sm"
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
            </PopoverContent>
          </Popover>
        )}

        <Button type="submit">Search</Button>
      </form>
    </div>
  )
}

