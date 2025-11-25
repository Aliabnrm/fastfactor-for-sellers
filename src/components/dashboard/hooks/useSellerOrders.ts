import { supabase } from "@/supabase";
import { Order } from "@/types/checkout"; 
import { useState, useEffect } from "react";

interface UseSellerOrdersResult {
  orders: Order[];
  isLoading: boolean;
  error: Error | null;
}

export const useSellerOrders = (): UseSellerOrdersResult => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  useEffect(() => {
    const checkAuthAndFetch = async () => {
      const { data: sessionData, error: authError } =
        await supabase.auth.getSession();
      setIsAuthLoading(false);

      if (authError || !sessionData.session) {
        setIsLoading(false);
        return;
      }

      const currentSellerId = sessionData.session.user.id;

      setIsLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from("orders")
        .select(
          `
          id,
          created_at,
          customer_name,
          customer_phone,
          address,
          postal_code,
          product_name,
          total_price,
          receipt_url,
          card_last_4,
          status
          `
        )

        .eq("seller_id", currentSellerId)
        .order("created_at", { ascending: false });

      if (fetchError) {
        setError(new Error(fetchError.message));
        setOrders([]);
      } else {
        setOrders(data as Order[]);
      }
      setIsLoading(false);
    };

    checkAuthAndFetch();

    return () => {};
  }, []);

  return { orders, isLoading: isLoading || isAuthLoading, error };
};
