import { ReactNode } from "react";
import clsx from "clsx";
import DashboardHeader from "./DashboardHeader";

type DashboardLayoutProps = {
  children: ReactNode;
  headerRightSlot?: ReactNode;
  showSettingsShortcut?: boolean;
  contentClassName?: string;
};

const DashboardLayout = ({
  children,
  headerRightSlot,
  showSettingsShortcut = true,
  contentClassName,
}: DashboardLayoutProps) => (
  <div className="min-h-screen bg-background">
    <DashboardHeader rightSlot={headerRightSlot} showSettingsShortcut={showSettingsShortcut} />
    <main className={clsx("container mx-auto px-4 py-6", contentClassName)}>{children}</main>
  </div>
);

export default DashboardLayout;

