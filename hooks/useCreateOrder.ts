import { createOrder } from "@/lib/api/checkout";
import { CreateOrderPayload } from "@/types/types";
import { useMutation } from "react-query";

const createNewOrder = ({
  data,
  token,
}: {
  data: CreateOrderPayload;
  token: string;
}) => {
  return createOrder(data, token);
};

export const useCreateOrder = () => {
  return useMutation(createNewOrder);
};
