import CartComp from "@/components/ui/cart/cart-comp";
import CheckoutComp from "@/components/ui/cart/checkout-comp";
import PaymentComp from "@/components/ui/cart/payment-comp";
import { getAllAddresses } from "@/lib/api/address";
import { getAllPayments } from "@/lib/api/payment";
import { cookies } from "next/headers";
import React from "react";
import NotFound from "@/components/ui/not-found";
import { redirect } from "next/navigation";

const CartSubPage = async ({ params }: { params: { subPage: string } }) => {
  const cookieStore = cookies();
  const tk = cookieStore.get("tk");

  if (params.subPage === "summary") {
    return <CartComp />;
  }

  if (params.subPage === "checkout") {
    if (!tk) {
      redirect("/login");
    }

    const decodedTk = Buffer.from(tk.value, "base64").toString("ascii");

    const addresses = await getAllAddresses(decodedTk);
    const payments = await getAllPayments();

    return <CheckoutComp addresses={addresses} payments={payments} />;
  }

  if (params.subPage === "payment") {
    if (!tk) {
      redirect("/login");
    }

    return <PaymentComp />;
  }

  return <NotFound />;
};

export default CartSubPage;
