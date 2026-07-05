import { MessageCircleWarningIcon } from 'lucide-react'
import { Card, Form, Input, Space, Typography } from 'antd'

const { Title, Text } = Typography

export const SellerInfoCard = ({ form }) => (
  <Card>
    <Title level={4}>اطلاعات کلی</Title>
    <Space direction="vertical" size="middle" className='w-full gap-0'>
      <Form.Item
        name="shopName"
        label="نام فروشگاه"
        rules={[{ required: true, message: 'نام فروشگاه را وارد کنید.' }]}
      >
        <Input size="large" placeholder="مثال: فروشگاه وگاس" />
      </Form.Item>
      <Text type="warning" className="text-xs flex flex-row gap-1 items-center">
        <MessageCircleWarningIcon className='w-4 h-4 mb-1' />
        تغییر لینک باعث غیرفعال شدن لینک‌های قبلی می‌شود.
      </Text>
    </Space>
  </Card>
)
