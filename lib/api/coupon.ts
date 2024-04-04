import callAPI from "./call-api";
import { API_ROOT, VERSION } from "./utils";

export const getCouponByCode = (code: string, token: string) => {
  const url = `${API_ROOT}/${VERSION}/coupon/${code}`;

  return callAPI({
    url,
    token,
  });
};
