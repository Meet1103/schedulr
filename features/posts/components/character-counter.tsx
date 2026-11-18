'use client'

import { AlertTriangle } from 'lucide-react'
import { cn } from 'cn'
import { PLATFORM_LABELS } from '@/lib/constants'
import type { Platform } from '@/features/posts/types/post'
import {
  PLATFORM_LIMITS,
  getEffectiveLimit,
  getExceededPlatforms,
} from '@/features/posts/utils/character-limits'
import { PlatformIcon } from './platform-icon'

interface CharacterCounterProps {
  content: string
  platforms: Platform[]
}

/**
 * Live character counter for each selected platform and strictest limit warning.
 *
 * NOTE: Counts JavaScript string length (UTF-16 code units) as a simplified
 * approximation of platform limits, as specified in PRD FR-5.
 */
export function CharacterCounter({ content, platforms }: CharacterCounterProps) {
  if (platforms.length === 0) return null

  const length = content.length
  const strictestLimit = getEffectiveLimit(platforms)
  const exceededPlatforms = getExceededPlatforms(content, platforms)
  const hasExceeded = exceededPlatforms.length > 0

  return (
    <div className="space-y-2 pt-1" aria-live="polite">
      {/* Platform individual counters */}
      <div className="flex flex-wrap items-center gap-2">
        {platforms.map((platform) => {
          const limit = PLATFORM_LIMITS[platform]
          const isOver = length > limit
          const remaining = limit - length
          const isWarning = !isOver && remaining <= 20

          return (
            <div
              key={platform}
              className={cn(
                'inline-flex items-center gap-1.5 rounded-md border px-2 py-1 text-xs transition-colors',
                isOver
                  ? 'border-red-200 bg-red-50 text-red-700 font-medium dark:border-red-900 dark:bg-red-950/40 dark:text-red-300'
                  : isWarning
                  ? 'border-amber-200 bg-amber-50 text-amber-800 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-300'
                  : 'border-border bg-muted/40 text-muted-foreground'
              )}
            >
              <PlatformIcon platform={platform} size="sm" className="size-3.5 rounded-xs" />
              <span>{PLATFORM_LABELS[platform]}:</span>
              <span className={cn('tabular-nums font-mono', isOver && 'font-bold')}>
                {length} / {limit.toLocaleString()}
              </span>
            </div>
          )
        })}
      </div>

      {/* Warning banner when any platform limit is exceeded */}
      {hasExceeded && (
        <div
          role="alert"
          className="flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 p-2.5 text-xs text-red-700 dark:border-red-900/60 dark:bg-red-950/30 dark:text-red-400 min-w-0 max-w-full"
        >
          <AlertTriangle className="size-4 shrink-0 text-red-600 dark:text-red-400" aria-hidden="true" />
          <div className="min-w-0 flex-1 break-words [overflow-wrap:anywhere]">
            <span className="font-semibold">Character limit exceeded</span>
            <p className="mt-0.5 break-words [overflow-wrap:anywhere]">
              Your content exceeds the maximum limit for{' '}
              <span className="font-semibold">
                {exceededPlatforms.map((p) => PLATFORM_LABELS[p]).join(', ')}
              </span>
              . Strictest active limit is {strictestLimit.toLocaleString()} characters.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
