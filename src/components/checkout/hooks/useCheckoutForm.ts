import { useState } from "react";
import { CheckoutData } from "@/schema/checkoutSchema";

const initialData: CheckoutData = {
  product: "",
  productPhoto: null,
  customerName: "",
  phoneNumber: "",
  address: "",
  postalCode: "",
  cardLastDigits: "",
  paymentProof: null,
};

export const useCheckoutForm = () => {
  const [data, setData] = useState(initialData);

  const update = (name: keyof CheckoutData, value: any) => {
    setData((prev) => ({ ...prev, [name]: value }));
  };

  return { data, update };
};
