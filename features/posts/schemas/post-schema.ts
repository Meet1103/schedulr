import { z } from 'zod'
import { getExceededPlatforms } from '@/features/posts/utils/character-limits'

// ---------------------------------------------------------------------------
// Primitive enum schemas
// ---------------------------------------------------------------------------

export const platformSchema = z.enum(['instagram', 'facebook', 'x', 'tiktok'])

export const postStatusSchema = z.enum(['scheduled', 'published', 'failed'])

// ---------------------------------------------------------------------------
// Full Post object schema
// Used for validating posts at the mock API boundary and in tests.
// ---------------------------------------------------------------------------

export const postSchema = z.object({
  id: z.string().min(1, 'id is required'),
  content: z.string().min(1, 'content is required'),
  platforms: z
    .array(platformSchema)
    .min(1, 'At least one platform is required'),
  mediaUrl: z
    .string()
    .refine(
      (val) => {
        try {
          const url = new URL(val)
          return url.protocol === 'https:'
        } catch {
          return false
        }
      },
      { message: 'mediaUrl must be a valid https:// URL' },
    )
    .optional(),
  scheduledAt: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), {
      message: 'scheduledAt must be a valid ISO date string',
    }),
  status: postStatusSchema,
  errorMessage: z.string().optional(),
})

// ---------------------------------------------------------------------------
// API input schema
// Used to validate the payload passed to the mock createPost API function.
// `scheduledAt` must already be converted to UTC before reaching the API.
// ---------------------------------------------------------------------------

export const createPostApiInputSchema = z.object({
  content: z.string().min(1, 'Content is required'),
  platforms: z
    .array(platformSchema)
    .min(1, 'At least one platform is required'),
  mediaUrl: z
    .string()
    .refine(
      (val) => {
        if (!val || val.trim() === '') return true
        try {
          const url = new URL(val)
          return url.protocol === 'https:'
        } catch {
          return false
        }
      },
      { message: 'mediaUrl must be a valid https:// URL' },
    )
    .optional(),
  scheduledAt: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), {
      message: 'scheduledAt must be a valid ISO date string',
    })
    .refine((val) => new Date(val) > new Date(), {
      message: 'scheduledAt must be a future time',
    }),
})

// ---------------------------------------------------------------------------
// Form input schema (used in Step 4: React Hook Form + zodResolver)
// Date and time are kept as separate string fields here.
// The hook converts them to a single UTC timestamp before calling the API.
// ---------------------------------------------------------------------------

export const createPostFormSchema = z
  .object({
    content: z.string().min(1, 'Content is required'),
    platforms: z
      .array(platformSchema)
      .min(1, 'Select at least one platform'),
    mediaUrl: z
      .string()
      .refine(
        (val) => {
          if (!val || val.trim() === '') return true
          try {
            const url = new URL(val)
            return url.protocol === 'https:'
          } catch {
            return false
          }
        },
        { message: 'Must be a valid https:// URL' },
      )
      .optional(),
    scheduledDate: z.string().min(1, 'Date is required'),
    scheduledTime: z.string().min(1, 'Time is required'),
  })
  .superRefine((data, ctx) => {
    if (data.content && data.platforms && data.platforms.length > 0) {
      const exceeded = getExceededPlatforms(data.content, data.platforms)
      if (exceeded.length > 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `Content exceeds character limit for ${exceeded.join(', ')}`,
          path: ['content'],
        })
      }
    }

    if (data.scheduledDate && data.scheduledTime) {
      const combined = new Date(`${data.scheduledDate}T${data.scheduledTime}:00`)
      if (isNaN(combined.getTime())) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Invalid date and time combination',
          path: ['scheduledDate'],
        })
      } else if (combined <= new Date()) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Scheduled time must be in the future',
          path: ['scheduledTime'],
        })
      }
    }
  })

// ---------------------------------------------------------------------------
// Inferred TypeScript types from schemas
// ---------------------------------------------------------------------------

export type PostSchemaType = z.infer<typeof postSchema>
export type CreatePostApiInputType = z.infer<typeof createPostApiInputSchema>
export type CreatePostFormValues = z.infer<typeof createPostFormSchema>
