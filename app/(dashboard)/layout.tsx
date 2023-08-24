import Header from "@/components/header";
import Container from "@/components/ui/container";
import SideNav from "@/components/ui/dashboard/side-nav";
import React from "react";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <div className="sm:pt-14">
      <Header />
      <SideNav />
      <Container className="my-14 px-4">{children}</Container>
    </div>
  );
};

export default DashboardLayout;
