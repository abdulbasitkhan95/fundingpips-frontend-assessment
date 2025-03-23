export interface Stock {
  symbol: string
  name: string
  price: number
  change: number
  changePercent: number
  previousClose: number
  open: number
  dayHigh: number
  dayLow: number
  yearHigh: number
  yearLow: number
  marketCap: number
  volume: number
  avgVolume: number
  pe: number
  dividendYield: number
}

export interface StockSearchResult {
  symbol: string
  name: string
  exchange?: string
}

export interface HistoricalDataPoint {
  date: string
  open: number
  high: number
  low: number
  close: number
  volume: number
}

export interface NewsItem {
  id: string
  title: string
  summary: string
  url: string
  source: string
  publishedAt: string
}

export interface MarketIndex {
  symbol: string
  name: string
  price: number
  change: number
  changePercent: number
}

