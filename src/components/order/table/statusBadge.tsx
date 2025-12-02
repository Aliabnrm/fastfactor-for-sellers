import { Badge } from '@/components/ui/badge'
import { OrderStatus } from '@/types/checkout'
import { STATUS_ORDER_CONFIG } from '@/config/orderStatus'

const StatusBadge = ({ status }: { status: OrderStatus }) => {
  const data = STATUS_ORDER_CONFIG[status]
  if (!data) return null

  const Icon = data.icon

  return (
    <Badge
      className={`flex min-w-fit items-center gap-1 rounded-md border px-2 py-1 text-xs font-medium ${data.bgColor} ${data.textColor} ${data.borderColor} hover:bg-transparent`}
    >
      <Icon className="h-3 w-3" />
      {data.label}
    </Badge>
  )
}

export default StatusBadge
