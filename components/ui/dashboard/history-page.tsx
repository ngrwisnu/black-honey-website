"use client";

import React, { useEffect, useState } from "react";
import ContentSection from "./content-section";
import ContentWrapper from "./content-wrapper";
import ContentHeader from "./content-header";
import ContentBody from "./content-body";
import data from "@/data/orders.json";
import { OrderType } from "@/types/types";
import { Card, CardContent, CardFooter, CardHeader } from "../card";
import { Badge } from "../badge";
import { Button } from "../button";
import { currencyFormatter, dateFormatter } from "@/lib/utils";
import Image from "next/image";

const HistoryPage = () => {
  const [orders, setOrders] = useState<OrderType[]>([]);

  useEffect(() => {
    setOrders(data.data);
  }, []);

  return (
    <div className="w-full flex justify-center">
      <ContentSection>
        <ContentWrapper aria-label="Purchase history">
          <ContentHeader title="Purchase History" />
          <ContentBody className="gap-3">
            {orders?.map((order) => (
              <Card
                key={order.id}
                className="flex p-4 flex-col items-start gap-4 self-stretch rounded-xl bg-white shadow-md text-lg"
              >
                <CardHeader className="flex pl-2 pb-2 self-stretch items-start border-b-[1px] border-b-gray-200">
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
                      } text-body-primary font-medium`}
                    >
                      {order.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="flex flex-col sm:flex-row sm:justify-between items-start self-stretch gap-4 sm:gap-0">
                  <div
                    className="flex items-start gap-4"
                    aria-label="Product detail"
                  >
                    <div className="w-[74px] h-[74px] shrink-0">
                      <Image
                        src={`/images/${order.product.thumbnail}`}
                        alt="Thumbnail"
                        width={74}
                        height={74}
                      />
                    </div>
                    <div className="flex flex-col items-start flex-1">
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
                <CardFooter className="w-full flex justify-end">
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
