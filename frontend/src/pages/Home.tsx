import axios from 'axios'
import LoadingState from '@/components/global/LoadingState'
import HeroSection from '@/components/home/heroSection'
import { useMyStore } from '@/services/store/store.hooks'
import FeatureSection from '@/components/home/featureSection'

const HomePage = () => {
  const { error, isLoading, data: store, refetch } = useMyStore()

  if (isLoading) {
    return <LoadingState title="در حال دریافت اطلاعات فروشگاه" />
  }

  if (error && !(axios.isAxiosError(error) && error.response?.status === 404)) {
    return (
      <LoadingState
        error
        title="اطلاعات فروشگاه دریافت نشد"
        description="لطفاً دوباره تلاش کنید."
        onRetry={() => {
          void refetch()
        }}
      />
    )
  }

  if (axios.isAxiosError(error) && error.response?.status === 404) {
    return <HeroSection />
  }

  if (store?.is_onboarded) {
    return <FeatureSection sellerSlug={store.slug ?? ''} />
  }

  return <HeroSection />
}

export default HomePage
