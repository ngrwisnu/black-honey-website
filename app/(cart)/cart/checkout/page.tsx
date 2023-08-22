import CheckoutComp from "@/components/ui/cart/checkout-comp";
import React, { Suspense } from "react";
import CheckoutLoading from "./loading";

const Checkout = () => {
  return (
    <>
      <Suspense fallback={<CheckoutLoading />}>
        <CheckoutComp />
      </Suspense>
    </>
  );
};

export default Checkout;
