import { useState } from "react";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cardDigitsPattern, isEmpty, phonePattern, postalCodePattern } from "@/lib/validation/checkoutValidation";
import { FileUpload } from "./FileUpload";

export const CheckoutForm = ({ onSubmit }: any) => {
  const { toast } = useToast();

  const [data, setData] = useState({
    product: "",
    productPhoto: null as File | null,
    customerName: "",
    phoneNumber: "",
    address: "",
    postalCode: "",
    cardLastDigits: "",
    paymentProof: null as File | null,
  });

  const price = 250000;
  const shipping = 35000;

  const validate = () => {
    if (
      isEmpty(data.product) ||
      isEmpty(data.customerName) ||
      isEmpty(data.phoneNumber) ||
      isEmpty(data.address) ||
      isEmpty(data.postalCode) ||
      isEmpty(data.cardLastDigits) ||
      !data.paymentProof
    ) {
      return "تمام فیلدهای اجباری را پر کنید";
    }

    if (!postalCodePattern.test(data.postalCode)) return "کد پستی باید ۱۰ رقم باشد";
    if (!cardDigitsPattern.test(data.cardLastDigits)) return "۴ رقم آخر کارت صحیح نیست";
    if (!phonePattern.test(data.phoneNumber)) return "شماره موبایل معتبر نیست";

    return null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const error = validate();
    if (error) {
      toast({ title: "خطا", description: error, variant: "destructive" });
      return;
    }
    onSubmit(data);
  };

  return (
    <Card className="p-6 shadow-lg max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-6">ثبت سفارش</h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* product */}
        <div className="space-y-2">
          <Label>نام محصول *</Label>
          <Input
            value={data.product}
            onChange={(e) => setData({ ...data, product: e.target.value })}
            placeholder="مثال: شال پلیسه مشکی"
          />
        </div>

        {/* optional photo */}
        <FileUpload
          id="productPhoto"
          label="عکس محصول (اختیاری)"
          fileName={data.productPhoto?.name ?? ""}
          onChange={(file) => setData({ ...data, productPhoto: file })}
        />

        {/* price summary */}
        <Card className="p-4 bg-accent/50 text-sm space-y-2">
          <div className="flex justify-between">
            <span>قیمت محصول:</span>
            <span>{price.toLocaleString("fa-IR")} تومان</span>
          </div>

          <div className="flex justify-between">
            <span>هزینه پست:</span>
            <span>{shipping.toLocaleString("fa-IR")} تومان</span>
          </div>

          <div className="flex justify-between border-t pt-2 font-bold">
            <span>جمع کل:</span>
            <span>{(price + shipping).toLocaleString("fa-IR")} تومان</span>
          </div>
        </Card>

        {/* name */}
        <div className="space-y-2">
          <Label>نام و نام خانوادگی *</Label>
          <Input
            value={data.customerName}
            onChange={(e) => setData({ ...data, customerName: e.target.value })}
          />
        </div>

        {/* phone */}
        <div className="space-y-2">
          <Label>شماره تماس *</Label>
          <Input
            value={data.phoneNumber}
            dir="ltr"
            onChange={(e) =>
              setData({ ...data, phoneNumber: e.target.value.replace(/\D/g, "") })
            }
          />
        </div>

        {/* address */}
        <div className="space-y-2">
          <Label>آدرس *</Label>
          <Textarea
            value={data.address}
            onChange={(e) => setData({ ...data, address: e.target.value })}
            rows={4}
          />
        </div>

        {/* postal code */}
        <div className="space-y-2">
          <Label>کد پستی *</Label>
          <Input
            value={data.postalCode}
            maxLength={10}
            dir="ltr"
            onChange={(e) =>
              setData({
                ...data,
                postalCode: e.target.value.replace(/\D/g, ""),
              })
            }
          />
        </div>

        {/* card digits */}
        <div className="space-y-2">
          <Label>۴ رقم آخر کارت *</Label>
          <Input
            value={data.cardLastDigits}
            maxLength={4}
            dir="ltr"
            className="text-center text-lg tracking-widest"
            onChange={(e) =>
              setData({
                ...data,
                cardLastDigits: e.target.value.replace(/\D/g, ""),
              })
            }
          />
        </div>

        {/* payment proof */}
        <FileUpload
          id="paymentProof"
          label="تصویر فیش واریزی *"
          fileName={data.paymentProof?.name ?? ""}
          onChange={(file) => setData({ ...data, paymentProof: file })}
        />

        <Button type="submit" className="w-full h-12 font-semibold">
          ثبت سفارش
        </Button>
      </form>
    </Card>
  );
};
