import Header from "@/components/header";
import Container from "@/components/ui/container";
import React from "react";

interface CartLayoutProps {
  children: React.ReactNode;
}

const CartLayout: React.FC<CartLayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      <Container className="mt-14 flex w-full flex-col flex-wrap items-start gap-4 px-4 pt-14 md:flex-row">
        {children}
      </Container>
    </>
  );
};

export default CartLayout;
