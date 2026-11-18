'use client'

import { cn } from 'cn'
import { AlertCircle, ImageIcon } from 'lucide-react'
import Image from 'next/image'
import type { Post } from '@/features/posts/types/post'
import { formatLocalTimeOnly } from '@/features/posts/utils/timezone'
import { PlatformIconGroup } from './platform-icon'
import { PostStatusBadge } from './post-status-badge'
import { RetryPostButton } from './retry-post-button'

interface PostCardProps {
  post: Post
  /** Optional custom slot for Retry button */
  retrySlot?: React.ReactNode
}

export function PostCard({ post, retrySlot }: PostCardProps) {
  const { content, platforms, mediaUrl, scheduledAt, status, errorMessage } = post

  return (
    <article
      aria-label={`Post for ${platforms.join(', ')} — ${status}`}
      className={cn(
        'flex flex-col gap-3 rounded-xl border bg-card p-4 transition-shadow hover:shadow-sm',
        status === 'failed' ? 'border-red-200 dark:border-red-900' : 'border-border',
      )}
    >
      {/* Top row: platforms + status */}
      <div className="flex items-start justify-between gap-2">
        <PlatformIconGroup platforms={platforms} />
        <PostStatusBadge status={status} />
      </div>

      {/* Content + optional thumbnail */}
      <div className="flex gap-3 min-w-0">
        <p className="flex-1 line-clamp-3 text-sm leading-relaxed text-foreground">
          {content}
        </p>
        {mediaUrl ? (
          <div className="relative size-14 shrink-0 overflow-hidden rounded-lg border border-border bg-muted">
            <Image
              src={mediaUrl}
              alt="Post media"
              fill
              sizes="56px"
              className="object-cover"
              unoptimized
            />
          </div>
        ) : (
          <div className="hidden size-14 shrink-0 items-center justify-center rounded-lg border border-border bg-muted sm:flex">
            <ImageIcon className="size-5 text-muted-foreground/40" aria-hidden="true" />
          </div>
        )}
      </div>

      {/* Error message (failed posts only) */}
      {status === 'failed' && errorMessage && (
        <div className="flex items-start gap-2 rounded-lg bg-red-50 px-3 py-2 text-xs text-red-700 dark:bg-red-950/30 dark:text-red-400">
          <AlertCircle className="mt-0.5 size-3.5 shrink-0" aria-hidden="true" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Bottom row: scheduled time + retry */}
      <div className="flex items-center justify-between gap-2">
        <time dateTime={scheduledAt} className="text-xs tabular-nums text-muted-foreground">
          {formatLocalTimeOnly(scheduledAt)}
        </time>
        {status === 'failed' && (retrySlot ?? <RetryPostButton post={post} />)}
      </div>
    </article>
  )
}
