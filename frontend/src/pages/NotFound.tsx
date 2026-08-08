import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import BrandLogo from '@/components/brand/BrandLogo'
import { sanitizeLogValue } from '@/lib/sanitization'

const NotFoundPage = () => {
  const location = useLocation()

  useEffect(() => {
    console.error(
      '404 Error: User attempted to access non-existent route:',
      sanitizeLogValue(location.pathname),
    )
  }, [location.pathname])

  return (
    <main className="app-canvas flex items-center justify-center px-4 py-8">
      <section className="surface-card relative z-10 w-full max-w-md p-6 text-center sm:p-8">
        <BrandLogo compact className="mb-6 justify-center" />
        <h1 className="mb-2 text-4xl font-bold text-slate-900">404</h1>
        <p className="mb-6 text-sm leading-6 text-muted-foreground sm:text-base">
          صفحه‌ای با این آدرس پیدا نشد.
        </p>
        <Button asChild className="w-full">
          <a href="/">بازگشت به خانه</a>
        </Button>
      </section>
    </main>
  )
}

export default NotFoundPage
