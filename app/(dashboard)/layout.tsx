import Header from "@/components/header";
import Container from "@/components/ui/container";
import PasswordModal from "@/components/ui/dashboard/password-modal";
import SideNav from "@/components/ui/dashboard/side-nav";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const cookieStore = cookies();
  const tk = cookieStore.get("tk");

  if (!tk) {
    redirect("/login");
  }

  return (
    <div className="sm:pt-14">
      <PasswordModal />
      <Header />
      <SideNav />
      <Container className="my-20 px-4">{children}</Container>
    </div>
  );
};

export default DashboardLayout;
