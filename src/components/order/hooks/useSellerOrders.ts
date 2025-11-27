import { supabase } from "@/lib/supabase";
import { Order } from "@/types/checkout";
import { useState, useEffect, useCallback } from "react";

interface UseSellerOrdersResult {
  orders: Order[];
  isLoading: boolean;
  error: Error | null;
  revalidate: () => void;
}

export const useSellerOrders = (): UseSellerOrdersResult => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  const [refreshKey, setRefreshKey] = useState(0);

  const revalidate = useCallback(() => {
    setRefreshKey((prev) => prev + 1);
  }, []);

  useEffect(() => {
    const checkAuthAndFetch = async () => {
      const { data: sessionData, error: authError } =
        await supabase.auth.getSession();
      setIsAuthLoading(false);

      if (authError || !sessionData.session) {
        setIsLoading(false);
        if (authError) setError(new Error(authError.message));
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
  }, [refreshKey]);

  return { orders, isLoading: isLoading || isAuthLoading, error, revalidate };
};
