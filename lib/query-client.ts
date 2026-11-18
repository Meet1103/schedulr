import { QueryClient } from '@tanstack/react-query'

export function makeQueryClient(): QueryClient {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // Data is considered fresh for 60 seconds before a background refetch
        staleTime: 60 * 1_000,
        // Don't retry on failure — mock API errors are deterministic
        retry: false,
        // No refetch on window focus for a mock app
        refetchOnWindowFocus: false,
      },
    },
  })
}
