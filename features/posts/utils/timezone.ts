import { format, parseISO } from 'date-fns'
import { toZonedTime } from 'date-fns-tz'

/**
 * Returns the user's local IANA timezone string as reported by the browser.
 * Example: "Asia/Kolkata", "America/New_York".
 *
 * LIMITATION: This uses the browser clock as the source of time and timezone.
 * There is no server-side time source in this frontend-only mock application.
 */
export function getLocalTimezone(): string {
  return Intl.DateTimeFormat().resolvedOptions().timeZone
}

/**
 * Converts separate local date (YYYY-MM-DD) and time (HH:mm) strings to a UTC
 * ISO 8601 string, interpreting the input as the browser's local timezone.
 *
 * DST note: If the selected time falls in a DST gap (e.g. 2:30 AM on spring-forward
 * night), the browser's Date constructor will adjust automatically. This is a
 * known limitation of a simplified local-time input approach.
 */
export function toUTC(localDateStr: string, localTimeStr: string): string {
  const localDateTime = new Date(`${localDateStr}T${localTimeStr}:00`)
  return localDateTime.toISOString()
}

/**
 * Parses a UTC ISO 8601 string into a Date object.
 */
export function fromUTC(utcIso: string): Date {
  return parseISO(utcIso)
}

/**
 * Formats a UTC ISO 8601 string for display in the browser's local timezone.
 * Default format: "Oct 18, 2026 8:00 PM"
 */
export function formatLocalTime(utcIso: string, fmt = 'MMM d, yyyy h:mm a'): string {
  const tz = getLocalTimezone()
  const date = parseISO(utcIso)
  const zonedDate = toZonedTime(date, tz)
  return format(zonedDate, fmt)
}

/**
 * Formats only the date portion in local timezone.
 * Example: "Oct 18, 2026"
 */
export function formatLocalDate(utcIso: string): string {
  return formatLocalTime(utcIso, 'MMM d, yyyy')
}

/**
 * Formats only the time portion in local timezone.
 * Example: "8:00 PM"
 */
export function formatLocalTimeOnly(utcIso: string): string {
  return formatLocalTime(utcIso, 'h:mm a')
}

/**
 * Returns the current time as a UTC ISO 8601 string.
 * Uses the browser clock — documented limitation.
 */
export function nowUTC(): string {
  return new Date().toISOString()
}

/**
 * Returns true if the given UTC ISO timestamp is strictly after the current time.
 * Uses the browser clock as the reference.
 */
export function isFutureTime(utcIso: string): boolean {
  return parseISO(utcIso) > new Date()
}

/**
 * Returns the start of the local day (midnight) as a UTC ISO string.
 * Useful for grouping posts by day.
 */
export function startOfLocalDay(utcIso: string): string {
  const tz = getLocalTimezone()
  const date = parseISO(utcIso)
  const zonedDate = toZonedTime(date, tz)
  zonedDate.setHours(0, 0, 0, 0)
  return zonedDate.toISOString()
}

/**
 * Returns a YYYY-MM-DD key for the given UTC ISO timestamp in local timezone.
 * Used to group posts by calendar day.
 */
export function toLocalDateKey(utcIso: string): string {
  return formatLocalTime(utcIso, 'yyyy-MM-dd')
}
