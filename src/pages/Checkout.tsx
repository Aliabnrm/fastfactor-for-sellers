"use client";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { CheckoutForm } from "@/components/Checkout/CheckoutForm";
import { CheckoutSummary } from "@/components/Checkout/CheckoutSummary";

export default function CheckoutPage() {
  const { toast } = useToast();
  const [result, setResult] = useState(null);

  const handleSubmit = (data: []) => {
    setResult(data);
    toast({ title: "ثبت شد", description: "سفارش با موفقیت ثبت شد" });
  };

  const downloadInvoice = () => {
    toast({ title: "فاکتور دانلود شد" });
  };

  if (result) {
    return (
      <CheckoutSummary
        data={result}
        onReset={() => setResult(null)}
        onDownload={downloadInvoice}
      />
    );
  }

  return <CheckoutForm onSubmit={handleSubmit} />;
}
