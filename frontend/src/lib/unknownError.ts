import { message } from 'antd'

export const handleUnknownError = (error: any) => {
  if (!error?.errorFields) {
    message.error('خطایی رخ داد.')
  }
}
