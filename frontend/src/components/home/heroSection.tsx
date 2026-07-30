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
    <main className="app-canvas px-4 py-8 sm:py-12">
      <div className="relative z-10 mx-auto max-w-4xl">
        <BrandLogo className="mb-8 justify-center" />

        <Card className="relative overflow-hidden border-indigo-100 bg-gradient-to-br from-white via-indigo-50/80 to-blue-100/70 p-6 shadow-[var(--shadow-lg)] sm:p-10">
          <div className="absolute -left-16 -top-20 h-56 w-56 rounded-full bg-indigo-300/25 blur-3xl" />
          <div className="absolute -bottom-24 right-1/3 h-56 w-56 rounded-full bg-emerald-200/30 blur-3xl" />

          <div className="relative grid items-center gap-9 md:grid-cols-[1.05fr_0.95fr]">
            <div>
              <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-white/80 px-3 py-1 text-xs font-semibold text-indigo-800">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                شروع سریع فروش آنلاین
              </span>
              <h1 className="text-4xl font-bold leading-[1.35] text-indigo-950 sm:text-5xl">
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
              className="relative mx-auto grid h-56 w-full max-w-sm place-items-center"
            >
              <div className="absolute h-40 w-40 rotate-45 rounded-[2rem] border border-indigo-200 bg-white/80 shadow-xl" />
              <div className="relative flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-indigo-500 to-indigo-950 text-white shadow-2xl shadow-indigo-950/25">
                <Store className="h-11 w-11" />
              </div>
              <span className="absolute left-5 top-3 h-10 w-10 rounded-xl border border-indigo-100 bg-white shadow-md" />
              <span className="absolute bottom-4 right-7 h-8 w-8 rounded-full bg-emerald-400/80 shadow-md" />
            </div>
          </div>
        </Card>

        <ol className="mx-auto mt-10 grid max-w-3xl gap-4 sm:grid-cols-3">
          {setupSteps.map((step, index) => {
            const Icon = step.icon

            return (
              <li
                key={step.label}
                className="surface-card flex items-center gap-4 p-4"
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
