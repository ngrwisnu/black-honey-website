import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import Cookies from "js-cookie";
import { UserPayload } from "@/types/types";
import { jwtDecode } from "jwt-decode";
import { CartItems } from "@/store/cart";
import { customAlphabet } from "nanoid";
import DOMPurify from "dompurify";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function dateFormatter(date: string) {
  const newDate = new Date(+date);

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
    const decodedTk: UserPayload = jwtDecode(beautyTk);

    return decodedTk.customer;
  }
}

export function removeAccessToken() {
  Cookies.remove("tk");
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

export const nanoid = customAlphabet(
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
  23,
);

export const sanitizeData = (data: string) => {
  return DOMPurify.sanitize(data);
};

export const sanitizeFormData = <T extends Record<string, string>>(
  data: T,
): T => {
  const sanitizedData: T = { ...data };

  for (const key in sanitizedData) {
    sanitizedData[key] = DOMPurify.sanitize(data[key]) as T[typeof key];
  }

  return sanitizedData;
};
