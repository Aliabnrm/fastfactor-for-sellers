import { ReactNode } from 'react'
import { cn } from '@/lib/cn'

type CheckoutSectionProps = {
  title: string
  icon?: ReactNode
  children: ReactNode
  className?: string
}

const CheckoutSection = ({
  title,
  icon,
  children,
  className,
}: CheckoutSectionProps) => (
  <section
    className={cn(
      'rounded-2xl border border-border bg-white p-5 shadow-[var(--shadow-sm)] sm:p-6',
      className,
    )}
  >
    <div className="mb-5 flex items-center gap-2">
      {icon && (
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-secondary text-primary">
          {icon}
        </span>
      )}
      <h2 className="font-bold text-slate-900 sm:text-lg">{title}</h2>
    </div>
    {children}
  </section>
)

export default CheckoutSection
