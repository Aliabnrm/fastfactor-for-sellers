export interface Order {
  id: string;
  customerName: string;
  product: string;
  status: "pending" | "verified" | "shipped";
  date: string;
}
