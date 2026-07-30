import { Tabs } from 'antd'
import SignInPage from '@/components/auth/SignIn'
import SignUpPage from '@/components/auth/SignUp'
import BrandLogo from '@/components/brand/BrandLogo'

const AuthPage = () => {
  const tabItems = [
    { key: 'login', label: 'ورود', children: <SignInPage /> },
    { key: 'signup', label: 'ثبت‌نام', children: <SignUpPage /> },
  ]

  return (
    <main className="app-canvas flex items-center justify-center px-4 py-10">
      <section className="surface-card relative z-10 w-full max-w-[600px] overflow-hidden p-5 sm:p-10">
        <div className="mb-8 flex flex-col items-center gap-3 text-center">
          <BrandLogo />
          <div>
            <h1 className="text-xl font-bold text-slate-900 sm:text-2xl">
              ورود به پنل فروشندگان
            </h1>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              برای مدیریت فروشگاه وارد حساب خود شوید یا حساب تازه‌ای بسازید.
            </p>
          </div>
        </div>

        <Tabs
          centered
          items={tabItems}
          className="auth-tabs"
          defaultActiveKey="login"
        />
      </section>
    </main>
  )
}

export default AuthPage
