import React from "react";
import OrderSummary from "@/components/ui/cart/order-summary";

const Cart = () => {
  const data = [
    {
      name: "Subtotal",
      value: "120.000",
    },
  ];

  return (
    <>
      <OrderSummary data={data} />
    </>
  );
};

export default Cart;
