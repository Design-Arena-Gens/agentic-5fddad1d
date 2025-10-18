import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Watchlist Organizer',
  description: 'Movies and TV watchlist with drag & drop and glass UI',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">
        {children}
      </body>
    </html>
  )
}
