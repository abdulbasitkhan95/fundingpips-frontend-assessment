"use client"

import type * as React from "react"

// Simple theme provider that doesn't use next-themes
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

