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
      <Container className="flex flex-col md:flex-row w-full flex-wrap gap-4 items-start">
        {children}
      </Container>
    </>
  );
};

export default CartLayout;
