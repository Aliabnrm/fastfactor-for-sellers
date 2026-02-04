import { Card } from '@/components/ui/card'
import { STATUS_CARD_CONFIG } from '@/config/orderStatus'

type StatusCardProps = {
  totalOrders: number
  pendingOrders: number
  verifiedOrders: number
  deliveredOrders: number
}

const StatusCard = (props: StatusCardProps) => {
  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
      {STATUS_CARD_CONFIG.map((item) => {
        const Icon = item.icon
        const value = props[item.key]

        return (
          <Card
            key={item.key}
            className="flex max-h-[150px] items-center justify-center rounded-xl p-3 shadow-sm transition-shadow hover:shadow-md"
          >
            <div className="flex h-full flex-col items-center justify-between sm:flex-row">
              <div className="flex h-full flex-col gap-1 text-center sm:text-left">
                <span className="text-sm text-muted-foreground">
                  {item.label}
                </span>
                <span className="text-2xl font-bold">{value}</span>
              </div>

              <div
                className={`${item.bgColor} flex h-11 w-11 items-center justify-center rounded-full`}
              >
                <Icon className={`h-5 w-5 ${item.textColor}`} />
              </div>
            </div>
          </Card>
        )
      })}
    </div>
  )
}

export default StatusCard
