import { Check, CreditCard, Store, Truck } from 'lucide-react'
import { cn } from '@/lib/cn'

type OnboardingProgressProps = {
  currentStep: number
}

const steps = [
  {
    title: 'هویت فروشگاه',
    description: 'نام و آدرس',
    icon: Store,
  },
  {
    title: 'اطلاعات مالی',
    description: 'مشخصات کارت',
    icon: CreditCard,
  },
  {
    title: 'تنظیمات ارسال',
    description: 'هزینه ثابت',
    icon: Truck,
  },
]

const OnboardingProgress = ({
  currentStep,
}: OnboardingProgressProps) => (
  <div className="relative mb-8" aria-label="مراحل تکمیل اطلاعات فروشگاه">
    <div className="absolute right-[16.66%] top-6 h-px w-2/3 bg-slate-200" />
    <div
      className="absolute right-[16.66%] top-6 h-px bg-primary transition-[width] duration-300"
      style={{ width: `${(currentStep / (steps.length - 1)) * 66.66}%` }}
    />

    <ol className="relative grid grid-cols-3">
      {steps.map((step, index) => {
        const isComplete = index < currentStep
        const isCurrent = index === currentStep
        const Icon = step.icon

        return (
          <li
            key={step.title}
            className="flex min-w-0 flex-col items-center px-1 text-center"
            aria-current={isCurrent ? 'step' : undefined}
          >
            <span
              className={cn(
                'flex h-12 w-12 items-center justify-center rounded-xl border bg-white text-slate-400 shadow-sm transition-colors',
                isComplete &&
                  'border-emerald-500 bg-emerald-500 text-white',
                isCurrent &&
                  'border-primary bg-gradient-to-br from-indigo-500 to-indigo-900 text-white shadow-lg shadow-indigo-950/15',
              )}
            >
              {isComplete ? (
                <Check className="h-5 w-5" />
              ) : (
                <Icon className="h-5 w-5" />
              )}
            </span>
            <span
              className={cn(
                'mt-3 text-xs font-semibold text-slate-500 sm:text-sm',
                (isComplete || isCurrent) && 'text-slate-900',
              )}
            >
              {step.title}
            </span>
            <span className="mt-0.5 hidden text-xs text-slate-400 sm:block">
              {step.description}
            </span>
          </li>
        )
      })}
    </ol>
  </div>
)

export default OnboardingProgress
