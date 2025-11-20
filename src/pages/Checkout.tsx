import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle2, Upload, Store, Camera } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface FormData {
  product: string;
  productPhoto: File | null;
  customerName: string;
  phoneNumber: string;
  address: string;
  postalCode: string;
  cardLastDigits: string;
  paymentProof: File | null;
}

const Checkout = () => {
  const { toast } = useToast();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    product: "",
    productPhoto: null,
    customerName: "",
    phoneNumber: "",
    address: "",
    postalCode: "",
    cardLastDigits: "",
    paymentProof: null,
  });
  const [fileName, setFileName] = useState<string>("");
  const [productPhotoName, setProductPhotoName] = useState<string>("");
  
  const productPrice = 250000; // قیمت محصول (تومان)
  const shippingCost = 35000; // هزینه پست (تومان)
  const totalPrice = productPrice + shippingCost;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.product || !formData.customerName || !formData.phoneNumber || 
        !formData.address || !formData.postalCode || !formData.cardLastDigits || !formData.paymentProof) {
      toast({
        title: "خطا",
        description: "لطفاً تمام فیلدهای اجباری را پر کنید",
        variant: "destructive",
      });
      return;
    }

    // Postal code validation (10 digits)
    if (!/^\d{10}$/.test(formData.postalCode)) {
      toast({
        title: "خطا",
        description: "کد پستی باید ۱۰ رقم باشد",
        variant: "destructive",
      });
      return;
    }

    // Card last digits validation (4 digits)
    if (!/^\d{4}$/.test(formData.cardLastDigits)) {
      toast({
        title: "خطا",
        description: "۴ رقم آخر کارت باید عدد باشد",
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

  const handleProductPhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, productPhoto: file });
      setProductPhotoName(file.name);
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
            {/* Product Details */}
            <div className="space-y-2">
              <Label htmlFor="product">نام محصول / کد / رنگ و سایز *</Label>
              <Input
                id="product"
                type="text"
                placeholder="مثال: شال پلیسه مشکی"
                value={formData.product}
                onChange={(e) => setFormData({ ...formData, product: e.target.value })}
              />
              <p className="text-xs text-muted-foreground">
                چیزی که سفارش دادید را دقیق بنویسید. مثال: شال پلیسه مشکی
              </p>
            </div>

            {/* Optional Product Photo */}
            <div className="space-y-2">
              <Label className="text-sm text-muted-foreground">عکس محصول (اختیاری)</Label>
              <div className="flex items-center gap-2">
                <input
                  id="productPhoto"
                  type="file"
                  accept="image/*"
                  onChange={handleProductPhotoChange}
                  className="hidden"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => document.getElementById('productPhoto')?.click()}
                  className="gap-2"
                >
                  <Camera className="w-4 h-4" />
                  {productPhotoName || "آپلود عکس محصول"}
                </Button>
                {productPhotoName && (
                  <span className="text-xs text-muted-foreground">✓</span>
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                اگر نام محصول را نمی‌دانید، عکسش را آپلود کنید
              </p>
            </div>

            {/* Price Summary */}
            <Card className="p-4 bg-accent/50">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">قیمت محصول:</span>
                  <span className="font-medium">{productPrice.toLocaleString('fa-IR')} تومان</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">هزینه پست:</span>
                  <span className="font-medium">{shippingCost.toLocaleString('fa-IR')} تومان</span>
                </div>
                <div className="flex justify-between border-t border-border pt-2">
                  <span className="font-semibold">جمع کل:</span>
                  <span className="font-bold text-primary">{totalPrice.toLocaleString('fa-IR')} تومان</span>
                </div>
              </div>
            </Card>

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
              <Label htmlFor="postal">کد پستی *</Label>
              <Input
                id="postal"
                type="text"
                placeholder="کد پستی ده رقمی"
                value={formData.postalCode}
                onChange={(e) => setFormData({ ...formData, postalCode: e.target.value.replace(/\D/g, '') })}
                maxLength={10}
                dir="ltr"
              />
              <p className="text-xs text-muted-foreground">
                کد پستی باید دقیقاً ۱۰ رقم باشد
              </p>
            </div>

            {/* Last 4 Digits of Card */}
            <div className="space-y-2">
              <Label htmlFor="cardDigits">۴ رقم آخر کارت *</Label>
              <Input
                id="cardDigits"
                type="text"
                placeholder="۱۲۳۴"
                value={formData.cardLastDigits}
                onChange={(e) => setFormData({ ...formData, cardLastDigits: e.target.value.replace(/\D/g, '') })}
                maxLength={4}
                dir="ltr"
                className="text-center text-lg tracking-widest"
              />
              <p className="text-xs text-muted-foreground">
                برای چک کردن راحت‌تر پرداخت شما
              </p>
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
