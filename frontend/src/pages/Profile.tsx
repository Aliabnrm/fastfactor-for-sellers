import { useEffect } from 'react'
import { Save } from 'lucide-react'
import { Form, Button } from 'antd'
import { PaymentCard } from '@/components/profile/paymentCard'
import { SellerInfoCard } from '@/components/profile/infoCard'
import MainLayout from '@/components/global/layout/MainLayout'
import { AccountLogoutCard } from '@/components/profile/logoutCard'
import { useMyStore, useUpdateStore } from '@/services/store/store.hooks'

const ProfilePage = () => {
  const [form] = Form.useForm()

  const {
    data: storeProfileInfo,
  } = useMyStore();

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

  const handleUpdate = values => {

    updateMutation.mutate({
      shop_name: values.shopName,
      card_owner: values.ownerName,
      shipping_cost: values.shippingCost,
      card_number: values.cardNumber.replace(/-/g, ''),
    })
  }

  const handleCardNumberChange = e => {
    const value = e.target.value.replace(/\D/g, '').substring(0, 16)
    form.setFieldValue('cardNumber', value.replace(/(\d{4})(?=\d)/g, '$1-'))
  }

  return (
    <MainLayout showProfile={false}>
      <Form
        form={form}
        layout="vertical"
        requiredMark={false}
        onFinish={handleUpdate}
        className='flex w-full flex-col gap-4'
      >
        <SellerInfoCard form={form} />
        <PaymentCard form={form} handleCardChange={handleCardNumberChange} />
        <AccountLogoutCard />

        <div className="sticky bottom-0 w-full flex justify-start rounded-2xl border border-border bg-background/90 px-6 py-3 shadow-lg backdrop-blur-sm">
          <Button
            size="large"
            type="primary"
            htmlType="submit"
            className='w-full'
            loading={updateMutation.isPending}
            icon={<Save className='w-5 h-5 mt-2' />}
          >
            ذخیره تغییرات
          </Button>
        </div>
      </Form>
    </MainLayout>
  )
}

export default ProfilePage
