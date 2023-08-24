import ReviewPage from "@/components/ui/dashboard/review-page";
import SettingPage from "@/components/ui/dashboard/setting-page";
import HistoryPage from "@/components/ui/dashboard/history-page";
import React, { Suspense } from "react";
import { getTransactionsHistory } from "@/lib/api/dashboard";
import Loading from "./loading";

export const revalidate = 0;

const SubPage = async ({ params }: { params: { subPage: string } }) => {
  if (params.subPage === "transactions") {
    const orders = await getTransactionsHistory();

    return <HistoryPage orders={orders} />;
  }

  if (params.subPage === "setting") {
    return <SettingPage />;
  }

  if (params.subPage === "review") {
    return (
      <Suspense fallback={<Loading />}>
        <ReviewPage />
      </Suspense>
    );
  }

  return <h1>SubPage: {params.subPage}</h1>;
};

export default SubPage;
