import type { Rule } from 'antd/es/form'
import { getCardNumberDigits } from '@/utils/formRules'

export const emailRules: Rule[] = [
  {
    required: true,
    type: 'email',
    message: 'ایمیل معتبر وارد کنید',
  },
  {
    required: true,
    message: 'لطفا ایمیل خود را وارد کنید',
  },
]

export const passwordRules: Rule[] = [
  {
    required: true,
    message: 'رمز عبور را وارد کنید.',
  },
  {
    min: 6,
    message: 'رمز عبور حداقل باید ۶ کاراکتر باشد.',
  },
]


export const shopNameRules: Rule[] = [
  {
    required: true,
    message: 'نام فروشگاه را وارد کنید.',
  },
]

export const cardOwnerRules: Rule[] = [
  {
    required: true,
    message: 'نام صاحب کارت را وارد کنید.',
  },
]

export const cardNumberRules: Rule[] = [
  {
    required: true,
    message: 'شماره کارت را وارد کنید.',
  },
  {
    validator: (_: unknown, value?: string) => {
      if (!value) {
        return Promise.resolve()
      }

      return getCardNumberDigits(value).length === 16
        ? Promise.resolve()
        : Promise.reject(new Error('شماره کارت باید دقیقا ۱۶ رقم باشد.'))
    },
  },
]

export const shippingCostRules: Rule[] = [
  {
    required: true,
    message: 'هزینه ارسال را وارد کنید.',
  },
]
