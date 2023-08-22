import Header from "@/components/header";
import Container from "@/components/ui/container";
import Benefits from "@/components/ui/homepage/benefits";
import Jumbotron from "@/components/ui/homepage/jumbotron";
import Product from "@/components/ui/homepage/product";
import Modal from "@/components/ui/homepage/modal";

export default function Home() {
  return (
    <>
      <Header />
      <Container className="flex min-h-screen flex-col items-center">
        <Modal />
        <Jumbotron />
        <Product />
        <Benefits />
      </Container>
    </>
  );
}
