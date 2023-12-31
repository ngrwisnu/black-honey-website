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
  const pageList = Object.keys(CurrentStep).filter((text) =>
    isNaN(parseInt(text)),
  );

  return (
    <>
      <Header />
      {pageList.includes(params.subPage) && (
        <Stepper
          currentStep={CurrentStep[params.subPage as keyof typeof CurrentStep]}
        />
      )}
      <Container className="mb-14 flex w-full items-start justify-center px-4 md:mb-0">
        {children}
      </Container>
    </>
  );
};

export default CartLayout;
