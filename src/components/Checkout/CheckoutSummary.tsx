import { Card } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export const CheckoutSummary = ({ data, onReset, onDownload }: any) => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 shadow-lg text-center">
        <div className="mb-6 flex justify-center">
          <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center">
            <CheckCircle2 className="w-10 h-10 text-success" />
          </div>
        </div>

        <h2 className="text-2xl font-bold text-foreground mb-2">سفارش ثبت شد!</h2>
        <p className="text-muted-foreground mb-6">
          سفارش شما با موفقیت ثبت شد و به زودی ارسال می‌شود
        </p>

        <div className="bg-accent/50 rounded-lg p-4 mb-6 text-right space-y-2">
          <div className="flex justify-between">
            <span className="text-muted-foreground">نام:</span>
            <span className="font-medium">{data.customerName}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-muted-foreground">محصول:</span>
            <span className="font-medium">{data.product}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-muted-foreground">شماره تماس:</span>
            <span className="font-medium">{data.phoneNumber}</span>
          </div>
        </div>

        <Button onClick={onDownload} className="w-full mb-4">
          دانلود فاکتور
        </Button>

        <Button variant="outline" onClick={onReset} className="w-full">
          ثبت سفارش جدید
        </Button>
      </Card>
    </div>
  );
};
