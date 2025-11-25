import { FileUpload } from "./FileUpload";
import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SellerInfo } from "@/types/checkout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useCheckoutForm } from "../hooks/useCheckoutForm";
import { CheckoutData, checkoutSchema } from "@/schema/checkoutSchema";

interface CheckoutFormProps {
  onSubmit: (data: CheckoutData) => void;
  sellerInfo: SellerInfo;
  isSubmitting: boolean;
}

export const CheckoutForm = ({
  onSubmit,
  sellerInfo,
  isSubmitting,
}: CheckoutFormProps) => {
  const { data, update } = useCheckoutForm();
  const { toast } = useToast();

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (data.paymentProof instanceof File) {
      const url = URL.createObjectURL(data.paymentProof);
      setPreviewUrl(url);

      return () => {
        URL.revokeObjectURL(url);
        setPreviewUrl(null);
      };
    } else {
      setPreviewUrl(null);
    }
  }, [data.paymentProof]);

  const productPrice = 250000;
  const shippingCost = sellerInfo?.shipping_cost ?? 0;
  const shopName = sellerInfo?.shop_name ?? "فروشگاه";
  const total = productPrice + shippingCost;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = checkoutSchema.safeParse(data);

    if (!validation.success) {
      toast({
        title: "خطا در فرم",
        description: validation.error.issues[0].message,
        variant: "destructive",
      });
      return;
    }

    onSubmit(validation.data);
  };

  return (
    <Card className="p-6 shadow-2xl max-w-md mx-auto">
      <div className="text-center mb-6 border-b pb-4">
        <h2 className="text-2xl font-bold text-primary mb-1">{shopName}</h2>
        <p className="text-sm text-muted-foreground">فرم ثبت سفارش اختصاصی</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <Label>نام محصول *</Label>
          <Input
            value={data.product}
            onChange={(e) => update("product", e.target.value)}
            placeholder="مثال: شال پلیسه مشکی"
          />
        </div>

        <Card className="p-4 bg-primary/10 text-sm space-y-2 border-primary/20">
          <div className="flex justify-between">
            <span>قیمت محصول:</span>
            <span>{productPrice.toLocaleString("fa-IR")} تومان</span>
          </div>

          <div className="flex justify-between">
            <span>هزینه پست:</span>
            <span>{shippingCost.toLocaleString("fa-IR")} تومان</span>
          </div>

          <div className="flex justify-between border-t pt-2 font-bold text-lg">
            <span>جمع کل:</span>
            <span>{total.toLocaleString("fa-IR")} تومان</span>
          </div>
        </Card>

        <div className="space-y-2">
          <Label>نام و نام خانوادگی *</Label>
          <Input
            value={data.customerName}
            onChange={(e) => update("customerName", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label>شماره تماس *</Label>
          <Input
            value={data.phoneNumber}
            maxLength={11}
            dir="ltr"
            onChange={(e) =>
              update("phoneNumber", e.target.value.replace(/\D/g, ""))
            }
          />
        </div>

        <div className="space-y-2">
          <Label>آدرس کامل *</Label>
          <Textarea
            value={data.address}
            rows={4}
            onChange={(e) => update("address", e.target.value)}
            placeholder="استان، شهر، خیابان اصلی، کوچه، پلاک و کد پستی"
          />
        </div>

        <div className="space-y-2">
          <Label>کد پستی ۱۰ رقمی *</Label>
          <Input
            value={data.postalCode}
            maxLength={10}
            dir="ltr"
            onChange={(e) =>
              update("postalCode", e.target.value.replace(/\D/g, ""))
            }
          />
        </div>

        <div className="space-y-2">
          <Label>۴ رقم آخر کارت *</Label>
          <Input
            value={data.cardLastDigits}
            maxLength={4}
            dir="ltr"
            className="text-center text-lg tracking-widest"
            onChange={(e) =>
              update("cardLastDigits", e.target.value.replace(/\D/g, ""))
            }
          />
          <p className="text-xs text-muted-foreground pt-1">
            این اطلاعات صرفا جهت پیگیری سریع‌تر فیش واریزی شما استفاده می‌شود.
          </p>
        </div>

        <FileUpload
          id="paymentProof"
          label="تصویر فیش واریزی *"
          previewUrl={previewUrl}
          fileName={data.paymentProof?.name ?? ""}
          onChange={(file) => update("paymentProof", file)}
        />

        <Button
          type="submit"
          className="w-full h-12 font-semibold"
          disabled={isSubmitting}
        >
          {isSubmitting ? "در حال ثبت..." : "ثبت و ارسال سفارش"}
        </Button>
      </form>
    </Card>
  );
};
