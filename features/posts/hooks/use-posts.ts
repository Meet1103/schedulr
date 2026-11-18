'use client'

import { useQuery } from '@tanstack/react-query'
import { fetchPosts } from '@/features/posts/services/mock-post-api'
import { QUERY_KEYS } from '@/lib/constants'

/**
 * Fetches all posts from the mock API and caches them under ['posts'].
 * Returns the full TanStack Query result object.
 */
export function usePosts() {
  return useQuery({
    queryKey: QUERY_KEYS.posts,
    queryFn: fetchPosts,
  })
}
