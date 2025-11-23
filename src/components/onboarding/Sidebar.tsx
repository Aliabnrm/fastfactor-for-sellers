import { useState } from "react";
import { Steps, Typography } from "antd";
import { Sparkles, Store, Wallet, Truck } from "lucide-react";

const stepsMeta = [
  {
    title: "هویت فروشگاه",
    description: "فروشگاه خود را بسازید",
    icon: <Store className="h-4 w-4" />,
  },
  {
    title: "اطلاعات مالی",
    description: "اطلاعات جهت واریز مشتری",
    icon: <Wallet className="h-4 w-4" />,
  },
  {
    title: "تنظیمات ارسال",
    description: "هزینه ارسال ثابت",
    icon: <Truck className="h-4 w-4" />,
  },
];

const StepsSidebar = () => {
  const [current] = useState(0);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-emerald-600 text-xl font-semibold">
        <Sparkles className="h-6 w-6" />
        <span>FastFactor</span>
      </div>

      <div>
        <Typography.Title level={3} className="!m-0">
          تکمیل اطلاعات فروشگاه
        </Typography.Title>
        <Typography.Paragraph className="!mt-2 text-slate-500">
          چند قدم تا راه‌اندازی فروشگاه شما
        </Typography.Paragraph>
      </div>

      <Steps
        direction="vertical"
        current={current}
        items={stepsMeta.map((s) => ({
          title: s.title,
          description: s.description,
          icon: s.icon,
        }))}
      />
    </div>
  );
};

export default StepsSidebar;
