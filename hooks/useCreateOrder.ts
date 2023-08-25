import { createOrder } from "@/lib/api/checkout";
import { useMutation } from "react-query";

const createNewOrder = (data: FormData) => {
  return createOrder(data);
};

export const useCreateOrder = () => {
  return useMutation(createNewOrder);
};
