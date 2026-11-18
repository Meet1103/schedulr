'use client'

import { CalendarX2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { usePostFilters } from '@/features/posts/hooks/use-post-filters'
import { usePosts } from '@/features/posts/hooks/use-posts'
import { filterPosts } from '@/features/posts/utils/filter-posts'
import { groupPostsByDay } from '@/features/posts/utils/group-posts-by-day'
import { PostDayGroup } from './post-day-group'
import { PostQueueSkeleton } from './post-queue-skeleton'

export function PostQueue() {
  const { data: posts, isLoading, isError, error } = usePosts()
  const { filters, hasActiveFilters, clearFilters } = usePostFilters()

  /* Loading */
  if (isLoading) return <PostQueueSkeleton />

  /* Error */
  if (isError) {
    return (
      <div className="flex flex-col items-center gap-3 py-24 text-center">
        <CalendarX2 className="size-10 text-muted-foreground" aria-hidden="true" />
        <div>
          <p className="text-sm font-medium text-foreground">Failed to load posts</p>
          <p className="mt-1 text-xs text-muted-foreground">
            {error instanceof Error ? error.message : 'An unexpected error occurred.'}
          </p>
        </div>
      </div>
    )
  }

  const allPosts = posts ?? []
  const filtered = filterPosts(allPosts, filters)
  const groups = groupPostsByDay(filtered)

  /* No posts at all */
  if (allPosts.length === 0) {
    return (
      <div className="flex flex-col items-center gap-3 py-24 text-center">
        <CalendarX2 className="size-10 text-muted-foreground" aria-hidden="true" />
        <div>
          <p className="text-sm font-medium text-foreground">No posts yet</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Create your first post using the button above.
          </p>
        </div>
      </div>
    )
  }

  /* Posts exist but nothing matches the active filters */
  if (groups.length === 0) {
    return (
      <div className="flex flex-col items-center gap-4 py-24 text-center">
        <CalendarX2 className="size-10 text-muted-foreground" aria-hidden="true" />
        <div>
          <p className="text-sm font-medium text-foreground">No posts match your filters</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Try adjusting your search or filter criteria.
          </p>
        </div>
        {hasActiveFilters && (
          <Button variant="outline" size="sm" onClick={clearFilters}>
            Clear filters
          </Button>
        )}
      </div>
    )
  }

  /* Queue — show total filtered count */
  return (
    <div className="flex flex-col gap-8 p-6">
      {hasActiveFilters && (
        <p className="text-xs text-muted-foreground" aria-live="polite">
          Showing {filtered.length} {filtered.length === 1 ? 'post' : 'posts'}
        </p>
      )}
      {groups.map((group) => (
        <PostDayGroup key={group.dateKey} group={group} />
      ))}
    </div>
  )
}
