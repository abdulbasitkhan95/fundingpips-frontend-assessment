"use client"

import type * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

export function FallbackThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </NextThemesProvider>
  )
}

