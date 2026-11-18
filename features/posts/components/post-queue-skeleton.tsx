import { Skeleton } from '@/components/ui/skeleton'

function PostCardSkeleton() {
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-border bg-card p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <Skeleton className="size-6 rounded-md" />
          <Skeleton className="size-6 rounded-md" />
        </div>
        <Skeleton className="h-5 w-20 rounded-full" />
      </div>
      <div className="space-y-1.5">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-4/5" />
      </div>
      <div className="flex items-center justify-between">
        <Skeleton className="h-3.5 w-24" />
        <Skeleton className="h-3.5 w-16" />
      </div>
    </div>
  )
}

function DayGroupSkeleton() {
  return (
    <div className="space-y-3">
      <Skeleton className="h-5 w-28" />
      <div className="space-y-3">
        <PostCardSkeleton />
        <PostCardSkeleton />
        <PostCardSkeleton />
      </div>
    </div>
  )
}

export function PostQueueSkeleton() {
  return (
    <div className="space-y-8 p-6" aria-busy="true" aria-label="Loading posts">
      <DayGroupSkeleton />
      <DayGroupSkeleton />
    </div>
  )
}
