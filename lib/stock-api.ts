import type { Stock, HistoricalDataPoint, NewsItem, SearchResult } from "./types"


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
  META: {
    symbol: "META",
    name: "Meta Platforms, Inc.",
    price: 485.58,
    previousClose: 480.32,
    open: 481.75,
    high: 487.98,
    low: 479.56,
    volume: 15678900,
    marketCap: 1240000000000,
    peRatio: 32.7,
    yearHigh: 490.23,
    yearLow: 274.38,
    dividendYield: 0,
  },
  NVDA: {
    symbol: "NVDA",
    name: "NVIDIA Corporation",
    price: 924.75,
    previousClose: 910.45,
    open: 912.34,
    high: 930.21,
    low: 908.76,
    volume: 42567800,
    marketCap: 2280000000000,
    peRatio: 68.5,
    yearHigh: 940.55,
    yearLow: 420.1,
    dividendYield: 0.0003,
  },
  JPM: {
    symbol: "JPM",
    name: "JPMorgan Chase & Co.",
    price: 198.43,
    previousClose: 195.67,
    open: 196.32,
    high: 199.54,
    low: 195.21,
    volume: 8765400,
    marketCap: 570000000000,
    peRatio: 12.1,
    yearHigh: 205.78,
    yearLow: 160.21,
    dividendYield: 0.0235,
  },
  V: {
    symbol: "V",
    name: "Visa Inc.",
    price: 275.32,
    previousClose: 272.45,
    open: 273.21,
    high: 276.87,
    low: 272.1,
    volume: 6543200,
    marketCap: 560000000000,
    peRatio: 30.8,
    yearHigh: 280.45,
    yearLow: 230.15,
    dividendYield: 0.0075,
  },
  WMT: {
    symbol: "WMT",
    name: "Walmart Inc.",
    price: 68.75,
    previousClose: 67.89,
    open: 68.12,
    high: 69.34,
    low: 67.76,
    volume: 9876500,
    marketCap: 520000000000,
    peRatio: 28.9,
    yearHigh: 70.45,
    yearLow: 52.1,
    dividendYield: 0.0125,
  },
}


const mockHistoricalData: Record<string, HistoricalDataPoint[]> = {
  AAPL: [
    { timestamp: 1672531200000, price: 130.0 },
    { timestamp: 1672534800000, price: 132.5 },
    { timestamp: 1672538400000, price: 135.0 },
  ],
  MSFT: [
    { timestamp: 1672531200000, price: 250.0 },
    { timestamp: 1672534800000, price: 252.5 },
    { timestamp: 1672538400000, price: 255.0 },
  ],
  GOOGL: [
    { timestamp: 1672531200000, price: 90.0 },
    { timestamp: 1672534800000, price: 92.5 },
    { timestamp: 1672538400000, price: 95.0 },
  ],
  AMZN: [
    { timestamp: 1672531200000, price: 100.0 },
    { timestamp: 1672534800000, price: 102.5 },
    { timestamp: 1672538400000, price: 105.0 },
  ],
  TSLA: [
    { timestamp: 1672531200000, price: 200.0 },
    { timestamp: 1672534800000, price: 202.5 },
    { timestamp: 1672538400000, price: 205.0 },
  ],
  META: [
    { timestamp: 1672531200000, price: 150.0 },
    { timestamp: 1672534800000, price: 152.5 },
    { timestamp: 1672538400000, price: 155.0 },
  ],
  NVDA: [
    { timestamp: 1672531200000, price: 250.0 },
    { timestamp: 1672534800000, price: 252.5 },
    { timestamp: 1672538400000, price: 255.0 },
  ],
  JPM: [
    { timestamp: 1672531200000, price: 150.0 },
    { timestamp: 1672534800000, price: 152.5 },
    { timestamp: 1672538400000, price: 155.0 },
  ],
  V: [
    { timestamp: 1672531200000, price: 200.0 },
    { timestamp: 1672534800000, price: 202.5 },
    { timestamp: 1672538400000, price: 205.0 },
  ],
  WMT: [
    { timestamp: 1672531200000, price: 100.0 },
    { timestamp: 1672534800000, price: 102.5 },
    { timestamp: 1672538400000, price: 105.0 },
  ],
}

const mockNews: Record<string, NewsItem[]> = {
  AAPL: [
    {
      id: "1",
      title: "Apple Unveils New iPhone",
      summary: "Apple announces the latest iPhone with advanced features.",
      url: "https://example.com/apple-news",
      source: "Tech News",
      publishedAt: "2024-01-26T12:00:00Z",
      imageUrl: "https://example.com/apple-image.jpg",
    },
  ],
  MSFT: [
    {
      id: "2",
      title: "Microsoft Acquires AI Startup",
      summary: "Microsoft expands its AI capabilities with a new acquisition.",
      url: "https://example.com/microsoft-news",
      source: "Business Today",
      publishedAt: "2024-01-25T18:00:00Z",
      imageUrl: "https://example.com/microsoft-image.jpg",
    },
  ],
  GOOGL: [
    {
      id: "3",
      title: "Google Announces New Search Algorithm",
      summary: "Google updates its search algorithm for better results.",
      url: "https://example.com/google-news",
      source: "Search Engine Journal",
      publishedAt: "2024-01-24T10:00:00Z",
      imageUrl: "https://example.com/google-image.jpg",
    },
  ],
  AMZN: [
    {
      id: "4",
      title: "Amazon Reports Record Holiday Sales",
      summary: "Amazon sees a surge in sales during the holiday season.",
      url: "https://example.com/amazon-news",
      source: "Retail Dive",
      publishedAt: "2024-01-23T15:00:00Z",
      imageUrl: "https://example.com/amazon-image.jpg",
    },
  ],
  TSLA: [
    {
      id: "5",
      title: "Tesla Production Numbers Exceed Expectations",
      summary: "Tesla increases its production output, beating estimates.",
      url: "https://example.com/tesla-news",
      source: "Electrek",
      publishedAt: "2024-01-22T08:00:00Z",
      imageUrl: "https://example.com/tesla-image.jpg",
    },
  ],
  META: [
    {
      id: "6",
      title: "Meta Launches New VR Platform",
      summary: "Meta enters the VR market with a new platform release.",
      url: "https://example.com/meta-news",
      source: "The Verge",
      publishedAt: "2024-01-21T20:00:00Z",
      imageUrl: "https://example.com/meta-image.jpg",
    },
  ],
  NVDA: [
    {
      id: "7",
      title: "NVIDIA Announces New Graphics Card",
      summary: "NVIDIA releases a high-performance graphics card for gaming.",
      url: "https://example.com/nvidia-news",
      source: "PC Gamer",
      publishedAt: "2024-01-20T14:00:00Z",
      imageUrl: "https://example.com/nvidia-image.jpg",
    },
  ],
  JPM: [
    {
      id: "8",
      title: "JPMorgan Chase Reports Strong Earnings",
      summary: "JPMorgan Chase announces positive financial results.",
      url: "https://example.com/jpmorgan-news",
      source: "Wall Street Journal",
      publishedAt: "2024-01-19T09:00:00Z",
      imageUrl: "https://example.com/jpmorgan-image.jpg",
    },
  ],
  V: [
    {
      id: "9",
      title: "Visa Partners with Fintech Company",
      summary: "Visa collaborates with a fintech company for payment solutions.",
      url: "https://example.com/visa-news",
      source: "Finextra",
      publishedAt: "2024-01-18T11:00:00Z",
      imageUrl: "https://example.com/visa-image.jpg",
    },
  ],
  WMT: [
    {
      id: "10",
      title: "Walmart Expands Online Grocery Service",
      summary: "Walmart increases its online grocery delivery coverage.",
      url: "https://example.com/walmart-news",
      source: "Supermarket News",
      publishedAt: "2024-01-17T16:00:00Z",
      imageUrl: "https://example.com/walmart-image.jpg",
    },
  ],
}

const mockSearchResults: SearchResult[] = [
  { symbol: "AAPL", name: "Apple Inc.", exchange: "NASDAQ" },
  { symbol: "MSFT", name: "Microsoft Corporation", exchange: "NASDAQ" },
  { symbol: "GOOGL", name: "Alphabet Inc.", exchange: "NASDAQ" },
  { symbol: "AMZN", name: "Amazon.com, Inc.", exchange: "NASDAQ" },
  { symbol: "TSLA", name: "Tesla, Inc.", exchange: "NASDAQ" },
  { symbol: "META", name: "Meta Platforms, Inc.", exchange: "NASDAQ" },
  { symbol: "NVDA", name: "NVIDIA Corporation", exchange: "NASDAQ" },
  { symbol: "JPM", name: "JPMorgan Chase & Co.", exchange: "NYSE" },
  { symbol: "V", name: "Visa Inc.", exchange: "NYSE" },
  { symbol: "WMT", name: "Walmart Inc.", exchange: "NYSE" },
]

export async function getStockDetails(symbol: string): Promise<Stock> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (mockStocks[symbol]) {
        resolve(mockStocks[symbol])
      } else {
        reject(new Error("Stock not found"))
      }
    }, 500)
  })
}

export async function getHistoricalData(symbol: string, timeRange: string): Promise<HistoricalDataPoint[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockHistoricalData[symbol] || [])
    }, 500)
  })
}

export async function getStockNews(symbol: string): Promise<NewsItem[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockNews[symbol] || [])
    }, 500)
  })
}

export async function getTrendingStocks(): Promise<Stock[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      
      const trending = Object.values(mockStocks).slice(0, 5)
      resolve(trending)
    }, 500)
  })
}

export async function getLatestPrices(symbols: string[]): Promise<Stock[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const latestPrices = symbols.map((symbol) => mockStocks[symbol]).filter(Boolean) as Stock[]
      resolve(latestPrices)
    }, 500)
  })
}


export async function searchStocks(query: string): Promise<SearchResult[]> {
  console.log("Searching for:", query)

  if (!query || query.length < 2) return []

  
  const results = [
    { symbol: "AAPL", name: "Apple Inc.", exchange: "NASDAQ" },
    { symbol: "MSFT", name: "Microsoft Corporation", exchange: "NASDAQ" },
    { symbol: "GOOGL", name: "Alphabet Inc.", exchange: "NASDAQ" },
    { symbol: "AMZN", name: "Amazon.com, Inc.", exchange: "NASDAQ" },
    { symbol: "TSLA", name: "Tesla, Inc.", exchange: "NASDAQ" },
    { symbol: "META", name: "Meta Platforms, Inc.", exchange: "NASDAQ" },
    { symbol: "NVDA", name: "NVIDIA Corporation", exchange: "NASDAQ" },
    { symbol: "JPM", name: "JPMorgan Chase & Co.", exchange: "NYSE" },
    { symbol: "V", name: "Visa Inc.", exchange: "NYSE" },
    { symbol: "WMT", name: "Walmart Inc.", exchange: "NYSE" },
  ].filter(
    (stock) =>
      stock.symbol.toLowerCase().includes(query.toLowerCase()) ||
      stock.name.toLowerCase().includes(query.toLowerCase()),
  )

  console.log("Search results:", results)

  
  await new Promise((resolve) => setTimeout(resolve, 300))

  return results
}

