import { FileUpload } from './FileUpload'
import { Card } from '@/components/ui/card'
import { useEffect, useState } from 'react'
import { useToast } from '@/hooks/use-toast'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { SellerInfo } from '@/types/checkout'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { useCheckoutForm } from '../hooks/useCheckoutForm'
import { CheckoutData, checkoutSchema } from '@/schema/checkoutSchema'

interface CheckoutFormProps {
  onSubmit: (data: CheckoutData) => void
  sellerInfo: SellerInfo
  isSubmitting: boolean
}

export const CheckoutForm = ({
  onSubmit,
  sellerInfo,
  isSubmitting,
}: CheckoutFormProps) => {
  const { data, update } = useCheckoutForm()
  const { toast } = useToast()

  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  useEffect(() => {
    if (data.paymentProof instanceof File) {
      const url = URL.createObjectURL(data.paymentProof)
      setPreviewUrl(url)

      return () => {
        URL.revokeObjectURL(url)
        setPreviewUrl(null)
      }
    } else {
      setPreviewUrl(null)
    }
  }, [data.paymentProof])

  const productPrice = Number(data.price) || 0
  const shippingCost = sellerInfo?.shipping_cost ?? 0
  const shopName = sellerInfo?.shop_name ?? 'فروشگاه'
  const total = productPrice + shippingCost

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const validation = checkoutSchema.safeParse(data)

    if (!validation.success) {
      toast({
        title: 'خطا در فرم',
        description: validation.error.issues[0].message,
        variant: 'destructive',
      })
      return
    }

    onSubmit(validation.data)
  }

  const formatCurrency = (val: number) => val.toLocaleString('fa-IR')

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, '')
    update('price', val ? Number(val) : '')
  }
  return (
    <Card className="mx-auto max-w-md p-6 shadow-2xl">
      <div className="mb-6 border-b pb-4 text-center">
        <h2 className="mb-1 text-2xl font-bold text-primary">{shopName}</h2>
        <p className="text-sm text-muted-foreground">فرم ثبت سفارش اختصاصی</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <Label>نام محصول *</Label>
          <Input
            value={data.product}
            onChange={e => update('product', e.target.value)}
            placeholder="مثال: شال پلیسه مشکی"
          />
        </div>

        <div className="space-y-2">
          <Label>مبلغ توافق شده محصول (تومان) *</Label>
          <Input
            value={data.price ? Number(data.price).toLocaleString() : ''}
            onChange={handlePriceChange}
            placeholder="مبلغی که فروشنده اعلام کرده وارد کنید"
            inputMode="numeric"
          />
        </div>
        <Card className="space-y-2 border-primary/20 bg-primary/10 p-4 text-sm transition-all duration-300">
          <div className="flex justify-between">
            <span>قیمت محصول:</span>
            <span
              className={
                productPrice > 0 ? 'font-medium' : 'text-muted-foreground'
              }
            >
              {productPrice > 0 ? formatCurrency(productPrice) : '---'} تومان
            </span>
          </div>

          <div className="flex justify-between">
            <span>هزینه پست (ثابت):</span>
            <span>{formatCurrency(shippingCost)} تومان</span>
          </div>

          <div className="flex justify-between border-t border-primary/20 pt-2 text-lg font-bold text-primary">
            <span>مبلغ قابل پرداخت:</span>
            <span>{formatCurrency(total)} تومان</span>
          </div>
        </Card>

        <div className="space-y-2">
          <Label>نام و نام خانوادگی *</Label>
          <Input
            value={data.customerName}
            onChange={e => update('customerName', e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label>شماره تماس *</Label>
          <Input
            value={data.phoneNumber}
            maxLength={11}
            dir="ltr"
            onChange={e =>
              update('phoneNumber', e.target.value.replace(/\D/g, ''))
            }
          />
        </div>

        <div className="space-y-2">
          <Label>آدرس کامل *</Label>
          <Textarea
            value={data.address}
            rows={4}
            onChange={e => update('address', e.target.value)}
            placeholder="استان، شهر، خیابان اصلی، کوچه، پلاک و کد پستی"
          />
        </div>

        <div className="space-y-2">
          <Label>کد پستی ۱۰ رقمی *</Label>
          <Input
            value={data.postalCode}
            maxLength={10}
            dir="ltr"
            onChange={e =>
              update('postalCode', e.target.value.replace(/\D/g, ''))
            }
          />
        </div>

        <div className="space-y-2">
          <Label>۴ رقم آخر کارت *</Label>
          <Input
            value={data.cardLastDigits}
            maxLength={4}
            dir="ltr"
            className="text-center text-lg tracking-widest"
            onChange={e =>
              update('cardLastDigits', e.target.value.replace(/\D/g, ''))
            }
          />
          <p className="pt-1 text-xs text-muted-foreground">
            این اطلاعات صرفا جهت پیگیری سریع‌تر فیش واریزی شما استفاده می‌شود.
          </p>
        </div>

        <FileUpload
          id="paymentProof"
          label="تصویر فیش واریزی *"
          previewUrl={previewUrl}
          fileName={data.paymentProof?.name ?? ''}
          onChange={file => update('paymentProof', file)}
        />

        <Button
          type="submit"
          className="h-12 w-full font-semibold"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'در حال ثبت...' : 'ثبت و ارسال سفارش'}
        </Button>
      </form>
    </Card>
  )
}
