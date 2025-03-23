import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Funding Pips',
  description: 'Funding Pips',
  generator: 'Funding Pips',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
