import { LogOut, Save } from "lucide-react";
import { formatCurrency, parseCurrency } from "@/utils/formRules";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Button, Card, Form, Input, InputNumber, Typography } from "antd";

const Settings = () => {
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
          requiredMark={false}
          autoComplete="off"
          className="space-y-5"
        >
          <Card
            className="shadow-sm border-border/60"
            bodyStyle={{ padding: 24 }}
          >
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

            <Typography.Text type="warning" className="text-xs">
              تغییر لینک باعث غیرفعال شدن لینک‌های قبلی می‌شود.
            </Typography.Text>
          </Card>

          <Card
            className="shadow-sm border-border/60"
            bodyStyle={{ padding: 24 }}
          >
            <Typography.Title level={4} className="!mt-0">
              مالی و ارسال
            </Typography.Title>
            <Form.Item
              label="نام صاحب کارت"
              name="ownerName"
              rules={[
                { required: true, message: "نام صاحب کارت را وارد کنید." },
              ]}
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

          <Card
            className="shadow-sm border-border/60"
            bodyStyle={{ padding: 24 }}
          >
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
            >
              خروج از حساب
            </Button>
          </Card>

          <div className="sticky bottom-0 bg-background/90 backdrop-blur-sm border border-border rounded-2xl px-4 py-3 shadow-lg flex justify-end">
            <Button
              type="primary"
              size="large"
              icon={<Save className="w-4 h-4" />}
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
