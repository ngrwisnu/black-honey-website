import Header from "@/components/header";
import { Button } from "@/components/ui/button";
import Step from "@/components/ui/cart/step";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex min-h-screen flex-col items-center px-4 py-14">
        <div className="flex">
          <Step variant="disabled" label="1" />
          <Step variant="active" label="1" />
          <Step variant="done" />
        </div>
      </main>
    </>
  );
}
