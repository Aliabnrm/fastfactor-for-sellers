import { Card } from '../ui/card'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import { Package, ShoppingBag, Zap } from 'lucide-react'

const FeatureSection = ({ sellerSlug }: any) => {
  const navigate = useNavigate()
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-accent/20">
      <div className="container mx-auto px-4 py-16">
        <div className="mb-16 text-center">
          <div className="mb-6 flex justify-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
              <Package className="h-12 w-12 text-primary" />
            </div>
          </div>
          <h1 className="mb-4 text-4xl font-bold text-foreground md:text-5xl">
            FastFactor
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-xl text-muted-foreground">
            ابزار هوشمند فروش برای فروشندگان
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button
              size="lg"
              onClick={() => navigate('/order')}
              className="h-12 gap-2 px-8 text-lg"
            >
              <Package className="h-5 w-5" />
              داشبورد فروشنده
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => navigate(`/checkout/${sellerSlug}`)}
              className="h-12 gap-2 px-8 text-lg"
            >
              <ShoppingBag className="h-5 w-5" />
              فرم خرید
            </Button>
          </div>
        </div>

        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
          <Card className="p-6 text-center shadow-md transition-shadow hover:shadow-lg">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <Zap className="h-6 w-6 text-primary" />
            </div>
            <h3 className="mb-2 font-semibold text-foreground">
              ثبت سریع سفارش
            </h3>
            <p className="text-sm text-muted-foreground">
              مشتریان شما به راحتی آدرس و فیش پرداخت را ارسال می‌کنند
            </p>
          </Card>

          <Card className="p-6 text-center shadow-md transition-shadow hover:shadow-lg">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-success/10">
              <Package className="h-6 w-6 text-success" />
            </div>
            <h3 className="mb-2 font-semibold text-foreground">
              مدیریت سفارش‌ها
            </h3>
            <p className="text-sm text-muted-foreground">
              تمام سفارش‌ها در یک جا و به صورت منظم
            </p>
          </Card>

          <Card className="p-6 text-center shadow-md transition-shadow hover:shadow-lg">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-accent">
              <ShoppingBag className="h-6 w-6 text-accent-foreground" />
            </div>
            <h3 className="mb-2 font-semibold text-foreground">لینک اختصاصی</h3>
            <p className="text-sm text-muted-foreground">
              یک لینک برای بیو اینستاگرام که همه چیز را ساده می‌کند
            </p>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default FeatureSection
