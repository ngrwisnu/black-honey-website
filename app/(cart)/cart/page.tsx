"use client";

import React, { useEffect, useState } from "react";
import OrderSummary from "@/components/ui/cart/order-summary";
import order from "@/data/orders.json";
import { OptionWrapper } from "@/components/ui/cart/option-wrapper";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface OrderTypes {
  id: number;
  product_name: string;
  price: number;
}

const Cart = () => {
  const [orders, setOrders] = useState<OrderTypes[]>([]);

  useEffect(() => {
    setOrders(order.data);
  }, []);

  const data = [
    {
      name: "Subtotal",
      value: "120.000",
    },
  ];

  return (
    <>
      <div className="flex w-full flex-1 items-start justify-center self-stretch">
        <div
          className="flex w-full flex-col items-start gap-8 rounded-lg bg-white p-4 shadow-section sm:max-w-[830px]"
          aria-label="Purchase list"
        >
          <OptionWrapper>
            <h3 className="text-xl font-semibold">Product Summary</h3>
            {orders.map((item) => (
              <div
                className="flex w-full items-center gap-4 self-stretch border-b-[1px] border-b-gray-200 pb-4"
                key={item.id}
              >
                <div
                  className="flex flex-1 items-center gap-8 font-medium text-body-primary"
                  aria-label="content"
                >
                  <div
                    className="aspect-square h-20 w-20 flex-initial sm:h-[140px] sm:w-[180px]"
                    aria-label="Thumbnail"
                  >
                    <Image
                      src={`/images/product-1.webp`}
                      alt="thumbnail"
                      width={180}
                      height={140}
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-1 flex-col items-start gap-2">
                    <p>{item.product_name}</p>
                    <p className="font-normal text-body-secondary">Qty x2</p>
                    <p>{item.price}</p>
                  </div>
                </div>
                <div
                  className="flex w-[120px] items-center justify-center self-stretch"
                  aria-label="action button"
                >
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded p-0 hover:bg-rose-100 sm:border-none"
                  >
                    <Trash size={20} className="stroke-red-600" />
                  </Button>
                </div>
              </div>
            ))}
          </OptionWrapper>
        </div>
      </div>
      <OrderSummary data={data} />
    </>
  );
};

export default Cart;
