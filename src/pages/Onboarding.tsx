import { Divider } from "antd";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";
import StepsSidebar from "@/components/onboarding/Sidebar";
import OnboardingForm from "@/components/onboarding/onboardForm";

const Onboarding = () => {
  const { user, isReady } = useAuth();
  const navigate = useNavigate();

  if (!isReady) return null;
  if (!user) return <Navigate to="/auth" replace />;
  if (user.isOnboarded) return <Navigate to="/dashboard" replace />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-100 flex items-center justify-center px-4 py-12">
      <Card className="w-full max-w-3xl border-none shadow-xl px-8 py-6">
        <div className="flex flex-col md:flex-row gap-10">
          <div className="md:w-2/5">
            <StepsSidebar />
          </div>

          <Divider
            type="vertical"
            className="hidden md:block"
            style={{ height: "auto" }}
          />

          <div className="md:flex-1">
            <OnboardingForm
              onFinished={() => navigate("/dashboard", { replace: true })}
            />
          </div>
        </div>
      </Card>
    </div>
  );
};
export default Onboarding;
