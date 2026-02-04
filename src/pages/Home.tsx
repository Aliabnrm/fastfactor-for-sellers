import useSellerProfile from '@/hooks/useSellerProfile'
import HeroSection from '@/components/home/heroSection'
import FeatureSection from '@/components/home/featureSection'

const Home = () => {
  const { user, profile, isLoading } = useSellerProfile()

  if (isLoading) return null

  if (user && (profile === null || profile?.is_onboarded === false)) {
    return <HeroSection />
  }

  if (user && profile?.is_onboarded === true) {
    return <FeatureSection sellerSlug={profile?.slug} />
  }

  return null
}

export default Home
