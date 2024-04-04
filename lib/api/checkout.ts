import { CreateOrderPayload, MidtransPayload } from "@/types/types";
import callAPI from "./call-api";
import { API_ROOT } from "./utils";

export const createOrder = (data: CreateOrderPayload, token: string) => {
  const url = `${API_ROOT}/checkout`;

  return callAPI({
    url,
    data,
    method: "POST",
    token,
  });
};

export const getMidtransToken = (data: MidtransPayload, token: string) => {
  const url = `${API_ROOT}/api/v1/midtrans/token`;

  return callAPI({
    url,
    data,
    method: "POST",
    token,
  });
};
