import { useState } from 'react'
import { isSlugUnique } from '@/utils/isUniqeSlug'
import { Form, Input, InputNumber, Button } from 'antd'
import { useUpsertSeller } from '@/hooks/useUpsertSeller'
import { formatCurrency, parseCurrency } from '@/utils/formRules'

const stepFields = [
  ['shopName', 'slug'],
  ['ownerName', 'cardNumber'],
  ['shippingCost'],
]

const OnboardingForm = ({ onFinished }: { onFinished?: () => void }) => {
  const [form] = Form.useForm()
  const [current, setCurrent] = useState(0)

  const mutation = useUpsertSeller(onFinished)

  const next = async () => {
    try {
      await form.validateFields(stepFields[current])
      setCurrent(c => c + 1)
    } catch (err) {
      console.log(err)
    }
  }

  const prev = () => setCurrent(c => c - 1)

  const handleSubmit = async () => {
    try {
      await form.validateFields()
      mutation.mutate(form.getFieldsValue(true))
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="mx-auto max-w-2xl p-4">
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
              rules={[{ required: true, message: 'نام فروشگاه را وارد کنید.' }]}
            >
              <Input size="large" placeholder="مثال: گالری مریم" />
            </Form.Item>

            <Form.Item
              label="آدرس فروشگاه"
              name="slug"
              rules={[
                { required: true, message: 'آدرس فروشگاه الزامی است.' },
                {
                  validator: async (_, value) => {
                    if (!value) return Promise.resolve()

                    const unique = await isSlugUnique(value)
                    return unique
                      ? Promise.resolve()
                      : Promise.reject(
                        new Error('این آدرس قبلاً رزرو شده است.'),
                      )
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
                { required: true, message: 'نام صاحب کارت را وارد کنید.' },
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
            rules={[{ required: true, message: 'هزینه ارسال را وارد کنید.' }]}
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

        <div className="mt-4 flex flex-col gap-3 sm:flex-row">
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
  )
}

export default OnboardingForm
