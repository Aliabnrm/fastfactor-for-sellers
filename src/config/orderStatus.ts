import { OrderStatus } from "@/types/checkout";
import { Clock, CheckCircle2, Truck, XCircle } from "lucide-react";

export type StatusConfigMap = {
  [key in OrderStatus]: {
    label: string;
    icon: React.ElementType;
    bgColor: string;
    textColor: string;
    borderColor: string;
  };
};

export const STATUS_ORDER_CONFIG: StatusConfigMap = {
  pending: {
    label: "در انتظار بررسی",
    icon: Clock,
    bgColor: "bg-yellow-100",
    textColor: "text-yellow-700",
    borderColor: "border-yellow-300",
  },
  confirmed: {
    label: "تایید شده",
    icon: CheckCircle2,
    bgColor: "bg-green-100",
    textColor: "text-green-700",
    borderColor: "border-green-300",
  },
  delivered: {
    label: "ارسال شده",
    icon: Truck,
    bgColor: "bg-blue-100",
    textColor: "text-blue-700",
    borderColor: "border-blue-300",
  },
  rejected: {
    label: "رد شده",
    icon: XCircle, 
    bgColor: "bg-red-100", 
    textColor: "text-red-700", 
    borderColor: "border-red-300", // 
  },
};
