import BrandLogo from '@/components/brand/BrandLogo'
import OnboardingForm from '@/components/onboarding/OnboardingForm'

const OnboardingPage = () => {
  return (
    <main className="app-canvas px-4 py-8 sm:py-12">
      <div className="relative z-10 mx-auto w-full max-w-3xl">
        <div className="surface-card overflow-hidden p-5 sm:p-9">
          <header className="mb-9 text-center">
            <BrandLogo className="justify-center" />
            <div className="mt-7">
              <h1 className="page-title">تکمیل اطلاعات فروشگاه</h1>
              <p className="page-subtitle mt-2">
                فقط چند قدم تا راه‌اندازی فروشگاه شما باقی مانده است.
              </p>
            </div>
          </header>

          <div>
            <OnboardingForm />
          </div>
        </div>
      </div>
    </main>
  )
}

export default OnboardingPage
