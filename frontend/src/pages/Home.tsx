import { Spin } from "antd";
import HeroSection from "@/components/home/heroSection";
import { useMyStore } from "@/services/store/store.hooks";
import FeatureSection from "@/components/home/featureSection";
import axios from "axios";

const HomePage = () => {
  const {
    error,
    isLoading,
    data: store,
  } = useMyStore();

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Spin size="large" />
      </div>
    );
  }

  if (axios.isAxiosError(error) && error.response?.status === 404) {
    return <HeroSection />;
  }

  if (store.is_onboarded) {
    return <FeatureSection sellerSlug={store.slug ?? ""} />;
  }

  return <HeroSection />;
};

export default HomePage;