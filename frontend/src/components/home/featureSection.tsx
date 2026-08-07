import { Card } from '../ui/card'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import {
  LogOut,
  Package,
  ShoppingBag,
  Zap,
} from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import BrandLogo from '@/components/brand/BrandLogo'
import { encodePathSegment } from '@/lib/sanitization'

const FeatureSection = ({ sellerSlug }: any) => {
  const { logout } = useAuth()
  const navigate = useNavigate()

  return (
    <main className="app-canvas px-4 py-10">
      <div className="relative z-10 mx-auto max-w-5xl">
        <div className="mb-10 flex flex-col items-center justify-between gap-5 sm:flex-row">
          <div>
            <BrandLogo />
            <p className="mt-3 text-slate-500">
              ابزار هوشمند فروش برای فروشندگان
            </p>
          </div>

          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button
              size="lg"
              onClick={() => navigate('/order')}
              className="gap-2 px-7"
            >
              <Package className="h-5 w-5" />
              داشبورد فروشنده
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => navigate(`/checkout/${encodePathSegment(sellerSlug)}`)}
              className="gap-2 px-7"
            >
              <ShoppingBag className="h-5 w-5" />
              فرم خرید
            </Button>
          </div>
        </div>

        <section className="surface-card mb-8 overflow-hidden bg-gradient-to-l from-indigo-950 to-indigo-700 p-7 text-white sm:p-10">
          <span className="text-sm font-semibold text-indigo-200">
            فروشگاه شما آماده است
          </span>
          <h1 className="mt-2 text-3xl font-bold leading-10">
            سفارش‌ها را سریع‌تر مدیریت کنید
          </h1>
          <p className="mt-3 max-w-2xl leading-7 text-indigo-100">
            لینک فروشگاه را با مشتریان به اشتراک بگذارید و وضعیت سفارش‌ها را
            از یک داشبورد ساده دنبال کنید.
          </p>
        </section>

        <div className="grid gap-5 md:grid-cols-3">
          <Card className="p-6 text-center transition-shadow hover:shadow-lg">
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

          <Card className="p-6 text-center transition-shadow hover:shadow-lg">
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

          <Card className="p-6 text-center transition-shadow hover:shadow-lg">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-accent">
              <ShoppingBag className="h-6 w-6 text-accent-foreground" />
            </div>
            <h3 className="mb-2 font-semibold text-foreground">لینک اختصاصی</h3>
            <p className="text-sm text-muted-foreground">
              یک لینک برای بیو اینستاگرام که همه چیز را ساده می‌کند
            </p>
          </Card>
        </div>

        <Button
          variant="ghost"
          onClick={logout}
          className="mx-auto mt-8 text-slate-500"
        >
          <LogOut className="h-4 w-4" />
          خروج از حساب
        </Button>
      </div>
    </main>
  )
}

export default FeatureSection
