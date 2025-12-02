import { Order } from '@/types/checkout'
import { CheckCircle2 } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
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
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md p-8 text-center shadow-lg">
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

        <div className="mb-6 space-y-2 rounded-lg bg-accent/50 p-4 text-right">
          <div className="flex justify-between">
            <span className="text-muted-foreground">نام:</span>
            <span className="font-medium">{data?.customer_name}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-muted-foreground">محصول:</span>
            <span className="font-medium">{data?.product_name}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-muted-foreground">شماره تماس:</span>
            <span className="font-medium">{data?.customer_phone}</span>
          </div>
        </div>

        <Button onClick={onDownload} className="mb-4 w-full">
          دانلود فاکتور
        </Button>

        <Button variant="outline" onClick={onReset} className="w-full">
          ثبت سفارش جدید
        </Button>
      </Card>
    </div>
  )
}
