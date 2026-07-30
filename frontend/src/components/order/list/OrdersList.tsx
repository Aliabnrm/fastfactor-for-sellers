import { useState } from 'react'
import {
  CheckCircle,
  ChevronDown,
  Download,
  XCircle,
} from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { Order } from '@/schema/order.schema'
import { Button } from '@/components/ui/button'
import { formatJalali } from '@/utils/formatJalali'
import DetailRow from '@/components/global/detailRow'
import { useUpdateOrderStatus } from '../hooks/useUpdateOrderStatus'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card'
import OrderStatusBadge from './OrderStatusBadge'

type OrdersListProps = {
  orders: Order[]
  revalidateOrders?: () => void
}

const OrdersList = ({ orders }: OrdersListProps) => {
  const { toast } = useToast()
  const [openOrderId, setOpenOrderId] = useState<string | null>(null)
  const { updateStatus, isLoading } = useUpdateOrderStatus()

  const toggleDetails = (orderId: string) => {
    setOpenOrderId(previousId =>
      previousId === orderId ? null : orderId,
    )
  }

  const handleDownloadLabel = (
    _orderId: string,
    customerName: string,
  ) => {
    toast({
      title: 'لیبل دانلود شد',
      description: `فایل PDF برای ${customerName} آماده است`,
    })
  }

  if (!orders.length) {
    return (
      <Card className="p-10 text-center">
        <p className="font-medium text-slate-700">هنوز سفارشی ثبت نشده است.</p>
        <p className="mt-2 text-sm text-muted-foreground">
          پس از ثبت اولین سفارش، اطلاعات آن در این بخش نمایش داده می‌شود.
        </p>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {orders.map(order => {
        const isOpen = order.id === openOrderId

        return (
          <Card
            key={order.id}
            className="overflow-hidden transition-[border-color,box-shadow] hover:border-indigo-200 hover:shadow-lg"
          >
            <CardHeader className="gap-3 p-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-lg font-bold text-slate-900">
                    {order.customer_name}
                  </span>
                  <span className="text-xs text-slate-400" dir="ltr">
                    #{order.id.slice(0, 8)}
                  </span>
                </div>
                <span className="mt-1 block text-xs text-muted-foreground sm:text-sm">
                  تاریخ ثبت: {formatJalali(order.created_at)}
                </span>
              </div>
              <OrderStatusBadge status={order.status} />
            </CardHeader>

            <CardContent className="grid gap-3 border-y bg-slate-50/70 px-5 py-4 sm:grid-cols-2">
              <div className="flex justify-between gap-4 text-sm">
                <span className="text-muted-foreground">نام محصول</span>
                <span className="truncate font-semibold text-slate-800">
                  {order.product_name}
                </span>
              </div>
              <div className="flex justify-between gap-4 text-sm">
                <span className="text-muted-foreground">مبلغ کل</span>
                <span className="whitespace-nowrap font-bold text-slate-900">
                  {Number(order.total_price).toLocaleString('fa-IR')} تومان
                </span>
              </div>
            </CardContent>

            {isOpen && (
              <CardContent className="space-y-5 px-5 py-5">
                <div>
                  <h3 className="mb-3 font-bold text-slate-900">
                    آدرس و جزئیات مشتری
                  </h3>
                  <div className="divide-y rounded-xl border bg-white px-4">
                    <DetailRow
                      label="شماره تماس"
                      value={order.customer_phone}
                    />
                    <DetailRow label="کد پستی" value={order.postal_code} />
                    <DetailRow label="۴ رقم کارت" value={order.card_last_4} />
                  </div>
                </div>

                <div className="rounded-xl border bg-slate-50 p-4 text-sm">
                  <span className="mb-1 block text-muted-foreground">
                    آدرس کامل
                  </span>
                  <p className="break-words font-medium leading-7 text-slate-800">
                    {order.address}
                  </p>
                </div>

                {order.receipt_url && (
                  <div>
                    <h3 className="mb-3 font-bold text-slate-900">
                      تصویر فیش واریزی
                    </h3>
                    <a
                      href={order.receipt_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                    >
                      <img
                        src={order.receipt_url}
                        alt="فیش واریزی"
                        className="max-h-64 w-full cursor-pointer rounded-xl border bg-slate-50 object-contain p-2"
                      />
                    </a>
                  </div>
                )}
              </CardContent>
            )}

            <CardFooter className="flex-col gap-3 p-4">
              <div className="flex w-full flex-col gap-2 sm:flex-row">
                {order.status === 'pending' && (
                  <>
                    <Button
                      size="sm"
                      onClick={() => updateStatus(order.id, 'confirmed')}
                      className="w-full bg-gradient-to-l from-emerald-500 to-emerald-700 shadow-emerald-900/10 hover:from-emerald-600 hover:to-emerald-800"
                      disabled={isLoading}
                    >
                      <CheckCircle className="h-4 w-4" />
                      تأیید واریز
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => updateStatus(order.id, 'rejected')}
                      variant="outline"
                      className="w-full border-red-200 text-red-600 hover:border-red-300 hover:bg-red-50 hover:text-red-700"
                      disabled={isLoading}
                    >
                      <XCircle className="h-4 w-4" />
                      رد سفارش
                    </Button>
                  </>
                )}

                {order.status === 'confirmed' && (
                  <>
                    <Button
                      size="sm"
                      onClick={() => updateStatus(order.id, 'delivered')}
                      className="w-full"
                      disabled={isLoading}
                    >
                      <Download className="h-4 w-4" />
                      بسته ارسال شد
                    </Button>
                    <Button
                      size="sm"
                      onClick={() =>
                        handleDownloadLabel(order.id, order.customer_name)
                      }
                      variant="outline"
                      className="w-full"
                    >
                      دانلود لیبل پستی
                    </Button>
                  </>
                )}

                {(order.status === 'delivered' ||
                  order.status === 'rejected') && (
                  <span
                    className={`w-full rounded-xl py-2.5 text-center text-sm font-semibold ${
                      order.status === 'delivered'
                        ? 'bg-emerald-50 text-emerald-700'
                        : 'bg-red-50 text-red-700'
                    }`}
                  >
                    {order.status === 'delivered' ? 'تکمیل شده' : 'رد شده'}
                  </span>
                )}
              </div>

              <Button
                variant="ghost"
                className="w-full text-sm text-slate-500"
                onClick={() => toggleDetails(order.id)}
              >
                {isOpen ? 'بستن جزئیات' : 'مشاهده جزئیات کامل'}
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                />
              </Button>
            </CardFooter>
          </Card>
        )
      })}
    </div>
  )
}

export default OrdersList
