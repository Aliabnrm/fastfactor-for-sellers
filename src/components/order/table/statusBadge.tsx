import { Badge } from "@/components/ui/badge";
import { OrderStatus } from "@/types/checkout";
import { STATUS_ORDER_CONFIG } from "@/config/orderStatus";

const StatusBadge = ({ status }: { status: OrderStatus }) => {
  const data = STATUS_ORDER_CONFIG[status];
  if (!data) return null;

  const Icon = data.icon;

  return (
    <Badge
      className={`
        flex items-center min-w-fit gap-1 px-2 py-1 border 
        rounded-md text-xs font-medium 
        ${data.bgColor} 
        ${data.textColor}
        ${data.borderColor}
        hover:bg-transparent
      `}
    >
      <Icon className="w-3 h-3" />
      {data.label}
    </Badge>
  );
};

export default StatusBadge;
