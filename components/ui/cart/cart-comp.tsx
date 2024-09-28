"use client";

import useCart, { CartItems } from "@/store/cart";
import React, { useEffect, useState } from "react";
import { OptionWrapper } from "./option-wrapper";
import Image from "next/image";
import { currencyFormatter, findUserCart } from "@/lib/utils";
import { Button } from "../button";
import { Trash } from "lucide-react";
import OrderSummary from "./order-summary";
import { useUserProfile } from "@/hooks/useUserProfile";

const CartComp = () => {
  const [orders, setOrders] = useState<CartItems[]>([]);

  const cart = useCart();
  const userProfile = useUserProfile();

  useEffect(() => {
    const userCart = findUserCart(cart.items, userProfile?.id);

    setOrders(userCart);
  }, [userProfile, cart.items]);

  return (
    <div className="flex w-full max-w-[1440px] flex-col gap-4 md:flex-row">
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
                key={item.product.id}
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
                      src={`${item.product.thumbnail}`}
                      alt="thumbnail"
                      width={180}
                      height={140}
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-1 flex-col items-start gap-2">
                    <p>{item.product.name}</p>
                    <p className="font-normal text-body-secondary">
                      Qty x{item.qty}
                    </p>
                    <p>{currencyFormatter(item.product.price)}</p>
                  </div>
                </div>
                <div
                  className="flex w-[120px] items-center justify-center self-stretch"
                  aria-label="action button"
                >
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded p-0 hover:bg-rose-100 sm:border-none"
                    onClick={() => cart.removeItem(item.product.id)}
                  >
                    <Trash size={20} className="stroke-red-600" />
                  </Button>
                </div>
              </div>
            ))}
          </OptionWrapper>
        </div>
      </div>
      <OrderSummary data={orders} />
    </div>
  );
};

export default CartComp;
