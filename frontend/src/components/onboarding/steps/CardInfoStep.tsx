import { Form, Input } from 'antd'
import {
  cardNumberRules,
  cardOwnerRules,
} from '@/lib/validation/rules'
import { formatCardNumber } from '@/utils/formRules'

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
      getValueFromEvent={event => formatCardNumber(event.target.value)}
    >
      <Input
        size="large"
        inputMode="numeric"
        maxLength={19}
        placeholder="0000-0000-0000-0000"
        dir="ltr"
      />
    </Form.Item>
  </>
)

export default CardInfoStep
