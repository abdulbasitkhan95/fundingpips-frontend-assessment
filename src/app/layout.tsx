import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { StockProvider } from "@/providers/stock-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Funding Pips",
  description: "Funding Pips",
    generator: ''
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <StockProvider>
            {children}
            <Toaster />
          </StockProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'