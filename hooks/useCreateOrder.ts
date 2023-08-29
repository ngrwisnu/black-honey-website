import { createOrder } from "@/lib/api/checkout";
import { useMutation } from "react-query";

const createNewOrder = ({ data, token }: { data: FormData; token: string }) => {
  return createOrder(data, token);
};

export const useCreateOrder = () => {
  return useMutation(createNewOrder);
};
