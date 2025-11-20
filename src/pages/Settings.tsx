import { toast } from "sonner";
import { LogOut, Save } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { ChangeEvent, useEffect, useMemo } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Button, Card, Form, Input, InputNumber, Typography } from "antd";
import {
  cardNumberRules,
  createSlugRules,
  formatCardNumber,
  formatCurrency,
  parseCurrency,
} from "@/utils/formRules";

type SettingsFormValues = {
  shopName: string;
  slug: string;
  ownerName: string;
  cardNumber: string;
  shippingCost?: number;
};

const Settings = () => {
  // const { user, updateUser, logout, isReady } = useAuth();
  const navigate = useNavigate();
  const [form] = Form.useForm<SettingsFormValues>();
  // const slugRules = useMemo(() => createSlugRules(), []);

  const handleCardChange = (event: ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(event.target.value);
    form.setFieldValue("cardNumber", formatted);
  };

  // useEffect(() => {
  //   if (!user) {
  //     return;
  //   }

  //   form.setFieldsValue({
  //     shopName: user.name ?? "",
  //     slug: user.slug ?? "",
  //     ownerName: user.cardInfo?.ownerName ?? "",
  //     cardNumber: user.cardInfo?.cardNumber
  //       ? formatCardNumber(user.cardInfo.cardNumber)
  //       : "",
  //     shippingCost: user.shippingCost,
  //   });
  // }, [form, user]);

  // if (!isReady) {
  //   return null;
  // }

  // if (!user) {
  //   return <Navigate to="/auth" replace />;
  // }

  const handleSave = async () => {
    const values = await form.validateFields();
    updateUser({
      name: values.shopName,
      slug: values.slug,
      cardInfo: {
        ownerName: values.ownerName,
        cardNumber: values.cardNumber.replace(/-/g, ""),
      },
      shippingCost: values.shippingCost ?? 0,
    });

    toast.success("تنظیمات ذخیره شد");
  };

  const handleLogout = () => {
    logout();
    navigate("/auth", { replace: true });
  };

  return (
    <DashboardLayout showSettingsShortcut={false}>
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="space-y-1">
          <Typography.Title level={3} className="!m-0">
            تنظیمات فروشگاه
          </Typography.Title>
          <Typography.Paragraph className="text-muted-foreground !m-0">
            اطلاعات فروشگاه و حساب خود را به‌روز نگه دارید.
          </Typography.Paragraph>
        </div>

        <Form
          layout="vertical"
          form={form}
          requiredMark={false}
          autoComplete="off"
          className="space-y-5"
        >
          <Card className="shadow-sm border-border/60" bodyStyle={{ padding: 24 }}>
            <Typography.Title level={4} className="!mt-0">
              اطلاعات کلی
            </Typography.Title>
            <Form.Item
              label="نام فروشگاه"
              name="shopName"
              rules={[{ required: true, message: "نام فروشگاه را وارد کنید." }]}
            >
              <Input size="large" placeholder="مثال: گالری مریم" />
            </Form.Item>
            {/* <Form.Item label="لینک فروشگاه" name="slug" rules={slugRules}>
              <Input
                size="large"
                addonBefore="myshop.ir/"
                placeholder="مثال: maryam-gallery"
              />
            </Form.Item> */}
            <Typography.Text type="warning" className="text-xs">
              تغییر لینک باعث غیرفعال شدن لینک‌های قبلی می‌شود.
            </Typography.Text>
          </Card>

          <Card className="shadow-sm border-border/60" bodyStyle={{ padding: 24 }}>
            <Typography.Title level={4} className="!mt-0">
              مالی و ارسال
            </Typography.Title>
            <Form.Item
              label="نام صاحب کارت"
              name="ownerName"
              rules={[{ required: true, message: "نام صاحب کارت را وارد کنید." }]}
            >
              <Input size="large" placeholder="مثال: مریم رضایی" />
            </Form.Item>
            {/* <Form.Item label="شماره کارت" name="cardNumber" rules={cardRules}>
              <Input
                size="large"
                placeholder="0000-0000-0000-0000"
                inputMode="numeric"
                onChange={handleCardChange}
              />
            </Form.Item> */}
            <Form.Item
              label="هزینه ارسال ثابت (تومان)"
              name="shippingCost"
              rules={[{ required: true, message: "هزینه ارسال را وارد کنید." }]}
            >
              <InputNumber
                size="large"
                className="w-full"
                min={0}
                controls={false}
                formatter={formatCurrency}
                parser={parseCurrency}
              />
            </Form.Item>
          </Card>

          <Card className="shadow-sm border-border/60" bodyStyle={{ padding: 24 }}>
            <Typography.Title level={4} className="!mt-0">
              حساب کاربری
            </Typography.Title>
            <Form.Item label="شماره موبایل">
              {/* <Input size="large" value={user.mobile} disabled /> */}
            </Form.Item>
            <Button
              danger
              block
              size="large"
              icon={<LogOut className="w-4 h-4" />}
              onClick={handleLogout}
            >
              خروج از حساب
            </Button>
          </Card>

          <div className="sticky bottom-0 bg-background/90 backdrop-blur-sm border border-border rounded-2xl px-4 py-3 shadow-lg flex justify-end">
            <Button
              type="primary"
              size="large"
              icon={<Save className="w-4 h-4" />}
              onClick={handleSave}
            >
              ذخیره تغییرات
            </Button>
          </div>
        </Form>
      </div>
    </DashboardLayout>
  );
};

export default Settings;

