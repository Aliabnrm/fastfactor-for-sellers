import { useState } from 'react'
import StatusBadge from './statusBadge'
import { useToast } from '@/hooks/use-toast'
import { Order } from '@/schema/order.schema'
import { Button } from '@/components/ui/button'
import { formatJalali } from '@/utils/formatJalali'
import DetailRow from '@/components/global/detailRow'
import { useUpdateOrderStatus } from '../hooks/useUpdateOrderStatus'
import { Download, ChevronDown, CheckCircle, XCircle } from 'lucide-react'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'

type OrdersListProps = {
  orders: Order[]
}

const OrdersList = ({ orders }: OrdersListProps) => {
  const { toast } = useToast()
  const [openOrderId, setOpenOrderId] = useState<string | null>(null)

  const { updateStatus, isLoading } = useUpdateOrderStatus()

  const toggleDetails = (orderId: string) => {
    setOpenOrderId(prevId => (prevId === orderId ? null : orderId))
  }

  const handleDownloadLabel = (orderId: string, customerName: string) => {
    toast({
      title: 'لیبل دانلود شد',
      description: `فایل PDF برای ${customerName} آماده است`,
    })
  }

  if (!orders?.length) {
    return (
      <p className="py-10 text-center text-muted-foreground">
        سفارشی ثبت نشده است
      </p>
    )
  }

  return (
    <div className="space-y-4">
      {orders?.map(order => {
        const isOpen = order?.id === openOrderId

        return (
          <Card
            key={order?.id}
            className="border-2 border-transparent shadow-lg transition-all duration-200 hover:border-primary/50"
          >
            <CardHeader className="flex flex-col justify-between p-4">
              <span className="text-base font-bold">
                {order?.customer_name}
              </span>
              <div className="flex w-full flex-row items-center justify-between">
                <span className="mt-1 text-[12px] text-muted-foreground sm:text-[14px]">
                  تاریخ ثبت : {formatJalali(order?.created_at)}
                </span>
                <StatusBadge status={order?.status} />
              </div>
            </CardHeader>

            <CardContent className="space-y-1 border-t px-4 py-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">نام محصول :</span>
                <span className="font-medium">{order?.product_name}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">مبلغ کل :</span>
                <span className="font-medium">
                  {order?.total_price.toLocaleString()} تومان
                </span>
              </div>
            </CardContent>

            {isOpen && (
              <div className="space-y-4 p-4 transition-all duration-300">
                <CardContent className="flex w-full flex-col gap-1.5 p-0">
                  <h3 className="mb-0 pb-1 text-base font-semibold">
                    آدرس و جزئیات مشتری
                  </h3>
                  <DetailRow label="شماره تماس" value={order?.customer_phone} />
                  <DetailRow label="کد پستی" value={order?.postal_code} />
                  <DetailRow label="۴ رقم کارت" value={order?.card_last_4} />
                </CardContent>
                <div className="rounded-lg border bg-secondary/20 p-2 text-sm">
                  <span className="mb-1 block text-muted-foreground">
                    آدرس کامل:
                  </span>
                  <p className="text-wrap break-words font-medium text-foreground">
                    {order.address}
                  </p>
                </div>

                {order?.receipt_url && (
                  <div className="mt-4">
                    <h3 className="mb-2 pb-1 text-base font-semibold">
                      تصویر فیش واریزی
                    </h3>
                    <a
                      href={order?.receipt_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                    >
                      <img
                        src={order?.receipt_url}
                        alt="فیش واریزی"
                        className="max-h-56 w-full cursor-pointer rounded-lg border object-cover px-4 py-4 shadow-inner"
                      />
                    </a>
                  </div>
                )}
              </div>
            )}

            <CardFooter
              className={`mt-2 flex flex-col gap-2 p-4 ${isOpen ? 'border-t' : ''
                }`}
            >
              <div className="flex w-full justify-between gap-2">
                {order.status === 'pending' && (
                  <>
                    <Button
                      size="sm"
                      onClick={() => updateStatus(order.id, 'confirmed')}
                      className="w-full gap-2 bg-green-600 font-semibold text-white shadow hover:bg-green-600/90"
                      disabled={isLoading}
                    >
                      <CheckCircle className="h-4 w-4" />
                      تأیید واریز
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => updateStatus(order.id, 'rejected')}
                      variant="outline"
                      className="w-full gap-2 border-red-500 font-semibold text-red-500 shadow hover:bg-red-500/10"
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
                      className="w-full gap-2 bg-primary/90 font-semibold text-white shadow hover:bg-primary"
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
                      className="w-full gap-2 font-semibold text-primary shadow"
                    >
                      دانلود لیبل پستی
                    </Button>
                  </>
                )}

                {(order.status === 'delivered' ||
                  order.status === 'rejected') && (
                    <span
                      className={`w-full rounded-lg py-2 text-center text-sm font-semibold ${order.status === 'delivered'
                        ? 'bg-green-50 text-green-600'
                        : 'bg-red-50 text-red-600'
                        }`}
                    >
                      {order.status === 'delivered' ? 'تکمیل شده' : 'رد شده'}
                    </span>
                  )}
              </div>

              <Button
                variant="ghost"
                className="w-full text-sm text-gray-400 hover:bg-secondary"
                onClick={() => toggleDetails(order.id)}
              >
                {isOpen ? 'بستن جزئیات' : 'مشاهده جزئیات کامل'}
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''
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
