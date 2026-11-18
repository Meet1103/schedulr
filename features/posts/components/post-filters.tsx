'use client'

import { cn } from 'cn'
import { Search, SlidersHorizontal, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Input } from '@/components/ui/input'
import { PLATFORM_LABELS, PLATFORMS, POST_STATUSES } from '@/lib/constants'
import { usePostFilters } from '@/features/posts/hooks/use-post-filters'
import { PlatformIcon } from './platform-icon'

const STATUS_LABELS: Record<string, string> = {
  scheduled: 'Scheduled',
  published: 'Published',
  failed: 'Failed',
}

const STATUS_ACTIVE_CLASS: Record<string, string> = {
  scheduled: 'bg-blue-600 text-white border-transparent',
  published: 'bg-emerald-600 text-white border-transparent',
  failed:    'bg-red-600 text-white border-transparent',
}

export function PostFilters() {
  const { filters, hasActiveFilters, togglePlatform, toggleStatus, setQuery, clearFilters } =
    usePostFilters()

  // Local state drives the input immediately; URL is updated after debounce
  const [localQuery, setLocalQuery] = useState(filters.query)

  // Ref lets the debounce effect compare against latest URL value without
  // adding it to the dependency array (which would cause an update loop)
  const urlQueryRef = useRef(filters.query)
  useEffect(() => {
    urlQueryRef.current = filters.query
  }, [filters.query])

  // Sync input when URL query changes externally (Back/Forward, Clear filters)
  useEffect(() => {
    setLocalQuery(filters.query)
  }, [filters.query])

  // Debounce search: push to URL 300 ms after the user stops typing
  useEffect(() => {
    const timer = setTimeout(() => {
      if (localQuery !== urlQueryRef.current) {
        setQuery(localQuery)
      }
    }, 300)
    return () => clearTimeout(timer)
  }, [localQuery, setQuery])

  const activeCount =
    filters.platforms.length + filters.statuses.length + (filters.query ? 1 : 0)

  return (
    <div
      className="border-b border-border bg-background px-6 py-3"
      aria-label="Post filters"
      role="search"
    >
      {/* Row 1: Search input */}
      <div className="relative mb-3">
        <Search
          className="pointer-events-none absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground"
          aria-hidden="true"
        />
        <Input
          type="search"
          placeholder="Search posts…"
          value={localQuery}
          onChange={(e) => setLocalQuery(e.target.value)}
          aria-label="Search posts by content"
          className="h-8 pl-9 text-sm"
        />
      </div>

      {/* Row 2: Filter chips + clear */}
      <div className="flex flex-wrap items-center gap-2">
        {/* Filter icon label */}
        <span className="flex items-center gap-1 text-xs text-muted-foreground">
          <SlidersHorizontal className="size-3" aria-hidden="true" />
          <span className="sr-only">Filters:</span>
        </span>

        {/* Platform chips */}
        <div className="flex items-center gap-1" role="group" aria-label="Filter by platform">
          {PLATFORMS.map((platform) => {
            const active = filters.platforms.includes(platform)
            return (
              <button
                key={platform}
                type="button"
                onClick={() => togglePlatform(platform)}
                aria-pressed={active}
                aria-label={`${active ? 'Remove' : 'Add'} ${PLATFORM_LABELS[platform]} filter`}
                className={cn(
                  'inline-flex cursor-pointer items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                  active
                    ? 'border-transparent bg-primary text-primary-foreground'
                    : 'border-border bg-background text-muted-foreground hover:bg-muted hover:text-foreground',
                )}
              >
                <PlatformIcon platform={platform} size="sm" className="size-3.5 rounded-sm" />
                {PLATFORM_LABELS[platform]}
              </button>
            )
          })}
        </div>

        {/* Divider */}
        <div className="h-4 w-px bg-border" aria-hidden="true" />

        {/* Status chips */}
        <div className="flex items-center gap-1" role="group" aria-label="Filter by status">
          {POST_STATUSES.map((status) => {
            const active = filters.statuses.includes(status)
            return (
              <button
                key={status}
                type="button"
                onClick={() => toggleStatus(status)}
                aria-pressed={active}
                aria-label={`${active ? 'Remove' : 'Add'} ${STATUS_LABELS[status]} filter`}
                className={cn(
                  'inline-flex cursor-pointer items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                  active
                    ? STATUS_ACTIVE_CLASS[status]
                    : 'border-border bg-background text-muted-foreground hover:bg-muted hover:text-foreground',
                )}
              >
                {STATUS_LABELS[status]}
              </button>
            )
          })}
        </div>

        {/* Active filter count + clear */}
        {hasActiveFilters && (
          <>
            <div className="h-4 w-px bg-border" aria-hidden="true" />
            <button
              type="button"
              onClick={clearFilters}
              aria-label="Clear all filters"
              className="inline-flex cursor-pointer items-center gap-1 rounded-md px-1.5 py-0.5 text-xs text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <X className="size-3" aria-hidden="true" />
              Clear
              {activeCount > 0 && (
                <span className="ml-0.5 inline-flex size-4 items-center justify-center rounded-full bg-primary text-[10px] font-semibold text-primary-foreground">
                  {activeCount}
                </span>
              )}
            </button>
          </>
        )}
      </div>
    </div>
  )
}
