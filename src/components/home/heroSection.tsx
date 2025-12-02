import { Card } from '../ui/card'
import { Button } from '../ui/button'
import { Package } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const HeroSection = () => {
  const navigate = useNavigate()
  return (
    <div
      className="flex min-h-screen items-center justify-center bg-gradient-to-b from-background to-accent/20 p-4"
      dir="rtl"
    >
      <Card className="w-full max-w-md p-8 text-center shadow-lg">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
          <Package className="h-12 w-12 text-primary" />
        </div>
        <h1 className="mb-4 text-3xl font-bold text-foreground">
          سلام خوش آمدید! 👋
        </h1>
        <p className="mb-8 leading-relaxed text-muted-foreground">
          برای شروع فروش و دریافت لینک پرداخت، ابتدا باید مشخصات فروشگاه خود را
          تکمیل کنید.
        </p>
        <Button
          size="lg"
          onClick={() => navigate('/onboarding')}
          className="h-14 w-full gap-2 text-lg"
        >
          تکمیل اطلاعات فروشگاه 🚀
        </Button>
      </Card>
    </div>
  )
}

export default HeroSection
