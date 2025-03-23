import type { Stock, HistoricalDataPoint, NewsItem, SearchResult } from "./types"

// Mock data for stocks
const mockStocks: Record<string, Stock> = {
  AAPL: {
    symbol: "AAPL",
    name: "Apple Inc.",
    price: 182.63,
    previousClose: 180.25,
    open: 180.42,
    high: 183.12,
    low: 179.89,
    volume: 58432100,
    marketCap: 2850000000000,
    peRatio: 28.5,
    yearHigh: 198.23,
    yearLow: 124.17,
    dividendYield: 0.0055,
  },
  MSFT: {
    symbol: "MSFT",
    name: "Microsoft Corporation",
    price: 415.32,
    previousClose: 410.17,
    open: 411.25,
    high: 416.78,
    low: 409.56,
    volume: 22145600,
    marketCap: 3090000000000,
    peRatio: 35.2,
    yearHigh: 420.82,
    yearLow: 275.37,
    dividendYield: 0.0072,
  },
  GOOGL: {
    symbol: "GOOGL",
    name: "Alphabet Inc.",
    price: 152.19,
    previousClose: 150.93,
    open: 151.02,
    high: 153.25,
    low: 150.76,
    volume: 18765400,
    marketCap: 1920000000000,
    peRatio: 26.4,
    yearHigh: 155.28,
    yearLow: 102.21,
    dividendYield: 0,
  },
  AMZN: {
    symbol: "AMZN",
    name: "Amazon.com, Inc.",
    price: 178.75,
    previousClose: 175.35,
    open: 176.12,
    high: 179.43,
    low: 175.82,
    volume: 32145700,
    marketCap: 1850000000000,
    peRatio: 61.2,
    yearHigh: 185.1,
    yearLow: 101.15,
    dividendYield: 0,
  },
  TSLA: {
    symbol: "TSLA",
    name: "Tesla, Inc.",
    price: 175.34,
    previousClose: 180.05,
    open: 179.12,
    high: 180.45,
    low: 174.56,
    volume: 98765400,
    marketCap: 557000000000,
    peRatio: 50.8,
    yearHigh: 299.29,
    yearLow: 138.8,
    dividendYield: 0,
  },
}

// Search for stocks by name or symbol
export async function searchStocks(query: string): Promise<SearchResult[]> {
  if (!query || query.length < 2) return []

  return Object.values(mockStocks)
    .filter(
      (stock) =>
        stock.symbol.toLowerCase().includes(query.toLowerCase()) ||
        stock.name.toLowerCase().includes(query.toLowerCase()),
    )
    .map((stock) => ({
      symbol: stock.symbol,
      name: stock.name,
      exchange: "US",
    }))
}

// Get stock details by symbol
export async function getStockDetails(symbol: string): Promise<Stock> {
  const upperSymbol = symbol.toUpperCase()
  return (
    mockStocks[upperSymbol] || {
      symbol: upperSymbol,
      name: `${upperSymbol} Stock`,
      price: 100,
      previousClose: 99,
      open: 99,
      high: 101,
      low: 98,
      volume: 1000000,
      marketCap: 1000000000,
      peRatio: 20,
      yearHigh: 110,
      yearLow: 90,
      dividendYield: 0.02,
    }
  )
}

// Get historical price data
export async function getHistoricalData(symbol: string, timeRange: string): Promise<HistoricalDataPoint[]> {
  const stock = await getStockDetails(symbol)
  const currentPrice = stock.price
  const data: HistoricalDataPoint[] = []

  // Generate 30 data points
  for (let i = 30; i >= 0; i--) {
    const timestamp = Date.now() - i * 24 * 60 * 60 * 1000
    const randomChange = (Math.random() - 0.5) * 0.05
    const price = currentPrice * (1 - i * 0.01) * (1 + randomChange)

    data.push({
      timestamp,
      price,
    })
  }

  return data
}

// Get latest news for a stock
export async function getStockNews(symbol: string): Promise<NewsItem[]> {
  const stock = await getStockDetails(symbol)

  return [
    {
      id: "1",
      title: `${stock.name} Reports Strong Quarterly Earnings`,
      summary: `${stock.name} exceeded analyst expectations with a 15% increase in revenue.`,
      url: "#",
      source: "Financial Times",
      publishedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      imageUrl: "/placeholder.svg?height=120&width=200",
    },
    {
      id: "2",
      title: `${stock.name} Announces New Product Line`,
      summary: `The company unveiled its latest innovations at the annual conference.`,
      url: "#",
      source: "Bloomberg",
      publishedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      imageUrl: "/placeholder.svg?height=120&width=200",
    },
    {
      id: "3",
      title: `${stock.name} Expands into New Markets`,
      summary: `The company is making strategic moves to capture market share in emerging economies.`,
      url: "#",
      source: "Reuters",
      publishedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      imageUrl: "/placeholder.svg?height=120&width=200",
    },
  ]
}

// Get latest prices for multiple stocks
export async function getLatestPrices(symbols: string[]): Promise<Stock[]> {
  return Promise.all(symbols.map((symbol) => getStockDetails(symbol)))
}

// Get trending stocks
export async function getTrendingStocks(): Promise<Stock[]> {
  const trendingSymbols = ["AAPL", "MSFT", "GOOGL", "AMZN", "TSLA"]
  return Promise.all(trendingSymbols.map((symbol) => getStockDetails(symbol)))
}

