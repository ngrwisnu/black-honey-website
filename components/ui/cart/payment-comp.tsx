"use client";

import useCheckout from "@/store/checkout";
import { useEffect } from "react";
import { SummaryItem, SummaryList, SummaryTitle } from "./summary-item";
import { currencyFormatter, subTotalCalculation } from "@/lib/utils";
import { Button } from "../button";
import { Check } from "lucide-react";
import { useToken } from "@/hooks/useToken";
import Link from "next/link";
import { CreateOrderPayload, MidtransPayload } from "@/types/types";
import { v4 as uuidv4 } from "uuid";
import { getTransactionToken } from "@/lib/api/checkout";
import useCart from "@/store/cart";
import { useCreateOrder } from "@/hooks/useCreateOrder";
import Swal from "sweetalert2";

const PaymentComp = () => {
  const checkout = useCheckout();
  const cart = useCart();
  const token = useToken();

  const { mutate } = useCreateOrder();

  useEffect(() => {
    window.addEventListener("unload", () => {
      if (checkout.items.length !== 0) {
        checkout.clearItems();
      }
    });

    return () => {
      window.addEventListener("unload", () => {
        if (checkout.items.length !== 0) {
          checkout.clearItems();
        }
      });
    };
  }, [checkout]);

  const subTotal = subTotalCalculation(checkout.items);

  const payHandler = async () => {
    const body: MidtransPayload = {
      order_id: uuidv4(),
      gross_amount: subTotal,
      item_details: JSON.stringify(checkout.items),
      address_id: checkout.items[0].address_id!,
    };

    const response = await getTransactionToken(body, token);

    // @ts-ignore
    window.snap.pay(response?.data.data.token, {
      onSuccess: async (result: { [key: string]: any }) => {
        const data: CreateOrderPayload = {
          order_id: result.order_id,
          item_details: JSON.stringify(checkout.items),
          transaction_details: JSON.stringify(result),
        };

        const required = {
          data,
          token,
        };

        mutate(required, {
          onSuccess: (data) => {
            if (!data?.isError) {
              Swal.fire({
                icon: "success",
                title: "Payment complete",
                text: "Your order will be process",
                confirmButtonText: `
                    <a href="/dashboard/transactions" class="">See purchase history</a>
                  `,
                confirmButtonColor: "#030712",
                footer:
                  '<a href="/" class="underline text-blue-600">Go to homepage</a>',
              });

              checkout.clearItems();
              cart.removeAllItem();
            } else {
              Swal.fire({
                icon: "error",
                title: JSON.stringify(data.data),
              });
            }
          },
        });
      },
      onPending: (result: { [key: string]: any }) => {
        console.log("pending >> \n", result);
      },
    });
  };

  if (checkout.items.length === 0) {
    return (
      <div className="flex h-[800px] w-full items-center justify-center">
        <p>
          Your cart is empty,{" "}
          <Link href={"/"} className="font-medium text-orange-500 underline">
            browse our products
          </Link>
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto mb-14">
      <section
        className="flex w-full flex-col items-start gap-3 rounded-lg bg-white p-4 shadow-section md:w-[506px]"
        aria-label="details"
      >
        <SummaryItem>
          <SummaryTitle>Purchase Detail</SummaryTitle>
          {checkout.items.map((item: any) => (
            <SummaryList key={item.product.id}>
              <span>
                {item.product.name} <span>x{item.qty}</span>
              </span>
              <span>{currencyFormatter(item.qty * item.product.price)}</span>
            </SummaryList>
          ))}
        </SummaryItem>
        <span className="h-[1px] w-full bg-gray-200"></span>
        <SummaryItem>
          <SummaryTitle>Order Detail</SummaryTitle>
          <SummaryList>
            <span>Coupon</span>
            <span>-</span>
          </SummaryList>
          <SummaryList>
            <span>Shipping</span>
            <span>TBA</span>
          </SummaryList>
          <SummaryList classname="font-semibold">
            <span>Total</span>
            <span>{currencyFormatter(subTotal)}</span>
          </SummaryList>
        </SummaryItem>
      </section>
      <Button
        variant="default"
        className="mt-6 w-full"
        type="submit"
        onClick={payHandler}
      >
        <Check size={18} aria-label="icon check" />
        <span className="ml-1" aria-label="button name">
          Pay Now
        </span>
      </Button>
    </div>
  );
};

export default PaymentComp;
