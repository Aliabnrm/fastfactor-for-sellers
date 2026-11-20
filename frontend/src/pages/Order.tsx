import { useMemo } from 'react'
import LoadingState from '@/components/global/LoadingState'
import { useMyStore } from '@/services/store/store.hooks'
import { useMyOrders } from '@/services/orders/order.hooks'
import MainLayout from '@/components/global/layout/MainLayout'
import OrderStats from '@/components/order/list/OrderStats'
import OrdersList from '@/components/order/list/OrdersList'
import StoreLinkCard from '@/components/order/list/StoreLinkCard'

export default function OrderPage() {
  const {
    data: orders = [],
    isLoading: isOrdersLoading,
    error: ordersError,
    refetch: refetchOrders,
  } = useMyOrders()

  const {
    data: store,
    isLoading: isStoreLoading,
    error: storeError,
    refetch: refetchStore,
  } = useMyStore()

  const isLoading = isOrdersLoading || isStoreLoading
  const error = ordersError || storeError

  const sellerSlug = store?.slug ?? ''

  const { totalOrders, pendingOrders, confirmedOrders, deliveredOrders } =
    useMemo(() => {
      const pending = orders.filter(order => order.status === 'pending').length

      const confirmed = orders.filter(
        order => order.status === 'confirmed',
      ).length

      const delivered = orders.filter(
        order => order.status === 'delivered',
      ).length

      return {
        totalOrders: orders.length,
        pendingOrders: pending,
        confirmedOrders: confirmed,
        deliveredOrders: delivered,
      }
    }, [orders])

  if (error) {
    return (
      <LoadingState
        error
        title="اطلاعات سفارش‌ها دریافت نشد"
        description="لطفاً دوباره تلاش کنید."
        onRetry={() => {
          void refetchOrders()
          void refetchStore()
        }}
      />
    )
  }

  if (isLoading) {
    return <LoadingState title="در حال دریافت سفارش‌ها" />
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        <header>
          <h1 className="page-title">مدیریت سفارشات</h1>
          <p className="page-subtitle mt-1">
            وضعیت فروشگاه و سفارش‌های مشتریان را یک‌جا ببینید.
          </p>
        </header>

        <OrderStats
          totalOrders={totalOrders}
          pendingOrders={pendingOrders}
          verifiedOrders={confirmedOrders}
          deliveredOrders={deliveredOrders}
        />

        <StoreLinkCard shopSlug={sellerSlug} />

        <section>
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-lg font-bold text-slate-900 sm:text-xl">
              آخرین سفارش‌ها
            </h2>
            <span className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-primary">
              {totalOrders.toLocaleString('fa-IR')} سفارش
            </span>
          </div>
          <OrdersList orders={orders} revalidateOrders={refetchOrders} />
        </section>
      </div>
    </MainLayout>
  )
}
