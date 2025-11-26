import { Card } from "@/components/ui/card";
import { Package, TrendingUp, Clock, Truck } from "lucide-react";

type OrderStatsProps = {
  totalOrders: number;
  pendingOrders: number;
  verifiedOrders: number;
  deliveredOrders: number;
};

type CardDetailProps = {
  label: string;
  value: number;
  icon: React.ElementType;
  bgColor: string;
  textColor: string;
};

const OrderStats = ({
  totalOrders,
  pendingOrders,
  verifiedOrders,
  deliveredOrders,
}: OrderStatsProps) => {
  const cardDetails: CardDetailProps[] = [
    {
      label: "کل سفارش‌ها",
      value: totalOrders,
      icon: Package,
      bgColor: "bg-primary/10",
      textColor: "text-primary",
    },
    {
      label: "در انتظار بررسی",
      value: pendingOrders,
      icon: Clock,
      bgColor: "bg-accent/10",
      textColor: "text-accent-foreground",
    },
    {
      label: "تایید شده",
      value: verifiedOrders,
      icon: TrendingUp,
      bgColor: "bg-success/10",
      textColor: "text-success",
    },
    {
      label: "ارسال شده",
      value: deliveredOrders,
      icon: Truck,
      bgColor: "bg-success/10",
      textColor: "text-success",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
      {cardDetails?.map((item?) => {
        const Icon = item?.icon;
        return (
          <Card
            key={item?.label}
            className="p-3 shadow-sm max-h-[150px] items-center justify-center flex hover:shadow-md transition-shadow rounded-xl sm:col-span-1"
          >
            <div className="flex sm:flex-row flex-col sm:items-center items-center justify-between h-full">
              <div className="text-center sm:text-left flex flex-col gap-1 h-full">
                <span className="text-sm text-muted-foreground">
                  {item?.label}
                </span>
                <span className="text-2xl font-bold">{item?.value}</span>
              </div>

              <div
                className={`${item?.bgColor} w-11 h-11 sm:h-full rounded-full flex items-center justify-center`}
              >
                <Icon className={`w-5 h-5 ${item?.textColor}`} />
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
};

export default OrderStats;
