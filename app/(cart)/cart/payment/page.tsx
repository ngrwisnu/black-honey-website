"use client";

import { Button } from "@/components/ui/button";
import {
  SummaryItem,
  SummaryList,
  SummaryTitle,
} from "@/components/ui/cart/summary-item";
import { Input } from "@/components/ui/input";
import { Check } from "lucide-react";
import React from "react";

const Payment = () => {
  return (
    <>
      <section
        className="flex w-full md:w-[506px] p-4 flex-col items-start gap-3 rounded-lg bg-white shadow-section"
        aria-label="details"
      >
        <SummaryItem>
          <SummaryTitle>Purchase Detail</SummaryTitle>
          <SummaryList>
            <span>
              Black Honey - 750 mL <span>x2</span>
            </span>
            <span>Rp120.000</span>
          </SummaryList>
        </SummaryItem>
        <span className="w-full h-[1px] bg-gray-200"></span>
        <SummaryItem>
          <SummaryTitle>Order Detail</SummaryTitle>
          <SummaryList>
            <span>Coupon</span>
            <span>freeshipping</span>
          </SummaryList>
          <SummaryList>
            <span>Shipping</span>
            <span>Rp0</span>
          </SummaryList>
          <SummaryList classname="font-semibold">
            <span>Total</span>
            <span>Rp120.000</span>
          </SummaryList>
        </SummaryItem>
        <span className="w-full h-[1px] bg-gray-200"></span>
        <SummaryItem>
          <SummaryTitle>Payment Info</SummaryTitle>
          <SummaryList>
            <span>Payment method</span>
            <span>GoPay - 000012128899</span>
          </SummaryList>
          <SummaryList>
            <span>Recipient name</span>
            <span>Melanie Doe</span>
          </SummaryList>
        </SummaryItem>
      </section>
      <section
        className="flex flex-col p-4 gap-6 items-start w-full md:w-[491px]"
        aria-label="Input transfer proof"
      >
        <div
          className="flex flex-col items-center gap-2 self-stretch text-orange-primary text-sm leading-[16.8px] text-center"
          aria-label="Important notice"
        >
          <h6 className="font-semibold">Important Notice</h6>
          <p>
            Please ensure that you input the correct payment amount before
            proceeding with the transfer
          </p>
          <p className="italic">
            Pastikan anda memasukkan jumlah pembayaran yang sesuai sebelum
            melanjutkan proses pembayaran{" "}
          </p>
        </div>
        <div
          className="flex flex-col items-start gap-1 self-stretch"
          aria-label="Input file"
        >
          <label
            htmlFor="payment-proof"
            className="text-xs text-body-primary leading-[14.4px]"
          >
            Payment proof
          </label>
          <Input id="payment-proof" type="file" />
        </div>
        <Button
          variant="success"
          className="w-full"
          onClick={() => console.log("Clicked")}
        >
          <Check size={18} aria-label="icon check" />
          <span className="ml-1" aria-label="button name">
            Payment Complete
          </span>
        </Button>
      </section>
    </>
  );
};

export default Payment;
