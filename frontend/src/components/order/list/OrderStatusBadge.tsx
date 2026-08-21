import { Badge } from '@/components/ui/badge'
import { OrderStatus } from '@/types/order.types'
import { STATUS_ORDER_CONFIG } from '@/config/orderStatus'

const OrderStatusBadge = ({ status }: { status: OrderStatus }) => {
  const data = STATUS_ORDER_CONFIG[status]
  if (!data) return null

  const Icon = data.icon

  return (
    <Badge
      className={`flex max-w-[100px] min-w-fit items-center gap-1.5  rounded-full border px-3 py-1 text-xs font-semibold ${data.bgColor} ${data.textColor} ${data.borderColor}`}
    >
      <Icon className="h-3.5 w-3.5" />
      {data.label}
    </Badge>
  )
}

export default OrderStatusBadge
