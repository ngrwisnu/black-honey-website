import ReviewPage from "@/components/ui/dashboard/review-page";
import SettingPage from "@/components/ui/dashboard/setting-page";
import HistoryPage from "@/components/ui/dashboard/history-page";
import React from "react";
import { getAllReviews, getTransactionsHistory } from "@/lib/api/dashboard";
import { getAllAddresses } from "@/lib/api/address";
import { cookies } from "next/headers";
import NotFound from "@/components/ui/not-found";
import { redirect } from "next/navigation";

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

  if (!tk) {
    redirect("/login");
  }

  const decodedTk = Buffer.from(tk.value, "base64").toString("ascii");

  const pages: Record<
    string,
    (decodedTk: string) => Promise<React.JSX.Element>
  > = {
    transactions: async (token) => {
      const orders = await getTransactionsHistory(token);
      return <HistoryPage orders={orders} />;
    },
    setting: async (token) => {
      const addresses = await getAllAddresses(token);
      return <SettingPage addresses={addresses} />;
    },
    review: async (token) => {
      const review = await getAllReviews(token);
      return <ReviewPage review={review} />;
    },
  };

  return pages[params.subPage] ? (
    pages[params.subPage](decodedTk)
  ) : (
    <NotFound />
  );
};

export default SubPage;
