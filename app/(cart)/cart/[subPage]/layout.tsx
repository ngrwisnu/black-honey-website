import Header from "@/components/header";
import Container from "@/components/ui/container";
import React from "react";
import Stepper from "@/components/ui/cart/stepper";
import { Metadata } from "next";
import { firstToUpperCase } from "@/lib/utils";

interface CartLayoutProps {
  params: Params;
  children: React.ReactNode;
}

type Params = {
  subPage: string;
};

type Props = {
  params: Params;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const page = params.subPage;

  return {
    title: `${firstToUpperCase(page)} | Black Honey`,
  };
}

enum CurrentStep {
  summary,
  checkout,
  payment,
}

const CartLayout: React.FC<CartLayoutProps> = ({ params, children }) => {
  return (
    <>
      <Header />
      <Stepper
        currentStep={CurrentStep[params.subPage as keyof typeof CurrentStep]}
      />
      <Container className="flex w-full flex-col flex-wrap items-start gap-4 px-4 md:flex-row">
        {children}
      </Container>
    </>
  );
};

export default CartLayout;
