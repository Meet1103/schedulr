import { mockPosts } from '@/features/posts/data/mock-posts'
import { createPostApiInputSchema, postSchema } from '@/features/posts/schemas/post-schema'
import { ApiError, type CreatePostApiInput, type Post } from '@/features/posts/types/post'
import { MOCK_DELAYS, RETRY_FAILURE_RATE } from '@/lib/constants'

// ---------------------------------------------------------------------------
// In-memory post store
// Initialized from mock fixtures. Mutations (create, retry) persist for the
// duration of the browser session. This simulates a simple backend data layer.
//
// LIMITATION: State is not persisted across page reloads. This is a
// frontend-only mock — no real database or server is involved.
// ---------------------------------------------------------------------------

let store: Post[] = mockPosts.map((p) => ({ ...p }))

/** Resets the in-memory store to the original mock data. Intended for tests only. */
export function __resetStore(): void {
  store = mockPosts.map((p) => ({ ...p }))
}

/** Returns a shallow copy of the store to prevent external mutation. */
function getStore(): Post[] {
  return store.map((p) => ({ ...p }))
}

// ---------------------------------------------------------------------------
// fetchPosts
// ---------------------------------------------------------------------------

/**
 * Simulates fetching all posts from a remote API.
 * Returns a copy of the in-memory store after an 800ms delay.
 */
export async function fetchPosts(): Promise<Post[]> {
  await delay(MOCK_DELAYS.fetchPosts)
  return getStore()
}

// ---------------------------------------------------------------------------
// createPost
// ---------------------------------------------------------------------------

/**
 * Simulates creating a new scheduled post.
 *
 * Validates the input at the API boundary with Zod.
 * On success, appends the new post to the in-memory store and returns it.
 * Throws ApiError on validation failure.
 *
 * Delay: 600ms
 */
export async function createPost(input: CreatePostApiInput): Promise<Post> {
  await delay(MOCK_DELAYS.createPost)

  // Validate at the API boundary (security requirement)
  const result = createPostApiInputSchema.safeParse(input)
  if (!result.success) {
    const message = result.error.issues.map((i) => i.message).join('; ')
    throw new ApiError(`Validation failed: ${message}`, 'VALIDATION_ERROR')
  }

  const newPost: Post = {
    id: generateId(),
    content: result.data.content,
    platforms: result.data.platforms,
    mediaUrl: result.data.mediaUrl || undefined,
    scheduledAt: result.data.scheduledAt,
    status: 'scheduled',
  }

  // Validate the assembled post object for consistency
  const postValidation = postSchema.safeParse(newPost)
  if (!postValidation.success) {
    const message = postValidation.error.issues.map((i) => i.message).join('; ')
    throw new ApiError(`Post assembly failed: ${message}`, 'INTERNAL_ERROR')
  }

  store.push(newPost)
  return { ...newPost }
}

// ---------------------------------------------------------------------------
// retryPost
// ---------------------------------------------------------------------------

/**
 * Simulates retrying a failed post.
 *
 * - 1000ms delay to simulate a real network request.
 * - 20% failure probability by default (injectable for deterministic testing).
 *
 * On success: updates the post's status to 'published' and clears errorMessage.
 * On failure: throws ApiError — the caller is responsible for rollback.
 *
 * @param id      - The ID of the post to retry.
 * @param rng     - A function returning a number in [0, 1). Defaults to Math.random.
 *                  Inject a deterministic function in tests:
 *                    `retryPost(id, () => 0.1)` → always fails (0.1 < 0.2)
 *                    `retryPost(id, () => 0.5)` → always succeeds (0.5 >= 0.2)
 */
export async function retryPost(
  id: string,
  rng: () => number = Math.random,
): Promise<Post> {
  await delay(MOCK_DELAYS.retryPost)

  const index = store.findIndex((p) => p.id === id)
  if (index === -1) {
    throw new ApiError(`Post not found: ${id}`, 'NOT_FOUND')
  }

  const post = store[index]
  if (post.status !== 'failed') {
    throw new ApiError(
      `Post ${id} is not in a failed state (current: ${post.status})`,
      'INVALID_STATE',
    )
  }

  // 20% simulated failure
  if (rng() < RETRY_FAILURE_RATE) {
    throw new ApiError(
      'Retry failed: The platform returned an error. Please try again.',
      'RETRY_FAILED',
    )
  }

  // Success — update in-place and return a copy
  store[index] = {
    ...post,
    status: 'published',
    errorMessage: undefined,
  }

  return { ...store[index] }
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function generateId(): string {
  return `post-${Date.now()}-${Math.floor(Math.random() * 10_000)
    .toString()
    .padStart(4, '0')}`
}
