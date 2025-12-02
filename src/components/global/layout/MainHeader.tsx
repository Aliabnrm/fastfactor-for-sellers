import { Settings } from 'lucide-react'
import { ReactNode, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'

type MainHeaderProps = {
  rightSlot?: ReactNode
  showSettingsShortcut?: boolean
}

const MainHeader = ({
  rightSlot,
  showSettingsShortcut = true,
}: MainHeaderProps) => {
  const navigate = useNavigate()

  return (
    <header className="border-b border-border bg-card shadow-sm">
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        <div className="flex items-center justify-center gap-2">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-lg font-extrabold text-primary">
            F
          </span>
          <span className="text-xl font-bold text-foreground">FastFactor</span>
        </div>

        <div className="flex items-center gap-3">
          {rightSlot
            ? rightSlot
            : showSettingsShortcut && (
                <button
                  type="button"
                  aria-label="تنظیمات"
                  onClick={() => navigate('/order/settings')}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                >
                  <Settings className="h-5 w-5" />
                </button>
              )}
          {/* <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
            {avatarFallback}
          </div> */}
        </div>
      </div>
    </header>
  )
}

export default MainHeader
