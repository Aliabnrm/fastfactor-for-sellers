import { supabase } from "@/lib/supabase";

export const fetchSellerProfile = async () => {
  const { data, error } = await supabase
    .from("sellers")
    .select("shop_name, card_owner, shipping_cost, card_number, email, is_onboarded, slug")
    .single();

  if (error && error.code !== "PGRST116") {
    throw error;
  }

  return data || null;
};

export const getSellerBySlug = async (slug: string) => {
  const { data, error } = await supabase
    .from("sellers")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error && error.code !== "PGRST116") {
    throw error;
  }

  return data || null;
};
