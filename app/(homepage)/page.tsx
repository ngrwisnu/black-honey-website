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
