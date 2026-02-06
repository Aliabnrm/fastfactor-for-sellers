import useSellerProfile from '@/hooks/useSellerProfile'
import HeroSection from '@/components/home/heroSection'
import FeatureSection from '@/components/home/featureSection'

const HomePage = () => {
  const { user, profileInfo, isLoading } = useSellerProfile()

  if (isLoading) return null

  if (user && (profileInfo === null || profileInfo?.is_onboarded === false)) {
    return <HeroSection />
  }

  if (user && profileInfo?.is_onboarded === true) {
    return <FeatureSection sellerSlug={profileInfo?.slug} />
  }

  return null
}

export default HomePage
