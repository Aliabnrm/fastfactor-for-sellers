import type { Rule } from 'antd/es/form'

export const SLUG_REGEX = /^[a-z0-9-]+$/

export const createSlugRules = (): Rule[] => [
  { required: true, message: 'نام لینک فروشگاه را وارد کنید.' },
  {
    validator: (_: unknown, value: string) => {
      if (!value) {
        return Promise.resolve()
      }
      return SLUG_REGEX.test(value)
        ? Promise.resolve()
        : Promise.reject(
            new Error('آدرس باید فقط شامل حروف انگلیسی، اعداد و خط تیره باشد.'),
          )
    },
  },
]

// export const cardNumberRules: Rule[] = [
//   { required: true, message: "شماره کارت را وارد کنید." },
//   {
//     validator: (_: unknown, value: string) => {
//       if (!value) {
//         return Promise.resolve();
//       }
//       const pure = value.replace(/-/g, "");
//       return /^\d{16}$/.test(pure)
//         ? Promise.resolve()
//         : Promise.reject(new Error("شماره کارت باید ۱۶ رقم باشد."));
//     },
//   },
// ];

export const toEnglishDigits = (value: string) => {
  return value
    .replace(/[۰-۹]/g, d => String('۰۱۲۳۴۵۶۷۸۹'.indexOf(d)))
    .replace(/[٠-٩]/g, d => String('٠١٢٣٤٥٦٧٨٩'.indexOf(d)))
}

export const formatCardNumber = (value: string) =>
  value
    .replace(/\D/g, '')
    .slice(0, 16)
    .replace(/(\d{4})(?=\d)/g, '$1-')
    .replace(/-$/, '')

export const formatCurrency = (value?: string | number | null) => {
  if (value == null || value === '') {
    return ''
  }

  const normalized =
    typeof value === 'number' ? value.toString() : toEnglishDigits(value)

  return normalized.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export const formatToFa = (val: number) => val.toLocaleString('fa-IR')

export const parseCurrency = (value?: string | number | null) => {
  if (value == null || value === '') {
    return undefined
  }

  const normalized =
    typeof value === 'number' ? value.toString() : toEnglishDigits(value)

  return Number(normalized.replace(/,/g, ''))
}