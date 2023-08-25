"use client";

import React, { useEffect, useState } from "react";
import ContentSection from "./content-section";
import ContentWrapper from "./content-wrapper";
import ContentHeader from "./content-header";
import ContentBody from "./content-body";
import { FetchResponse, OrderType } from "@/types/types";
import { Card, CardContent, CardFooter, CardHeader } from "../card";
import { Badge } from "../badge";
import { Button } from "../button";
import { currencyFormatter, dateFormatter } from "@/lib/utils";
import Image from "next/image";

interface HistoryPageProps {
  orders: FetchResponse | undefined;
}

const HistoryPage = ({ orders }: HistoryPageProps) => {
  const [orderHistory, setOrderHistory] = useState<OrderType[]>([]);

  useEffect(() => {
    if (orders) {
      setOrderHistory(orders.data.data.result);
    }
  }, [orders]);

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
                <CardFooter className="flex w-full justify-end">
                  <Button variant="outline" className="w-full sm:w-auto">
                    Detail Transaction
                  </Button>
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
