"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import type { HistoricalDataPoint } from "@/lib/types"
import { useTheme } from "next-themes"

interface PriceChartProps {
  data: HistoricalDataPoint[]
}

export function PriceChart({ data }: PriceChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const { theme } = useTheme()
  const isDarkTheme = theme === "dark"
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.clientWidth,
          height: 400,
        })
      }
    }

    updateDimensions()

    window.addEventListener("resize", updateDimensions)

    return () => window.removeEventListener("resize", updateDimensions)
  }, [])

  useEffect(() => {
    if (!canvasRef.current || data.length === 0 || dimensions.width === 0) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const pixelRatio = window.devicePixelRatio || 1
    canvas.width = dimensions.width * pixelRatio
    canvas.height = dimensions.height * pixelRatio
    canvas.style.width = `${dimensions.width}px`
    canvas.style.height = `${dimensions.height}px`
    ctx.scale(pixelRatio, pixelRatio)

    ctx.clearRect(0, 0, dimensions.width, dimensions.height)

    const prices = data.map((d) => d.close)
    const dates = data.map((d) => new Date(d.date))

    const minPrice = Math.min(...prices) * 0.99
    const maxPrice = Math.max(...prices) * 1.01 
    const priceRange = maxPrice - minPrice

    const padding = { top: 20, right: 20, bottom: 30, left: 60 }
    const chartWidth = dimensions.width - padding.left - padding.right
    const chartHeight = dimensions.height - padding.top - padding.bottom

    const getY = (price: number) => {
      return padding.top + chartHeight - ((price - minPrice) / priceRange) * chartHeight
    }

    const getX = (date: Date, index: number) => {
      return padding.left + (index / (data.length - 1)) * chartWidth
    }

    ctx.strokeStyle = isDarkTheme ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"
    ctx.lineWidth = 1

    const priceStep = priceRange / 5
    for (let i = 0; i <= 5; i++) {
      const price = minPrice + i * priceStep
      const y = getY(price)

      ctx.beginPath()
      ctx.moveTo(padding.left, y)
      ctx.lineTo(dimensions.width - padding.right, y)
      ctx.stroke()

      
      ctx.fillStyle = isDarkTheme ? "rgba(255, 255, 255, 0.7)" : "rgba(0, 0, 0, 0.7)"
      ctx.font = "12px sans-serif"
      ctx.textAlign = "right"
      ctx.fillText(`$${price.toFixed(2)}`, padding.left - 5, y + 4)
    }

    
    ctx.strokeStyle = isDarkTheme ? "#4f46e5" : "#2962FF"
    ctx.lineWidth = 2
    ctx.beginPath()

    
    ctx.moveTo(getX(dates[0], 0), getY(prices[0]))

    
    for (let i = 1; i < data.length; i++) {
      ctx.lineTo(getX(dates[i], i), getY(prices[i]))
    }
    ctx.stroke()

    
    ctx.lineTo(getX(dates[data.length - 1], data.length - 1), getY(minPrice))
    ctx.lineTo(getX(dates[0], 0), getY(minPrice))
    ctx.closePath()
    ctx.fillStyle = isDarkTheme ? "rgba(79, 70, 229, 0.2)" : "rgba(41, 98, 255, 0.2)"
    ctx.fill()

    
    ctx.fillStyle = isDarkTheme ? "rgba(255, 255, 255, 0.7)" : "rgba(0, 0, 0, 0.7)"
    ctx.font = "12px sans-serif"
    ctx.textAlign = "center"

    
    const dateStep = Math.max(1, Math.floor(data.length / 5))
    for (let i = 0; i < data.length; i += dateStep) {
      const x = getX(dates[i], i)
      const date = new Date(data[i].date)
      const dateLabel = date.toLocaleDateString(undefined, { month: "short", day: "numeric" })

      ctx.fillText(dateLabel, x, dimensions.height - padding.bottom + 15)
    }

    
    const currentPrice = prices[prices.length - 1]
    const currentY = getY(currentPrice)

    
    ctx.strokeStyle = isDarkTheme ? "rgba(255, 255, 255, 0.5)" : "rgba(0, 0, 0, 0.5)"
    ctx.setLineDash([5, 5])
    ctx.beginPath()
    ctx.moveTo(padding.left, currentY)
    ctx.lineTo(dimensions.width - padding.right, currentY)
    ctx.stroke()
    ctx.setLineDash([])

    
    ctx.fillStyle = isDarkTheme ? "#ffffff" : "#000000"
    ctx.font = "bold 14px sans-serif"
    ctx.textAlign = "left"
    ctx.fillText(`$${currentPrice.toFixed(2)}`, dimensions.width - padding.right + 5, currentY + 4)
  }, [data, dimensions, isDarkTheme])

  return (
    <Card>
      <CardContent className="p-0 pt-6" ref={containerRef}>
        {data.length === 0 ? (
          <div className="h-[400px] w-full flex items-center justify-center">
            <p className="text-muted-foreground">No data available</p>
          </div>
        ) : (
          <canvas ref={canvasRef} style={{ width: "100%", height: "400px" }} />
        )}
      </CardContent>
    </Card>
  )
}

