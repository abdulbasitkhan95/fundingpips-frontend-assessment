"use client"

import { useState, useEffect } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { getHistoricalData } from "@/lib/stock-api"
import type { HistoricalDataPoint } from "@/lib/types"

interface PriceChartProps {
  symbol: string
}

type TimeRange = "1D" | "1W" | "1M" | "3M" | "1Y" | "5Y"

export default function PriceChart({ symbol }: PriceChartProps) {
  const [timeRange, setTimeRange] = useState<TimeRange>("1M")
  const [data, setData] = useState<HistoricalDataPoint[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const historicalData = await getHistoricalData(symbol, timeRange)
        setData(historicalData)
      } catch (error) {
        console.error("Failed to fetch historical data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [symbol, timeRange])

  const timeRanges: TimeRange[] = ["1D", "1W", "1M", "3M", "1Y", "5Y"]

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp)
    if (timeRange === "1D") {
      return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    }
    if (timeRange === "1W" || timeRange === "1M") {
      return date.toLocaleDateString([], { month: "short", day: "numeric" })
    }
    return date.toLocaleDateString([], { month: "short", year: "numeric" })
  }

  const formatPrice = (price: number) => {
    return `$${price.toFixed(2)}`
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Price History</CardTitle>
        <div className="flex space-x-1">
          {timeRanges.map((range) => (
            <Button
              key={range}
              variant={timeRange === range ? "default" : "outline"}
              size="sm"
              onClick={() => setTimeRange(range)}
            >
              {range}
            </Button>
          ))}
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="h-80 flex items-center justify-center">Loading chart data...</div>
        ) : (
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="timestamp" tickFormatter={formatDate} stroke="#6B7280" />
                <YAxis domain={["auto", "auto"]} tickFormatter={formatPrice} stroke="#6B7280" />
                <Tooltip
                  formatter={(value: number) => [`$${value.toFixed(2)}`, "Price"]}
                  labelFormatter={(label) => formatDate(label as number)}
                />
                <Line
                  type="monotone"
                  dataKey="price"
                  stroke="#2563EB"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

