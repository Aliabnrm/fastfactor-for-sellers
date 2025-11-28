import useAuthUser from "./useAuthUser";
import { useQuery } from "@tanstack/react-query";
import { fetchSellerProfile } from "@/services/sellers/seller";

const useSellerProfile = () => {
  const user = useAuthUser();

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["seller-profile", user?.id],
    queryFn: () => fetchSellerProfile(user.id),
    enabled: !!user,
    staleTime: 1000 * 60 * 5,
  });

  return {
    user,
    profile: data,
    isLoading,
    isError,
    refetch,
  };
};

export default useSellerProfile;
