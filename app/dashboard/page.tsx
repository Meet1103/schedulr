import type { Metadata } from 'next'
import { Suspense } from 'react'
import { AppHeader } from '@/components/layout/app-header'
import { AppSidebar } from '@/components/layout/app-sidebar'
import { PostComposer } from '@/features/posts/components/post-composer'
import { PostFilters } from '@/features/posts/components/post-filters'
import { PostQueue } from '@/features/posts/components/post-queue'
import { PostQueueSkeleton } from '@/features/posts/components/post-queue-skeleton'
import { ComposerProvider } from '@/features/posts/context/composer-context'

export const metadata: Metadata = {
  title: 'Queue - Schedulr',
  description: 'View and manage your scheduled social media posts.',
}

export default function DashboardPage() {
  return (
    <ComposerProvider>
      <div className="flex h-screen overflow-hidden bg-background">
        <AppSidebar />

        <div className="flex flex-1 flex-col overflow-hidden">
          <AppHeader title="Queue" />

          <Suspense fallback={<div className="h-24 border-b border-border bg-background" />}>
            <PostFilters />
          </Suspense>

          <main
            id="main-content"
            aria-label="Post queue"
            className="flex-1 overflow-y-auto"
          >
            <Suspense fallback={<PostQueueSkeleton />}>
              <PostQueue />
            </Suspense>
          </main>
        </div>

        {/* Global Post Composer Dialog */}
        <PostComposer />
      </div>
    </ComposerProvider>
  )
}
