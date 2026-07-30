import { CreditCard, Truck } from 'lucide-react'
import { Card, Form, Input, InputNumber } from 'antd'
import { formatCurrency, parseCurrency } from '@/utils/formRules'

type PaymentSettingsCardProps = {
  handleCardChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const PaymentSettingsCard = ({
  handleCardChange,
}: PaymentSettingsCardProps) => (
  <Card className="!rounded-2xl !border-border !shadow-[var(--shadow-sm)]">
    <div className="mb-5 flex items-center gap-3">
      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary text-primary">
        <CreditCard className="h-5 w-5" />
      </span>
      <div>
        <h2 className="text-lg font-bold text-slate-900">مالی و ارسال</h2>
        <p className="text-xs text-slate-500">اطلاعات واریز و هزینه ارسال</p>
      </div>
    </div>

    <Form.Item
      label="نام صاحب کارت"
      name="ownerName"
      rules={[{ required: true }]}
    >
      <Input size="large" placeholder="مثال: علی رضایی" />
    </Form.Item>

    <Form.Item label="شماره کارت" name="cardNumber">
      <Input
        size="large"
        onChange={handleCardChange}
        inputMode="numeric"
        placeholder="0000-0000-0000-0000"
        dir="ltr"
      />
    </Form.Item>

    <Form.Item
      label={
        <span className="inline-flex items-center gap-1.5">
          <Truck className="h-4 w-4" />
          هزینه ارسال ثابت (تومان)
        </span>
      }
      name="shippingCost"
      rules={[{ required: true }]}
      className="!mb-0"
    >
      <InputNumber
        size="large"
        className="w-full"
        min={0}
        controls={false}
        formatter={formatCurrency}
        parser={parseCurrency}
      />
    </Form.Item>
  </Card>
)

export default PaymentSettingsCard
