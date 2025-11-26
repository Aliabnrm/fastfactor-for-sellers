import { useState } from "react";
import { supabase } from "@/supabase"; 
import { useToast } from "@/hooks/use-toast";
import { OrderStatus } from "@/types/checkout";

export const useUpdateOrderStatus = (refreshOrders: () => void) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const updateStatus = async (orderId: string, newStatus: OrderStatus) => {
    setIsLoading(true);
    try {
      const { error } = await supabase.rpc("update_order_status", {
        p_order_id: orderId,
        p_new_status: newStatus,
      });

      if (error) throw error;

      toast({
        title: "وضعیت به‌روزرسانی شد",
        description: `سفارش با موفقیت به وضعیت ${newStatus} تغییر یافت.`,
        variant: "default",
      });

      refreshOrders();
    } catch (e) {
      toast({
        title: "خطا در آپدیت وضعیت",
        description: "مشکلی پیش آمد، لطفاً دوباره تلاش کنید.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return { updateStatus, isLoading };
};
