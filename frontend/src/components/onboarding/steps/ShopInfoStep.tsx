import { Dispatch, SetStateAction } from 'react'
import { Form, Input, Spin } from 'antd'
import { Rule } from 'antd/es/form'
import { shopNameRules } from '@/lib/validation/rules'

type ShopInfoStepProps = {
  setSlug: Dispatch<SetStateAction<string>>
  slugResult?: {
    available?: boolean
  }
  isCheckingSlug: boolean
}

const ShopInfoStep = ({
  setSlug,
  slugResult,
  isCheckingSlug,
}: ShopInfoStepProps) => {
  const slugRules: Rule[] = [
    {
      required: true,
      message: 'آدرس فروشگاه الزامی است.',
    },
    {
      validator: async (_, value) => {
        if (!value || isCheckingSlug || slugResult?.available) {
          return Promise.resolve()
        }

        return Promise.reject(new Error('این آدرس قبلاً رزرو شده است.'))
      },
    },
  ]

  return (
    <>
      <Form.Item
        name="shop_name"
        label="نام فروشگاه"
        rules={shopNameRules}
      >
        <Input size="large" placeholder="مثال: گالری مریم" />
      </Form.Item>

      <Form.Item name="slug" label="آدرس فروشگاه" rules={slugRules}>
        <Input
          size="large"
          addonBefore={<span dir="ltr">myshop.ir/</span>}
          placeholder="maryam-gallery"
          suffix={isCheckingSlug ? <Spin size="small" /> : null}
          onChange={event => setSlug(event.target.value)}
        />
      </Form.Item>
    </>
  )
}

export default ShopInfoStep
