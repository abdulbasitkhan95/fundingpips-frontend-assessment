"use client"

import type * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import type { ThemeProviderProps as NextThemesProviderProps } from "next-themes"

export function ThemeProvider({ children, ...props }: React.PropsWithChildren<NextThemesProviderProps>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}

