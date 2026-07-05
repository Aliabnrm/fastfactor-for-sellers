import { message } from 'antd'
import { useMutation } from '@tanstack/react-query'
import { upsertSellerProfile } from '@/services/sellers/seller'

export const useCompleteSellerOnboardin = (onSuccess?: () => void) =>
  useMutation({
    mutationFn: upsertSellerProfile,
    onSuccess: () => {
      message.success('اطلاعات با موفقیت ذخیره شد')
      onSuccess?.()
    },
    onError: (err: any) => {
      message.error(err.message || 'خطا در ذخیره اطلاعات')
    },
  })
