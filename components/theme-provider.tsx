"use client"

import type * as React from "react"
import { ThemeProvider as NextThemesProvider, Attribute } from "next-themes"

type ThemeProviderProps = {
  children: React.ReactNode
  // Define the props we know next-themes accepts
  attribute?: Attribute | Attribute[]
  defaultTheme?: string
  enableSystem?: boolean
  disableTransitionOnChange?: boolean
  storageKey?: string
  forcedTheme?: string
  themes?: string[]
}

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}

