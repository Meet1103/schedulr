'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useMemo } from 'react'
import { PLATFORMS, POST_STATUSES } from '@/lib/constants'
import type { Platform, PostStatus } from '@/features/posts/types/post'

export interface PostFilters {
  /** Selected platforms (empty = all). Multi-value: ?platform=instagram&platform=x */
  platforms: Platform[]
  /** Selected statuses (empty = all). Multi-value: ?status=scheduled&status=failed */
  statuses: PostStatus[]
  /** Content search string. Single value: ?q=launch */
  query: string
}

/**
 * Reads and writes post filter state from/to URL query parameters.
 *
 * URL is the single source of truth — refreshing preserves filters and the
 * browser Back/Forward buttons restore previous filter states.
 *
 * Invalid values in the URL are silently ignored (normalized to empty lists).
 */
export function usePostFilters() {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()

  // Parse and validate filters from URL — invalid values are dropped
  const filters = useMemo((): PostFilters => {
    const rawPlatforms = searchParams.getAll('platform')
    const platforms = rawPlatforms.filter((p): p is Platform =>
      (PLATFORMS as string[]).includes(p),
    )

    const rawStatuses = searchParams.getAll('status')
    const statuses = rawStatuses.filter((s): s is PostStatus =>
      (POST_STATUSES as string[]).includes(s),
    )

    const query = searchParams.get('q') ?? ''

    return { platforms, statuses, query }
  }, [searchParams])

  const hasActiveFilters =
    filters.platforms.length > 0 ||
    filters.statuses.length > 0 ||
    filters.query.length > 0

  /** Push a new URL with updated params, preserving unrelated params. */
  const updateParams = useCallback(
    (updates: Partial<PostFilters>) => {
      const params = new URLSearchParams(searchParams.toString())

      if (updates.platforms !== undefined) {
        params.delete('platform')
        updates.platforms.forEach((p) => params.append('platform', p))
      }
      if (updates.statuses !== undefined) {
        params.delete('status')
        updates.statuses.forEach((s) => params.append('status', s))
      }
      if (updates.query !== undefined) {
        if (updates.query) params.set('q', updates.query)
        else params.delete('q')
      }

      const qs = params.toString()
      router.push(qs ? `${pathname}?${qs}` : pathname, { scroll: false })
    },
    [searchParams, pathname, router],
  )

  const togglePlatform = useCallback(
    (platform: Platform) => {
      const next = filters.platforms.includes(platform)
        ? filters.platforms.filter((p) => p !== platform)
        : [...filters.platforms, platform]
      updateParams({ platforms: next })
    },
    [filters.platforms, updateParams],
  )

  const toggleStatus = useCallback(
    (status: PostStatus) => {
      const next = filters.statuses.includes(status)
        ? filters.statuses.filter((s) => s !== status)
        : [...filters.statuses, status]
      updateParams({ statuses: next })
    },
    [filters.statuses, updateParams],
  )

  /**
   * Updates the content search query in the URL.
   * Call this from a debounced handler to avoid a URL push on every keystroke.
   */
  const setQuery = useCallback(
    (query: string) => updateParams({ query }),
    [updateParams],
  )

  const clearFilters = useCallback(() => {
    router.push(pathname, { scroll: false })
  }, [pathname, router])

  return {
    filters,
    hasActiveFilters,
    togglePlatform,
    toggleStatus,
    setQuery,
    clearFilters,
  }
}
