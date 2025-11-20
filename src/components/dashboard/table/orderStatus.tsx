import { Badge } from "@/components/ui/badge";
import { Clock, CheckCircle2, Truck } from "lucide-react";

const STATUS_CONFIG: any = {
  pending: {
    label: "در انتظار بررسی",
    icon: Clock,
    className: "gap-1",
  },
  verified: {
    label: "تایید شده",
    icon: CheckCircle2,
    className: "gap-1 bg-success text-success-foreground hover:bg-success/90",
  },
  shipped: {
    label: "ارسال شده",
    icon: Truck,
    className: "gap-1",
  },
};

const StatusBadge = ({ status }: { status: string }) => {
  const data = STATUS_CONFIG[status];
  if (!data) return null;

  const Icon = data.icon;
  return (
    <Badge className={data.className}>
      <Icon className="w-3 h-3" />
      {data.label}
    </Badge>
  );
};

export default StatusBadge;
