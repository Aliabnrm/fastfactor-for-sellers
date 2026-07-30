import { Sparkles } from 'lucide-react'
import { cn } from '@/lib/cn'

type BrandLogoProps = {
  compact?: boolean
  className?: string
  tone?: 'indigo' | 'emerald'
}

const BrandLogo = ({
  className,
  compact = false,
  tone = 'indigo',
}: BrandLogoProps) => (
  <div
    aria-label="FastFactor"
    className={cn(
      'inline-flex items-center gap-2.5 font-bold tracking-tight',
      compact ? 'text-lg' : 'text-2xl sm:text-3xl',
      className,
    )}
    dir="ltr"
  >
    <span
      className={cn(
        'flex shrink-0 items-center justify-center rounded-xl text-white shadow-lg',
        compact ? 'h-9 w-9' : 'h-11 w-11 sm:h-12 sm:w-12',
        tone === 'emerald'
          ? 'bg-gradient-to-br from-teal-500 to-emerald-700 shadow-emerald-900/15'
          : 'bg-gradient-to-br from-indigo-500 to-indigo-950 shadow-indigo-950/20',
      )}
    >
      <Sparkles
        aria-hidden="true"
        className={compact ? 'h-5 w-5' : 'h-6 w-6'}
      />
    </span>
    <span className="text-slate-900">FastFactor</span>
  </div>
)

export default BrandLogo
