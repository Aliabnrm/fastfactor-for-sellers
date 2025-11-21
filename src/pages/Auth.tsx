import { Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { mobileRules } from "@/lib/validation/mobileRuls";
import { passwordRules } from "@/lib/validation/password";
import { Card, Form, Input, Tabs, Typography, Button } from "antd";

const Auth = () => {
  // const navigate = useNavigate();

  const tabItems = [
    {
      key: "login",
      label: "ورود",
      children: (
        <Form layout="vertical" requiredMark={false} autoComplete="off">
          <Form.Item label="شماره موبایل" name="mobile" rules={mobileRules}>
            <Input
              size="large"
              placeholder="مثال: 09123456789"
              inputMode="numeric"
            />
          </Form.Item>
          <Form.Item label="رمز عبور" name="password" rules={passwordRules}>
            <Input.Password size="large" placeholder="رمز عبور" />
          </Form.Item>
          <Button type="primary" htmlType="submit" block className="mt-2">
            ورود
          </Button>
        </Form>
      ),
    },
    {
      key: "signup",
      label: "ثبت‌نام",
      children: (
        <Form layout="vertical" requiredMark={false} autoComplete="off">
          <Form.Item label="شماره موبایل" name="mobile" rules={mobileRules}>
            <Input
              size="large"
              placeholder="مثال: 09123456789"
              inputMode="numeric"
            />
          </Form.Item>
          <Form.Item label="رمز عبور" name="password" rules={passwordRules}>
            <Input.Password size="large" placeholder="یک رمز امن انتخاب کنید" />
          </Form.Item>
          <Button type="primary" htmlType="submit" block className="mt-2">
            ثبت‌نام رایگان
          </Button>
        </Form>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-100 flex items-center justify-center px-4 py-10">
      <Card
        className="w-full max-w-lg shadow-xl border-none"
        bodyStyle={{ padding: "32px 28px" }}
      >
        <div className="flex flex-col items-center text-center space-y-4 mb-6">
          <div className="flex items-center gap-2 text-emerald-600 font-bold text-2xl">
            <Sparkles className="h-7 w-7" />
            <span>FastFactor</span>
          </div>
          <Typography.Title level={4} className="!m-0">
            ورود یا ثبت‌نام فروشندگان اینستاگرام
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
