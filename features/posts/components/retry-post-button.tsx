'use client'

import { Loader2, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRetryPost } from '@/features/posts/hooks/use-retry-post'
import type { Post } from '@/features/posts/types/post'

interface RetryPostButtonProps {
  post: Post
}

export function RetryPostButton({ post }: RetryPostButtonProps) {
  const { mutate: retry, isPending, variables } = useRetryPost()

  // Only consider pending if THIS specific post is the one being retried
  const isRetrying = isPending && variables === post.id

  const handleRetry = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (isRetrying) return
    retry(post.id)
  }

  return (
    <Button
      variant="outline"
      size="xs"
      onClick={handleRetry}
      disabled={isRetrying}
      aria-label={`Retry publishing post ${post.id}`}
      aria-busy={isRetrying}
      className="cursor-pointer gap-1 border-red-300 text-red-700 hover:bg-red-50 hover:text-red-800 dark:border-red-800 dark:text-red-300 dark:hover:bg-red-950/50 disabled:cursor-not-allowed"
    >
      {isRetrying ? (
        <>
          <Loader2 className="size-3 animate-spin" aria-hidden="true" />
          <span>Retrying...</span>
        </>
      ) : (
        <>
          <RefreshCw className="size-3" aria-hidden="true" />
          <span>Retry</span>
        </>
      )}
    </Button>
  )
}
