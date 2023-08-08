import ReviewPage from "@/components/ui/dashboard/review-page";
import SettingPage from "@/components/ui/dashboard/setting-page";
import React from "react";

const SubPage = ({ params }: { params: { subPage: string } }) => {
  if (params.subPage === "setting") {
    return <SettingPage />;
  }

  if (params.subPage === "review") {
    return <ReviewPage />;
  }

  return <h1>SubPage: {params.subPage}</h1>;
};

export default SubPage;
