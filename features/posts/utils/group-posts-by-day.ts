import { format } from 'date-fns'
import type { Post } from '@/features/posts/types/post'
import { toLocalDateKey } from '@/features/posts/utils/timezone'

export interface DayGroup {
  /** Human-readable label: "Today", "Tomorrow", or "Monday, October 19" */
  label: string
  /** YYYY-MM-DD key in the browser's local timezone */
  dateKey: string
  /** Posts sorted chronologically within this day */
  posts: Post[]
}

/** Returns YYYY-MM-DD string for today in local timezone */
function todayKey(): string {
  return format(new Date(), 'yyyy-MM-dd')
}

/** Returns YYYY-MM-DD string for tomorrow in local timezone */
function tomorrowKey(): string {
  const d = new Date()
  d.setDate(d.getDate() + 1)
  return format(d, 'yyyy-MM-dd')
}

/**
 * Groups posts by their local calendar day and sorts each group chronologically.
 * Day labels: "Today", "Tomorrow", or "EEEE, MMMM d" (e.g. "Tuesday, October 20").
 * Groups are ordered chronologically by dateKey.
 */
export function groupPostsByDay(posts: Post[]): DayGroup[] {
  if (posts.length === 0) return []

  // Sort all posts chronologically
  const sorted = [...posts].sort(
    (a, b) => new Date(a.scheduledAt).getTime() - new Date(b.scheduledAt).getTime(),
  )

  // Group by local date key (already in local TZ from toLocalDateKey)
  const map = new Map<string, Post[]>()
  for (const post of sorted) {
    const key = toLocalDateKey(post.scheduledAt)
    const group = map.get(key)
    if (group) {
      group.push(post)
    } else {
      map.set(key, [post])
    }
  }

  const today = todayKey()
  const tomorrow = tomorrowKey()

  // Build labeled groups — Map preserves insertion order (chronological from sort)
  return Array.from(map.entries()).map(([dateKey, groupPosts]) => {
    let label: string
    if (dateKey === today) {
      label = 'Today'
    } else if (dateKey === tomorrow) {
      label = 'Tomorrow'
    } else {
      // Parse as a local date to avoid UTC offset issues with date-only strings
      const [year, month, day] = dateKey.split('-').map(Number)
      const localDate = new Date(year, month - 1, day)
      label = format(localDate, 'EEEE, MMMM d')
    }

    return { label, dateKey, posts: groupPosts }
  })
}
