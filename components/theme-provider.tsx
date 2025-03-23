"use client"

import type * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

import type { Attribute } from "next-themes"

// Define our own props interface without relying on imports from next-themes
interface ThemeProviderProps {
  children: React.ReactNode
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

