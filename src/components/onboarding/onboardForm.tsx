import { useState } from "react";
import {
  cardNumberRules,
  createSlugRules,
  formatCurrency,
  parseCurrency,
} from "@/utils/formRules";
import { Form, Input, InputNumber, Button, Steps, message } from "antd";

const stepFields: string[][] = [
  ["shopName", "slug"],
  ["ownerName", "cardNumber"],
  ["shippingCost"],
];

const OnboardingForm = ({ onFinished }: { onFinished?: () => void }) => {
  const [form] = Form.useForm();
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(false);

  const next = async () => {
    try {
      // validate only fields that belong to current step
      const fields = stepFields[current];
      await form.validateFields(fields);
      setCurrent((c) => c + 1);
    } catch (err) {
      // validation error - Antd will show messages
    }
  };

  const prev = () => setCurrent((c) => Math.max(0, c - 1));

  const submit = async () => {
    try {
      setLoading(true);
      // validate all fields before final submit
      await form.validateFields();
      const values = form.getFieldsValue(true);
      // TODO: call API to save values
      message.success("اطلاعات با موفقیت ذخیره شد");
      onFinished?.();
    } catch (err) {
      // validation failed
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <Form
        form={form}
        layout="vertical"
        requiredMark={false}
        autoComplete="off"
        className="space-y-4"
      >
        {current === 0 && (
          <div>
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
          </div>
        )}

        {current === 1 && (
          <div>
            <h4 className="text-lg font-medium">اطلاعات جهت واریز مشتری</h4>
            <Form.Item
              label="نام صاحب کارت"
              name="ownerName"
              rules={[
                { required: true, message: "نام صاحب کارت را وارد کنید." },
              ]}
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
              />
            </Form.Item>
          </div>
        )}

        {current === 2 && (
          <div>
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
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3 mt-8">
          <Button block onClick={prev} disabled={current === 0}>
            بازگشت
          </Button>

          {current < stepFields.length - 1 ? (
            <Button type="primary" block onClick={next}>
              مرحله بعد
            </Button>
          ) : (
            <Button type="primary" block onClick={submit} loading={loading}>
              ذخیره و رفتن به داشبورد
            </Button>
          )}
        </div>
      </Form>
    </div>
  );
};

export default OnboardingForm;
