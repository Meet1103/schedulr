'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { createPost } from '@/features/posts/services/mock-post-api'
import { QUERY_KEYS } from '@/lib/constants'
import type { CreatePostApiInput, Post } from '@/features/posts/types/post'

interface UseCreatePostOptions {
  onSuccess?: (post: Post) => void
}

export function useCreatePost(options?: UseCreatePostOptions) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (input: CreatePostApiInput) => createPost(input),
    onSuccess: (newPost) => {
      // Optimistically prepend to existing cache
      queryClient.setQueryData<Post[]>(QUERY_KEYS.posts, (old) => {
        return old ? [newPost, ...old] : [newPost]
      })

      // Invalidate query to ensure consistency
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.posts })

      toast.success('Post scheduled successfully!', {
        description: `Scheduled for ${newPost.platforms.join(', ')}`,
      })

      options?.onSuccess?.(newPost)
    },
    onError: (err) => {
      toast.error('Failed to schedule post', {
        description:
          err instanceof Error
            ? err.message
            : 'An unexpected error occurred while scheduling.',
      })
    },
  })
}
