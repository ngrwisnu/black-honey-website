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
      <div className="flex items-start justify-center flex-1 self-stretch w-full">
        <div
          className="flex flex-col items-start w-full sm:max-w-[830px] gap-8 p-4 rounded-lg bg-white shadow-section"
          aria-label="Purchase list"
        >
          <OptionWrapper>
            <h3 className="text-xl font-semibold">Product Summary</h3>
            {orders.map((item) => (
              <div
                className="flex pb-4 items-center gap-4 self-stretch border-b-[1px] border-b-gray-200 w-full"
                key={item.id}
              >
                <div
                  className="flex items-center gap-8 flex-1 text-body-primary font-medium"
                  aria-label="content"
                >
                  <div
                    className="w-20 h-20 sm:w-[180px] sm:h-[140px] aspect-square flex-initial"
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
                  <div className="flex flex-col items-start gap-2 flex-1">
                    <p>{item.product_name}</p>
                    <p className="text-body-secondary font-normal">Qty x2</p>
                    <p>{item.price}</p>
                  </div>
                </div>
                <div
                  className="flex w-[120px] justify-center items-center self-stretch"
                  aria-label="action button"
                >
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Button
                          variant="outline"
                          size="icon"
                          className="rounded sm:border-none hover:bg-rose-100 p-0"
                        >
                          <Trash size={20} className="stroke-red-600" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Remove</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
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
