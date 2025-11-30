import { Sparkles } from "lucide-react";
import { Card, Tabs, Typography } from "antd";
import LoginForm from "@/components/auth/LoginForm";
import SignupForm from "@/components/auth/SignupForm";

const Auth = () => {
  const tabItems = [
    { key: "login", label: "ورود", children: <LoginForm /> },
    { key: "signup", label: "ثبت‌نام", children: <SignupForm /> },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-100 flex items-center justify-center px-4 py-10">
      <Card className="w-full max-w-lg shadow-xl border-none">
        <div className="flex flex-col items-center text-center space-y-4 mb-6">
          <div className="flex items-center gap-2 text-emerald-600 font-bold text-2xl">
            <Sparkles className="h-7 w-7" />
            <span>FastFactor</span>
          </div>

          <Typography.Title level={4} className="!m-0">
            ورود یا ثبت‌نام فروشندگان
          </Typography.Title>
          <Typography.Paragraph className="text-slate-500 !mb-0">
            تنها با شماره موبایل خود وارد دنیای فروش سریع و مطمئن شوید.
          </Typography.Paragraph>
        </div>

        <Tabs centered items={tabItems} />
      </Card>
    </div>
  );
};

export default Auth;
