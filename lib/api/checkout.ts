import callAPI from "./call-api";
import { API_ROOT } from "./utils";

export const createOrder = (data: FormData, token: string) => {
  const url = `${API_ROOT}/checkout`;

  return callAPI({
    url,
    data,
    method: "POST",
    token,
  });
};
