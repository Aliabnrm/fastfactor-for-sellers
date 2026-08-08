import { Info, Store } from 'lucide-react'
import { Card, Form, Input } from 'antd'

const SellerInfoCard = () => (
  <Card className="!rounded-xl !border-border !shadow-[var(--shadow-sm)]">
    <div className="mb-5 flex items-center gap-3">
      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary text-primary">
        <Store className="h-5 w-5" />
      </span>
      <div>
        <h2 className="text-lg font-bold text-slate-900">اطلاعات فروشگاه</h2>
        <p className="text-xs text-slate-500">مشخصات قابل نمایش به مشتری</p>
      </div>
    </div>

    <Form.Item
      name="shopName"
      label="نام فروشگاه"
      rules={[{ required: true, message: 'نام فروشگاه را وارد کنید.' }]}
      className="!mb-3"
    >
      <Input size="large" placeholder="مثال: فروشگاه وگاس" />
    </Form.Item>

    <p className="flex items-start gap-2 rounded-xl bg-indigo-50 p-3 text-xs leading-5 text-indigo-800">
      <Info className="mt-0.5 h-4 w-4 shrink-0" />
      نام فروشگاه در فرم ثبت سفارش مشتریان نمایش داده می‌شود.
    </p>
  </Card>
)

export default SellerInfoCard
