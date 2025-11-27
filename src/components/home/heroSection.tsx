import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Package } from "lucide-react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();
  return (
    <div
      className="min-h-screen bg-gradient-to-b from-background to-accent/20 flex items-center justify-center p-4"
      dir="rtl"
    >
      <Card className="max-w-md w-full p-8 text-center shadow-lg">
        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
          <Package className="w-12 h-12 text-primary" />
        </div>
        <h1 className="text-3xl font-bold text-foreground mb-4">
          سلام خوش آمدید! 👋
        </h1>
        <p className="text-muted-foreground mb-8 leading-relaxed">
          برای شروع فروش و دریافت لینک پرداخت، ابتدا باید مشخصات فروشگاه خود را
          تکمیل کنید.
        </p>
        <Button
          size="lg"
          onClick={() => navigate("/onboarding")}
          className="w-full gap-2 text-lg h-14"
        >
          تکمیل اطلاعات فروشگاه 🚀
        </Button>
      </Card>
    </div>
  );
};

export default HeroSection;
