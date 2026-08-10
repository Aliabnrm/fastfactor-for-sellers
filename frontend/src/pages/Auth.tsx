import { useState } from 'react'
import SignInPage from '@/components/auth/SignIn'
import SignUpPage from '@/components/auth/SignUp'
import BrandLogo from '@/components/brand/BrandLogo'
import { cn } from '@/lib/cn'

const AuthPage = () => {
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login')

  return (
    <main className="app-canvas flex items-center justify-center px-4 py-8 sm:py-10">
      <section className="surface-card relative z-10 w-full max-w-xl overflow-hidden p-5 sm:p-8">
        <div className="mb-7 flex flex-col items-center gap-3 text-center">
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

        <div
          className="grid h-11 grid-cols-2 gap-1 rounded-full bg-slate-200/80 p-1"
          role="tablist"
          aria-label="انتخاب ورود یا ثبت‌نام"
        >
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'login'}
            className={cn(
              'flex h-9 min-w-0 items-center justify-center rounded-full px-3 text-sm font-semibold leading-none text-slate-600 transition-colors duration-150',
              activeTab === 'login' &&
                'bg-gradient-to-br from-[#25238f] to-[#3a42ca] text-white shadow-[0_6px_16px_hsl(var(--primary)/0.22)]',
            )}
            onClick={() => setActiveTab('login')}
          >
            ورود
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'signup'}
            className={cn(
              'flex h-9 min-w-0 items-center justify-center rounded-full px-3 text-sm font-semibold leading-none text-slate-600 transition-colors duration-150',
              activeTab === 'signup' &&
                'bg-gradient-to-br from-[#25238f] to-[#3a42ca] text-white shadow-[0_6px_16px_hsl(var(--primary)/0.22)]',
            )}
            onClick={() => setActiveTab('signup')}
          >
            ثبت‌نام
          </button>
        </div>

        {activeTab === 'login' ? <SignInPage /> : <SignUpPage />}
      </section>
    </main>
  )
}

export default AuthPage
