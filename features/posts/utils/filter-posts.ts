import type { Post } from '@/features/posts/types/post'
import type { PostFilters } from '@/features/posts/hooks/use-post-filters'

/**
 * Filters a list of posts against the active filter state.
 *
 * Platform filter — a post matches if it targets at least one of the selected
 * platforms (OR logic, so a multi-platform post matches any of its platforms).
 *
 * Status filter — OR logic across selected statuses.
 *
 * Content search — case-insensitive substring match against post.content.
 * Uses JavaScript String.prototype.toLowerCase; not a guarantee of exact
 * platform Unicode counting behaviour (documented mock limitation).
 */
export function filterPosts(posts: Post[], filters: PostFilters): Post[] {
  let result = posts

  if (filters.platforms.length > 0) {
    result = result.filter((post) =>
      filters.platforms.some((p) => post.platforms.includes(p)),
    )
  }

  if (filters.statuses.length > 0) {
    result = result.filter((post) => filters.statuses.includes(post.status))
  }

  const q = filters.query.trim().toLowerCase()
  if (q.length > 0) {
    result = result.filter((post) => post.content.toLowerCase().includes(q))
  }

  return result
}
