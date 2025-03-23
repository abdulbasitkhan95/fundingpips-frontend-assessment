import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  if (path.startsWith("/_next") || path.startsWith("/api") || path.includes(".")) {
    return NextResponse.next()
  }

  if (path.startsWith("/stocks/")) {

    return NextResponse.next()
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
}

