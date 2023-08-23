import CheckoutComp from "@/components/ui/cart/checkout-comp";
import React from "react";
import { getAllAddresses } from "@/lib/api/address";
import { getAllPayments } from "@/lib/api/payment";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Checkout | Black Honey",
};

export const revalidate = 0;

const Checkout = async () => {
  const addresses = await getAllAddresses();
  const payments = await getAllPayments();

  return <CheckoutComp addresses={addresses} payments={payments} />;
};

export default Checkout;
