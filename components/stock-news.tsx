import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getStockNews } from "@/lib/stock-api"
import type { NewsItem } from "@/lib/types"
import Image from "next/image"

interface StockNewsProps {
  symbol: string
}

export default async function StockNews({ symbol }: StockNewsProps) {
  const news = await getStockNews(symbol)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Latest News</CardTitle>
        <CardDescription>Recent articles about {symbol}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {news.length === 0 ? (
            <p className="text-muted-foreground">No recent news found for {symbol}.</p>
          ) : (
            news.map((item: NewsItem) => (
              <a key={item.id} href={item.url} target="_blank" rel="noopener noreferrer" className="block">
                <div className="flex gap-4 p-4 border rounded-lg hover:bg-muted transition-colors">
                  {item.imageUrl && (
                    <div className="flex-shrink-0">
                      <Image
                        src={item.imageUrl || "/placeholder.svg"}
                        alt={item.title}
                        width={100}
                        height={60}
                        className="rounded-md object-cover"
                      />
                    </div>
                  )}
                  <div>
                    <h3 className="font-medium">{item.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{item.summary}</p>
                    <div className="text-xs text-muted-foreground mt-2">
                      {new Date(item.publishedAt).toLocaleDateString()} • {item.source}
                    </div>
                  </div>
                </div>
              </a>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}

