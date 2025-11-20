import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CheckCircle2, Upload, Store } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface FormData {
  product: string;
  customerName: string;
  phoneNumber: string;
  address: string;
  postalCode: string;
  paymentProof: File | null;
}

const Checkout = () => {
  const { toast } = useToast();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    product: "",
    customerName: "",
    phoneNumber: "",
    address: "",
    postalCode: "",
    paymentProof: null,
  });
  const [fileName, setFileName] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.product || !formData.customerName || !formData.phoneNumber || 
        !formData.address || !formData.postalCode || !formData.paymentProof) {
      toast({
        title: "خطا",
        description: "لطفاً تمام فیلدها را پر کنید",
        variant: "destructive",
      });
      return;
    }

    // Simulate submission
    setIsSubmitted(true);
    toast({
      title: "سفارش ثبت شد",
      description: "سفارش شما با موفقیت ثبت شد",
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, paymentProof: file });
      setFileName(file.name);
    }
  };

  const handleDownloadInvoice = () => {
    toast({
      title: "فاکتور دانلود شد",
      description: "فایل PDF فاکتور شما آماده است",
    });
  };

  if (isSubmitted) {
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
            سفارش شما با موفقیت ثبت شد و به زودی برای شما ارسال می‌شود
          </p>
          
          <div className="bg-accent/50 rounded-lg p-4 mb-6 text-right space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">نام:</span>
              <span className="font-medium">{formData.customerName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">محصول:</span>
              <span className="font-medium">{formData.product}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">شماره تماس:</span>
              <span className="font-medium">{formData.phoneNumber}</span>
            </div>
          </div>

          <Button onClick={handleDownloadInvoice} className="w-full mb-4">
            دانلود فاکتور
          </Button>
          <Button variant="outline" onClick={() => setIsSubmitted(false)} className="w-full">
            ثبت سفارش جدید
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-md mx-auto">
        {/* Shop Header */}
        <Card className="mb-6 p-6 shadow-md text-center">
          <div className="flex justify-center mb-3">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <Store className="w-8 h-8 text-primary" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-1">روسری‌های مریم</h1>
          <p className="text-sm text-muted-foreground">فروشگاه آنلاین روسری و شال</p>
        </Card>

        {/* Order Form */}
        <Card className="p-6 shadow-lg">
          <h2 className="text-xl font-semibold text-foreground mb-6">ثبت سفارش</h2>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Product Selection */}
            <div className="space-y-2">
              <Label htmlFor="product">محصول</Label>
              <Select value={formData.product} onValueChange={(value) => setFormData({ ...formData, product: value })}>
                <SelectTrigger id="product">
                  <SelectValue placeholder="محصول مورد نظر را انتخاب کنید" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="scarf-a">روسری مدل A</SelectItem>
                  <SelectItem value="scarf-b">روسری مدل B</SelectItem>
                  <SelectItem value="scarf-c">روسری مدل C</SelectItem>
                  <SelectItem value="shawl">شال</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Customer Name */}
            <div className="space-y-2">
              <Label htmlFor="name">نام و نام‌خانوادگی</Label>
              <Input
                id="name"
                type="text"
                placeholder="نام کامل خود را وارد کنید"
                value={formData.customerName}
                onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
              />
            </div>

            {/* Phone Number */}
            <div className="space-y-2">
              <Label htmlFor="phone">شماره تماس</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                value={formData.phoneNumber}
                onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                dir="ltr"
              />
            </div>

            {/* Address */}
            <div className="space-y-2">
              <Label htmlFor="address">آدرس دقیق</Label>
              <Textarea
                id="address"
                placeholder="آدرس کامل پستی خود را وارد کنید"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                rows={4}
              />
            </div>

            {/* Postal Code */}
            <div className="space-y-2">
              <Label htmlFor="postal">کد پستی</Label>
              <Input
                id="postal"
                type="text"
                placeholder="کد پستی ده رقمی"
                value={formData.postalCode}
                onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                maxLength={10}
                dir="ltr"
              />
            </div>

            {/* Payment Proof Upload */}
            <div className="space-y-2">
              <Label htmlFor="receipt">تصویر فیش واریزی</Label>
              <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary transition-colors cursor-pointer">
                <input
                  id="receipt"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <label htmlFor="receipt" className="cursor-pointer block">
                  <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                  {fileName ? (
                    <p className="text-sm font-medium text-foreground">{fileName}</p>
                  ) : (
                    <>
                      <p className="text-sm font-medium text-foreground mb-1">
                        بارگذاری فیش واریزی
                      </p>
                      <p className="text-xs text-muted-foreground">
                        فایل تصویر را انتخاب کنید
                      </p>
                    </>
                  )}
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <Button type="submit" className="w-full h-12 text-base font-semibold">
              ثبت سفارش
            </Button>
          </form>
        </Card>

        {/* Footer Note */}
        <p className="text-center text-sm text-muted-foreground mt-6">
          پس از ثبت سفارش، فاکتور شما ارسال می‌شود
        </p>
      </div>
    </div>
  );
};

export default Checkout;
