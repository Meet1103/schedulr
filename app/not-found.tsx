import { CalendarClock } from 'lucide-react'
import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-background px-4 text-center">
      <div className="flex size-14 items-center justify-center rounded-2xl bg-primary">
        <CalendarClock className="size-7 text-primary-foreground" aria-hidden="true" />
      </div>
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          Page not found
        </h1>
        <p className="text-sm text-muted-foreground">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
      </div>
      <Link href="/dashboard" className={buttonVariants({ size: 'sm' })}>
        Back to Queue
      </Link>
    </div>
  )
}
