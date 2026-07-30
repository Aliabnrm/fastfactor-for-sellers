'use client'
import { useState } from 'react'
import { Alert, Button, Spin } from 'antd'
import { useToast } from '@/hooks/use-toast'
import { useNavigate, useParams } from 'react-router-dom'
import { CheckoutForm } from '@/components/checkout/CheckoutForm'
import { useCheckoutSubmit } from '@/components/checkout/hooks/useCheckoutSubmit'
import { CheckoutSummary } from '@/components/checkout/components/CheckoutSummary'
import { usePublicStore } from '@/services/store/store.hooks'

export default function CheckoutPage() {
  const { toast } = useToast()
  const { slug } = useParams()
  const navigate = useNavigate()
  const [result, setResult] = useState(null)

  const { data: sellerShopInfo, isLoading, error } = usePublicStore(slug)

  const { handleCheckoutSubmit, isSubmitting } = useCheckoutSubmit(
    sellerShopInfo,
    setResult,
    toast,
  )

  if (isLoading || isSubmitting) {
    const tipText = isLoading
      ? 'در حال دریافت اطلاعات فروشگاه...'
      : 'در حال ثبت سفارش و آپلود مدارک...'
    return (
      <main className="app-canvas flex items-center justify-center p-6 text-center">
        <div className="surface-card relative z-10 p-10">
          <Spin size="large" tip={tipText} />
        </div>
      </main>
    )
  }

  if (error || !sellerShopInfo) {
    return (
      <main className="app-canvas flex items-center justify-center p-4">
        <div className="surface-card relative z-10 w-full max-w-lg space-y-4 p-6 text-center">
          <Alert
            message="خطا در دسترسی یا عدم وجود فروشگاه"
            description={error?.message || 'فروشگاهی با این آدرس یافت نشد.'}
            type="error"
            showIcon
          />
          <Button onClick={() => navigate('/')}>بازگشت</Button>
        </div>
      </main>
    )
  }

  if (result) {
    return (
      <CheckoutSummary
        data={result}
        onReset={() => setResult(null)}
        onDownload={() => toast({ title: 'فاکتور دانلود شد' })}
      />
    )
  }

  return (
    <CheckoutForm
      isSubmitting={isSubmitting}
      onSubmit={handleCheckoutSubmit}
      sellerShopInfo={sellerShopInfo}
    />
  )
}
