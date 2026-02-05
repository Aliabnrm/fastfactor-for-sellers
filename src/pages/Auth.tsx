import { Sparkles } from 'lucide-react'
import { Card, Tabs, Typography } from 'antd'
import LoginForm from '@/components/auth/LoginForm'
import SignupForm from '@/components/auth/SignupForm'

const AuthPage = () => {
  const tabItems = [
    { key: 'login', label: 'ورود', children: <LoginForm /> },
    { key: 'signup', label: 'ثبت‌نام', children: <SignupForm /> },
  ]

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-emerald-50 via-white to-emerald-100 px-4 py-10">
      <Card className="w-full max-w-lg border-none shadow-xl">
        <div className="mb-6 flex flex-col items-center space-y-4 text-center">
          <div className="flex items-center gap-2 text-2xl font-bold text-emerald-600">
            <Sparkles className="h-7 w-7" />
            <span>FastFactor</span>
          </div>

          <Typography.Title level={4} className="!m-0">
            ورود یا ثبت‌نام فروشندگان
          </Typography.Title>
          <Typography.Paragraph className="!mb-0 text-slate-500">
            تنها با شماره موبایل خود وارد دنیای فروش سریع و مطمئن شوید.
          </Typography.Paragraph>
        </div>

        <Tabs centered items={tabItems} />
      </Card>
    </div>
  )
}

export default AuthPage
