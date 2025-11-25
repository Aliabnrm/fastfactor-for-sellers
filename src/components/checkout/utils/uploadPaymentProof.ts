import { supabase } from "@/supabase";

export const uploadPaymentProof = async (sellerId: string, file: File) => {
    const ext = file.name.split(".").pop();
    const name = `${sellerId}/${Date.now()}.${ext}`;
  
    const { error } = await supabase.storage
      .from("payment-proofs")
      .upload(name, file);
  
    if (error) throw error;
  
    return supabase.storage
      .from("payment-proofs")
      .getPublicUrl(name).data.publicUrl;
  };
  