import CartComp from "@/components/ui/cart/cart-comp";
import CheckoutComp from "@/components/ui/cart/checkout-comp";
import PaymentComp from "@/components/ui/cart/payment-comp";
import { getAllAddresses } from "@/lib/api/address";
import { getAllPayments } from "@/lib/api/payment";
import { cookies } from "next/headers";
import React, { Suspense } from "react";
import CartLoading from "./loading";

const CartSubPage = async ({ params }: { params: { subPage: string } }) => {
  if (params.subPage === "summary") {
    return <CartComp />;
  }

  if (params.subPage === "checkout") {
    const cookieStore = cookies();
    const tk = cookieStore.get("tk");

    const decodedTk = Buffer.from(tk!.value, "base64").toString("ascii");

    const addresses = await getAllAddresses(decodedTk);
    const payments = await getAllPayments();

    return <CheckoutComp addresses={addresses} payments={payments} />;
  }

  if (params.subPage === "payment") {
    return (
      <>
        <Suspense fallback={<CartLoading />}>
          <PaymentComp />
        </Suspense>
      </>
    );
  }

  return <div>CartSubPage</div>;
};

export default CartSubPage;
