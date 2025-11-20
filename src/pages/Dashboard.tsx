import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Package, TrendingUp, Copy, Download, CheckCircle2, Clock, Truck } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface Order {
  id: string;
  customerName: string;
  product: string;
  status: "pending" | "verified" | "shipped";
  date: string;
}

const mockOrders: Order[] = [
  { id: "1", customerName: "زهرا احمدی", product: "روسری مدل A", status: "pending", date: "۱۴۰۳/۰۸/۱۵" },
  { id: "2", customerName: "مریم رضایی", product: "روسری مدل B", status: "verified", date: "۱۴۰۳/۰۸/۱۴" },
  { id: "3", customerName: "فاطمه کریمی", product: "روسری مدل A", status: "shipped", date: "۱۴۰۳/۰۸/۱۳" },
  { id: "4", customerName: "سارا محمدی", product: "روسری مدل C", status: "verified", date: "۱۴۰۳/۰۸/۱۲" },
  { id: "5", customerName: "نازنین حسینی", product: "روسری مدل B", status: "pending", date: "۱۴۰۳/۰۸/۱۱" },
];

const Dashboard = () => {
  const { toast } = useToast();
  const [orders] = useState<Order[]>(mockOrders);

  const totalOrders = orders.length;
  const pendingOrders = orders.filter(o => o.status === "pending").length;
  const verifiedOrders = orders.filter(o => o.status === "verified").length;

  const handleCopyLink = () => {
    const shopLink = `${window.location.origin}/checkout/maryam-shop`;
    navigator.clipboard.writeText(shopLink);
    toast({
      title: "لینک کپی شد",
      description: "لینک فروشگاه شما در کلیپ‌بورد کپی شد",
    });
  };

  const handleDownloadLabel = (orderId: string, customerName: string) => {
    toast({
      title: "لیبل دانلود شد",
      description: `فایل PDF برای ${customerName} آماده است`,
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="secondary" className="gap-1">
            <Clock className="w-3 h-3" />
            در انتظار بررسی
          </Badge>
        );
      case "verified":
        return (
          <Badge className="gap-1 bg-success text-success-foreground hover:bg-success/90">
            <CheckCircle2 className="w-3 h-3" />
            تایید شده
          </Badge>
        );
      case "shipped":
        return (
          <Badge variant="outline" className="gap-1">
            <Truck className="w-3 h-3" />
            ارسال شده
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Package className="w-6 h-6 text-primary" />
            <h1 className="text-xl font-bold text-foreground">FastFactor</h1>
          </div>
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
            م
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-6 shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">کل سفارش‌ها</p>
                <p className="text-3xl font-bold text-foreground">{totalOrders}</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Package className="w-6 h-6 text-primary" />
              </div>
            </div>
          </Card>

          <Card className="p-6 shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">در انتظار بررسی</p>
                <p className="text-3xl font-bold text-foreground">{pendingOrders}</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center">
                <Clock className="w-6 h-6 text-accent-foreground" />
              </div>
            </div>
          </Card>

          <Card className="p-6 shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">تایید شده</p>
                <p className="text-3xl font-bold text-foreground">{verifiedOrders}</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-success/10 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-success" />
              </div>
            </div>
          </Card>
        </div>

        {/* Orders Table */}
        <Card className="shadow-md">
          <div className="p-6 border-b border-border">
            <h2 className="text-lg font-semibold text-foreground">سفارش‌های من</h2>
          </div>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-right">نام مشتری</TableHead>
                  <TableHead className="text-right">محصول</TableHead>
                  <TableHead className="text-right">وضعیت</TableHead>
                  <TableHead className="text-right">تاریخ</TableHead>
                  <TableHead className="text-right">عملیات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.customerName}</TableCell>
                    <TableCell>{order.product}</TableCell>
                    <TableCell>{getStatusBadge(order.status)}</TableCell>
                    <TableCell className="text-muted-foreground">{order.date}</TableCell>
                    <TableCell>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDownloadLabel(order.id, order.customerName)}
                        className="gap-2"
                      >
                        <Download className="w-4 h-4" />
                        دانلود لیبل
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>

        {/* Copy Shop Link Button */}
        <Card className="p-6 shadow-md">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="font-semibold text-foreground mb-1">لینک فروشگاه من</h3>
              <p className="text-sm text-muted-foreground">این لینک را در بیو اینستاگرام خود قرار دهید</p>
            </div>
            <Button onClick={handleCopyLink} className="gap-2 w-full md:w-auto">
              <Copy className="w-4 h-4" />
              کپی لینک فروشگاه
            </Button>
          </div>
        </Card>
      </main>
    </div>
  );
};

export default Dashboard;
