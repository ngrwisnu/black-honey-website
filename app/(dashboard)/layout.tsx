import Header from "@/components/header";
import Container from "@/components/ui/container";
import PasswordModal from "@/components/ui/dashboard/password-modal";
import SideNav from "@/components/ui/dashboard/side-nav";
import React from "react";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <div className="sm:pt-14">
      <PasswordModal />
      <Header />
      <SideNav />
      <Container className="my-14 px-4">{children}</Container>
    </div>
  );
};

export default DashboardLayout;
