import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { CheckoutData } from "@/schema/checkoutSchema";
import { uploadPaymentProof } from "../utils/uploadPaymentProof";

export const useCheckoutSubmit = (seller: any, setResult: any, toast: any) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCheckoutSubmit = async (data: CheckoutData) => {
    if (!seller) return;

    setIsSubmitting(true);
    const { paymentProof, ...info } = data;

    const productPrice = Number(info.price) || 0;
    const shipping = seller.shipping_cost ?? 0;
    const total = productPrice + shipping;

    try {
      let receiptUrl = null;

      if (paymentProof instanceof File) {
        receiptUrl = await uploadPaymentProof(seller.id, paymentProof);
      }

      const order = {
        p_address: info.address,
        p_card_last_4: info.cardLastDigits,
        p_customer_name: info.customerName,
        p_customer_phone: info.phoneNumber,
        p_postal_code: info.postalCode,
        p_product_image_url: null,
        p_product_name: info.product,
        p_receipt_url: receiptUrl,
        p_seller_id: seller.id,
        p_total_price: total,
      };

      const { data: newOrder, error } = await supabase
        .rpc("submit_order", order)
        .select()
        .single();

      if (error) throw new Error(error.message);

      setResult(newOrder);
      toast({ title: "ثبت موفق", description: "سفارش با موفقیت ثبت شد." });
    } catch (err: any) {
      toast({
        title: "خطا",
        description: err.message || "خطا در ثبت سفارش",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return { handleCheckoutSubmit, isSubmitting };
};
