import PaymentComp from "@/components/ui/cart/payment-comp";
import React, { Suspense } from "react";
import PaymentLoading from "./loading";

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
