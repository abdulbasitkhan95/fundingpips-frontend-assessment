import type { Stock, StockSearchResult, HistoricalDataPoint, NewsItem, MarketIndex } from "./types"
import { cache } from "react"

const ALPHA_VANTAGE_API_KEY = process.env.ALPHA_VANTAGE_API_KEY


const BASE_URL = "https://www.alphavantage.co/query"


let apiCallCount = 0
const API_CALL_LIMIT = 5 


async function fetchFromAPI(params: Record<string, string>) {
  
  if (apiCallCount >= API_CALL_LIMIT) {
    throw new Error("API call limit reached")
  }

  
  apiCallCount++

  
  setTimeout(() => {
    apiCallCount = Math.max(0, apiCallCount - 1)
  }, 60000)

  const queryParams = new URLSearchParams({
    ...params,
    apikey: ALPHA_VANTAGE_API_KEY || "",
  }).toString()

  const response = await fetch(`${BASE_URL}?${queryParams}`)

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`)
  }

  const data = await response.json()

  
  if (data["Error Message"]) {
    throw new Error(data["Error Message"])
  }

  
  if (
    Object.keys(data).length === 0 ||
    (data["Information"] && !Object.keys(data).some((key) => key !== "Information" && key !== "Note"))
  ) {
    throw new Error("Empty response or no data available")
  }

  if (data["Information"]) {
    console.warn("API Information:", data["Information"])
  }

  if (data["Note"]) {
    console.warn("API Note:", data["Note"])
    
    if (data["Note"].includes("Thank you for using Alpha Vantage")) {
      throw new Error("API rate limit reached")
    }
  }

  return data
}


const POPULAR_STOCKS: Record<string, string> = {
  AAPL: "Apple Inc.",
  MSFT: "Microsoft Corporation",
  GOOGL: "Alphabet Inc.",
  AMZN: "Amazon.com, Inc.",
  TSLA: "Tesla, Inc.",
  META: "Meta Platforms, Inc.",
  NVDA: "NVIDIA Corporation",
  JPM: "JPMorgan Chase & Co.",
  V: "Visa Inc.",
  WMT: "Walmart Inc.",
  NFLX: "Netflix, Inc.",
  DIS: "The Walt Disney Company",
  INTC: "Intel Corporation",
  AMD: "Advanced Micro Devices, Inc.",
  BA: "Boeing Co.",
  PFE: "Pfizer Inc.",
  KO: "Coca-Cola Company",
  PEP: "PepsiCo, Inc.",
  MCD: "McDonald's Corporation",
  NKE: "Nike, Inc.",
}


export const searchStocks = cache(async (query: string): Promise<StockSearchResult[]> => {
  try {
    
    const matchingPopularStocks = Object.entries(POPULAR_STOCKS)
      .filter(
        ([symbol, name]) =>
          symbol.toLowerCase().includes(query.toLowerCase()) || name.toLowerCase().includes(query.toLowerCase()),
      )
      .map(([symbol, name]) => ({
        symbol,
        name,
        exchange: "NASDAQ/NYSE",
      }))

    
    if (matchingPopularStocks.length > 0) {
      return matchingPopularStocks.slice(0, 10)
    }

    
    if (apiCallCount >= API_CALL_LIMIT) {
      console.warn("API call limit reached, skipping API search")
      return []
    }

    
    try {
      const data = await fetchFromAPI({
        function: "SYMBOL_SEARCH",
        keywords: query,
      })

      if (!data.bestMatches) {
        return []
      }

      return data.bestMatches
        .map((match: any) => ({
          symbol: match["1. symbol"],
          name: match["2. name"],
          exchange: match["4. region"],
        }))
        .slice(0, 10)
    } catch (error) {
      
      if (error.message === "API call limit reached") {
        console.warn("API call limit reached during search")
        return []
      }
      throw error
    }
  } catch (error) {
    console.error("Error searching stocks:", error)
    return []
  }
})


export const getStockDetails = cache(async (symbol: string): Promise<Stock> => {
  
  if (symbol in POPULAR_STOCKS) {
    return getFallbackStockData(symbol, POPULAR_STOCKS[symbol])
  }

  try {
    
    let overviewData
    try {
      overviewData = await fetchFromAPI({
        function: "OVERVIEW",
        symbol,
      })
    } catch (error) {
      console.warn(`Overview data not available for ${symbol}, using fallback approach`)
      
      overviewData = { Name: symbol }
    }

    
    let quoteData
    try {
      quoteData = await fetchFromAPI({
        function: "GLOBAL_QUOTE",
        symbol,
      })
    } catch (error) {
      console.error(`Quote data not available for ${symbol}`)
      throw new Error(`No price data available for ${symbol}`)
    }

    const quote = quoteData["Global Quote"]

    if (!quote || Object.keys(quote).length === 0) {
      throw new Error(`No quote data available for ${symbol}`)
    }

    const price = Number.parseFloat(quote["05. price"] || "0")
    const previousClose = Number.parseFloat(quote["08. previous close"] || "0")
    const change = Number.parseFloat(quote["09. change"] || "0")
    const changePercent = Number.parseFloat((quote["10. change percent"] || "0%").replace("%", ""))

    
    return {
      symbol,
      name: overviewData.Name || symbol,
      price: isNaN(price) ? 0 : price,
      change: isNaN(change) ? 0 : change,
      changePercent: isNaN(changePercent) ? 0 : changePercent,
      previousClose: isNaN(previousClose) ? price : previousClose,
      open: Number.parseFloat(quote["02. open"] || "0") || price,
      dayHigh: Number.parseFloat(quote["03. high"] || "0") || price,
      dayLow: Number.parseFloat(quote["04. low"] || "0") || price,
      yearHigh: Number.parseFloat(overviewData["52WeekHigh"] || "0") || price * 1.1,
      yearLow: Number.parseFloat(overviewData["52WeekLow"] || "0") || price * 0.9,
      marketCap: Number.parseFloat(overviewData.MarketCapitalization || "0"),
      volume: Number.parseInt(quote["06. volume"] || "0", 10),
      avgVolume: Number.parseInt(overviewData.AverageDailyVolume10Day || "0", 10),
      pe: Number.parseFloat(overviewData.PERatio || "0"),
      dividendYield: Number.parseFloat(overviewData.DividendYield || "0") * 100,
    }
  } catch (error) {
    console.error(`Error fetching stock details for ${symbol}:`, error)

    
    return getFallbackStockData(symbol, symbol)
  }
})


function getFallbackStockData(symbol: string, name: string): Stock {
  
  
  let basePrice = 100
  let marketCap = 1e11
  let pe = 20
  let dividendYield = 1.5

  
  switch (symbol) {
    case "META":
      basePrice = 485.39
      marketCap = 1.23e12
      pe = 28.45
      dividendYield = 0.42
      break
    case "V":
      basePrice = 275.82
      marketCap = 5.67e11
      pe = 30.76
      dividendYield = 0.76
      break
    case "AAPL":
      basePrice = 187.68
      marketCap = 2.94e12
      pe = 29.12
      dividendYield = 0.5
      break
    case "MSFT":
      basePrice = 417.88
      marketCap = 3.11e12
      pe = 36.21
      dividendYield = 0.72
      break
    case "GOOGL":
      basePrice = 175.98
      marketCap = 2.18e12
      pe = 26.78
      dividendYield = 0
      break
    case "AMZN":
      basePrice = 178.75
      marketCap = 1.86e12
      pe = 61.23
      dividendYield = 0
      break
    case "TSLA":
      basePrice = 175.34
      marketCap = 5.58e11
      pe = 50.23
      dividendYield = 0
      break
    case "NVDA":
      basePrice = 950.02
      marketCap = 2.34e12
      pe = 68.45
      dividendYield = 0.03
      break
    case "JPM":
      basePrice = 198.47
      marketCap = 5.72e11
      pe = 12.34
      dividendYield = 2.25
      break
    case "WMT":
      basePrice = 60.21
      marketCap = 4.85e11
      pe = 26.54
      dividendYield = 1.32
      break
    case "NFLX":
      basePrice = 628.67
      marketCap = 2.73e11
      pe = 43.21
      dividendYield = 0
      break
    case "DIS":
      basePrice = 111.45
      marketCap = 2.04e11
      pe = 76.34
      dividendYield = 0.79
      break
    case "INTC":
      basePrice = 42.76
      marketCap = 1.81e11
      pe = 22.51
      dividendYield = 1.87
      break
    case "AMD":
      basePrice = 176.52
      marketCap = 2.85e11
      pe = 41.23
      dividendYield = 0
      break
    case "BA":
      basePrice = 178.12
      marketCap = 1.08e11
      pe = 0
      dividendYield = 0
      break
    case "PFE":
      basePrice = 27.14
      marketCap = 1.53e11
      pe = 9.56
      dividendYield = 5.67
      break
    case "KO":
      basePrice = 60.97
      marketCap = 2.63e11
      pe = 24.78
      dividendYield = 3.02
      break
    case "PEP":
      basePrice = 172.41
      marketCap = 2.37e11
      pe = 25.89
      dividendYield = 2.87
      break
    case "MCD":
      basePrice = 266.47
      marketCap = 1.94e11
      pe = 22.67
      dividendYield = 2.31
      break
    case "NKE":
      basePrice = 93.86
      marketCap = 1.42e11
      pe = 27.89
      dividendYield = 1.45
      break
  }

  
  const priceVariation = basePrice * 0.02 * (Math.random() - 0.5) 
  const currentPrice = basePrice + priceVariation

  const change =
    Math.random() > 0.5
      ? Math.random() * basePrice * 0.03 
      : -Math.random() * basePrice * 0.03 

  const changePercent = (change / (currentPrice - change)) * 100

  return {
    symbol,
    name,
    price: currentPrice,
    change,
    changePercent,
    previousClose: currentPrice - change,
    open: currentPrice - change / 2,
    dayHigh: currentPrice + Math.abs(change),
    dayLow: currentPrice - Math.abs(change),
    yearHigh: currentPrice * 1.2,
    yearLow: currentPrice * 0.8,
    marketCap,
    volume: Math.floor(Math.random() * 10000000) + 5000000,
    avgVolume: Math.floor(Math.random() * 15000000) + 10000000,
    pe,
    dividendYield,
  }
}


export const getStockPrice = cache(
  async (symbol: string): Promise<{ price: number; change: number; changePercent: number }> => {
    
    if (symbol in POPULAR_STOCKS) {
      const fallbackData = getFallbackStockData(symbol, POPULAR_STOCKS[symbol])
      return {
        price: fallbackData.price,
        change: fallbackData.change,
        changePercent: fallbackData.changePercent,
      }
    }

    try {
      const quoteData = await fetchFromAPI({
        function: "GLOBAL_QUOTE",
        symbol,
      })

      const quote = quoteData["Global Quote"]

      if (!quote) {
        throw new Error(`No data available for ${symbol}`)
      }

      return {
        price: Number.parseFloat(quote["05. price"]),
        change: Number.parseFloat(quote["09. change"]),
        changePercent: Number.parseFloat(quote["10. change percent"].replace("%", "")),
      }
    } catch (error) {
      console.error(`Error fetching price for ${symbol}:`, error)

      
      const fallbackData = getFallbackStockData(symbol, symbol)
      return {
        price: fallbackData.price,
        change: fallbackData.change,
        changePercent: fallbackData.changePercent,
      }
    }
  },
)


export const getHistoricalData = cache(async (symbol: string, period: string): Promise<HistoricalDataPoint[]> => {
  
  if (symbol in POPULAR_STOCKS) {
    return generateMockHistoricalData(symbol, period)
  }

  try {
    let interval = "daily"
    let function_name = "TIME_SERIES_DAILY"
    let time_key = "Time Series (Daily)"
    let outputsize = "compact"

    
    switch (period) {
      case "1D":
        interval = "5min"
        function_name = "TIME_SERIES_INTRADAY"
        time_key = "Time Series (5min)"
        break
      case "1W":
        interval = "60min"
        function_name = "TIME_SERIES_INTRADAY"
        time_key = "Time Series (60min)"
        outputsize = "full"
        break
      case "1M":
        
        break
      case "3M":
        
        break
      case "1Y":
        
        function_name = "TIME_SERIES_WEEKLY"
        time_key = "Weekly Time Series"
        break
      case "5Y":
        function_name = "TIME_SERIES_MONTHLY"
        time_key = "Monthly Time Series"
        break
    }

    const params: Record<string, string> = {
      function: function_name,
      symbol,
      outputsize,
    }

    if (interval !== "daily" && ["1D", "1W"].includes(period)) {
      params.interval = interval
    }

    const data = await fetchFromAPI(params)

    if (!data[time_key]) {
      return generateMockHistoricalData(symbol, period)
    }

    const timeSeries = data[time_key]
    const today = new Date()

    
    let daysToInclude = 0
    switch (period) {
      case "1D":
        daysToInclude = 1
        break
      case "1W":
        daysToInclude = 7
        break
      case "1M":
        daysToInclude = 30
        break
      case "3M":
        daysToInclude = 90
        break
      case "1Y":
        daysToInclude = 365
        break
      case "5Y":
        daysToInclude = 1825
        break
    }

    
    return Object.entries(timeSeries)
      .map(([date, values]: [string, any]) => {
        const dataPoint = {
          date,
          open: Number.parseFloat(values["1. open"]),
          high: Number.parseFloat(values["2. high"]),
          low: Number.parseFloat(values["3. low"]),
          close: Number.parseFloat(values["4. close"]),
          volume: Number.parseInt(values["5. volume"] || "0", 10),
        }
        return dataPoint
      })
      .filter((dataPoint, index) => {
        
        if (["1D", "1W"].includes(period)) {
          return index < 100 
        }

        const dataDate = new Date(dataPoint.date)
        const diffTime = Math.abs(today.getTime() - dataDate.getTime())
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
        return diffDays <= daysToInclude
      })
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
  } catch (error) {
    console.error(`Error fetching historical data for ${symbol}:`, error)
    return generateMockHistoricalData(symbol, period)
  }
})


function generateMockHistoricalData(symbol: string, period: string): HistoricalDataPoint[] {
  const data: HistoricalDataPoint[] = []
  const today = new Date()

  
  let basePrice = 100
  switch (symbol) {
    case "META":
      basePrice = 485.39
      break
    case "V":
      basePrice = 275.82
      break
    case "AAPL":
      basePrice = 187.68
      break
    case "MSFT":
      basePrice = 417.88
      break
    case "GOOGL":
      basePrice = 175.98
      break
    case "AMZN":
      basePrice = 178.75
      break
    case "TSLA":
      basePrice = 175.34
      break
    case "NVDA":
      basePrice = 950.02
      break
    case "JPM":
      basePrice = 198.47
      break
    case "WMT":
      basePrice = 60.21
      break
    case "NFLX":
      basePrice = 628.67
      break
    case "DIS":
      basePrice = 111.45
      break
    case "INTC":
      basePrice = 42.76
      break
    case "AMD":
      basePrice = 176.52
      break
    default:
      basePrice = 100
  }

  
  let days = 0
  let interval = 1 

  switch (period) {
    case "1D":
      days = 1
      interval = 1 / 24 
      break
    case "1W":
      days = 7
      interval = 1 / 4 
      break
    case "1M":
      days = 30
      interval = 1 
      break
    case "3M":
      days = 90
      interval = 1 
      break
    case "1Y":
      days = 365
      interval = 7 
      break
    case "5Y":
      days = 1825
      interval = 30 
      break
  }

  
  let currentPrice = basePrice

  
  let volatility = 0.02 

  
  if (["TSLA", "NVDA", "AMD", "NFLX"].includes(symbol)) {
    volatility = 0.03 
  }

  
  if (["WMT", "KO", "PEP", "JNJ", "PG"].includes(symbol)) {
    volatility = 0.01 
  }

  
  
  const trendBias = Math.random() > 0.5 ? 0.3 : -0.3 

  for (let i = days; i >= 0; i -= interval) {
    const date = new Date(today)
    date.setDate(date.getDate() - i)

    
    const randomChange = currentPrice * volatility * (Math.random() - 0.5 + trendBias / 10)
    const open = currentPrice
    const close = open + randomChange
    const high = Math.max(open, close) + Math.abs(randomChange) * Math.random()
    const low = Math.min(open, close) - Math.abs(randomChange) * Math.random()

    data.push({
      date: date.toISOString().split("T")[0],
      open,
      high,
      low,
      close,
      volume: Math.floor(Math.random() * 10000000) + 5000000,
    })

    currentPrice = close
  }

  return data
}


export const getStockNews = cache(async (symbol: string): Promise<NewsItem[]> => {
  
  if (symbol in POPULAR_STOCKS) {
    return generateMockNews(symbol)
  }

  try {
    const data = await fetchFromAPI({
      function: "NEWS_SENTIMENT",
      tickers: symbol,
      limit: "10",
    })

    if (!data.feed) {
      return generateMockNews(symbol)
    }

    return data.feed.map((item: any, index: number) => ({
      id: `${symbol}-news-${index}`,
      title: item.title,
      summary: item.summary,
      url: item.url,
      source: item.source,
      publishedAt: item.time_published,
    }))
  } catch (error) {
    console.error(`Error fetching news for ${symbol}:`, error)
    return generateMockNews(symbol)
  }
})


function generateMockNews(symbol: string): NewsItem[] {
  const stockNames: Record<string, string> = {
    AAPL: "Apple",
    MSFT: "Microsoft",
    GOOGL: "Google",
    AMZN: "Amazon",
    TSLA: "Tesla",
    META: "Meta",
    NVDA: "NVIDIA",
    JPM: "JPMorgan Chase",
    V: "Visa",
    WMT: "Walmart",
    NFLX: "Netflix",
    DIS: "Disney",
    INTC: "Intel",
    AMD: "AMD",
    BA: "Boeing",
    PFE: "Pfizer",
    KO: "Coca-Cola",
    PEP: "PepsiCo",
    MCD: "McDonald's",
    NKE: "Nike",
  }

  const companyName = stockNames[symbol] || symbol

  
  const newsTemplates = [
    {
      title: `${companyName} Reports Strong Quarterly Earnings`,
      summary: `${companyName} exceeded analyst expectations with its latest quarterly results, showing growth in key business segments.`,
      source: "Financial Times",
      timeOffset: 2 * 60 * 60 * 1000, 
    },
    {
      title: `${companyName} Announces New Product Line`,
      summary: `${companyName} unveiled its latest innovations at a press event today, showcasing new products that aim to disrupt the market.`,
      source: "Bloomberg",
      timeOffset: 8 * 60 * 60 * 1000, 
    },
    {
      title: `${companyName} Expands International Operations`,
      summary: `${companyName} is expanding its presence in emerging markets, with new facilities opening in Asia and Latin America.`,
      source: "Reuters",
      timeOffset: 24 * 60 * 60 * 1000, 
    },
    {
      title: `Analysts Upgrade ${companyName} Stock Rating`,
      summary: `Several major investment firms have upgraded their outlook for ${companyName}, citing strong growth potential and market position.`,
      source: "CNBC",
      timeOffset: 36 * 60 * 60 * 1000, 
    },
    {
      title: `${companyName} CEO Discusses Future Strategy`,
      summary: `In an exclusive interview, the CEO of ${companyName} outlined the company's vision for the next five years, focusing on innovation and sustainability.`,
      source: "Wall Street Journal",
      timeOffset: 48 * 60 * 60 * 1000, 
    },
    {
      title: `${companyName} Partners with Leading Tech Firms`,
      summary: `${companyName} announced strategic partnerships with several technology leaders to enhance its product offerings and expand market reach.`,
      source: "TechCrunch",
      timeOffset: 60 * 60 * 60 * 1000, 
    },
    {
      title: `${companyName} Invests in Renewable Energy`,
      summary: `${companyName} has committed to significant investments in renewable energy sources, aiming to achieve carbon neutrality by 2030.`,
      source: "The Guardian",
      timeOffset: 72 * 60 * 60 * 1000, 
    },
    {
      title: `${companyName} Launches New Customer Initiative`,
      summary: `${companyName} introduced a new customer loyalty program designed to enhance user experience and increase retention rates.`,
      source: "Business Insider",
      timeOffset: 84 * 60 * 60 * 1000, 
    },
  ]

  
  return newsTemplates.map((template, index) => ({
    id: `${symbol}-news-${index}`,
    title: template.title,
    summary: template.summary,
    url: "#",
    source: template.source,
    publishedAt: new Date(Date.now() - template.timeOffset).toISOString(),
  }))
}


export const getTrendingStocks = cache(async (type: string): Promise<Stock[]> => {
  
  const popularSymbols = Object.keys(POPULAR_STOCKS).slice(0, 6)

  try {
    
    const stockDetails = popularSymbols.map((symbol) => getFallbackStockData(symbol, POPULAR_STOCKS[symbol]))

    
    switch (type) {
      case "trending":
        
        return stockDetails.sort((a, b) => b.volume - a.volume)
      case "gainers":
        
        return stockDetails.sort((a, b) => b.changePercent - a.changePercent)
      case "losers":
        
        return stockDetails.sort((a, b) => a.changePercent - b.changePercent)
      default:
        return stockDetails
    }
  } catch (error) {
    console.error("Error fetching trending stocks:", error)

    
    return popularSymbols.map((symbol) => getFallbackStockData(symbol, POPULAR_STOCKS[symbol]))
  }
})


export const getMarketIndices = cache(async (): Promise<MarketIndex[]> => {
  
  

  
  const fallbackIndices: MarketIndex[] = [
    {
      symbol: "^DJI",
      name: "Dow Jones Industrial Average",
      price: 38654.23 + (Math.random() * 200 - 100),
      change: Math.random() * 200 - 100,
      changePercent: Math.random() * 2 - 1,
    },
    {
      symbol: "^GSPC",
      name: "S&P 500",
      price: 5021.84 + (Math.random() * 50 - 25),
      change: Math.random() * 50 - 25,
      changePercent: Math.random() * 2 - 1,
    },
    {
      symbol: "^IXIC",
      name: "NASDAQ Composite",
      price: 15990.66 + (Math.random() * 100 - 50),
      change: Math.random() * 100 - 50,
      changePercent: Math.random() * 2 - 1,
    },
  ]

  
  fallbackIndices.forEach((index) => {
    index.changePercent = (index.change / (index.price - index.change)) * 100
  })

  
  try {
    
    const spyData = await fetchFromAPI({
      function: "GLOBAL_QUOTE",
      symbol: "SPY",
    }).catch(() => null)

    
    const diaData = await fetchFromAPI({
      function: "GLOBAL_QUOTE",
      symbol: "DIA",
    }).catch(() => null)

    
    const qqqData = await fetchFromAPI({
      function: "GLOBAL_QUOTE",
      symbol: "QQQ",
    }).catch(() => null)

    
    if (spyData && spyData["Global Quote"]) {
      const quote = spyData["Global Quote"]
      fallbackIndices[1].price = Number.parseFloat(quote["05. price"])
      fallbackIndices[1].change = Number.parseFloat(quote["09. change"])
      fallbackIndices[1].changePercent = Number.parseFloat(quote["10. change percent"].replace("%", ""))
    }

    if (diaData && diaData["Global Quote"]) {
      const quote = diaData["Global Quote"]
      fallbackIndices[0].price = Number.parseFloat(quote["05. price"])
      fallbackIndices[0].change = Number.parseFloat(quote["09. change"])
      fallbackIndices[0].changePercent = Number.parseFloat(quote["10. change percent"].replace("%", ""))
    }

    if (qqqData && qqqData["Global Quote"]) {
      const quote = qqqData["Global Quote"]
      fallbackIndices[2].price = Number.parseFloat(quote["05. price"])
      fallbackIndices[2].change = Number.parseFloat(quote["09. change"])
      fallbackIndices[2].changePercent = Number.parseFloat(quote["10. change percent"].replace("%", ""))
    }

    return fallbackIndices
  } catch (error) {
    console.error("Error fetching market indices:", error)
    return fallbackIndices
  }
})

