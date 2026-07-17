import { useMemo } from "react";
import { Skeleton } from "antd";
import LinkCard from "@/components/order/list/linkCard";
import { useMyStore } from "@/services/store/store.hooks";
import OrdersList from "@/components/order/list/orderList";
import StatusCard from "@/components/order/list/statusCrad";
import { useMyOrders } from "@/services/orders/order.hooks";
import MainLayout from "@/components/global/layout/MainLayout";

export default function OrderPage() {
  const {
    data: orders = [],
    isLoading: isOrdersLoading,
    error: ordersError,
    refetch: refetchOrders,
  } = useMyOrders();

  const {
    data: store,
    isLoading: isStoreLoading,
    error: storeError,
  } = useMyStore();

  const isLoading = isOrdersLoading || isStoreLoading;
  const error = ordersError || storeError;

  const sellerSlug = store?.slug ?? "";

  const {
    totalOrders,
    pendingOrders,
    confirmedOrders,
    deliveredOrders,
  } = useMemo(() => {
    const pending = orders.filter(
      (order) => order.status === "pending"
    ).length;

    const confirmed = orders.filter(
      (order) => order.status === "confirmed"
    ).length;

    const delivered = orders.filter(
      (order) => order.status === "delivered"
    ).length;

    return {
      totalOrders: orders.length,
      pendingOrders: pending,
      confirmedOrders: confirmed,
      deliveredOrders: delivered,
    };
  }, [orders]);

  if (error) {
    return (
      <MainLayout>
        خطا در دریافت اطلاعات.
      </MainLayout>
    );
  }

  if (isLoading) {
    return (
      <MainLayout>
        <div className="space-y-6 px-2 sm:px-0">
          <Skeleton active className="h-20 w-full" />
          <Skeleton active className="h-48 w-full" />
          <Skeleton active className="h-48 w-full" />
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="space-y-6 px-2 sm:px-0">
        <StatusCard
          totalOrders={totalOrders}
          pendingOrders={pendingOrders}
          verifiedOrders={confirmedOrders}
          deliveredOrders={deliveredOrders}
        />

        <OrdersList
          orders={orders}
          revalidateOrders={refetchOrders}
        />

        <LinkCard shopSlug={sellerSlug} />
      </div>
    </MainLayout>
  );
}