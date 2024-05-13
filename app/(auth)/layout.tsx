import Header from "@/components/header";
import Container from "@/components/ui/container";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function Authlayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = cookies();
  const tk = cookieStore.get("tk");

  if (tk) {
    redirect("/");
  }

  return (
    <div className="min-h-full">
      <Header logoCenter />
      <Container className="flex w-full items-center justify-center px-4 pt-34">
        {children}
      </Container>
      <footer className="flex min-w-full shrink-0 items-center justify-center py-4">
        <p className="text-center text-sm leading-4 text-body-primary">
          &copy; Copyright 2024, Black Honey
        </p>
      </footer>
    </div>
  );
}
