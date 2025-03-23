"use client"

import type * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

export function MinimalThemeProvider({ children, ...props }: React.PropsWithChildren<Record<string, any>>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}

