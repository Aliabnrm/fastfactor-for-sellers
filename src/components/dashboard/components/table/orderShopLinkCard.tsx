import { Copy } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";

type ShopProps = {
  shopSlug: string;
};

const ShopLinkCard = ({ shopSlug }: ShopProps) => {
  const { toast } = useToast();

  const handleCopyLink = () => {
    const link = `${window.location.origin}/checkout/${shopSlug}`;
    navigator.clipboard.writeText(link);

    toast({
      title: "لینک کپی شد",
      description: "لینک فروشگاه شما در کلیپ‌بورد کپی شد",
    });
  };

  return (
    <Card className="p-6 shadow-md">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="font-semibold mb-1">لینک فروشگاه من</h3>
          <p className="text-sm text-muted-foreground">
            این لینک را در بیو اینستاگرام قرار دهید
          </p>
        </div>

        <Button onClick={handleCopyLink} className="gap-2 w-full md:w-auto">
          <Copy className="w-4 h-4" />
          کپی لینک فروشگاه
        </Button>
      </div>
    </Card>
  );
};

export default ShopLinkCard;
