import clsx from 'clsx'
import { ReactNode } from 'react'
import MainHeader from './MainHeader'

type MainLayoutProps = {
  children: ReactNode
  showProfile?: boolean
  contentClassName?: string
  headerRightSlot?: ReactNode
}

const MainLayout = ({
  children,
  headerRightSlot,
  contentClassName,
  showProfile = true,
}: MainLayoutProps) => (
  <div className="min-h-screen bg-background">
    <MainHeader
      showProfile={showProfile}
      rightSlot={headerRightSlot}
    />
    <main className={clsx('container mx-auto px-4 py-6', contentClassName)}>
      {children}
    </main>
  </div>
)

export default MainLayout
