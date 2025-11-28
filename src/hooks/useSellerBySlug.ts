import { getSellerBySlug } from "@/services/sellers/seller";
import { useQuery } from "@tanstack/react-query";


export const useSellerBySlug = (slug) => {
  return useQuery({
    queryKey: ["seller", slug],
    queryFn: () => getSellerBySlug(slug),
    enabled: !!slug, 
    retry: 1,        
    staleTime: 1000 * 60 * 2, 
  });
};

export default useSellerBySlug;





// import { supabase } from "@/lib/supabase";
// import { useState, useEffect } from "react";

// const useSellerBySlug = (slug) => {
//   const [seller, setSeller] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     if (!slug) {
//       setIsLoading(false);
//       return;
//     }

//     const fetchSeller = async () => {
//       setIsLoading(true);
//       setError(null);

//       const { data, error: dbError } = await supabase
//         .from("sellers")
//         .select("id, shop_name, shipping_cost, slug")
//         .eq("slug", slug)
//         .single();

//       if (dbError) {
//         if (dbError.code !== "PGRST116") {
//           setError("خطا در ارتباط با دیتابیس.");
//         }
//         setSeller(null);
//       } else {
//         setSeller(data);
//       }
//       setIsLoading(false);
//     };

//     fetchSeller();
//   }, [slug]);

//   return { seller, isLoading, error };
// };

// export default useSellerBySlug;
