import Header from "@/components/header";
import Container from "@/components/ui/container";

export default function Authlayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-full">
      <Header logoCenter />
      <Container>{children}</Container>
      <footer className="flex min-w-full py-4 justify-center items-center shrink-0">
        <p className="text-body-primary text-center text-sm leading-4">
          &copy; Copyright 2023, Black Honey
        </p>
      </footer>
    </div>
  );
}
