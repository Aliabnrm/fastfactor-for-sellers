import { Settings } from "lucide-react";
import { ReactNode, useMemo } from "react";
import { useNavigate } from "react-router-dom";


type DashboardHeaderProps = {
  rightSlot?: ReactNode;
  showSettingsShortcut?: boolean;
};

const DashboardHeader = ({
  rightSlot,
  showSettingsShortcut = true,
}: DashboardHeaderProps) => {
  const navigate = useNavigate();

  return (
    <header className="border-b border-border bg-card shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex justify-center items-center gap-2">
          <span className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-extrabold text-lg">
            F
          </span>
          <span className="text-xl font-bold text-foreground">
            FastFactor
          </span>
        </div>

        <div className="flex items-center gap-3">
          {rightSlot
            ? rightSlot
            : showSettingsShortcut && (
                <button
                  type="button"
                  aria-label="تنظیمات"
                  onClick={() => navigate("/dashboard/settings")}
                  className="w-11 h-11 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors"
                >
                  <Settings className="w-5 h-5" />
                </button>
              )}
          {/* <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
            {avatarFallback}
          </div> */}
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
