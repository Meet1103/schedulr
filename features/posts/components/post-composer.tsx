'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { CalendarClock, Globe, Loader2, Sparkles } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { PLATFORMS, PLATFORM_LABELS } from '@/lib/constants'
import { useComposer } from '@/features/posts/context/composer-context'
import { useCreatePost } from '@/features/posts/hooks/use-create-post'
import {
  createPostFormSchema,
  type CreatePostFormValues,
} from '@/features/posts/schemas/post-schema'
import type { Platform } from '@/features/posts/types/post'
import { getEffectiveLimit } from '@/features/posts/utils/character-limits'
import { getLocalTimezone, toUTC } from '@/features/posts/utils/timezone'
import { CharacterCounter } from './character-counter'
import { PlatformIcon } from './platform-icon'

/** Computes default scheduling time: 1 hour in the future, rounded to nearest 15 mins */
function getDefaultDateTime() {
  const d = new Date()
  d.setHours(d.getHours() + 1)
  d.setMinutes(Math.ceil(d.getMinutes() / 15) * 15)
  if (d.getMinutes() === 60) {
    d.setHours(d.getHours() + 1)
    d.setMinutes(0)
  }

  const yyyy = d.getFullYear()
  const mm = String(d.getMonth() + 1).padStart(2, '0')
  const dd = String(d.getDate()).padStart(2, '0')
  const hh = String(d.getHours()).padStart(2, '0')
  const min = String(d.getMinutes()).padStart(2, '0')

  return {
    date: `${yyyy}-${mm}-${dd}`,
    time: `${hh}:${min}`,
  }
}

export function PostComposer() {
  const { isOpen, closeComposer } = useComposer()
  const [minDate, setMinDate] = useState<string>('')
  const [userTimezone, setUserTimezone] = useState<string>('UTC')

  const {
    control,
    register,
    handleSubmit,
    watch,
    setValue,
    setError,
    reset,
    formState: { errors },
  } = useForm<CreatePostFormValues>({
    resolver: zodResolver(createPostFormSchema),
    defaultValues: {
      content: '',
      platforms: ['x'],
      mediaUrl: '',
      scheduledDate: '',
      scheduledTime: '',
    },
  })

  const handleClose = () => {
    if (isPending) return
    closeComposer()
  }

  // Initialize dynamic date/time on client mount or dialog open to support Next.js prerendering
  useEffect(() => {
    setUserTimezone(getLocalTimezone())
    const today = new Date()
    setMinDate(
      `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(
        today.getDate()
      ).padStart(2, '0')}`
    )
  }, [])

  useEffect(() => {
    if (isOpen) {
      const dt = getDefaultDateTime()
      setValue('scheduledDate', dt.date, { shouldValidate: true })
      setValue('scheduledTime', dt.time, { shouldValidate: true })
    } else {
      // Clear all state when modal is closed
      const dt = getDefaultDateTime()
      reset({
        content: '',
        platforms: ['x'],
        mediaUrl: '',
        scheduledDate: dt.date,
        scheduledTime: dt.time,
      })
    }
  }, [isOpen, setValue, reset])

  const { mutate: schedulePost, isPending } = useCreatePost({
    onSuccess: () => {
      closeComposer()
    },
  })

  const watchedContent = watch('content') || ''
  const watchedPlatforms = watch('platforms') || []

  // Check if character limit is exceeded to disable submit button
  const effectiveLimit = getEffectiveLimit(watchedPlatforms)
  const isOverLimit = watchedContent.length > effectiveLimit

  const togglePlatform = (p: Platform) => {
    const current = watchedPlatforms
    const next = current.includes(p)
      ? current.filter((item) => item !== p)
      : [...current, p]
    setValue('platforms', next, { shouldValidate: true })
  }

  const onSubmit = (values: CreatePostFormValues) => {
    // Convert local date/time into UTC ISO timestamp
    const utcScheduledAt = toUTC(values.scheduledDate, values.scheduledTime)

    // Re-verify that time is strictly in the future at submission time
    if (new Date(utcScheduledAt) <= new Date()) {
      setError('scheduledTime', { message: 'Scheduled time must be in the future' })
      return
    }

    schedulePost({
      content: values.content,
      platforms: values.platforms,
      mediaUrl: values.mediaUrl?.trim() || undefined,
      scheduledAt: utcScheduledAt,
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !isPending && (open ? null : handleClose())}>
      <DialogContent className="h-[95vh] overflow-y-auto overflow-x-hidden w-full sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-lg">
            <CalendarClock className="size-5 text-primary" aria-hidden="true" />
            Schedule New Post
          </DialogTitle>
          <DialogDescription>
            Compose your post and schedule it across your social channels.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-2">
          {/* Platform Selector */}
          <div className="space-y-2">
            <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Target Platforms <span className="text-destructive">*</span>
            </Label>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {PLATFORMS.map((platform) => {
                const isSelected = watchedPlatforms.includes(platform)
                return (
                  <button
                    key={platform}
                    type="button"
                    onClick={() => togglePlatform(platform)}
                    disabled={isPending}
                    aria-pressed={isSelected}
                    className={`flex cursor-pointer items-center justify-center gap-2 rounded-lg border p-2 text-xs font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed ${
                      isSelected
                        ? 'border-primary bg-primary/10 text-primary font-semibold shadow-xs'
                        : 'border-border bg-background text-muted-foreground hover:bg-muted/70 hover:text-foreground'
                    }`}
                  >
                    <PlatformIcon platform={platform} size="sm" className="size-4 rounded-xs" />
                    <span>{PLATFORM_LABELS[platform]}</span>
                  </button>
                )
              })}
            </div>
            {errors.platforms && (
              <p className="text-xs text-destructive">{errors.platforms.message}</p>
            )}
          </div>

          {/* Post Content */}
          <div className="space-y-2">
            <Label htmlFor="post-content" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Post Content <span className="text-destructive">*</span>
            </Label>
            <Textarea
              id="post-content"
              placeholder="What's on your mind? Share an update, announcement, or insight..."
              rows={4}
              disabled={isPending}
              aria-invalid={!!errors.content}
              {...register('content')}
              className="resize-none break-words [overflow-wrap:anywhere] min-w-0 w-full"
            />
            {errors.content && (
              <p className="text-xs text-destructive">{errors.content.message}</p>
            )}

            {/* Live Character Counter */}
            <CharacterCounter
              content={watchedContent}
              platforms={watchedPlatforms}
            />
          </div>

          {/* Media URL */}
          <div className="space-y-1.5">
            <Label htmlFor="media-url" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Media URL <span className="font-normal text-muted-foreground/80">(Optional)</span>
            </Label>
            <Input
              id="media-url"
              type="url"
              placeholder="https://example.com/image.jpg"
              disabled={isPending}
              aria-invalid={!!errors.mediaUrl}
              {...register('mediaUrl')}
            />
            {errors.mediaUrl && (
              <p className="text-xs text-destructive">{errors.mediaUrl.message}</p>
            )}
            <p className="text-[11px] text-muted-foreground">
              Must be a secure <code className="font-mono">https://</code> image link.
            </p>
          </div>

          {/* Date & Time Scheduling */}
          <div className="space-y-2 rounded-lg border border-border bg-muted/30 p-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold uppercase tracking-wider text-muted-foreground">
                Schedule Date & Time
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] text-muted-foreground">
                <Globe className="size-3" aria-hidden="true" />
                {userTimezone}
              </span>
            </div>

            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              <div className="space-y-1">
                <Label htmlFor="schedule-date" className="text-xs">
                  Date
                </Label>
                <Input
                  id="schedule-date"
                  type="date"
                  min={minDate}
                  disabled={isPending}
                  {...register('scheduledDate')}
                />
                {errors.scheduledDate && (
                  <p className="text-xs text-destructive">{errors.scheduledDate.message}</p>
                )}
              </div>

              <div className="space-y-1">
                <Label htmlFor="schedule-time" className="text-xs">
                  Time
                </Label>
                <Input
                  id="schedule-time"
                  type="time"
                  disabled={isPending}
                  {...register('scheduledTime')}
                />
                {errors.scheduledTime && (
                  <p className="text-xs text-destructive">{errors.scheduledTime.message}</p>
                )}
              </div>
            </div>

            <p className="text-[11px] text-muted-foreground">
              All dates are stored in UTC and displayed in your browser&apos;s local timezone.
            </p>
          </div>

          <DialogFooter className="mt-6 flex items-center justify-end gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              disabled={isPending}
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isPending || watchedPlatforms.length === 0 || isOverLimit}
              className="gap-2"
            >
              {isPending ? (
                <>
                  <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                  Scheduling...
                </>
              ) : (
                <>
                  <Sparkles className="size-4" aria-hidden="true" />
                  Schedule Post
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
