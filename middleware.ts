import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Get the pathname of the request (e.g. /stocks/AAPL)
  const path = request.nextUrl.pathname

  // If the request is for a static file or API route, don't do anything
  if (path.startsWith("/_next") || path.startsWith("/api") || path.includes(".")) {
    return NextResponse.next()
  }

  // For direct access to stock detail pages, ensure they're properly handled
  if (path.startsWith("/stocks/")) {
    // The request is already going to the correct route, so just continue
    return NextResponse.next()
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
}

