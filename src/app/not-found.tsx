import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
      <h1 className="text-6xl font-bold text-primary">404</h1>
      <h2 className="text-2xl font-semibold mt-4">Stock Not Found</h2>
      <p className="mt-2 text-muted-foreground max-w-md">
        The stock you're looking for doesn't exist or we couldn't retrieve its data.
      </p>
      <Button asChild className="mt-6">
        <Link href="/">Return to Dashboard</Link>
      </Button>
    </div>
  )
}

