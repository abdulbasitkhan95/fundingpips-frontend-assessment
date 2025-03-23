import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
// Uncomment the line below if the regular ThemeProvider still causes issues
// import { MinimalThemeProvider as ThemeProvider } from "@/components/minimal-theme-provider"

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
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}

