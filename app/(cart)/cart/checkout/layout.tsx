import React, { Suspense } from "react";
import Checkout from "./page";
import CheckoutLoading from "./loading";

const CheckoutLayout = () => {
  return (
    <>
      <Suspense fallback={<CheckoutLoading />}>
        <Checkout />
      </Suspense>
    </>
  );
};

export default CheckoutLayout;
