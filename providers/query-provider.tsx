'use client'

import { QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'
import { makeQueryClient } from '@/lib/query-client'

/**
 * Wraps the app with TanStack Query's QueryClientProvider.
 * QueryClient is created inside useState to ensure each render gets its own
 * instance — prevents state leaking between SSR requests.
 */
export function QueryProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => makeQueryClient())
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}
