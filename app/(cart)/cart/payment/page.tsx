import PaymentComp from "@/components/ui/cart/payment-comp";
import React, { Suspense } from "react";
import PaymentLoading from "./loading";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Payment | Black Honey",
};

const PaymentPage = async () => {
  return (
    <>
      <Suspense fallback={<PaymentLoading />}>
        <PaymentComp />
      </Suspense>
    </>
  );
};

export default PaymentPage;
