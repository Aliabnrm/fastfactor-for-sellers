import { useDebounce } from 'ahooks'
import { Button, Form, message } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useCallback, useEffect, useState } from 'react'
import { toEnglishDigits } from '@/utils/formRules'
import { handleUnknownError } from '@/lib/unknownError'
import { useCheckSlug, useCreateStore } from '@/services/store/store.hooks'
import ShopInfoStep from './steps/ShopInfoStep'
import CardInfoStep from './steps/CardInfoStep'
import ShippingCostStep from './steps/ShippingCostStep'
import OnboardingProgress from './OnboardingProgress'

const stepFields = [
  ['shop_name', 'slug'],
  ['card_owner', 'card_number'],
  ['shipping_cost'],
]

const stepContent = [
  {
    title: 'هویت فروشگاه',
    description: 'نام و آدرس اختصاصی فروشگاه خود را وارد کنید.',
  },
  {
    title: 'اطلاعات مالی',
    description: 'مشخصات کارتی که مشتریان به آن واریز می‌کنند.',
  },
  {
    title: 'تنظیمات ارسال',
    description: 'هزینه ثابت ارسال سفارش‌ها را مشخص کنید.',
  },
]

const OnboardingForm = () => {
  const navigate = useNavigate()
  const [form] = Form.useForm()
  const [slug, setSlug] = useState('')
  const [currentStep, setCurrentStep] = useState(0)

  const debouncedSlug = useDebounce(slug, { wait: 600 })
  const { data: slugResult, isFetching: isCheckingSlug } =
    useCheckSlug(debouncedSlug)
  const { mutate: createStore, isPending } = useCreateStore()

  useEffect(() => {
    if (debouncedSlug) {
      form.validateFields(['slug'])
    }
  }, [debouncedSlug, slugResult, form])

  const nextStep = useCallback(async () => {
    try {
      await form.validateFields(stepFields[currentStep])
      setCurrentStep(previous => previous + 1)
    } catch (error) {
      handleUnknownError(error)
    }
  }, [currentStep, form])

  const previousStep = () => {
    setCurrentStep(previous => previous - 1)
  }

  const submit = useCallback(async () => {
    try {
      await form.validateFields()
      const values = form.getFieldsValue(true)

      createStore(
        {
          ...values,
          card_number: toEnglishDigits(values.card_number),
        },
        {
          onSuccess: () => {
            navigate('/order', { replace: true })
          },
          onError: (error: any) => {
            console.error(error)
            message.error(
              error?.response?.data?.message ?? 'خطا در ایجاد فروشگاه',
            )
          },
        },
      )
    } catch (error) {
      console.error(error)
      handleUnknownError(error)
    }
  }, [createStore, form, navigate])

  return (
    <>
      <OnboardingProgress currentStep={currentStep} />

      <section className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:p-7">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-slate-900">
            {stepContent[currentStep].title}
          </h2>
          <p className="mt-1 text-sm leading-6 text-slate-500">
            {stepContent[currentStep].description}
          </p>
        </div>

        <Form
          form={form}
          layout="vertical"
          autoComplete="off"
          requiredMark={false}
        >
          {currentStep === 0 && (
            <ShopInfoStep
              setSlug={setSlug}
              slugResult={slugResult}
              isCheckingSlug={isCheckingSlug}
            />
          )}

          {currentStep === 1 && <CardInfoStep />}
          {currentStep === 2 && <ShippingCostStep />}

          <div className="form-actions">
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
      </section>
    </>
  )
}

export default OnboardingForm
