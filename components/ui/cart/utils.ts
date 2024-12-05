import { CouponType } from "@/types/types";

export function isCouponExpired(expiredDate: string) {
  const today = new Date().valueOf();
  const expired = new Date(`${expiredDate}`).valueOf();

  return today >= expired;
}

export function isCouponValid(detail: CouponType) {
  const isExpired = isCouponExpired(detail.expired);

  return !isExpired && detail.status === "Active";
}

export function totalAfterDiscount(
  detail: CouponType | undefined,
  total: number,
) {
  if (!detail) return total;

  if (detail.discount_type === "fixed") {
    return total - +detail.discount_amount;
  }

  if (detail.discount_type === "percent") {
    return total - (+detail.discount_amount / 100) * total;
  }
}

export function getDiscountPrice(
  discount: CouponType | undefined,
  price: number,
) {
  if (!discount) return 0;

  if (discount.discount_type === "fixed") {
    return +discount.discount_amount;
  }

  if (discount.discount_type === "percent") {
    return (+discount.discount_amount / 100) * price;
  }
}

export function countdown(gap: number) {
  const day = Math.floor(gap / 86400000);
  const hr = Math.floor((gap % 86400000) / 3600000);
  const min = Math.floor((gap % 3600000) / 60000);
  const sec = Math.floor((gap % 60000) / 1000);

  return [day, hr, min, sec].map((num) => {
    let str = num.toString();
    return str.length === 1 ? str.padStart(2, "0") : str;
  });
}
