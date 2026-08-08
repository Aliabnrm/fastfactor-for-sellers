import { Order } from '@/types/order.types'
import { CheckCircle2 } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import BrandLogo from '@/components/brand/BrandLogo'
interface CheckoutSummaryProps {
  data: Order
  onReset: () => void
  onDownload: () => void
}

export const CheckoutSummary = ({
  data,
  onReset,
  onDownload,
}: CheckoutSummaryProps) => {
  return (
    <main className="app-canvas flex items-center justify-center p-4">
      <Card className="relative z-10 w-full max-w-md p-6 text-center shadow-[var(--shadow-md)] sm:p-8">
        <BrandLogo compact className="mb-6 justify-center" tone="emerald" />
        <div className="mb-6 flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-success/10">
            <CheckCircle2 className="h-10 w-10 text-success" />
          </div>
        </div>

        <h2 className="mb-2 text-2xl font-bold text-foreground">
          سفارش ثبت شد!
        </h2>
        <p className="mb-6 text-muted-foreground">
          سفارش شما با موفقیت ثبت شد و به زودی ارسال می‌شود
        </p>

        <div className="mb-6 space-y-3 rounded-xl border border-emerald-100 bg-emerald-50/60 p-4 text-right">
          <div className="flex items-start justify-between gap-4">
            <span className="shrink-0 text-muted-foreground">نام:</span>
            <span className="min-w-0 break-words text-left font-medium">
              {data?.customer_name}
            </span>
          </div>

          <div className="flex items-start justify-between gap-4">
            <span className="shrink-0 text-muted-foreground">محصول:</span>
            <span className="min-w-0 break-words text-left font-medium">
              {data?.product_name}
            </span>
          </div>

          <div className="flex items-start justify-between gap-4">
            <span className="shrink-0 text-muted-foreground">شماره تماس:</span>
            <span className="min-w-0 break-words text-left font-medium">
              {data?.customer_phone}
            </span>
          </div>
        </div>

        <Button onClick={onDownload} className="mb-4 w-full">
          دانلود فاکتور
        </Button>

        <Button variant="outline" onClick={onReset} className="w-full">
          ثبت سفارش جدید
        </Button>
      </Card>
    </main>
  )
}
