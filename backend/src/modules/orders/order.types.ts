export interface CreateOrderDTO {
  address: string;
  total_price: number;
  postal_code: string;
  product_name: string;
  receipt_url?: string | null | undefined;
  card_last_4?: string | null | undefined;
  product_price: number;
  customer_name: string;
  customer_phone: string;
  product_image_url?: string | null | undefined;
}

export type OrderStatus = "pending" | "confirmed" | "delivered" | "rejected";

export interface GetOrderByIdParams {
  orderId: string;
}
export interface Order {
  id: string;
  address: string;
  store_id: string;
  total_price: string;
  postal_code: string;
  product_name: string;
  customer_name: string;
  product_price: string;
  customer_phone: string;
  receipt_url: string | null;
  card_last_4: string | null;
  product_image_url: string | null;
  created_at: Date;
  updated_at: Date;
  status: OrderStatus;
}
