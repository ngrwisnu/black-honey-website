import Header from "@/components/header";
import Container from "@/components/ui/container";
import Benefits from "@/components/ui/homepage/benefits";
import Jumbotron from "@/components/ui/homepage/jumbotron";
import Product from "@/components/ui/homepage/product";
import ProductsModal from "@/components/ui/homepage/products-modal";
import { getAllProducts } from "@/lib/api/homepage";

export const revalidate = 0;

export default async function Home() {
  const products = await getAllProducts();

  return (
    <>
      <Header />
      <Container className="flex min-h-screen flex-col items-center">
        <ProductsModal products={products} />
        <Jumbotron />
        <Product />
        <Benefits />
      </Container>
    </>
  );
}
