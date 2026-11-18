'use client'

import { cn } from 'cn'
import { CalendarClock, Menu, X } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { useComposer } from '@/features/posts/context/composer-context'

interface AppHeaderProps {
  title?: string
}

export function AppHeader({ title = 'Queue' }: AppHeaderProps) {
  const [open, setOpen] = useState(false)
  const { openComposer } = useComposer()

  const handleCreatePost = () => {
    setOpen(false)
    openComposer()
  }

  return (
    <>
      {/* Sticky header bar */}
      <header className="sticky top-0 z-30 flex h-14 items-center border-b border-border bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        {/* Mobile: hamburger + wordmark */}
        <div className="flex flex-1 items-center gap-3 lg:hidden">
          <Button
            variant="ghost"
            size="icon-sm"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-4" aria-hidden="true" /> : <Menu className="size-4" aria-hidden="true" />}
          </Button>
          <div className="flex items-center gap-2">
            <div className="flex size-6 items-center justify-center rounded-md bg-primary">
              <CalendarClock className="size-3.5 text-primary-foreground" aria-hidden="true" />
            </div>
            <span className="text-sm font-semibold tracking-tight">Schedulr</span>
          </div>
        </div>

        {/* Desktop: page title */}
        <div className="hidden flex-1 items-center lg:flex">
          <h1 className="text-sm font-semibold text-foreground">{title}</h1>
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            className="hidden lg:inline-flex"
            onClick={openComposer}
            aria-label="Create a new post"
          >
            + Create Post
          </Button>
          <Button
            size="icon-sm"
            className="lg:hidden"
            onClick={openComposer}
            aria-label="Create a new post"
          >
            +
          </Button>
        </div>
      </header>

      {/* Mobile nav overlay */}
      {open && (
        <div
          id="mobile-nav"
          role="dialog"
          aria-label="Navigation menu"
          aria-modal="true"
          className="fixed inset-0 z-40 lg:hidden"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40"
            aria-hidden="true"
            onClick={() => setOpen(false)}
          />

          {/* Drawer */}
          <nav
            aria-label="Mobile navigation"
            className="absolute left-0 top-0 flex h-full w-64 flex-col border-r border-border bg-background shadow-xl"
          >
            <div className="flex h-14 items-center justify-between border-b border-border px-4">
              <div className="flex items-center gap-2.5">
                <div className="flex size-7 items-center justify-center rounded-lg bg-primary">
                  <CalendarClock className="size-4 text-primary-foreground" aria-hidden="true" />
                </div>
                <span className="text-sm font-semibold tracking-tight">Schedulr</span>
              </div>
              <Button variant="ghost" size="icon-sm" aria-label="Close menu" onClick={() => setOpen(false)}>
                <X className="size-4" aria-hidden="true" />
              </Button>
            </div>

            <div className="flex flex-1 flex-col gap-0.5 overflow-y-auto px-2 py-3">
              {[
                { label: 'Queue',     href: '/dashboard', active: true  },
                { label: 'Analytics', href: '#',          disabled: true },
                { label: 'Team',      href: '#',          disabled: true },
                { label: 'Settings',  href: '#',          disabled: true },
              ].map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  aria-current={'active' in item && item.active ? 'page' : undefined}
                  aria-disabled={'disabled' in item && item.disabled}
                  tabIndex={'disabled' in item && item.disabled ? -1 : undefined}
                  className={cn(
                    'flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                    'active' in item && item.active
                      ? 'bg-primary/8 text-foreground'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                    'disabled' in item && item.disabled && 'pointer-events-none opacity-40',
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <Separator />
            <div className="p-3">
              <Button
                className="w-full"
                size="sm"
                onClick={handleCreatePost}
                aria-label="Create a new post"
              >
                + Create Post
              </Button>
            </div>
          </nav>
        </div>
      )}
    </>
  )
}
