import { useEffect, useState } from 'react'
import { LoaderCircle, RefreshCw, WifiOff } from 'lucide-react'
import BrandLogo from '@/components/brand/BrandLogo'

type LoadingStateProps = {
  title?: string
  description?: string
  error?: boolean
  onRetry?: () => void
}

export default function LoadingState({
  title = 'در حال آماده‌سازی پنل شما',
  description = 'فقط چند لحظه صبر کنید…',
  error = false,
  onRetry,
}: LoadingStateProps) {
  const [slow, setSlow] = useState(false)

  useEffect(() => {
    const timer = window.setTimeout(() => setSlow(true), 8000)
    return () => window.clearTimeout(timer)
  }, [])

  return (
    <main className="app-canvas flex min-h-svh items-center justify-center px-4 py-8">
      <section className="surface-card w-full max-w-md p-6 text-center sm:p-8">
        <BrandLogo className="mb-8 justify-center" />
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary text-primary">
          {error ? (
            <WifiOff aria-hidden="true" className="h-6 w-6" />
          ) : (
            <LoaderCircle
              aria-hidden="true"
              className="h-6 w-6 motion-safe:animate-spin"
            />
          )}
        </div>
        <div role={error ? 'alert' : 'status'} aria-live="polite">
          <h1 className="text-lg font-bold text-foreground">{title}</h1>
          <p className="mt-2 text-sm leading-7 text-muted-foreground">
            {description}
          </p>
          {!error && slow && (
            <p className="mt-3 text-sm leading-7 text-muted-foreground">
              اتصال به سرور کمی طول کشیده؛ لطفاً این صفحه را باز نگه دارید.
            </p>
          )}
        </div>
        {!error && (
          <div
            aria-hidden="true"
            className="mt-7 space-y-3 motion-safe:animate-pulse"
          >
            <div className="h-3 w-3/4 rounded-full bg-muted" />
            <div className="h-3 w-full rounded-full bg-muted" />
            <div className="h-3 w-1/2 rounded-full bg-muted" />
          </div>
        )}
        {onRetry && (
          <button
            type="button"
            onClick={onRetry}
            className="mt-6 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-primary px-6 font-semibold text-primary-foreground focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/20"
          >
            <RefreshCw aria-hidden="true" className="h-4 w-4" />
            تلاش مجدد
          </button>
        )}
      </section>
    </main>
  )
}
