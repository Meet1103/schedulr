import type { Platform } from '@/features/posts/types/post'

/**
 * Maximum character limits per platform.
 *
 * NOTE: These limits use JavaScript's String.prototype.length (UTF-16 code units),
 * which is a simplified approximation. Each platform has its own Unicode counting
 * rules (e.g. Twitter's weighted character algorithm). This is a frontend mock only
 * and does not guarantee compliance with actual platform behaviour.
 */
export const PLATFORM_LIMITS: Record<Platform, number> = {
  x: 280,
  instagram: 2_200,
  tiktok: 2_200,
  facebook: 5_000,
}

/**
 * Returns the most restrictive character limit across the selected platforms.
 * When no platforms are selected, returns Infinity (no restriction).
 */
export function getEffectiveLimit(platforms: Platform[]): number {
  if (platforms.length === 0) return Infinity
  return Math.min(...platforms.map((p) => PLATFORM_LIMITS[p]))
}

/**
 * Returns true if the content is within the effective limit.
 */
export function isWithinLimit(content: string, platforms: Platform[]): boolean {
  if (platforms.length === 0) return true
  return content.length <= getEffectiveLimit(platforms)
}

/**
 * Returns the number of characters remaining before the effective limit is reached.
 * Negative values indicate overflow.
 */
export function getRemainingChars(content: string, platforms: Platform[]): number {
  const limit = getEffectiveLimit(platforms)
  if (limit === Infinity) return Infinity
  return limit - content.length
}

/**
 * Returns the platform(s) whose limit is exceeded by the given content.
 */
export function getExceededPlatforms(content: string, platforms: Platform[]): Platform[] {
  return platforms.filter((p) => content.length > PLATFORM_LIMITS[p])
}
