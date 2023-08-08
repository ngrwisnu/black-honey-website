import SettingPage from "@/components/ui/dashboard/setting-page";
import React from "react";

const SubPage = ({ params }: { params: { subPage: string } }) => {
  if (params.subPage === "setting") {
    return <SettingPage />;
  }

  return <h1>SubPage: {params.subPage}</h1>;
};

export default SubPage;
