import { supabase } from "@/lib/supabase";
import { LogOut, Save } from "lucide-react";
import React, { useEffect, useState } from "react";
import { formatCurrency, parseCurrency } from "@/utils/formRules";
import {
  Button,
  Card,
  Form,
  Input,
  InputNumber,
  Typography,
  message,
} from "antd";
import useLogout from "@/hooks/useLogout";
import MainLayout from "@/components/global/layout/MainLayout";

const { Title, Paragraph, Text } = Typography;

const Settings = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  const { logout, loading: logoutLoading } = useLogout();

  const fetchSellerProfile = async () => {
    const { data: profile, error } = await supabase
      .from("sellers")
      .select("shop_name, card_owner, shipping_cost, card_number, email, id")
      .single();

    if (error && error.code !== "PGRST116") {
      console.error("Error fetching seller profile:", error);
      message.error("خطا در بارگذاری اطلاعات.");
      return null;
    }

    return profile;
  };

  const handleUpdate = async (values) => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from("sellers")
        .update({
          shop_name: values.shopName,
          card_owner: values.ownerName,
          shipping_cost: values.shippingCost,
          card_number: values.cardNumber,
        })
        .eq("id", (await supabase.auth.getUser()).data.user.id)
        .select();

      if (error) {
        message.error(`خطا در ذخیره تغییرات: ${error.message}`);
      } else {
        message.success("تغییرات با موفقیت ذخیره شد.");
      }
    } catch (e) {
      console.error("Update failed:", e);
      message.error("خطای سیستمی هنگام ذخیره.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadProfile = async () => {
      const profileData = await fetchSellerProfile();

      if (profileData) {
        const mappedData = {
          shopName: profileData.shop_name,
          ownerName: profileData.card_owner,
          shippingCost: profileData.shipping_cost,
          cardNumber: profileData.card_number,
        };

        form.setFieldsValue(mappedData);
      }
      setFetching(false);
    };

    loadProfile();
  }, [form]);

  const handleCardChange = (e) => {
    const value = e.target.value;

    const cleanedValue = value.replace(/\D/g, "");

    const limitedValue = cleanedValue.substring(0, 16);

    const formattedValue = limitedValue.replace(/(\d{4})(?=\d)/g, "$1-");

    form.setFieldValue("cardNumber", formattedValue);
  };

  return (
    <MainLayout showSettingsShortcut={false}>
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="space-y-1">
          <Title level={3} className="!m-0">
            تنظیمات فروشگاه
          </Title>
          <Paragraph className="text-muted-foreground !m-0">
            اطلاعات فروشگاه و حساب خود را به‌روز نگه دارید.
          </Paragraph>
        </div>

        <Form
          form={form}
          onFinish={handleUpdate}
          layout="vertical"
          requiredMark={false}
          autoComplete="off"
          className="space-y-5"
        >
          <Card className="shadow-sm border-border/60" loading={fetching}>
            <Title level={4} className="!mt-0">
              اطلاعات کلی
            </Title>
            <Form.Item
              label="نام فروشگاه"
              name="shopName"
              rules={[{ required: true, message: "نام فروشگاه را وارد کنید." }]}
            >
              <Input size="large" placeholder="مثال: گالری مریم" />
            </Form.Item>

            <Text type="warning" className="text-xs">
              تغییر لینک باعث غیرفعال شدن لینک‌های قبلی می‌شود.
            </Text>
          </Card>

          <Card
            className="shadow-sm border-border/60"
            bodyStyle={{ padding: 24 }}
            loading={fetching}
          >
            <Title level={4} className="!mt-0">
              مالی و ارسال
            </Title>
            <Form.Item
              label="نام صاحب کارت"
              name="ownerName"
              rules={[
                { required: true, message: "نام صاحب کارت را وارد کنید." },
              ]}
            >
              <Input size="large" placeholder="مثال: مریم رضایی" />
            </Form.Item>
            <Form.Item label="شماره کارت" name="cardNumber">
              <Input
                size="large"
                placeholder="0000-0000-0000-0000"
                inputMode="numeric"
                onChange={handleCardChange}
              />
            </Form.Item>
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

          <Card className="shadow-sm border-border/60" loading={fetching}>
            <Title level={4} className="!mt-0">
              حساب کاربری
            </Title>

            <Button
              danger
              block
              size="large"
              icon={<LogOut className="w-4 h-4" />}
              onClick={logout}
              loading={logoutLoading}
            >
              خروج از حساب
            </Button>
          </Card>

          <div className="sticky bottom-0 bg-background/90 backdrop-blur-sm border border-border rounded-2xl px-4 py-3 shadow-lg flex justify-end">
            <Button
              type="primary"
              size="large"
              htmlType="submit"
              icon={<Save className="w-4 h-4" />}
              loading={loading}
            >
              ذخیره تغییرات
            </Button>
          </div>
        </Form>
      </div>
    </MainLayout>
  );
};

export default Settings;
