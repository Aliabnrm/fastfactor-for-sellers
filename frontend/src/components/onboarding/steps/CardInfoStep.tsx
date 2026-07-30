import { Form, Input } from 'antd'
import {
  cardNumberRules,
  cardOwnerRules,
} from '@/lib/validation/rules'

const CardInfoStep = () => (
  <>
    <Form.Item
      name="card_owner"
      label="نام صاحب کارت"
      rules={cardOwnerRules}
    >
      <Input size="large" placeholder="مثال: مریم رضایی" />
    </Form.Item>

    <Form.Item
      name="card_number"
      label="شماره کارت"
      rules={cardNumberRules}
    >
      <Input
        size="large"
        inputMode="numeric"
        placeholder="0000-0000-0000-0000"
        dir="ltr"
      />
    </Form.Item>
  </>
)

export default CardInfoStep
