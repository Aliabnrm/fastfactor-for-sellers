import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { useState } from "react";
import StatusBadge from "./orderStatus";
import { Order } from "@/types/checkout";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { formatJalali } from "@/utils/formatJalali";
import DetailRow from "@/components/global/detailRow";
import { Download, ChevronDown, CheckCircle } from "lucide-react";

type OrdersListProps = {
  orders: Order[];
};

const OrdersList = ({ orders }: OrdersListProps) => {
  const { toast } = useToast();
  const [openOrderId, setOpenOrderId] = useState<string | null>(null);

  const toggleDetails = (orderId: string) => {
    setOpenOrderId((prevId) => (prevId === orderId ? null : orderId));
  };

  const handleDownloadLabel = (orderId: string, customerName: string) => {
    toast({
      title: "لیبل دانلود شد",
      description: `فایل PDF برای ${customerName} آماده است`,
    });
  };

  if (!orders?.length) {
    return (
      <p className="text-center py-10 text-muted-foreground">
        هیچ سفارشی ثبت نشده است
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {orders.map((order) => {
        const isOpen = order.id === openOrderId;

        return (
          <Card
            key={order.id}
            className="shadow-lg border-2 border-transparent hover:border-primary/50 transition-all duration-200"
          >
            <CardHeader className="p-4 flex flex-row items-center justify-between">
              <div>
                <p className="font-bold text-base">{order?.customer_name}</p>
                <p className="text-[14px] text-muted-foreground mt-1">
                  تاریخ ثبت سفارش : {formatJalali(order?.created_at)}
                </p>
              </div>
              <StatusBadge status={order.status} />
            </CardHeader>

            <CardContent className="px-4 py-2 space-y-1 border-t">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">نام محصول :</span>
                <span className="font-medium">{order?.product_name}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">مبلغ کل :</span>
                <span className="font-medium">
                  {order?.total_price.toLocaleString("fa-IR")} تومان
                </span>
              </div>
            </CardContent>

            {isOpen && (
              <div className="p-4 space-y-4 transition-all duration-300">
                <CardContent className="p-0 flex flex-col w-full gap-1.5 ">
                  <h3 className="font-semibold text-base mb-0 pb-1">
                    آدرس و جزئیات مشتری
                  </h3>
                  <DetailRow label="شماره تماس" value={order?.customer_phone} />
                  <DetailRow label="کد پستی" value={order?.postal_code} />
                  <DetailRow label="۴ رقم کارت" value={order?.card_last_4} />
                </CardContent>
                <div className="text-sm border p-2 rounded-lg bg-secondary/20">
                  <span className="text-muted-foreground block mb-1">
                    آدرس کامل:
                  </span>
                  <p className="font-medium text-foreground text-wrap break-words">
                    {order.address}
                  </p>
                </div>

                {order?.receipt_url && (
                  <div className="mt-4">
                    <h3 className="font-semibold text-base mb-2 pb-1">
                      تصویر فیش واریزی
                    </h3>
                    <a
                      href={order?.receipt_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                    >
                      <img
                        src={order?.receipt_url}
                        alt="فیش واریزی"
                        className="w-full max-h-56 py-4 object-cover px-4 border rounded-lg cursor-pointer shadow-inner"
                      />
                    </a>
                  </div>
                )}
              </div>
            )}

            <CardFooter
              className={`p-4 mt-2 flex flex-col gap-2 ${isOpen ? "border-t" : ""}`}
            >
              <div className="flex w-full justify-between gap-2">
                {order.status === "pending" && (
                  <Button
                    size="sm"
                    className="w-full gap-2 bg-green-600 hover:bg-green-700"
                  >
                    <CheckCircle className="w-4 h-4" />
                    تأیید پرداخت
                  </Button>
                )}

                {order?.status === "pending" && (
                  <Button
                    size="sm"
                    variant="default"
                    onClick={() =>
                      handleDownloadLabel(order.id, order?.customer_name)
                    }
                    className="w-full gap-2 bg-primary hover:bg-primary/90"
                  >
                    <Download className="w-4 h-4" />
                    دانلود لیبل پستی
                  </Button>
                )}
              </div>

              <Button
                variant="ghost"
                className="w-full text-sm text-gray-400 hover:bg-secondary"
                onClick={() => toggleDetails(order.id)}
              >
                {isOpen ? "بستن جزئیات" : "مشاهده جزئیات کامل"}
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </Button>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
};

export default OrdersList;


