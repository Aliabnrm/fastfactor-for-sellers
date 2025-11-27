import { useMemo } from "react";
import { Skeleton } from "antd";
import useSellerProfile from "@/hooks/useSellerProfile";
import MainLayout from "@/components/global/layout/MainLayout";
import LinkCard from "@/components/order/table/linkCard";
import OrdersList from "@/components/order/table/orderList";
import OrderStats from "@/components/order/table/statusCrad";
import { useSellerOrders } from "@/components/order/hooks/useSellerOrders";

const Order = () => {
  const { profile } = useSellerProfile();
  const { orders, isLoading, error, revalidate } = useSellerOrders();

  const sellerSlug = profile?.slug || "default-shop";

  const { totalOrders, pendingOrders, verifiedOrders, deliveredOrders } =
    useMemo(() => {
      if (!orders)
        return { totalOrders: 0, pendingOrders: 0, verifiedOrders: 0 };

      const pending = orders.filter((o) => o.status === "pending").length;

      const verified = orders.filter((o) => o.status === "confirmed").length;

      const delivered = orders.filter((o) => o.status === "delivered").length;

      return {
        totalOrders: orders.length,
        pendingOrders: pending,
        verifiedOrders: verified,
        deliveredOrders: delivered,
      };
    }, [orders]);

  if (error) {
    return <MainLayout>خطا در بارگذاری سفارشات: {error?.message}</MainLayout>;
  }

  return (
    <MainLayout>
      <div className="space-y-6 px-2 sm:px-0">
        <OrderStats
          totalOrders={totalOrders}
          pendingOrders={pendingOrders}
          verifiedOrders={verifiedOrders}
          deliveredOrders={deliveredOrders}
        />

        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-48 w-full" />
            <Skeleton className="h-48 w-full" />
          </div>
        ) : (
          <OrdersList orders={orders ?? []} revalidateOrders={revalidate} />
        )}

        <LinkCard shopSlug={sellerSlug} />
      </div>
    </MainLayout>
  );
};

export default Order;
