import Footer from "@/components/footer";
import Header from "@/components/header";
import Container from "@/components/ui/container";
import Benefits from "@/components/ui/homepage/benefits";
import Jumbotron from "@/components/ui/homepage/jumbotron";
import Product from "@/components/ui/homepage/product";
import ProductsModal from "@/components/ui/homepage/products-modal";
import Recipe from "@/components/ui/homepage/recipe";
import { getAllProducts } from "@/lib/api/homepage";
import { Suspense } from "react";
import Loading from "./loading";
import { cookies } from "next/headers";
import jwt_decode from "jwt-decode";
import { UserPayload, UserProfile } from "@/types/types";

export const revalidate = 0;

export default async function Home() {
  const products = await getAllProducts();
  const cookie = cookies().get("tk");
  let oauthTk: UserProfile | undefined = undefined;

  if (cookie) {
    const decoded = Buffer.from(cookie?.value, "base64").toString("ascii");
    const tk: UserPayload = jwt_decode(decoded);
    oauthTk = tk.customer;
    console.log("Cookies >> \n", tk.customer);
  }

  return (
    <>
      <Header oauthToken={oauthTk} />
      <Suspense fallback={<Loading />}>
        <ProductsModal products={products} />
      </Suspense>
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
