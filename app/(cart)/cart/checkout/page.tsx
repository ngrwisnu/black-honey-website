import CheckoutComp from "@/components/ui/cart/checkout-comp";
import React from "react";
import { getAllAddresses } from "@/lib/api/address";
import { getAllPayments } from "@/lib/api/payment";
import { Metadata } from "next";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: "Checkout | Black Honey",
};

export const revalidate = 0;

const Checkout = async () => {
  const cookieStore = cookies();
  const tk = cookieStore.get("tk");

  const decodedTk = Buffer.from(tk!.value, "base64").toString("ascii");

  const addresses = await getAllAddresses(decodedTk);
  const payments = await getAllPayments();

  return <CheckoutComp addresses={addresses} payments={payments} />;
};

export default Checkout;
