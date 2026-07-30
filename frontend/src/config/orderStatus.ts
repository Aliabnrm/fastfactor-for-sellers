import { OrderStatus } from '@/schema/order.schema'
import { StatusCardConfig } from '@/types/order.types'
import {
  CheckCircle2,
  XCircle,
  Truck,
  Clock,
  Package,
  TrendingUp,
} from 'lucide-react'

export type StatusConfigMap = {
  [key in OrderStatus]: {
    label: string
    bgColor: string
    textColor: string
    borderColor: string
    icon: React.ElementType
  }
}

export const STATUS_ORDER_CONFIG: StatusConfigMap = {
  pending: {
    label: 'در انتظار بررسی',
    icon: Clock,
    bgColor: 'bg-yellow-100',
    textColor: 'text-yellow-700',
    borderColor: 'border-yellow-300',
  },
  confirmed: {
    label: 'تایید شده',
    icon: CheckCircle2,
    bgColor: 'bg-green-100',
    textColor: 'text-green-700',
    borderColor: 'border-green-300',
  },
  delivered: {
    label: 'ارسال شده',
    icon: Truck,
    bgColor: 'bg-blue-100',
    textColor: 'text-blue-700',
    borderColor: 'border-blue-300',
  },
  rejected: {
    label: 'رد شده',
    icon: XCircle,
    bgColor: 'bg-red-100',
    textColor: 'text-red-700',
    borderColor: 'border-red-300',
  },
}


export const STATUS_CARD_CONFIG: StatusCardConfig[] = [
  {
    key: 'totalOrders',
    label: 'کل سفارش‌ها',
    icon: Package,
    bgColor: 'bg-indigo-50',
    textColor: 'text-indigo-800',
  },
  {
    key: 'pendingOrders',
    label: 'در انتظار بررسی',
    icon: Clock,
    bgColor: 'bg-amber-50',
    textColor: 'text-amber-600',
  },
  {
    key: 'verifiedOrders',
    label: 'تایید شده',
    icon: TrendingUp,
    bgColor: 'bg-emerald-50',
    textColor: 'text-emerald-600',
  },
  {
    key: 'deliveredOrders',
    label: 'ارسال شده',
    icon: Truck,
    bgColor: 'bg-blue-50',
    textColor: 'text-blue-600',
  },
]
