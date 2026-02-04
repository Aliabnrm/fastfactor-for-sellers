import { useEffect } from 'react'
import { Save } from 'lucide-react'
import { Form, Button } from 'antd'
import useLogout from '@/hooks/useLogout'
import useSellerProfile from '@/hooks/useSellerProfile'
import { PaymentCard } from '@/components/profile/paymentCard'
import MainLayout from '@/components/global/layout/MainLayout'
import { SellerInfoCard } from '@/components/profile/infoCard'
import { AccountLogoutCard } from '@/components/profile/logoutCard'
import { useUpdateSellerProfile } from '@/hooks/useUpdateSellerProfile'

const ProfilePage = () => {
  const [form] = Form.useForm()
  const { profile } = useSellerProfile()
  const updateMutation = useUpdateSellerProfile()
  const { logout, loading: logoutLoading } = useLogout()

  useEffect(() => {
    if (profile) {
      form.setFieldsValue({
        shopName: profile.shop_name,
        ownerName: profile.card_owner,
        shippingCost: profile.shipping_cost,
        cardNumber: profile.card_number,
      })
    }
  }, [profile, form])

  const handleUpdate = values => {
    updateMutation.mutate({
      shop_name: values.shopName,
      card_owner: values.ownerName,
      shipping_cost: values.shippingCost,
      card_number: values.cardNumber,
    })
  }

  const handleCardNumberChange = e => {
    const value = e.target.value.replace(/\D/g, '').substring(0, 16)
    form.setFieldValue('cardNumber', value.replace(/(\d{4})(?=\d)/g, '$1-'))
  }

  return (
    <MainLayout showProfileShortcut={false}>
      <Form
        form={form}
        layout="vertical"
        requiredMark={false}
        onFinish={handleUpdate}
        className='flex w-full flex-col gap-4'
      >
        <SellerInfoCard form={form} />
        <PaymentCard form={form} handleCardChange={handleCardNumberChange} />
        <AccountLogoutCard logout={logout} logoutLoading={logoutLoading} />
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
