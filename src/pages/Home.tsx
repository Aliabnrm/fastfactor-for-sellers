import useSellerProfile from '@/hooks/useSellerProfile'
import HeroSection from '@/components/home/heroSection'
import FeatureSection from '@/components/home/featureSection'

const HomePage = () => {
  const { user, sellerProfile, isLoading } = useSellerProfile()

  const isOnboarded = sellerProfile?.is_onboarded === true
  const hasProfile = sellerProfile === null && sellerProfile?.is_onboarded === false

  if (isLoading) return null

  if (user && hasProfile) {
    return <HeroSection />
  }

  if (user && isOnboarded) {
    return <FeatureSection sellerSlug={sellerProfile?.slug} />
  }

  return null
}

export default HomePage
