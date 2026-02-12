import { useMemo } from 'react'
import { Skeleton } from 'antd'
import useOrder from '@/hooks/useOrder'
import useSellerProfile from '@/hooks/useSellerProfile'
import LinkCard from '@/components/order/list/linkCard'
import OrdersList from '@/components/order/list/orderList'
import StatusCard from '@/components/order/list/statusCrad'
import MainLayout from '@/components/global/layout/MainLayout'

const OrderPage = () => {
  const { sellerProfile, isLoading: isProfileLoading } = useSellerProfile()
  const { orders, isLoading: isOrdersLoading, error, revalidate } = useOrder()

  const overallLoading = isProfileLoading || isOrdersLoading

  const sellerSlug = sellerProfile?.slug || 'default-shop'

  const { totalOrders, pendingOrders, verifiedOrders, deliveredOrders } =
    useMemo(() => {
      if (!orders)
        return { totalOrders: 0, pendingOrders: 0, verifiedOrders: 0 }

      const pending = orders.filter(o => o.status === 'pending').length

      const verified = orders.filter(o => o.status === 'confirmed').length

      const delivered = orders.filter(o => o.status === 'delivered').length

      return {
        totalOrders: orders.length,
        pendingOrders: pending,
        verifiedOrders: verified,
        deliveredOrders: delivered,
      }
    }, [orders])

  if (error) {
    return <MainLayout>خطا در بارگذاری سفارشات: {error?.message}</MainLayout>
  }

  if (overallLoading) {
    return (
      <MainLayout>
        <div className="space-y-6 px-2 sm:px-0">
          <Skeleton active className="h-20 w-full" />
          <Skeleton className="h-48 w-full" />
          <Skeleton className="h-48 w-full" />
        </div>
      </MainLayout>
    )
  }

  return (
    <MainLayout>
      <div className="space-y-6 px-2 sm:px-0">
        <StatusCard
          totalOrders={totalOrders}
          pendingOrders={pendingOrders}
          verifiedOrders={verifiedOrders}
          deliveredOrders={deliveredOrders}
        />

        <OrdersList orders={orders ?? []} revalidateOrders={revalidate} />

        <LinkCard shopSlug={sellerSlug} />
      </div>
    </MainLayout>
  )
}

export default OrderPage
