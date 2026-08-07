import { sanitizeLogValue } from '@/lib/sanitization'

export function formatJalali(dateString: string) {
  try {
    const date = new Date(dateString)

    return new Intl.DateTimeFormat('fa-IR', {
      dateStyle: 'medium',
      timeStyle: 'short',
    }).format(date)
  } catch (error) {
    console.error('Invalid date:', sanitizeLogValue(dateString))
    return ''
  }
}
