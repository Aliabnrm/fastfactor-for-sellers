import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Form, Input, InputNumber, Button } from "antd";
import { ChangeEvent, useEffect, useMemo, useState } from "react";
import {
  cardNumberRules,
  createSlugRules,
  formatCardNumber,
  formatCurrency,
  parseCurrency,
} from "@/utils/formRules";

type OnboardingFormValues = {
  shopName: string;
  slug: string;
  ownerName: string;
  cardNumber: string;
  shippingCost?: number;
};

const stepsFields = [
  ["shopName", "slug"],
  ["ownerName", "cardNumber"],
  ["shippingCost"],
];

const OnboardingForm = ({ onFinished }: { onFinished?: () => void }) => {
  const { user, updateUser } = useAuth();
  const [form] = Form.useForm<OnboardingFormValues>();
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;
    form.setFieldsValue({
      shopName: user.name ?? "",
      slug: user.slug ?? "",
      ownerName: user.cardInfo?.ownerName ?? "",
      cardNumber: user.cardInfo?.cardNumber
        ? formatCardNumber(user.cardInfo.cardNumber)
        : "",
      shippingCost: user.shippingCost ?? 0,
    });
  }, [user, form]);

  const currentFields = useMemo(
    () => stepsFields[currentStep] as (keyof OnboardingFormValues)[],
    [currentStep]
  );

  const handleCardChange = (e: ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value);
    form.setFieldValue("cardNumber", formatted);
  };

  const handleNext = async () => {
    try {
      await form.validateFields(currentFields as string[]);
      if (currentStep === stepsFields.length - 1) {
        await handleFinish();
        return;
      }
      setCurrentStep((s) => s + 1);
    } catch (err) {
      // validation errors are shown by antd
    }
  };

  const handleBack = () => setCurrentStep((s) => Math.max(0, s - 1));

  const handleFinish = async () => {
    setIsSubmitting(true);
    try {
      const values = await form.validateFields();

      updateUser({
        name: values.shopName,
        slug: values.slug,
        cardInfo: {
          ownerName: values.ownerName,
          cardNumber: values.cardNumber.replace(/-/g, ""),
        },
        shippingCost: values.shippingCost ?? 0,
        isOnboarded: true,
      });

      toast.success("فروشگاه شما آماده است! 🎉");
      onFinished?.();
      navigate("/dashboard", { replace: true });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      requiredMark={false}
      autoComplete="off"
      className="space-y-4"
    >
      {currentStep === 0 && (
        <>
          <h4 className="text-lg font-medium">فروشگاه خود را بسازید</h4>
          <Form.Item
            label="نام فروشگاه"
            name="shopName"
            rules={[{ required: true, message: "نام فروشگاه را وارد کنید." }]}
          >
            <Input size="large" placeholder="مثال: گالری مریم" />
          </Form.Item>

          <Form.Item
            label="آدرس فروشگاه (Slug)"
            name="slug"
            rules={createSlugRules()}
          >
            <Input
              size="large"
              placeholder="مثال: maryam-gallery"
              addonBefore={"myshop.ir/"}
            />
          </Form.Item>
        </>
      )}

      {currentStep === 1 && (
        <>
          <h4 className="text-lg font-medium">اطلاعات جهت واریز مشتری</h4>
          <Form.Item
            label="نام صاحب کارت"
            name="ownerName"
            rules={[{ required: true, message: "نام صاحب کارت را وارد کنید." }]}
          >
            <Input size="large" placeholder="مثال: مریم رضایی" />
          </Form.Item>

          <Form.Item
            label="شماره کارت"
            name="cardNumber"
            rules={cardNumberRules}
          >
            <Input
              size="large"
              placeholder="0000-0000-0000-0000"
              inputMode="numeric"
              onChange={handleCardChange}
            />
          </Form.Item>
        </>
      )}

      {currentStep === 2 && (
        <>
          <h4 className="text-lg font-medium">هزینه ارسال</h4>
          <Form.Item
            label="هزینه ارسال ثابت"
            name="shippingCost"
            rules={[{ required: true, message: "هزینه ارسال را وارد کنید." }]}
          >
            <InputNumber
              size="large"
              className="w-full"
              min={0}
              controls={false}
              addonAfter="تومان"
              formatter={formatCurrency}
              parser={parseCurrency}
            />
          </Form.Item>
        </>
      )}

      <div className="flex flex-col sm:flex-row gap-3 mt-8">
        {currentStep > 0 && (
          <Button block onClick={handleBack}>
            بازگشت
          </Button>
        )}

        <Button
          type="primary"
          block
          onClick={handleNext}
          loading={isSubmitting}
        >
          {currentStep === stepsFields.length - 1
            ? "تأیید و رفتن به داشبورد"
            : "مرحله بعد"}
        </Button>
      </div>
    </Form>
  );
};

export default OnboardingForm;
