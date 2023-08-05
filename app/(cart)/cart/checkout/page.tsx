import OrderSummary from "@/components/ui/cart/order-summary";
import React from "react";

const Payment = () => {
  const data = [
    {
      name: "Subtotal",
      value: "120.000",
    },
    {
      name: "Shipping fee",
      value: "9.000",
    },
  ];

  return (
    <>
      <OrderSummary data={data} />
    </>
  );
};

export default Payment;
