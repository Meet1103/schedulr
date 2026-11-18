import { cn } from 'cn'
import type { PostStatus } from '@/features/posts/types/post'

interface StatusConfig {
  label: string
  dotClass: string
  badgeClass: string
}

const STATUS_CONFIG: Record<PostStatus, StatusConfig> = {
  scheduled: {
    label: 'Scheduled',
    dotClass: 'bg-blue-500',
    badgeClass:
      'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-800',
  },
  published: {
    label: 'Published',
    dotClass: 'bg-emerald-500',
    badgeClass:
      'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800',
  },
  failed: {
    label: 'Failed',
    dotClass: 'bg-red-500',
    badgeClass:
      'bg-red-50 text-red-700 border-red-200 dark:bg-red-950/40 dark:text-red-300 dark:border-red-800',
  },
}

interface PostStatusBadgeProps {
  status: PostStatus
  className?: string
}

export function PostStatusBadge({ status, className }: PostStatusBadgeProps) {
  const config = STATUS_CONFIG[status]
  return (
    <span
      aria-label={`Status: ${config.label}`}
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-xs font-medium',
        config.badgeClass,
        className,
      )}
    >
      <span aria-hidden="true" className={cn('size-1.5 rounded-full', config.dotClass)} />
      {config.label}
    </span>
  )
}
