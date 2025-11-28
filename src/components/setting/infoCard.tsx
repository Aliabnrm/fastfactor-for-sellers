import { Card, Form, Input, Typography } from "antd";
const { Title, Text } = Typography;

export const SellerInfoCard = ({ form }) => (
  <Card>
    <Title level={4}>اطلاعات کلی</Title>
    <Form.Item
      label="نام فروشگاه"
      name="shopName"
      rules={[{ required: true, message: "نام فروشگاه را وارد کنید." }]}
    >
      <Input size="large" placeholder="مثال: گالری مریم" />
    </Form.Item>
    <Text type="warning" className="text-xs">
      تغییر لینک باعث غیرفعال شدن لینک‌های قبلی می‌شود.
    </Text>
  </Card>
);
