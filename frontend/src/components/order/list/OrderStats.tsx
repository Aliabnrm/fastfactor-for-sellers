import { Card } from '@/components/ui/card'
import { STATUS_CARD_CONFIG } from '@/config/orderStatus'

type OrderStatsProps = {
  totalOrders: number
  pendingOrders: number
  verifiedOrders: number
  deliveredOrders: number
}

const OrderStats = (props: OrderStatsProps) => (
  <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
    {STATUS_CARD_CONFIG.map(item => {
      const Icon = item.icon
      const value = props[item.key]

      return (
        <Card
          key={item.key}
          className="flex min-h-32 flex-col justify-between p-4 transition-[box-shadow,transform] hover:-translate-y-0.5 hover:shadow-lg sm:min-h-36 sm:p-5"
        >
          <div
            className={`${item.bgColor} flex h-11 w-11 items-center justify-center rounded-xl`}
          >
            <Icon className={`h-5 w-5 ${item.textColor}`} />
          </div>
          <div className="mt-5 flex items-center gap-1">
            <span className="block text-md text-muted-foreground">
              {item.label} :
            </span>
            <span className={` block text-2xl font-bold sm:text-3xl ${item.textColor}`}>
              {value.toLocaleString('fa-IR')}
            </span>
          </div>
        </Card>
      )
    })}
  </div>
)

export default OrderStats
