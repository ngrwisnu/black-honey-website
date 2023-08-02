import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between px-4 py-14">
      <Button>Click me</Button>
      <Button variant="success">Default me</Button>
      <Button variant="successDisabled">Disabled me</Button>
    </main>
  );
}
