import type { Rule } from 'antd/es/form'

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