import useSellerProfile from "@/hooks/useSellerProfile";
import HeroSection from "@/components/home/heroSection";
import FeatureSection from "@/components/home/featureSection";

const Home = () => {
  const { user, profile, isLoading } = useSellerProfile();

  const isProfileComplete = profile?.is_onboarded;
  const sellerSlug = profile?.slug || "default-shop";

  if (isLoading) return null;
  if (user && !isProfileComplete) {
    return <HeroSection />;
  }

  return <FeatureSection sellerSlug={sellerSlug} />;
};

export default Home;
