import { Card, CardContent } from "@/components/ui/card"
import type { Stock } from "@/lib/types"

interface StockStatsProps {
  stock: Stock
}

export function StockStats({ stock }: StockStatsProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-4">
          <StatItem label="Open" value={`$${stock.open.toFixed(2)}`} />
          <StatItem label="Previous Close" value={`$${stock.previousClose.toFixed(2)}`} />
          <StatItem label="Day Range" value={`$${stock.dayLow.toFixed(2)} - $${stock.dayHigh.toFixed(2)}`} />
          <StatItem label="52 Week Range" value={`$${stock.yearLow.toFixed(2)} - $${stock.yearHigh.toFixed(2)}`} />
          <StatItem label="Market Cap" value={formatMarketCap(stock.marketCap)} />
          <StatItem label="Volume" value={formatNumber(stock.volume)} />
          <StatItem label="Avg Volume" value={formatNumber(stock.avgVolume)} />
          <StatItem label="P/E Ratio" value={stock.pe.toFixed(2)} />
          <StatItem label="Dividend Yield" value={`${stock.dividendYield.toFixed(2)}%`} />
        </div>
      </CardContent>
    </Card>
  )
}

function StatItem({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="flex justify-between">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  )
}

function formatMarketCap(value: number): string {
  if (value >= 1e12) {
    return `$${(value / 1e12).toFixed(2)}T`
  } else if (value >= 1e9) {
    return `$${(value / 1e9).toFixed(2)}B`
  } else if (value >= 1e6) {
    return `$${(value / 1e6).toFixed(2)}M`
  } else {
    return `$${value.toLocaleString()}`
  }
}

function formatNumber(value: number): string {
  if (value >= 1e9) {
    return `${(value / 1e9).toFixed(2)}B`
  } else if (value >= 1e6) {
    return `${(value / 1e6).toFixed(2)}M`
  } else if (value >= 1e3) {
    return `${(value / 1e3).toFixed(2)}K`
  } else {
    return value.toLocaleString()
  }
}

