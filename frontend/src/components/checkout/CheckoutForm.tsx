import { FileUpload } from './components/FileUpload'
import { Card } from '@/components/ui/card'
import { useToast } from '@/hooks/use-toast'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { useCheckoutForm } from './hooks/useCheckoutForm'
import { CheckoutData, checkoutSchema } from '@/schema/checkoutSchema'
import { formatToFa } from '@/utils/formRules'
import { PublicStore } from '@/schema/store.schema'
import BrandLogo from '@/components/brand/BrandLogo'
import CheckoutSection from './components/CheckoutSection'
import {
  CreditCard,
  MapPin,
  ReceiptText,
  ShoppingBag,
  Store,
  UserRound,
} from 'lucide-react'

interface CheckoutFormProps {
  isSubmitting: boolean
  sellerShopInfo: PublicStore
  onSubmit: (data: CheckoutData) => void
}

export const CheckoutForm = ({
  onSubmit,
  isSubmitting,
  sellerShopInfo,
}: CheckoutFormProps) => {
  const { data, update } = useCheckoutForm()
  const { toast } = useToast()

  const productPrice = Number(data.price) || 0
  const shippingCost = sellerShopInfo?.shipping_cost ?? 0
  const shopName = sellerShopInfo?.shop_name ?? 'فروشگاه'
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

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, '')
    update('price', val ? Number(val) : '')
  }

  return (
    <main className="app-canvas px-4 py-6 sm:py-10">
      <div className="relative z-10 mx-auto max-w-2xl">
        <header className="mb-5 flex items-center justify-between gap-4 rounded-xl border border-white/80 bg-white/85 p-4 shadow-sm backdrop-blur-xl sm:mb-6 sm:p-5">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-teal-500 to-emerald-700 text-white">
                <Store className="h-5 w-5" />
              </span>
              <div className="flex flex-col gap-0">
                <span className=" font-bold text-slate-900 sm:text-lg">
                  {shopName}
                </span>
                <span className="text-xs text-slate-500">فروشنده تأییدشده</span>
              </div>
            </div>
          </div>
          <BrandLogo compact className="hidden sm:flex" tone="emerald" />
        </header>

        <form onSubmit={handleSubmit} className="space-y-5">
          <CheckoutSection
            title="خلاصه سفارش"
            icon={<ShoppingBag className="h-5 w-5" />}
          >
            <div className="grid gap-4 sm:gap-5">
              <div className="space-y-2">
                <Label htmlFor="product">نام محصول *</Label>
                <Input
                  id="product"
                  value={data.product}
                  onChange={event => update('product', event.target.value)}
                  placeholder="مثال: شال پلیسه مشکی"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="price">
                  مبلغ توافق شده محصول (تومان) *
                </Label>
                <Input
                  id="price"
                  value={
                    data.price ? Number(data.price).toLocaleString() : ''
                  }
                  onChange={handlePriceChange}
                  placeholder="مبلغ اعلام‌شده توسط فروشنده"
                  inputMode="numeric"
                />
              </div>

              <Card className="space-y-3 border-indigo-100 bg-indigo-50/60 p-4 text-sm">
                <div className="flex items-start justify-between gap-3">
                  <span className="shrink-0 text-slate-500">قیمت محصول</span>
                  <span
                    className={
                      productPrice > 0
                        ? 'text-left font-semibold'
                        : 'text-muted-foreground'
                    }
                  >
                    {productPrice > 0 ? formatToFa(productPrice) : '---'} تومان
                  </span>
                </div>
                <div className="flex items-start justify-between gap-3">
                  <span className="shrink-0 text-slate-500">هزینه ارسال</span>
                  <span className="text-left font-semibold">
                    {formatToFa(shippingCost)} تومان
                  </span>
                </div>
                <div className="flex items-start justify-between gap-3 border-t border-indigo-100 pt-3 text-base font-bold text-indigo-950">
                  <span className="shrink-0">مبلغ قابل پرداخت</span>
                  <span className="text-left">{formatToFa(total)} تومان</span>
                </div>
              </Card>
            </div>
          </CheckoutSection>

          <CheckoutSection
            title="اطلاعات خریدار"
            icon={<UserRound className="h-5 w-5" />}
          >
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
              <div className="space-y-2">
                <Label htmlFor="customerName">نام و نام خانوادگی *</Label>
                <Input
                  id="customerName"
                  value={data.customerName}
                  onChange={event =>
                    update('customerName', event.target.value)
                  }
                  placeholder="مثال: علی رضایی"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phoneNumber">شماره تماس *</Label>
                <Input
                  id="phoneNumber"
                  value={data.phoneNumber}
                  maxLength={11}
                  dir="ltr"
                  inputMode="numeric"
                  placeholder="09123456789"
                  onChange={event =>
                    update(
                      'phoneNumber',
                      event.target.value.replace(/\D/g, ''),
                    )
                  }
                />
              </div>
            </div>
          </CheckoutSection>

          <CheckoutSection
            title="اطلاعات ارسال"
            icon={<MapPin className="h-5 w-5" />}
          >
            <div className="grid gap-4 sm:gap-5">
              <div className="space-y-2">
                <Label htmlFor="address">آدرس کامل *</Label>
                <Textarea
                  id="address"
                  value={data.address}
                  rows={4}
                  onChange={event => update('address', event.target.value)}
                  placeholder="استان، شهر، خیابان اصلی، کوچه و پلاک"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="postalCode">کد پستی ۱۰ رقمی *</Label>
                <Input
                  id="postalCode"
                  value={data.postalCode}
                  maxLength={10}
                  dir="ltr"
                  inputMode="numeric"
                  onChange={event =>
                    update(
                      'postalCode',
                      event.target.value.replace(/\D/g, ''),
                    )
                  }
                />
              </div>
            </div>
          </CheckoutSection>

          <CheckoutSection
            title="تأیید پرداخت"
            icon={<CreditCard className="h-5 w-5" />}
          >
            <div className="grid gap-4 sm:gap-5">
              <div className="space-y-2">
                <Label htmlFor="cardLastDigits">۴ رقم آخر کارت *</Label>
                <Input
                  id="cardLastDigits"
                  value={data.cardLastDigits}
                  maxLength={4}
                  dir="ltr"
                  inputMode="numeric"
                  className="text-center text-lg tracking-widest"
                  onChange={event =>
                    update(
                      'cardLastDigits',
                      event.target.value.replace(/\D/g, ''),
                    )
                  }
                />
                <p className="pt-1 text-xs leading-5 text-muted-foreground">
                  این اطلاعات صرفاً برای پیگیری سریع‌تر فیش واریزی استفاده
                  می‌شود.
                </p>
              </div>

              <FileUpload
                id="paymentProof"
                label="تصویر فیش واریزی *"
                fileName={data.paymentProof?.name ?? ''}
                onChange={file => update('paymentProof', file)}
              />
            </div>
          </CheckoutSection>

          <div className="sticky bottom-4 z-20 rounded-xl border border-white/70 bg-white/90 p-3 shadow-[var(--shadow-lg)] backdrop-blur-xl">
            <Button
              type="submit"
              className="h-12 w-full bg-gradient-to-l from-teal-500 to-emerald-700 shadow-emerald-900/15 hover:from-teal-600 hover:to-emerald-800"
              disabled={isSubmitting}
            >
              <ReceiptText className="h-5 w-5" />
              {isSubmitting ? 'در حال ثبت...' : 'ثبت و ارسال سفارش'}
            </Button>
          </div>
        </form>
      </div>
    </main>
  )
}
