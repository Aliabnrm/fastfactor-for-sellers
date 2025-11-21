import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Order } from "@/types/orders";
import StatusBadge from "./orderStatus";

type Props2 = {
  orders: Order[];
};

const OrdersTable = ({ orders }: Props2) => {
  const { toast } = useToast();

  const handleDownloadLabel = (orderId: string, customerName: string) => {
    toast({
      title: "لیبل دانلود شد",
      description: `فایل PDF برای ${customerName} آماده است`,
    });
  };

  return (
    <Card className="shadow-md">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <h2 className="text-lg font-semibold">سفارش‌های من</h2>
      </div>

      {/* Table */}
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
            {orders?.length ? (
              orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">
                    {order.customerName}
                  </TableCell>

                  <TableCell>{order.product}</TableCell>

                  <TableCell>
                    <StatusBadge status={order.status} />
                  </TableCell>

                  <TableCell className="text-muted-foreground">
                    {order.date}
                  </TableCell>

                  <TableCell>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() =>
                        handleDownloadLabel(order.id, order.customerName)
                      }
                      className="gap-2"
                    >
                      <Download className="w-4 h-4" />
                      دانلود لیبل
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-center py-6 text-muted-foreground"
                >
                  هیچ سفارشی ثبت نشده است
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
};

export default OrdersTable;
