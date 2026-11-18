import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Toaster } from '@/components/ui/sonner'
import { QueryProvider } from '@/providers/query-provider'
import './globals.css'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
  fallback: [
    'Inter Variable',
    'SF Pro Display',
    '-apple-system',
    'BlinkMacSystemFont',
    'Segoe UI',
    'Roboto',
    'Oxygen',
    'Ubuntu',
    'Cantarell',
    'Open Sans',
    'Helvetica Neue',
    'sans-serif',
  ],
})

export const metadata: Metadata = {
  title: 'Schedulr — Social Media Scheduler',
  description: 'Compose, schedule, and manage social media posts across Instagram, Facebook, X, and TikTok.',
}

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <QueryProvider>
          {children}
          <Toaster richColors closeButton />
        </QueryProvider>
      </body>
    </html>
  )
}
