import { useMemo } from "react";
import { mockOrders } from "@/mock/mockOrders";
import OrderStats from "@/components/dashboard/table/orderState";
import OrdersTable from "@/components/dashboard/table/orderTable";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import ShopLinkCard from "@/components/dashboard/table/orderShopLinkCard";

const Dashboard = () => {
  const orders = mockOrders;

  const { totalOrders, pendingOrders, verifiedOrders } = useMemo(() => {
    const pending = orders.filter((o) => o.status === "pending").length;
    const verified = orders.filter((o) => o.status === "verified").length;

    return {
      totalOrders: orders.length,
      pendingOrders: pending,
      verifiedOrders: verified,
    };
  }, [orders]);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <OrderStats
          totalOrders={totalOrders}
          pendingOrders={pendingOrders}
          verifiedOrders={verifiedOrders}
        />

        <OrdersTable orders={orders} />

        <ShopLinkCard shopSlug="maryam-shop" />
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
