import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import Cookies from "js-cookie";
import { CouponType, UserPayload } from "@/types/types";
import jwt_decode from "jwt-decode";
import { CartItems } from "@/store/cart";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function dateFormatter(date: string) {
  const newDate = new Date(date);

  const options: any = { year: "numeric", month: "long", day: "numeric" };

  return newDate.toLocaleDateString("id-ID", options);
}

export function currencyFormatter(price: number) {
  const currency = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(price);

  return currency;
}

export function subTotalCalculation(data: any) {
  let subTotal = 0;

  if (data?.length !== 0) {
    for (let item of data) {
      const price = item.qty * item.product.price;

      subTotal += price;
    }
  }

  return subTotal;
}

export function firstToUpperCase(text: string): string {
  let firstLetter = /^\w/.exec(text)!;
  let restLetter = /(?<=^\w)\w+/.exec(text)!;

  return `${firstLetter[0]?.toUpperCase()}${restLetter.join("")}`;
}

export function getUserProfile() {
  const tk = Cookies.get("tk");

  if (tk) {
    const beautyTk = window.atob(tk);
    const decodedTk: UserPayload = jwt_decode(beautyTk);

    return decodedTk.customer;
  }
}

export function findUserCart(items: CartItems[], uid: string | undefined) {
  let userCart: CartItems[] = [];

  if (uid) {
    items.forEach((item: CartItems) => {
      item.uid == uid && userCart.push(item);
    });
  }

  return userCart;
}

export function getUserInitial(username: string) {
  if (username) {
    const initial = username.match(/\b\w/g);

    if (initial && initial?.length > 1) {
      return `${initial[0]}${initial[1]}`;
    } else if (initial?.length === 1) {
      return `${initial[0]}`;
    } else {
      return undefined;
    }
  }
}

export function isCouponExpired(expiredDate: string) {
  const today = new Date().valueOf();
  const expired = new Date(`${expiredDate}`).valueOf();

  return today >= expired;
}

export function isCouponValid(detail: CouponType) {
  const isExpired = isCouponExpired(detail.expired);

  return !isExpired && detail.status === "Active";
}

export function totalAfterDiscount(detail: CouponType, total: number) {
  if (!detail) return total;

  if (detail.discount_type === "fixed") {
    return total - +detail.discount_amount;
  }

  if (detail.discount_type === "percent") {
    return total - (+detail.discount_amount / 100) * total;
  }

  if (detail.discount_type === "free") {
    return total;
  }
}
