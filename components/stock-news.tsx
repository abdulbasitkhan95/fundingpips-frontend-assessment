import { getStockNews } from "@/lib/stock-api"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

interface StockNewsProps {
  symbol: string
}

export async function StockNews({ symbol }: StockNewsProps) {
  try {
    const news = await getStockNews(symbol)

    if (!news.length) {
      return (
        <Card>
          <CardContent className="p-6">
            <p className="text-center text-muted-foreground">No news available for {symbol}</p>
          </CardContent>
        </Card>
      )
    }

    return (
      <div className="space-y-4">
        {news.map((item) => (
          <Card key={item.id}>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">{item.title}</CardTitle>
              <CardDescription>
                {item.source} • {formatDistanceToNow(new Date(item.publishedAt), { addSuffix: true })}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{item.summary}</p>
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block mt-2 text-sm text-primary hover:underline"
              >
                Read more
              </a>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  } catch (error) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-2 justify-center text-destructive">
            <AlertCircle size={18} />
            <p>Failed to load news. Please try again later.</p>
          </div>
        </CardContent>
      </Card>
    )
  }
}

