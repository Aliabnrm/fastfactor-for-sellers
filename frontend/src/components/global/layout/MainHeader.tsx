import { ReactNode } from 'react'
import { Settings } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import BrandLogo from '@/components/brand/BrandLogo'

type MainHeaderProps = {
  showProfile?: boolean
  rightSlot?: ReactNode
}

const MainHeader = ({
  rightSlot,
  showProfile,
}: MainHeaderProps) => {
  const navigate = useNavigate()

  return (
    <header className="sticky top-0 z-30 border-b border-white/70 bg-white/85 shadow-sm backdrop-blur-xl">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 sm:px-6">
        <button
          type="button"
          onClick={() => navigate('/')}
          aria-label="صفحه اصلی"
          className="rounded-xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/15"
        >
          <BrandLogo compact />
        </button>

        <div className="flex items-center gap-3">
          {rightSlot
            ? rightSlot
            : showProfile && (
              <button
                type="button"
                aria-label="تنظیمات"
                onClick={() => navigate('/profile')}
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-white text-muted-foreground transition-colors hover:border-primary hover:bg-secondary hover:text-primary focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/15"
              >
                <Settings className="h-5 w-5" />
              </button>
            )}
        </div>
      </div>
    </header>
  )
}

export default MainHeader
