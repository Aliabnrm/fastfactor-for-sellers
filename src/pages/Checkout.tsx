'use client'
import { useState } from 'react'
import { Alert, Button, Spin } from 'antd'
import { useToast } from '@/hooks/use-toast'
import useSellerBySlug from '@/hooks/useSellerBySlug'
import { useNavigate, useParams } from 'react-router-dom'
import { CheckoutForm } from '@/components/checkout/components/CheckoutForm'
import { useCheckoutSubmit } from '@/components/checkout/hooks/useCheckoutSubmit'
import { CheckoutSummary } from '@/components/checkout/components/CheckoutSummary'

export default function CheckoutPage() {
  const { toast } = useToast()
  const { slug } = useParams()
  const navigate = useNavigate()
  const [result, setResult] = useState(null)

  const { data: seller, isLoading, error } = useSellerBySlug(slug)
  const { handleCheckoutSubmit, isSubmitting } = useCheckoutSubmit(
    seller,
    setResult,
    toast,
  )

  if (isLoading || isSubmitting) {
    const tipText = isLoading
      ? 'در حال دریافت اطلاعات فروشگاه...'
      : 'در حال ثبت سفارش و آپلود مدارک...'
    return (
      <div className="p-20 text-center">
        <Spin size="large" tip={tipText} />
      </div>
    )
  }

  if (error || !seller) {
    return (
      <div className="mx-auto max-w-lg space-y-4 p-20 text-center">
        <Alert
          message="خطا در دسترسی یا عدم وجود فروشگاه"
          description={error?.message || 'فروشگاهی با این آدرس یافت نشد.'}
          type="error"
          showIcon
        />
        <Button onClick={() => navigate('/')}>بازگشت</Button>
      </div>
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
      onSubmit={handleCheckoutSubmit}
      sellerInfo={seller}
      isSubmitting={isSubmitting}
    />
  )
}
