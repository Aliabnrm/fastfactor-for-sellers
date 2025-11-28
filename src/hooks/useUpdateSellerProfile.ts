import { message } from "antd";
import { updateSellerProfile } from "@/services/sellers/seller";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateSellerProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateSellerProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["seller-profile"] });
      message.success("تغییرات با موفقیت ذخیره شد.");
    },
    onError: (err: any) => {
      console.error(err);
      message.error("خطا در ذخیره تغییرات.");
    },
  });
};
