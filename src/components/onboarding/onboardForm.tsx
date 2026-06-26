import { useDebounce } from 'ahooks'
import { useEffect, useState } from 'react'
import { isSlugUnique } from '@/utils/isUniqeSlug'
import { Form, Input, InputNumber, Button } from 'antd'
import { formatCurrency, parseCurrency } from '@/utils/formRules'
import { useCompleteSellerOnboardin } from '@/hooks/useCompleteSellerOnboardin'

const stepFields = [
  ['shopName', 'slug'],
  ['ownerName', 'cardNumber'],
  ['shippingCost'],
]

const OnboardingForm = ({ onFinished }: { onFinished?: () => void }) => {
  const [form] = Form.useForm()
  const [slug, setSlug] = useState('')
  const [currentStep, setCurrentStep] = useState(0)
  const [isUnique, setIsUnique] = useState<boolean | null>(null)

  const debouncedSlug = useDebounce(slug, { wait: 600 })

  useEffect(() => {
    if (!debouncedSlug) return

    let cancelled = false

    const check = async () => {
      const unique = await isSlugUnique(debouncedSlug)
      if (!cancelled) {
        setIsUnique(unique)
      }
    }

    check()

    return () => {
      cancelled = true
    }
  }, [debouncedSlug])


  const completeOnboarding = useCompleteSellerOnboardin(onFinished)

  const handleNextStep = async () => {
    try {
      await form.validateFields(stepFields[currentStep])
      setCurrentStep(c => c + 1)
    } catch (err) {
      console.log(err)
    }
  }

  const prev = () => setCurrentStep(c => c - 1)

  const handleSubmit = async () => {
    try {
      await form.validateFields()
      completeOnboarding.mutate(form.getFieldsValue(true))
    } catch (err) {
      console.log(err)
    }
  }

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
              name="shopName"
              label="نام فروشگاه"
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
                  validator: () => {
                    if (isUnique === null) return Promise.resolve()
                    return isUnique
                      ? Promise.resolve()
                      : Promise.reject(
                        new Error('این آدرس قبلاً رزرو شده است.')
                      )
                  },
                },
              ]}
            >
              <Input
                size="large"
                addonBefore="myshop.ir/"
                placeholder="maryam-gallery"
                onChange={e => {
                  setSlug(e.target.value)
                  setIsUnique(null) // reset validation while typing
                }}
              />
            </Form.Item>

          </>
        )}

        {currentStep === 1 && (
          <>
            <Form.Item
              name="ownerName"
              label="نام صاحب کارت"
              rules={[
                { required: true, message: 'نام صاحب کارت را وارد کنید.' },
              ]}
            >
              <Input size="large" placeholder="مثال: مریم رضایی" />
            </Form.Item>

            <Form.Item label="شماره کارت" name="cardNumber">
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
            label="هزینه ارسال ثابت"
            name="shippingCost"
            rules={[{ required: true, message: 'هزینه ارسال را وارد کنید.' }]}
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
          <Button block onClick={prev} disabled={currentStep === 0}>
            بازگشت
          </Button>

          {currentStep < stepFields.length - 1 ? (
            <Button type="primary" block onClick={handleNextStep}>
              مرحله بعد
            </Button>
          ) : (
            <Button
              block
              type="primary"
              onClick={handleSubmit}
              loading={completeOnboarding.isPending}
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
