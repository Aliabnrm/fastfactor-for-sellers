import { Card, Form, Input, InputNumber, Typography } from "antd";
import { formatCurrency, parseCurrency } from "@/utils/formRules";
const { Title } = Typography;

export const PaymentCard = ({ form, handleCardChange }) => (
  <Card>
    <Title level={4}>مالی و ارسال</Title>
    <Form.Item label="نام صاحب کارت" name="ownerName" rules={[{ required: true }]}>
      <Input size="large" />
    </Form.Item>
    <Form.Item label="شماره کارت" name="cardNumber">
      <Input size="large" onChange={handleCardChange} />
    </Form.Item>
    <Form.Item label="هزینه ارسال ثابت (تومان)" name="shippingCost" rules={[{ required: true }]}>
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
);
