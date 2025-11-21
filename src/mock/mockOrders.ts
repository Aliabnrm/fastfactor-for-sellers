import { Order } from "../types/orders";

export const mockOrders: Order[] = [
  {
    id: "1",
    customerName: "زهرا احمدی",
    product: "روسری مدل A",
    status: "pending",
    date: "۱۴۰۳/۰۸/۱۵",
  },
  {
    id: "2",
    customerName: "مریم رضایی",
    product: "روسری مدل B",
    status: "verified",
    date: "۱۴۰۳/۰۸/۱۴",
  },
  {
    id: "3",
    customerName: "فاطمه کریمی",
    product: "روسری مدل A",
    status: "shipped",
    date: "۱۴۰۳/۰۸/۱۳",
  },
  {
    id: "4",
    customerName: "سارا محمدی",
    product: "روسری مدل C",
    status: "verified",
    date: "۱۴۰۳/۰۸/۱۲",
  },
  {
    id: "5",
    customerName: "نازنین حسینی",
    product: "روسری مدل B",
    status: "pending",
    date: "۱۴۰۳/۰۸/۱۱",
  },
];
