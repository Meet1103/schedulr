'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { retryPost } from '@/features/posts/services/mock-post-api'
import { QUERY_KEYS } from '@/lib/constants'
import type { Post } from '@/features/posts/types/post'

interface RetryContext {
  previousPost?: Post
  previousPosts?: Post[]
}

export function useRetryPost() {
  const queryClient = useQueryClient()

  return useMutation<Post, Error, string, RetryContext>({
    mutationFn: (id: string) => retryPost(id),

    onMutate: async (id: string) => {
      // 1. Cancel any outgoing refetches to avoid overwriting our optimistic update
      await queryClient.cancelQueries({ queryKey: QUERY_KEYS.posts })

      // 2. Snapshot the current posts cache
      const previousPosts = queryClient.getQueryData<Post[]>(QUERY_KEYS.posts)
      const previousPost = previousPosts?.find((p) => p.id === id)

      // 3. Optimistically update this specific post in the cache
      if (previousPosts && previousPost) {
        queryClient.setQueryData<Post[]>(QUERY_KEYS.posts, (old) => {
          if (!old) return []
          return old.map((post) =>
            post.id === id
              ? {
                  ...post,
                  status: 'published',
                  errorMessage: undefined,
                }
              : post
          )
        })
      }

      // Return context for targeted rollback
      return { previousPost, previousPosts }
    },

    onError: (err, id, context) => {
      // 4. Targeted rollback: restore ONLY the specific failed post
      // This ensures unrelated posts added or updated in the interim are NOT wiped out
      if (context?.previousPost) {
        queryClient.setQueryData<Post[]>(QUERY_KEYS.posts, (current) => {
          if (!current) return context.previousPosts ?? []
          return current.map((p) => (p.id === id ? context.previousPost! : p))
        })
      }

      toast.error('Retry failed', {
        description:
          err instanceof Error
            ? err.message
            : 'Simulated 20% network failure. You can try again.',
      })
    },

    onSuccess: (updatedPost) => {
      // Update with server truth
      queryClient.setQueryData<Post[]>(QUERY_KEYS.posts, (current) => {
        if (!current) return [updatedPost]
        return current.map((p) => (p.id === updatedPost.id ? updatedPost : p))
      })

      toast.success('Post published!', {
        description: 'Failed post was retried and successfully published.',
      })
    },

    onSettled: () => {
      // Ensure sync with mock store
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.posts })
    },
  })
}
