import { getCouponByCode } from "@/lib/api/coupon";
import { useMutation } from "react-query";

const getCouponByCodeFn = ({
  code,
  token,
}: {
  code: string;
  token: string;
}) => {
  return getCouponByCode(code, token);
};

export const useGetCouponByCode = () => {
  return useMutation(getCouponByCodeFn);
};
