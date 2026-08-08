import { ChangeEvent, useEffect } from 'react'
import { Save, Settings2 } from 'lucide-react'
import { Form, Button, FormProps } from 'antd'
import MainLayout from '@/components/global/layout/MainLayout'
import { useMyStore, useUpdateStore } from '@/services/store/store.hooks'
import SellerInfoCard from '@/components/profile/SellerInfoCard'
import PaymentSettingsCard from '@/components/profile/PaymentSettingsCard'
import AccountActionsCard from '@/components/profile/AccountActionsCard'

type ProfileFormValues = {
  shopName: string
  ownerName: string
  shippingCost: number
  cardNumber: string
}

const ProfilePage = () => {
  const [form] = Form.useForm<ProfileFormValues>()

  const { data: storeProfileInfo } = useMyStore()

  const updateMutation = useUpdateStore()

  useEffect(() => {
    if (storeProfileInfo) {
      form.setFieldsValue({
        shopName: storeProfileInfo?.shop_name,
        ownerName: storeProfileInfo?.card_owner,
        shippingCost: storeProfileInfo?.shipping_cost,
        cardNumber: storeProfileInfo?.card_number,
      })
    }
  }, [storeProfileInfo, form])

  const handleUpdate: FormProps<ProfileFormValues>['onFinish'] = values => {
    updateMutation.mutate({
      shop_name: values.shopName,
      card_owner: values.ownerName,
      shipping_cost: values.shippingCost,
      card_number: values.cardNumber.replace(/-/g, ''),
    })
  }

  const handleCardNumberChange = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const value = event.target.value.replace(/\D/g, '').substring(0, 16)
    form.setFieldValue('cardNumber', value.replace(/(\d{4})(?=\d)/g, '$1-'))
  }

  return (
    <MainLayout showProfile={false}>
      <Form
        form={form}
        layout="vertical"
        requiredMark={false}
        onFinish={handleUpdate}
        className="mx-auto flex w-full max-w-2xl flex-col gap-5"
      >
        <header className="mb-1">
          <span className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-secondary text-primary">
            <Settings2 className="h-5 w-5" />
          </span>
          <h1 className="page-title">تنظیمات حساب کاربری</h1>
          <p className="page-subtitle mt-1">
            اطلاعات فروشگاه، پرداخت و ارسال را مدیریت کنید.
          </p>
        </header>

        <SellerInfoCard />
        <PaymentSettingsCard handleCardChange={handleCardNumberChange} />
        <AccountActionsCard />

        <div className="sticky bottom-4 z-20 w-full rounded-xl border border-white/70 bg-white/90 p-3 shadow-[var(--shadow-lg)] backdrop-blur-xl">
          <Button
            size="large"
            type="primary"
            htmlType="submit"
            className="!h-12 w-full"
            loading={updateMutation.isPending}
            icon={<Save className="h-5 w-5" />}
          >
            ذخیره تغییرات
          </Button>
        </div>
      </Form>
    </MainLayout>
  )
}

export default ProfilePage
