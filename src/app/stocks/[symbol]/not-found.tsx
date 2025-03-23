import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function StockNotFound() {
  return (
    <div className="container mx-auto p-4 max-w-7xl flex flex-col items-center justify-center min-h-[70vh]">
      <h1 className="text-3xl font-bold mb-4">Stock Not Found</h1>
      <p className="text-muted-foreground mb-6">
        The stock symbol you're looking for doesn't exist or couldn't be found.
      </p>
      <Button asChild>
        <Link href="/">Return to Home</Link>
      </Button>
    </div>
  )
}

