import { supabase } from "@/supabase";
import { useEffect, useState } from "react";

const useSellerProfile = () => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      setIsError(false);

      const {
        data: { user: authUser },
      } = await supabase.auth.getUser();

      if (!authUser) {
        setIsLoading(false);
        return;
      }

      setUser(authUser);

      const { data: profileData, error: profileError } = await supabase
        .from("sellers")
        .select(
          "shop_name, card_owner, shipping_cost, card_number, email, is_onboarded, slug"
        )
        .single();

      if (profileError && profileError.code !== "PGRST116") {
        console.error("Profile fetch error:", profileError);
        setIsError(true);
      } else {
        setProfile(profileData || null);
      }

      setIsLoading(false);
    };

    fetchUserData();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === "SIGNED_OUT") {
          setUser(null);
          setProfile(null);
        }

        if (event === "SIGNED_IN") {
          fetchUserData();
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  return { user, profile, isLoading, isError };
};

export default useSellerProfile;
