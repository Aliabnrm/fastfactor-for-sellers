import { useState } from "react";
import { supabase } from "@/supabase";
import { CheckoutData } from "@/schema/checkoutSchema";
import { uploadPaymentProof } from "../utils/uploadPaymentProof";

export const useCheckoutSubmit = (seller: any, setResult: any, toast: any) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCheckoutSubmit = async (data: CheckoutData) => {
    if (!seller) return;

    setIsSubmitting(true);
    const { paymentProof, ...info } = data;

    const productPrice = 250000;
    const shipping = seller.shipping_cost ?? 0;
    const total = productPrice + shipping;

    try {
      let receipt = null;

      if (paymentProof instanceof File) {
        receipt = await uploadPaymentProof(seller.id, paymentProof);
      }

      const order = {
        seller_id: seller.id,
        customer_name: info.customerName,
        customer_phone: info.phoneNumber,
        product_name: info.product,
        address: info.address,
        postal_code: info.postalCode,
        card_last_4: info.cardLastDigits,
        product_image_url: null,
        receipt_url: receipt,
        total_price: total,
        status: "pending",
      };

      const { error, data: newOrder } = await supabase
        .from("orders")
        .insert([order])
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
