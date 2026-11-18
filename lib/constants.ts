import type { Platform, PostStatus } from '@/features/posts/types/post'

// TanStack Query keys
export const QUERY_KEYS = {
  posts: ['posts'] as const,
} as const

// Ordered list of supported platforms
export const PLATFORMS: Platform[] = ['instagram', 'facebook', 'x', 'tiktok']

// All valid post statuses
export const POST_STATUSES: PostStatus[] = ['scheduled', 'published', 'failed']

// Simulated network delays (ms)
export const MOCK_DELAYS = {
  fetchPosts: 800,
  createPost: 600,
  retryPost: 1000,
} as const

// Probability of failure for retryPost (20%)
export const RETRY_FAILURE_RATE = 0.2

// Human-readable platform display names
export const PLATFORM_LABELS: Record<Platform, string> = {
  instagram: 'Instagram',
  facebook: 'Facebook',
  x: 'X (Twitter)',
  tiktok: 'TikTok',
}
