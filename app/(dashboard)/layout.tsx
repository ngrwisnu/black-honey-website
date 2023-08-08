import Header from "@/components/header";
import Container from "@/components/ui/container";
import SideNav from "@/components/ui/dashboard/side-nav";
import React from "react";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      <SideNav />
      <Container className="mt-14">{children}</Container>
    </>
  );
};

export default DashboardLayout;
