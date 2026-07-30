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
  <div className="app-canvas">
    <MainHeader
      showProfile={showProfile}
      rightSlot={headerRightSlot}
    />
    <main
      className={clsx(
        'relative z-10 mx-auto w-full max-w-5xl px-4 py-6 sm:px-6 sm:py-8',
        contentClassName,
      )}
    >
      {children}
    </main>
  </div>
)

export default MainLayout
