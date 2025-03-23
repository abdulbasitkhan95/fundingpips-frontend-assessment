import type React from "react"
import type { Metadata } from "next"
import "./globals.css"

// Try the regular theme provider first
// import { ThemeProvider } from "@/components/theme-provider"

// If that fails, use the fallback
import { FallbackThemeProvider as ThemeProvider } from "@/components/fallback-theme-provider"

export const metadata: Metadata = {
  title: "Stock Tracker",
  description: "Track your favorite stocks and market trends",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}

