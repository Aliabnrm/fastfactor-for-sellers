import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Package, ShoppingBag, Eye, LayoutDashboard, Settings, Zap } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const Index = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  // State 1: New User (not onboarded)
  if (user && !user.isOnboarded) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-accent/20 flex items-center justify-center p-4" dir="rtl">
        <Card className="max-w-md w-full p-8 text-center shadow-lg">
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <Package className="w-12 h-12 text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-4">
            سلام {user.name}، خوش آمدید! 👋
          </h1>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            برای شروع فروش و دریافت لینک پرداخت، ابتدا باید مشخصات فروشگاه خود را تکمیل کنید.
          </p>
          <Button 
            size="lg" 
            onClick={() => navigate('/onboarding')}
            className="w-full gap-2 text-lg h-14"
          >
            تکمیل اطلاعات فروشگاه 🚀
          </Button>
        </Card>
      </div>
    );
  }

  // State 2: Active User (onboarded)
  if (user && user.isOnboarded) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-accent/20 p-4" dir="rtl">
        <div className="container mx-auto py-16">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              پنل مدیریت {user.shopName}
            </h1>
            <p className="text-muted-foreground">مدیریت فروشگاه و سفارشات شما</p>
          </div>

          {/* Menu Grid */}
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-8">
            <Card 
              className="p-8 hover:shadow-lg transition-all cursor-pointer group"
              onClick={() => navigate('/dashboard')}
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <LayoutDashboard className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">ورود به داشبورد فروش</h3>
              <p className="text-muted-foreground">
                مدیریت سفارش‌ها و پرینت لیبل
              </p>
            </Card>

            <Card 
              className="p-8 hover:shadow-lg transition-all cursor-pointer group"
              onClick={() => navigate(`/checkout/${user.slug}`)}
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <Eye className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">مشاهده فرم مشتری</h3>
              <p className="text-muted-foreground">
                نمایش فرمی که مشتریان می‌بینند
              </p>
            </Card>
          </div>

          {/* Settings Link */}
          <div className="text-center">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/onboarding')}
              className="gap-2"
            >
              <Settings className="w-4 h-4" />
              تنظیمات فروشگاه
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Default: Guest user - show original landing page
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-accent/20">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
              <Package className="w-12 h-12 text-primary" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            FastFactor
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            ابزار هوشمند فروش برای فروشندگان اینستاگرام
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={() => navigate('/login')}
              className="gap-2 text-lg h-12 px-8"
            >
              <Package className="w-5 h-5" />
              ورود / ثبت‌نام
            </Button>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <Card className="p-6 text-center shadow-md hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Zap className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">ثبت سریع سفارش</h3>
            <p className="text-sm text-muted-foreground">
              مشتریان شما به راحتی آدرس و فیش پرداخت را ارسال می‌کنند
            </p>
          </Card>

          <Card className="p-6 text-center shadow-md hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4">
              <Package className="w-6 h-6 text-success" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">مدیریت سفارش‌ها</h3>
            <p className="text-sm text-muted-foreground">
              تمام سفارش‌ها در یک جا و به صورت منظم
            </p>
          </Card>

          <Card className="p-6 text-center shadow-md hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center mx-auto mb-4">
              <ShoppingBag className="w-6 h-6 text-accent-foreground" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">لینک اختصاصی</h3>
            <p className="text-sm text-muted-foreground">
              یک لینک برای بیو اینستاگرام که همه چیز را ساده می‌کند
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
