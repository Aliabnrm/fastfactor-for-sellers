import { Card } from "@/components/ui/card";
import { Package, TrendingUp, Clock } from "lucide-react";

type Props = {
  totalOrders: number;
  pendingOrders: number;
  verifiedOrders: number;
};

const OrderStats = ({ totalOrders, pendingOrders, verifiedOrders }: Props) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card className="p-6 shadow-md hover:shadow-lg transition-shadow">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground mb-1">کل سفارش‌ها</p>
            <p className="text-3xl font-bold text-foreground">{totalOrders}</p>
          </div>
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
            <Package className="w-6 h-6 text-primary" />
          </div>
        </div>
      </Card>

      <Card className="p-6 shadow-md hover:shadow-lg transition-shadow">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground mb-1">
              در انتظار بررسی
            </p>
            <p className="text-3xl font-bold text-foreground">
              {pendingOrders}
            </p>
          </div>
          <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center">
            <Clock className="w-6 h-6 text-accent-foreground" />
          </div>
        </div>
      </Card>

      <Card className="p-6 shadow-md hover:shadow-lg transition-shadow">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground mb-1">تایید شده</p>
            <p className="text-3xl font-bold text-foreground">
              {verifiedOrders}
            </p>
          </div>
          <div className="w-12 h-12 rounded-full bg-success/10 flex items-center justify-center">
            <TrendingUp className="w-6 h-6 text-success" />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default OrderStats;
