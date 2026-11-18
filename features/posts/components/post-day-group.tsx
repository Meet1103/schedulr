import type { DayGroup } from '@/features/posts/utils/group-posts-by-day'
import { PostCard } from './post-card'

interface PostDayGroupProps {
  group: DayGroup
}

export function PostDayGroup({ group }: PostDayGroupProps) {
  return (
    <section aria-labelledby={`day-group-${group.dateKey}`}>
      <h2
        id={`day-group-${group.dateKey}`}
        className="mb-3 text-sm font-semibold text-foreground"
      >
        {group.label}
        <span className="ml-2 font-normal text-muted-foreground">
          {group.posts.length} {group.posts.length === 1 ? 'post' : 'posts'}
        </span>
      </h2>

      <div className="flex flex-col gap-3" role="list" aria-label={`Posts for ${group.label}`}>
        {group.posts.map((post) => (
          <div key={post.id} role="listitem">
            <PostCard post={post} />
          </div>
        ))}
      </div>
    </section>
  )
}
