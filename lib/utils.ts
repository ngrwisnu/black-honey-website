import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

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
