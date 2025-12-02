import { Card } from '@/components/ui/card'
import { Package, TrendingUp, Clock, Truck } from 'lucide-react'

type StatusCardProps = {
  totalOrders: number
  pendingOrders: number
  verifiedOrders: number
  deliveredOrders: number
}

type CardDetailProps = {
  label: string
  value: number
  icon: React.ElementType
  bgColor: string
  textColor: string
}

const StatusCard = ({
  totalOrders,
  pendingOrders,
  verifiedOrders,
  deliveredOrders,
}: StatusCardProps) => {
  const cardDetails: CardDetailProps[] = [
    {
      label: 'کل سفارش‌ها',
      value: totalOrders,
      icon: Package,
      bgColor: 'bg-primary/10',
      textColor: 'text-primary',
    },
    {
      label: 'در انتظار بررسی',
      value: pendingOrders,
      icon: Clock,
      bgColor: 'bg-accent/10',
      textColor: 'text-accent-foreground',
    },
    {
      label: 'تایید شده',
      value: verifiedOrders,
      icon: TrendingUp,
      bgColor: 'bg-success/10',
      textColor: 'text-success',
    },
    {
      label: 'ارسال شده',
      value: deliveredOrders,
      icon: Truck,
      bgColor: 'bg-success/10',
      textColor: 'text-success',
    },
  ]

  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
      {cardDetails?.map((item?) => {
        const Icon = item?.icon
        return (
          <Card
            key={item?.label}
            className="flex max-h-[150px] items-center justify-center rounded-xl p-3 shadow-sm transition-shadow hover:shadow-md sm:col-span-1"
          >
            <div className="flex h-full flex-col items-center justify-between sm:flex-row sm:items-center">
              <div className="flex h-full flex-col gap-1 text-center sm:text-left">
                <span className="text-sm text-muted-foreground">
                  {item?.label}
                </span>
                <span className="text-2xl font-bold">{item?.value}</span>
              </div>

              <div
                className={`${item?.bgColor} flex h-11 w-11 items-center justify-center rounded-full sm:h-full`}
              >
                <Icon className={`h-5 w-5 ${item?.textColor}`} />
              </div>
            </div>
          </Card>
        )
      })}
    </div>
  )
}

export default StatusCard
