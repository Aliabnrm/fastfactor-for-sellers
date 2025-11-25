"use client";
import { useState } from "react";
import { Alert, Button, Spin } from "antd";
import { useToast } from "@/hooks/use-toast";
import { useNavigate, useParams } from "react-router-dom";
import useFetchSellerBySlug from "@/hooks/useFetchSellersBySlug";
import { CheckoutSummary } from "@/components/checkout/components/CheckoutSummary";
import { CheckoutForm } from "@/components/checkout/components/CheckoutForm";
import { useCheckoutSubmit } from "@/components/checkout/hooks/useCheckoutSubmit";

export default function CheckoutPage() {
  const { toast } = useToast();
  const { slug } = useParams();
  const navigate = useNavigate();
  const [result, setResult] = useState(null);

  const { seller, isLoading, error } = useFetchSellerBySlug(slug);
  const { handleCheckoutSubmit, isSubmitting } = useCheckoutSubmit(
    seller,
    setResult,
    toast
  );

  if (isLoading || isSubmitting) {
    const tipText = isLoading
      ? "در حال دریافت اطلاعات فروشگاه..."
      : "در حال ثبت سفارش و آپلود مدارک...";
    return (
      <div className="text-center p-20">
        <Spin size="large" tip={tipText} />
      </div>
    );
  }

  if (error || !seller) {
    return (
      <div className="text-center p-20 max-w-lg mx-auto space-y-4">
        <Alert
          message="خطا در دسترسی یا عدم وجود فروشگاه"
          description={error?.message || "فروشگاهی با این آدرس یافت نشد."}
          type="error"
          showIcon
        />
        <Button onClick={() => navigate("/")}>بازگشت</Button>
      </div>
    );
  }

  if (result) {
    return (
      <CheckoutSummary
        data={result}
        onReset={() => setResult(null)}
        onDownload={() => toast({ title: "فاکتور دانلود شد" })}
      />
    );
  }

  return (
    <CheckoutForm
      onSubmit={handleCheckoutSubmit}
      sellerInfo={seller}
      isSubmitting={isSubmitting}
    />
  );
}
