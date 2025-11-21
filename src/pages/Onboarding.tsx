import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Package } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const Onboarding = () => {
  const { user, completeOnboarding } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [shopName, setShopName] = useState('');
  const [slug, setSlug] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [cardLastFour, setCardLastFour] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!shopName || !slug || !phone || !cardLastFour) {
      toast({
        title: 'خطا',
        description: 'لطفا فیلدهای الزامی را پر کنید',
        variant: 'destructive',
      });
      return;
    }

    if (cardLastFour.length !== 4) {
      toast({
        title: 'خطا',
        description: '۴ رقم آخر کارت باید ۴ رقم باشد',
        variant: 'destructive',
      });
      return;
    }

    completeOnboarding({
      shopName,
      slug,
      phone,
      address,
      cardLastFour,
    });

    toast({
      title: 'تبریک!',
      description: 'فروشگاه شما با موفقیت فعال شد',
    });

    navigate('/dashboard');
  };

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div className="min-h-screen bg-background p-4 py-8">
      <div className="container mx-auto max-w-2xl">
        <Card className="p-6 md:p-8">
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Package className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-2">تکمیل مشخصات فروشگاه</h1>
            <p className="text-muted-foreground text-center">
              برای دریافت لینک اختصاصی و شروع فروش، اطلاعات زیر را وارد کنید
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="shopName">نام فروشگاه *</Label>
              <Input
                id="shopName"
                value={shopName}
                onChange={(e) => setShopName(e.target.value)}
                placeholder="مثال: فروشگاه مریم"
                className="text-right"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="slug">شناسه فروشگاه (لینک اختصاصی) *</Label>
              <Input
                id="slug"
                value={slug}
                onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/\s/g, '-'))}
                placeholder="maryam-shop"
                className="text-left"
                dir="ltr"
              />
              <p className="text-xs text-muted-foreground text-right">
                لینک شما: {window.location.origin}/checkout/{slug || 'your-shop'}
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">شماره تماس *</Label>
              <Input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                placeholder="09123456789"
                className="text-left"
                dir="ltr"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">آدرس (اختیاری)</Label>
              <Textarea
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="آدرس کامل فروشگاه یا انبار"
                className="text-right min-h-24"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="cardLastFour">۴ رقم آخر شماره کارت *</Label>
              <Input
                id="cardLastFour"
                type="text"
                value={cardLastFour}
                onChange={(e) => setCardLastFour(e.target.value.replace(/\D/g, '').slice(0, 4))}
                placeholder="1234"
                className="text-left"
                dir="ltr"
                maxLength={4}
              />
              <p className="text-xs text-muted-foreground text-right">
                این اطلاعات برای شناسایی پرداخت‌های مشتریان استفاده می‌شود
              </p>
            </div>

            <Button type="submit" className="w-full">
              فعال‌سازی فروشگاه
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Onboarding;
