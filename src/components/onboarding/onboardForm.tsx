import { useState } from "react";
import { isSlugUnique } from "@/lib/isUniqeSlug";
import { Form, Input, InputNumber, Button } from "antd";
import { useUpsertSeller } from "@/hooks/useUpsertSeller";
import { formatCurrency, parseCurrency } from "@/utils/formRules";

const stepFields = [
  ["shopName", "slug"],
  ["ownerName", "cardNumber"],
  ["shippingCost"],
];

const OnboardingForm = ({ onFinished }: { onFinished?: () => void }) => {
  const [form] = Form.useForm();
  const [current, setCurrent] = useState(0);

  const mutation = useUpsertSeller(onFinished);

  const next = async () => {
    try {
      await form.validateFields(stepFields[current]);
      setCurrent((c) => c + 1);
    } catch (err) {
      console.log(err);
    }
  };

  const prev = () => setCurrent((c) => c - 1);

  const handleSubmit = async () => {
    try {
      await form.validateFields();
      mutation.mutate(form.getFieldsValue(true));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <Form
        form={form}
        layout="vertical"
        requiredMark={false}
        autoComplete="off"
      >
        {current === 0 && (
          <>
            <Form.Item
              label="نام فروشگاه"
              name="shopName"
              rules={[{ required: true, message: "نام فروشگاه را وارد کنید." }]}
            >
              <Input size="large" placeholder="مثال: گالری مریم" />
            </Form.Item>

            <Form.Item
              label="آدرس فروشگاه"
              name="slug"
              rules={[
                { required: true, message: "آدرس فروشگاه الزامی است." },
                {
                  validator: async (_, value) => {
                    if (!value) return Promise.resolve();

                    const unique = await isSlugUnique(value);
                    return unique
                      ? Promise.resolve()
                      : Promise.reject(
                          new Error("این آدرس قبلاً رزرو شده است.")
                        );
                  },
                },
              ]}
            >
              <Input
                size="large"
                placeholder="maryam-gallery"
                addonBefore="myshop.ir/"
              />
            </Form.Item>
          </>
        )}

        {current === 1 && (
          <>
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
              />
            </Form.Item>
          </>
        )}

        {current === 2 && (
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
        )}

        <div className="flex flex-col sm:flex-row gap-3 mt-4">
          <Button block onClick={prev} disabled={current === 0}>
            بازگشت
          </Button>

          {current < stepFields.length - 1 ? (
            <Button type="primary" block onClick={next}>
              مرحله بعد
            </Button>
          ) : (
            <Button
              type="primary"
              block
              onClick={handleSubmit}
              loading={mutation.isPending}
            >
              ذخیره و رفتن به داشبورد
            </Button>
          )}
        </div>
      </Form>
    </div>
  );
};

export default OnboardingForm;

// import { useState } from "react";
// import { supabase } from "@/lib/supabase";
// import { isSlugUnique } from "@/lib/isUniqeSlug";
// import { Form, Input, InputNumber, Button, message } from "antd";
// import { formatCurrency, parseCurrency } from "@/utils/formRules";

// const stepFields: string[][] = [
//   ["shopName", "slug"],
//   ["ownerName", "cardNumber"],
//   ["shippingCost"],
// ];

// const OnboardingForm = ({ onFinished }: { onFinished?: () => void }) => {
//   const [form] = Form.useForm();
//   const [current, setCurrent] = useState(0);
//   const [loading, setLoading] = useState(false);

//   const next = async () => {
//     try {
//       const fields = stepFields[current];
//       await form.validateFields(fields);

//       setCurrent((c) => c + 1);
//     } catch (err) {
//       return;
//     }
//   };

//   const prev = () => setCurrent((c) => Math.max(0, c - 1));

//   const hadnleSubmit = async () => {
//     try {
//       setLoading(true);

//       await form.validateFields();
//       const values = form.getFieldsValue(true);

//       const {
//         data: { user },
//         error: userError,
//       } = await supabase.auth.getUser();

//       if (userError || !user) {
//         message.error("خطا: کاربر احراز هویت نشده یا سشن منقضی شده است.");
//         setLoading(false);
//         return;
//       }

//       const sellerData = {
//         id: user.id,
//         email: user.email,

//         shop_name: values.shopName,
//         slug: values.slug,

//         card_owner: values.ownerName,
//         card_number: values.cardNumber,
//         shipping_cost: values.shippingCost,

//         is_onboarded: true,
//       };

//       const { error: dbError } = await supabase
//         .from("sellers")
//         .upsert(sellerData, { onConflict: "id" })
//         .select()
//         .single();

//       if (dbError) {
//         message.error(`خطا در ذخیره اطلاعات: ${dbError.message}`);
//       } else {
//         message.success(
//           "اطلاعات با موفقیت ذخیره شد و به داشبورد هدایت می‌شوید."
//         );
//         onFinished?.();
//       }
//     } catch (err) {
//       console.error("Submission failed:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-2xl mx-auto p-4">
//       <Form
//         form={form}
//         layout="vertical"
//         requiredMark={false}
//         autoComplete="off"
//         className="space-y-4"
//       >
//         {current === 0 && (
//           <div>
//             <h4 className="text-lg font-medium">فروشگاه خود را بسازید</h4>
//             <Form.Item
//               label="نام فروشگاه"
//               name="shopName"
//               rules={[{ required: true, message: "نام فروشگاه را وارد کنید." }]}
//             >
//               <Input size="large" placeholder="مثال: گالری مریم" />
//             </Form.Item>

//             <Form.Item
//               label="آدرس فروشگاه"
//               name="slug"
//               rules={[
//                 { required: true, message: "آدرس فروشگاه الزامی است." },
//                 {
//                   validator: async (_, value) => {
//                     if (!value) {
//                       return Promise.resolve();
//                     }

//                     const isUnique = await isSlugUnique(value);

//                     if (isUnique) {
//                       return Promise.resolve();
//                     }

//                     return Promise.reject(
//                       new Error(
//                         "این آدرس قبلاً توسط فروشنده دیگری رزرو شده است."
//                       )
//                     );
//                   },
//                 },
//               ]}
//             >
//               <Input
//                 size="large"
//                 placeholder="مثال: maryam-gallery"
//                 addonBefore={"myshop.ir/"}
//               />
//             </Form.Item>
//           </div>
//         )}

//         {current === 1 && (
//           <div>
//             <h4 className="text-lg font-medium">اطلاعات جهت واریز مشتری</h4>
//             <Form.Item
//               label="نام صاحب کارت"
//               name="ownerName"
//               rules={[
//                 { required: true, message: "نام صاحب کارت را وارد کنید." },
//               ]}
//             >
//               <Input size="large" placeholder="مثال: مریم رضایی" />
//             </Form.Item>

//             <Form.Item
//               label="شماره کارت"
//               name="cardNumber"
//               // rules={cardNumberRules}
//             >
//               <Input
//                 size="large"
//                 placeholder="0000-0000-0000-0000"
//                 inputMode="numeric"
//               />
//             </Form.Item>
//           </div>
//         )}

//         {current === 2 && (
//           <div>
//             <h4 className="text-lg font-medium">هزینه ارسال</h4>
//             <Form.Item
//               label="هزینه ارسال ثابت"
//               name="shippingCost"
//               rules={[{ required: true, message: "هزینه ارسال را وارد کنید." }]}
//             >
//               <InputNumber
//                 size="large"
//                 className="w-full"
//                 min={0}
//                 controls={false}
//                 addonAfter="تومان"
//                 formatter={formatCurrency}
//                 parser={parseCurrency}
//               />
//             </Form.Item>
//           </div>
//         )}

//         <div className="flex flex-col sm:flex-row gap-3 mt-0 pt-4">
//           <Button block onClick={prev} disabled={current === 0}>
//             بازگشت
//           </Button>

//           {current < stepFields.length - 1 ? (
//             <Button type="primary" block onClick={next}>
//               مرحله بعد
//             </Button>
//           ) : (
//             <Button
//               type="primary"
//               block
//               onClick={hadnleSubmit}
//               loading={loading}
//             >
//               ذخیره و رفتن به داشبورد
//             </Button>
//           )}
//         </div>
//       </Form>
//     </div>
//   );
// };

// export default OnboardingForm;
