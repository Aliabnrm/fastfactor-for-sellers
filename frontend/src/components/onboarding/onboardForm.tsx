import { useDebounce } from "ahooks";
import { useEffect, useState } from "react";
import { formatCurrency, parseCurrency } from "@/utils/formRules";
import { Form, Input, InputNumber, Button, Spin, message } from "antd";
import { useCheckSlug, useCreateStore } from "@/services/store/store.hooks";

const stepFields = [
  ["shop_name", "slug"],
  ["card_owner", "card_number"],
  ["shipping_cost"],
];

interface Props {
  onFinished?: () => void;
}

export default function OnboardingForm({ onFinished }: Props) {
  const [form] = Form.useForm();
  const [slug, setSlug] = useState("");
  const [currentStep, setCurrentStep] = useState(0);

  const debouncedSlug = useDebounce(slug, {
    wait: 600,
  });

  const { data: slugResult, isFetching: isCheckingSlug, } = useCheckSlug(debouncedSlug);

  const { mutate: createStore, isPending } = useCreateStore();


  useEffect(() => {
    if (debouncedSlug) {
      form.validateFields(["slug"]);
    }
  }, [slugResult, debouncedSlug, form]);

  const nextStep = async () => {
    try {
      await form.validateFields(stepFields[currentStep]);

      setCurrentStep(prev => prev + 1);
    } catch (error: any) {
      if (!error?.errorFields) {
        message.error("خطایی رخ داد.");
      }
    }
  };

  const previousStep = () => {
    setCurrentStep(prev => prev - 1);
  };

  console.log(form.getFieldsValue(true));
  console.log(currentStep);
  console.log(form.getFieldValue("shipping_cost"));

  const submit = async () => {
    try {
      console.log("before validate");

      const values = await form.validateFields();

      console.log("after validate", values);
      // await form.validateFields();

      createStore(form.getFieldsValue(true), {
        onSuccess: () => {
          onFinished?.();
        },
        onError: (error: any) => {
          message.error(
            error?.response?.data?.message ??
            "خطا در ایجاد فروشگاه",
          );
        },
      });
    } catch (error: any) {
      if (!error?.errorFields) {
        message.error("خطایی رخ داد.");
      }
    }
  };

  return (
    <div className="mx-auto max-w-2xl p-4">
      <Form
        form={form}
        layout="vertical"
        autoComplete="off"
        requiredMark={false}
      >
        {currentStep === 0 && (
          <>
            <Form.Item
              name="shop_name"
              label="نام فروشگاه"
              rules={[
                {
                  required: true,
                  message: "نام فروشگاه را وارد کنید.",
                },
              ]}
            >
              <Input
                size="large"
                placeholder="مثال: گالری مریم"
              />
            </Form.Item>

            <Form.Item
              name="slug"
              label="آدرس فروشگاه"
              rules={[
                {
                  required: true,
                  message: "آدرس فروشگاه الزامی است.",
                },
                {
                  validator: async (_, value) => {
                    if (!value) {
                      return Promise.resolve();
                    }

                    if (isCheckingSlug) {
                      return Promise.resolve();
                    }

                    if (slugResult?.available) {
                      return Promise.resolve();
                    }

                    return Promise.reject(
                      new Error("این آدرس قبلاً رزرو شده است.")
                    );
                  }
                },
              ]}
            >
              <Input
                size="large"
                addonBefore="myshop.ir/"
                placeholder="maryam-gallery"
                suffix={
                  isCheckingSlug ? <Spin size="small" /> : null
                }
                onChange={(e) => {
                  setSlug(e.target.value);
                }}
              />
            </Form.Item>
          </>
        )}

        {currentStep === 1 && (
          <>
            <Form.Item
              name="card_owner"
              label="نام صاحب کارت"
              rules={[
                {
                  required: true,
                  message: "نام صاحب کارت را وارد کنید.",
                },
              ]}
            >
              <Input
                size="large"
                placeholder="مثال: مریم رضایی"
              />
            </Form.Item>

            <Form.Item
              name="card_number"
              label="شماره کارت"
              rules={[
                {
                  required: true,
                  message: "شماره کارت را وارد کنید.",
                },
              ]}
            >
              <Input
                size="large"
                inputMode="numeric"
                placeholder="0000-0000-0000-0000"
              />
            </Form.Item>
          </>
        )}

        {currentStep === 2 && (
          <Form.Item
            preserve
            name="shipping_cost"
            label="هزینه ارسال ثابت"
            rules={[
              {
                required: true,
                message: "هزینه ارسال را وارد کنید.",
              },
            ]}
          >
            <InputNumber
              min={0}
              size="large"
              controls={false}
              className="w-full"
              addonAfter="تومان"
              parser={parseCurrency}
              formatter={formatCurrency}
            />
          </Form.Item>
        )}

        <div className="mt-4 flex flex-col gap-3 sm:flex-row">
          <Button
            block
            onClick={previousStep}
            disabled={currentStep === 0}
          >
            بازگشت
          </Button>

          {currentStep < stepFields.length - 1 ? (
            <Button
              block
              type="primary"
              onClick={nextStep}
              disabled={isCheckingSlug}
            >
              مرحله بعد
            </Button>
          ) : (
            <Button
              block
              type="primary"
              onClick={submit}
              loading={isPending}
            >
              ذخیره و رفتن به داشبورد
            </Button>
          )}
        </div>
      </Form>
    </div >
  );
}