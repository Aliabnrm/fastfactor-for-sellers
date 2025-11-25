import { supabase } from "@/supabase";

export const isSlugUnique = async (slug) => {
  const { data, error } = await supabase
    .from("sellers")
    .select("slug")
    .eq("slug", slug)
    .maybeSingle();

  return !data;
};
