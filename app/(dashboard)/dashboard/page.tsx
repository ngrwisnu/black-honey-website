import SideNav from "@/components/ui/dashboard/side-nav";
import { AlignJustify } from "lucide-react";
import React from "react";

const Dashboard = () => {
  return (
    <>
      <div
        className="p-4 absolute top-20 left-0 flex sm:hidden"
        aria-label="Open sidebar"
      >
        <AlignJustify />
      </div>
      <SideNav />
    </>
  );
};

export default Dashboard;
