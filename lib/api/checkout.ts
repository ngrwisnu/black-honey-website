import callAPI from "./call-api";
import { API_ROOT, token } from "./utils";

export const createOrder = (data: FormData) => {
  const url = `${API_ROOT}/checkout`;

  return callAPI({
    url,
    data,
    method: "POST",
    token,
  });
};
