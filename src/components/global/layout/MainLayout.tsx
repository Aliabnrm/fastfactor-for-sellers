import clsx from 'clsx'
import { ReactNode } from 'react'
import MainHeader from './MainHeader'

type MainLayoutProps = {
  children: ReactNode
  contentClassName?: string
  headerRightSlot?: ReactNode
  showProfileShortcut?: boolean
}

const MainLayout = ({
  children,
  headerRightSlot,
  contentClassName,
  showProfileShortcut = true,
}: MainLayoutProps) => (
  <div className="min-h-screen bg-background">
    <MainHeader
      rightSlot={headerRightSlot}
      showProfileShortcut={showProfileShortcut}
    />
    <main className={clsx('container mx-auto px-4 py-6', contentClassName)}>
      {children}
    </main>
  </div>
)

export default MainLayout
