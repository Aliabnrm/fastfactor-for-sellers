export type SellerInfo = {
  id: string;
  shop_name: string;
  shipping_cost: number;
};

export type OrderStatus = "pending" | "confirmed" | "delivered" | "rejected";

export interface Order {
  id: string;
  created_at: string;
  seller_id: string;
  customer_name: string;
  customer_phone: string;
  address: string;
  postal_code: string;
  product_name: string;
  product_image_url: string | null;
  total_price: number;
  card_last_4: string;
  receipt_url: string;
  status: OrderStatus;
}
