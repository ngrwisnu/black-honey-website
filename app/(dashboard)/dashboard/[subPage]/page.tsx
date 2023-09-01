import ReviewPage from "@/components/ui/dashboard/review-page";
import SettingPage from "@/components/ui/dashboard/setting-page";
import HistoryPage from "@/components/ui/dashboard/history-page";
import React from "react";
import { getAllReviews, getTransactionsHistory } from "@/lib/api/dashboard";
import { getAllAddresses } from "@/lib/api/address";
import { cookies } from "next/headers";
import Image from "next/image";

export const generateMetadata = async ({
  params,
}: {
  params: { subPage: string };
}) => {
  if (params.subPage === "transactions")
    return { title: "Transactions History" };
  if (params.subPage === "review") return { title: "Review Black Honey" };

  return {
    title: "Setting",
  };
};

export const revalidate = 0;

const SubPage = async ({ params }: { params: { subPage: string } }) => {
  const cookieStore = cookies();
  const tk = cookieStore.get("tk");

  const decodedTk = Buffer.from(tk!.value, "base64").toString("ascii");

  if (params.subPage === "transactions") {
    const orders = await getTransactionsHistory(decodedTk);

    return <HistoryPage orders={orders} />;
  }

  if (params.subPage === "setting") {
    const addresses = await getAllAddresses(decodedTk);

    return <SettingPage addresses={addresses} />;
  }

  if (params.subPage === "review") {
    const review = await getAllReviews(decodedTk);

    return <ReviewPage review={review} />;
  }

  return (
    <div className="flex w-full items-center justify-center py-20">
      <div className="h-auto w-1/3">
        <Image src="/images/not-found.png" width={1200} height={960} alt="" />
      </div>
    </div>
  );
};

export default SubPage;
