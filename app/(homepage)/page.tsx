"use client";

import Footer from "@/components/footer";
import Header from "@/components/header";
import Container from "@/components/ui/container";
import Benefits from "@/components/ui/homepage/benefits";
import Jumbotron from "@/components/ui/homepage/jumbotron";
import Product from "@/components/ui/homepage/product";
import Recipe from "@/components/ui/homepage/recipe";
import { getAllProducts } from "@/lib/api/homepage";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const ProductsModal = dynamic(
  () => import("@/components/ui/homepage/products-modal"),
);

export default function Home() {
  const [products, setProducts] = useState<any>();

  useEffect(() => {
    const midtransScriptUrl = "https://app.sandbox.midtrans.com/snap/snap.js";
    const midtransClientKey = process.env.NEXT_PUBLIC_CLIENT_KEY!;

    let midtransScript = document.createElement("script");
    midtransScript.src = midtransScriptUrl;
    midtransScript.setAttribute("data-client-key", midtransClientKey);

    document.body.appendChild(midtransScript);

    return () => {
      document.body.removeChild(midtransScript);
    };
  }, []);

  useEffect(() => {
    const getProducts = async () => {
      const result = await getAllProducts();

      if (result) {
        setProducts(result);
      }
    };

    getProducts();
  }, []);

  return (
    <>
      <Header />
      <ProductsModal products={products} />
      <Container className="flex min-h-screen w-full flex-col items-center">
        <Jumbotron />
        <Product />
        <Benefits />
        <Recipe />
      </Container>
      <Footer />
    </>
  );
}
