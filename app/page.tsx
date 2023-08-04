import Header from "@/components/header";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex min-h-screen flex-col items-center justify-between px-4 py-14">
        <Button>Click me</Button>
      </main>
    </>
  );
}
