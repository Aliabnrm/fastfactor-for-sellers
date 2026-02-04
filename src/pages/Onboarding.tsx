import { Divider } from 'antd'
import { Card } from '@/components/ui/card'
import { useNavigate } from 'react-router-dom'
import StepsSidebar from '@/components/onboarding/Sidebar'
import OnboardingForm from '@/components/onboarding/onboardForm'

const Onboarding = () => {
  const navigate = useNavigate()

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-emerald-50 via-white to-emerald-100 px-4 py-12">
      <Card className="w-full max-w-3xl border-none px-8 py-6 shadow-xl">
        <div className="flex flex-col gap-10 md:flex-row">
          <div className="md:w-2/5">
            <StepsSidebar />
          </div>

          <Divider
            type="vertical"
            className="hidden md:block"
            style={{ height: 'auto' }}
          />

          <div className="md:flex-1">
            <OnboardingForm
              onFinished={() => navigate('/order', { replace: true })}
            />
          </div>
        </div>
      </Card>
    </div>
  )
}
export default Onboarding
