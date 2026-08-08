import { Card } from '../ui/card'
import { Button } from '../ui/button'
import {
  ArrowLeft,
  CheckCircle2,
  CreditCard,
  Store,
  Truck,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import BrandLogo from '@/components/brand/BrandLogo'

const HeroSection = () => {
  const navigate = useNavigate()

  const setupSteps = [
    { label: 'هویت فروشگاه', icon: Store },
    { label: 'اطلاعات مالی', icon: CreditCard },
    { label: 'تنظیمات ارسال', icon: Truck },
  ]

  return (
    <main className="app-canvas px-4 py-6 sm:py-10">
      <div className="relative z-10 mx-auto max-w-4xl">
        <BrandLogo className="mb-6 justify-center sm:mb-8" />

        <Card className="relative overflow-hidden border-indigo-100 bg-gradient-to-br from-white via-indigo-50/80 to-blue-100/70 p-5 shadow-[var(--shadow-md)] sm:p-8">
          <div className="relative grid items-center gap-8 md:grid-cols-2">
            <div>
              <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-white/80 px-3 py-1 text-xs font-semibold text-indigo-800">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                شروع سریع فروش آنلاین
              </span>
              <h1 className="text-3xl font-bold leading-tight text-indigo-950 sm:text-4xl">
                سلام، خوش آمدید!
              </h1>
              <p className="mt-4 max-w-lg leading-7 text-slate-600">
                برای دریافت لینک پرداخت و مدیریت سفارش‌ها، اطلاعات فروشگاه خود
                را در سه مرحله کوتاه تکمیل کنید.
              </p>
              <Button
                size="lg"
                onClick={() => navigate('/onboarding')}
                className="mt-7 h-12 w-full gap-2 sm:w-auto"
              >
                شروع راه‌اندازی
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </div>

            <div
              aria-hidden="true"
              className="relative mx-auto grid h-52 w-full max-w-sm place-items-center sm:h-56"
            >
              <div className="absolute h-40 w-40 rotate-45 rounded-xl border border-indigo-200 bg-white/80 shadow-xl" />
              <div className="relative flex h-24 w-24 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-950 text-white shadow-2xl shadow-indigo-950/25">
                <Store className="h-11 w-11" />
              </div>
              <span className="absolute left-5 top-3 h-10 w-10 rounded-xl border border-indigo-100 bg-white shadow-md" />
              <span className="absolute bottom-4 right-7 h-8 w-8 rounded-full bg-emerald-400/80 shadow-md" />
            </div>
          </div>
        </Card>

        <ol className="mx-auto mt-8 grid max-w-3xl gap-3 sm:grid-cols-3">
          {setupSteps.map((step, index) => {
            const Icon = step.icon

            return (
              <li
                key={step.label}
                className="surface-card flex items-center gap-3 p-4"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-secondary font-bold text-primary">
                  {index + 1}
                </span>
                <div>
                  <Icon className="mb-1 h-4 w-4 text-primary" />
                  <span className="text-sm font-semibold text-slate-800">
                    {step.label}
                  </span>
                </div>
              </li>
            )
          })}
        </ol>
      </div>
    </main>
  )
}

export default HeroSection
