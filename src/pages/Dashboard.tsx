import { useMemo } from "react";
import { Skeleton } from "antd";
import OrdersList from "@/components/dashboard/components/table/orderList";
import OrderStats from "@/components/dashboard/components/table/orderState";
import { useSellerOrders } from "@/components/dashboard/hooks/useSellerOrders";
import ShopLinkCard from "@/components/dashboard/components/table/orderShopLinkCard";
import DashboardLayout from "@/components/dashboard/components/layout/DashboardLayout";

const Dashboard = () => {
  const { orders, isLoading, error } = useSellerOrders();

  const { totalOrders, pendingOrders, verifiedOrders } = useMemo(() => {
    if (!orders) return { totalOrders: 0, pendingOrders: 0, verifiedOrders: 0 };

    const pending = orders.filter((o) => o.status === "pending").length;

    const verified = orders.filter((o) => o.status === "confirmed").length; 

    return {
      totalOrders: orders.length,
      pendingOrders: pending,
      verifiedOrders: verified,
    };
  }, [orders]);

  if (error) {
    return (
      <DashboardLayout>
        خطا در بارگذاری سفارشات: {error.message}
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6 px-4 sm:px-0">
        <OrderStats
          totalOrders={totalOrders}
          pendingOrders={pendingOrders}
          verifiedOrders={verifiedOrders}
        />

        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-48 w-full" />
            <Skeleton className="h-48 w-full" />
          </div>
        ) : (
          <OrdersList orders={orders ?? []} />
        )}

        <ShopLinkCard shopSlug="maryam-shop" />
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
