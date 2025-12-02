import clsx from 'clsx'
import { ReactNode } from 'react'
import MainHeader from './MainHeader'

type MainLayoutProps = {
  children: ReactNode
  headerRightSlot?: ReactNode
  showSettingsShortcut?: boolean
  contentClassName?: string
}

const MainLayout = ({
  children,
  headerRightSlot,
  showSettingsShortcut = true,
  contentClassName,
}: MainLayoutProps) => (
  <div className="min-h-screen bg-background">
    <MainHeader
      rightSlot={headerRightSlot}
      showSettingsShortcut={showSettingsShortcut}
    />
    <main className={clsx('container mx-auto px-4 py-6', contentClassName)}>
      {children}
    </main>
  </div>
)

export default MainLayout
