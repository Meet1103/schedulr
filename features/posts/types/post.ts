export type Platform = 'instagram' | 'facebook' | 'x' | 'tiktok'

export type PostStatus = 'scheduled' | 'published' | 'failed'

/**
 * A scheduled / published / failed social media post.
 * `scheduledAt` is always stored as UTC ISO 8601.
 * Display formatting to local time is handled in timezone utilities.
 */
export interface Post {
  id: string
  content: string
  platforms: Platform[]
  /** Optional https:// image URL. Never assumed to be always loadable. */
  mediaUrl?: string
  /** UTC ISO 8601 timestamp, e.g. "2026-10-18T14:00:00.000Z" */
  scheduledAt: string
  status: PostStatus
  /** Present only when status === 'failed' */
  errorMessage?: string
}

/**
 * Input accepted by the mock API's createPost function.
 * `scheduledAt` must already be converted to UTC before calling the API.
 */
export interface CreatePostApiInput {
  content: string
  platforms: Platform[]
  /** Optional https:// URL; empty string is treated as no media */
  mediaUrl?: string
  /** UTC ISO 8601 */
  scheduledAt: string
}

/**
 * Typed error thrown by mock API functions.
 */
export class ApiError extends Error {
  constructor(
    message: string,
    public readonly code: string = 'API_ERROR',
  ) {
    super(message)
    this.name = 'ApiError'
  }
}
