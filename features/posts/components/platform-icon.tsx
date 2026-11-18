import { cn } from 'cn'
import type { Platform } from '@/features/posts/types/post'
import { PLATFORM_LABELS } from '@/lib/constants'

/**
 * Platform icons — Lucide v1.59 no longer ships social brand icons.
 * We use minimal custom SVG glyphs that are recognisable and accessible.
 */

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  )
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  )
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.19 8.19 0 0 0 4.79 1.53V6.77a4.85 4.85 0 0 1-1.02-.08Z" />
    </svg>
  )
}

interface PlatformIconConfig {
  Icon: React.ComponentType<{ className?: string }>
  bg: string
  fg: string
}

const PLATFORM_ICON_CONFIG: Record<Platform, PlatformIconConfig> = {
  instagram: {
    Icon: InstagramIcon,
    bg: 'bg-pink-100 dark:bg-pink-950/50',
    fg: 'text-pink-600 dark:text-pink-400',
  },
  facebook: {
    Icon: FacebookIcon,
    bg: 'bg-blue-100 dark:bg-blue-950/50',
    fg: 'text-blue-600 dark:text-blue-400',
  },
  x: {
    Icon: XIcon,
    bg: 'bg-neutral-100 dark:bg-neutral-800',
    fg: 'text-neutral-900 dark:text-neutral-100',
  },
  tiktok: {
    Icon: TikTokIcon,
    bg: 'bg-neutral-100 dark:bg-neutral-800',
    fg: 'text-neutral-900 dark:text-neutral-100',
  },
}

interface PlatformIconProps {
  platform: Platform
  size?: 'sm' | 'md'
  className?: string
}

export function PlatformIcon({ platform, size = 'sm', className }: PlatformIconProps) {
  const { Icon, bg, fg } = PLATFORM_ICON_CONFIG[platform]
  const label = PLATFORM_LABELS[platform]
  return (
    <span
      title={label}
      aria-label={label}
      className={cn(
        'inline-flex shrink-0 items-center justify-center rounded-md',
        size === 'sm' ? 'size-6' : 'size-8',
        bg,
        fg,
        className,
      )}
    >
      <Icon className={size === 'sm' ? 'size-3' : 'size-4'} />
    </span>
  )
}

interface PlatformIconGroupProps {
  platforms: Platform[]
  size?: 'sm' | 'md'
  className?: string
}

export function PlatformIconGroup({ platforms, size = 'sm', className }: PlatformIconGroupProps) {
  return (
    <div className={cn('flex items-center gap-1', className)}>
      {platforms.map((p) => (
        <PlatformIcon key={p} platform={p} size={size} />
      ))}
    </div>
  )
}
