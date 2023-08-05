"use client";

import React, { useState } from "react";
import { clsx as cx } from "clsx";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { useGetPathname } from "@/hooks/useGetPathname";
import { Input } from "@/components/ui/input";

interface OrderSummaryProps {
  classname?: string;
  data?: {
    name: string;
    value: string;
  }[];
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ classname, data }) => {
  const [coupon, setCoupon] = useState("");

  const url = usePathname();

  const path = useGetPathname(url);

  return (
    <div
      className={cx(
        classname,
        "flex w-[459px] flex-col items-start shrink-0 self-stretch"
      )}
    >
      <div
        className="flex p-4 flex-col items-start gap-4 self-stretch rounded-xl bg-white shadow-section w-full"
        aria-label="Order summary"
      >
        <div
          className="flex justify-center items-center self-stretch text-body-primary"
          aria-label="Title"
        >
          <h4 className="flex-1 text-xl font-semibold leading-6">
            Order Summary
          </h4>
        </div>
        <div
          className="flex flex-col justify-center items-start self-stretch"
          aria-label="Summary"
        >
          <div
            className="flex flex-col justify-center items-start self-stretch w-full"
            aria-label="Summary detail"
          >
            {data?.map((item) => (
              <div
                className="w-full flex flex-col items-start gap-2 text-body-secondary"
                aria-label="details"
                key={item.name}
              >
                <div
                  className="flex justify-between items-center self-stretch"
                  aria-label="subtotal"
                >
                  <span>{item.name}</span>
                  <span className="text-base font-medium text-body-primary">
                    Rp{item.value}
                  </span>
                </div>
              </div>
            ))}
            <div
              className="flex py-4 flex-col justify-center items-start self-stretch"
              aria-label="divider"
            >
              <span className="h-[1px] self-stretch bg-gray-200"></span>
            </div>
            <div
              className="w-full flex flex-col items-start gap-2 text-body-primary font-medium text-base"
              aria-label="total"
            >
              <div
                className="flex justify-between items-center self-stretch"
                aria-label="total"
              >
                <span>Total</span>
                <span>Rp120.000</span>
              </div>
            </div>
          </div>
        </div>
        {path === "payment" && (
          <div
            className="flex flex-col items-start gap-1 self-stretch"
            aria-label="Input coupon"
          >
            <label htmlFor="coupon" className="text-xs text-body-primary">
              Have any coupon?
            </label>
            <Input
              id="coupon"
              placeholder="Coupon code"
              onBlur={(e) => setCoupon(e.target.value)}
            />
          </div>
        )}
        <div className="w-full" aria-label="Button wrapper">
          {path === "cart" && (
            <Button
              variant="success"
              className="w-full"
              onClick={() => console.log("Clicked")}
            >
              <span className="w-[18px] h-[18px] mr-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="19"
                  viewBox="0 0 18 19"
                  fill="none"
                >
                  <mask
                    id="mask0_617_1112"
                    style={{ maskType: "alpha" }}
                    maskUnits="userSpaceOnUse"
                    x="0"
                    y="0"
                    width="18"
                    height="19"
                  >
                    <rect y="0.0692139" width="18" height="18" fill="#D9D9D9" />
                  </mask>
                  <g mask="url(#mask0_617_1112)">
                    <path
                      d="M4.5 16.5692C3.875 16.5692 3.34375 16.3505 2.90625 15.913C2.46875 15.4755 2.25 14.9442 2.25 14.3192V12.0692H4.5V1.56921H15.75V14.3192C15.75 14.9442 15.5313 15.4755 15.0938 15.913C14.6562 16.3505 14.125 16.5692 13.5 16.5692H4.5ZM13.5 15.0692C13.7125 15.0692 13.8906 14.9973 14.0344 14.8536C14.1781 14.7098 14.25 14.5317 14.25 14.3192V3.06921H6V12.0692H12.75V14.3192C12.75 14.5317 12.8219 14.7098 12.9656 14.8536C13.1094 14.9973 13.2875 15.0692 13.5 15.0692ZM6.75 6.81921V5.31921H13.5V6.81921H6.75ZM6.75 9.06921V7.56921H13.5V9.06921H6.75ZM4.5 15.0692H11.25V13.5692H3.75V14.3192C3.75 14.5317 3.82188 14.7098 3.96563 14.8536C4.10938 14.9973 4.2875 15.0692 4.5 15.0692ZM4.5 15.0692H3.75H11.25H4.5Z"
                      fill="white"
                    />
                  </g>
                </svg>
              </span>
              <span>Checkout Now</span>
            </Button>
          )}
          {path === "payment" && (
            <Button
              variant="success"
              className="w-full"
              onClick={() => console.log("Clicked")}
            >
              <span>Payment Detail</span>
              <span className="w-[18px] h-[18px] ml-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="19"
                  height="19"
                  viewBox="0 0 19 19"
                  fill="none"
                >
                  <mask
                    id="mask0_617_1738"
                    style={{ maskType: "alpha" }}
                    maskUnits="userSpaceOnUse"
                    x="0"
                    y="0"
                    width="19"
                    height="19"
                  >
                    <rect
                      x="0.5"
                      y="0.0692139"
                      width="18"
                      height="18"
                      fill="#D9D9D9"
                    />
                  </mask>
                  <g mask="url(#mask0_617_1738)">
                    <path
                      d="M11 13.5692L9.95 12.4817L12.6125 9.81921H3.5V8.31921H12.6125L9.95 5.65671L11 4.56921L15.5 9.06921L11 13.5692Z"
                      fill="white"
                    />
                  </g>
                </svg>
              </span>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
