'use client'

import { cn } from 'cn'
import { BarChart2, CalendarClock, Settings, Users } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { useComposer } from '@/features/posts/context/composer-context'

function AppLogo() {
  return (
    <div className="flex items-center gap-2.5">
      <div className="flex size-7 items-center justify-center rounded-lg bg-primary">
        <CalendarClock className="size-4 text-primary-foreground" aria-hidden="true" />
      </div>
      <span className="text-sm font-semibold tracking-tight text-foreground">Schedulr</span>
    </div>
  )
}

interface NavItem {
  label: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  disabled?: boolean
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Queue',     href: '/dashboard', icon: CalendarClock              },
  { label: 'Analytics', href: '#',          icon: BarChart2,  disabled: true },
  { label: 'Team',      href: '#',          icon: Users,      disabled: true },
  { label: 'Settings',  href: '#',          icon: Settings,   disabled: true },
]

export function AppSidebar() {
  const { openComposer } = useComposer()
  const pathname = usePathname()

  return (
    <aside
      aria-label="Main navigation"
      className="hidden lg:flex lg:w-56 lg:shrink-0 lg:flex-col lg:border-r lg:border-border lg:bg-sidebar"
    >
      {/* Wordmark */}
      <div className="flex h-14 items-center border-b border-border px-4">
        <AppLogo />
      </div>

      {/* Nav links */}
      <nav aria-label="Primary" className="flex flex-1 flex-col gap-0.5 overflow-y-auto px-2 py-3">
        {NAV_ITEMS.map((item) => {
          const isActive =
            item.href === '/dashboard'
              ? pathname === '/dashboard' || pathname === '/'
              : pathname === item.href

          return (
            <Link
              key={item.label}
              href={item.href}
              aria-disabled={item.disabled}
              aria-current={isActive ? 'page' : undefined}
              tabIndex={item.disabled ? -1 : undefined}
              className={cn(
                'flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-primary/8 text-foreground'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                item.disabled && 'pointer-events-none opacity-40',
              )}
            >
              <item.icon className="size-4 shrink-0" aria-hidden="true" />
              {item.label}
            </Link>
          )
        })}
      </nav>

      <Separator />

      {/* Create Post CTA */}
      <div className="p-3">
        <Button
          className="w-full"
          size="sm"
          onClick={openComposer}
          aria-label="Create a new post"
        >
          + Create Post
        </Button>
      </div>
    </aside>
  )
}
