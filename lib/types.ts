export interface Stock {
  symbol: string
  name: string
  price: number
  previousClose: number
  open: number
  high: number
  low: number
  volume: number
  marketCap: number
  peRatio: number
  yearHigh: number
  yearLow: number
  dividendYield: number
}

export interface HistoricalDataPoint {
  timestamp: number
  price: number
  volume?: number
}

export interface NewsItem {
  id: string
  title: string
  summary: string
  url: string
  source: string
  publishedAt: string
  imageUrl?: string
}

export interface SearchResult {
  symbol: string
  name: string
  exchange?: string
}

