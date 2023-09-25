"use client";

import React, { useEffect, useRef, useState } from "react";
import ContentSection from "./content-section";
import ContentWrapper from "./content-wrapper";
import ContentHeader from "./content-header";
import ContentBody from "./content-body";
import { FetchResponse, OrderType } from "@/types/types";
import { Card, CardContent, CardFooter, CardHeader } from "../card";
import { Badge } from "../badge";
import { currencyFormatter, dateFormatter } from "@/lib/utils";
import Image from "next/image";
import { Copy } from "lucide-react";
import { toast } from "../use-toast";
import DashboardError from "./error";

interface HistoryPageProps {
  orders: FetchResponse | undefined;
}

const HistoryPage = ({ orders }: HistoryPageProps) => {
  const [orderHistory, setOrderHistory] = useState<OrderType[] | undefined>([]);

  const receiptRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    if (!orders?.isError && orders) {
      setOrderHistory(orders.data.data.result);
    } else {
      setOrderHistory(undefined);
    }
  }, [orders]);

  const receiptNumberHandler = () => {
    if (receiptRef) {
      const receiptNumber = receiptRef.current?.textContent?.replace(" ", "");

      navigator.clipboard.writeText(receiptNumber as string);

      toast({
        title: "Success copy to clipboard",
        variant: "success",
      });
    }
  };

  if (!orderHistory) {
    return <DashboardError />;
  }

  return (
    <div className="flex w-full justify-center">
      <ContentSection>
        <ContentWrapper aria-label="Purchase history">
          <ContentHeader title="Purchase History" />
          <ContentBody className="gap-3">
            {orderHistory.map((order) => (
              <Card
                key={order.id}
                className="flex flex-col items-start gap-4 self-stretch rounded-xl bg-white p-4 text-lg shadow-md"
              >
                <CardHeader className="flex items-start self-stretch border-b-[1px] border-b-gray-200 pb-2 pl-2">
                  <div
                    className="flex gap-4"
                    aria-label="Date purchase and status"
                  >
                    <span className="text-sm text-body-secondary">
                      {dateFormatter(order.createdAt)}
                    </span>
                    <Badge
                      className={`${
                        order.status === "Pending"
                          ? "bg-[#FFECBD]"
                          : order.status === "Success"
                          ? "bg-[#D2ECEC]"
                          : order.status === "Pre-Order"
                          ? "bg-[#bdacfb]"
                          : "bg-[#FBB8AC]"
                      } font-medium text-body-primary`}
                    >
                      {order.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="flex flex-col items-start gap-4 self-stretch sm:flex-row sm:justify-between sm:gap-0">
                  <div
                    className="flex items-start gap-4"
                    aria-label="Product detail"
                  >
                    <div className="h-[74px] w-[74px] shrink-0">
                      <Image
                        src={`${process.env.NEXT_PUBLIC_DEV_ROOT}/images/uploads/${order.product.thumbnail}`}
                        alt="Thumbnail"
                        width={74}
                        height={74}
                      />
                    </div>
                    <div className="flex flex-1 flex-col items-start">
                      <h6 className="font-semibold">{order.product.name}</h6>
                      <p className="text-body-secondary">
                        {order.qty} x {currencyFormatter(order.product.price)}
                      </p>
                    </div>
                  </div>
                  <div
                    className="flex flex-col items-start"
                    aria-label="Total price"
                  >
                    <span>Total</span>
                    <p className="font-semibold">
                      {currencyFormatter(order.total_price)}
                    </p>
                  </div>
                </CardContent>
                <CardFooter className="flex w-full flex-col items-start justify-end gap-4 sm:flex-row sm:items-center">
                  <div className="flex gap-2" aria-label="Receipt number">
                    <span>Receipt: </span>
                    {!order.receipt_number ? (
                      <span className="text-orange-300">Will update soon</span>
                    ) : (
                      <span
                        className="flex items-center gap-1 text-orange-500 hover:cursor-pointer hover:underline"
                        aria-label="Click to copy to clipboard the receipt number"
                        onClick={receiptNumberHandler}
                        ref={receiptRef}
                      >
                        {order.receipt_number} <Copy size={20} />
                      </span>
                    )}
                  </div>
                </CardFooter>
              </Card>
            ))}
          </ContentBody>
        </ContentWrapper>
      </ContentSection>
    </div>
  );
};

export default HistoryPage;
