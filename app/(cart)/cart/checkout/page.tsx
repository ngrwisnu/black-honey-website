"use client";

import OrderSummary from "@/components/ui/cart/order-summary";
import React, { useState } from "react";
import {
  ContentWrapper,
  OptionWrapper,
} from "@/components/ui/cart/option-wrapper";
import Image from "next/image";
import useCart from "@/store/cart";
import { getAllPayments } from "@/lib/api/payment";
import { PaymentType } from "@/types/types";
import { getAddress } from "@/lib/api/address";
import useGetQueryData from "@/hooks/useGetQueryData";

const Checkout = () => {
  const [selectedAddress, setSelectedAddress] = useState("");
  const [selectedPayment, setSelectedPayment] = useState(0);

  const items = useCart((state) => state.items);

  const paymentQuery = useGetQueryData("payments", getAllPayments);
  const addressQuery = useGetQueryData("address", getAddress);

  const checkoutDetail = {
    address_id: selectedAddress,
    payment_id: selectedPayment,
  };

  return (
    <>
      <div className="flex w-full flex-1 items-start justify-center self-stretch">
        <div className="flex w-full flex-col items-start gap-8 rounded-lg bg-white p-4 shadow-section sm:max-w-[830px]">
          <OptionWrapper aria-label="Address options">
            <h3 className="text-xl font-semibold">Delivery Address</h3>
            <ContentWrapper
              className="flex-row flex-wrap gap-4 self-stretch"
              aria-label="Content"
            >
              <div
                className={`relative flex w-full items-start gap-2 rounded-lg border-[1px]  bg-white p-4 sm:w-[390px] ${
                  selectedAddress === addressQuery?.data.data.id
                    ? "border-green-600"
                    : "border-gray-200"
                }`}
              >
                <input
                  type="radio"
                  value={addressQuery?.data.data.id}
                  name="address"
                  className="absolute inset-0 opacity-0"
                  checked={selectedAddress === addressQuery?.data.data.id}
                  onChange={(e) => setSelectedAddress(e.currentTarget.value)}
                />
                <span
                  className={`h-[18px] w-[18px] shrink-0 rounded-full border-[2px]  ${
                    selectedAddress === addressQuery?.data.data.id
                      ? "border-green-600"
                      : "border-gray-200"
                  } ${
                    selectedAddress === addressQuery?.data.data.id
                      ? "bg-green-100"
                      : "bg-gray-400/10"
                  }`}
                ></span>
                <div className="flex flex-1 flex-col items-start gap-1 text-body-primary">
                  <p className="font-medium">
                    {addressQuery?.data.data.recipient_name}
                  </p>
                  <p>{`${
                    addressQuery?.data.data.phone
                      .substring(0, 7)
                      .replace(/\d/g, "x")! +
                    addressQuery?.data.data.phone.substring(8)
                  }`}</p>
                  <p>{addressQuery?.data.data.full_address}</p>
                </div>
              </div>
            </ContentWrapper>
          </OptionWrapper>

          <OptionWrapper aria-label="Payment options">
            <h3 className="text-xl font-semibold">Payment Method</h3>
            <ContentWrapper
              className="flex-row flex-wrap gap-4 self-stretch"
              aria-label="Content"
            >
              {paymentQuery?.data.data.map((payment: PaymentType) => (
                <div
                  className={`relative flex w-full items-start gap-2 rounded-lg border-[1px]  bg-white p-4 sm:w-[390px] ${
                    selectedPayment === payment.id
                      ? "border-green-600"
                      : "border-gray-200"
                  }`}
                  key={payment.id}
                >
                  <input
                    type="radio"
                    value={payment.id}
                    name={payment.payment_name}
                    className="absolute inset-0 opacity-0"
                    checked={selectedPayment === payment.id}
                    onChange={(e) =>
                      setSelectedPayment(Number(e.currentTarget.value))
                    }
                  />
                  <span
                    className={`h-[18px] w-[18px] shrink-0 rounded-full border-[2px]  ${
                      selectedPayment === payment.id
                        ? "border-green-600"
                        : "border-gray-200"
                    } ${
                      selectedPayment === payment.id
                        ? "bg-green-100"
                        : "bg-gray-400/10"
                    }`}
                  ></span>
                  <div className="flex flex-1 flex-col items-start gap-1 text-body-primary">
                    <p className="font-medium">{payment.payment_name}</p>
                    <div className="h-9 w-20">
                      <Image
                        src={`${process.env.NEXT_PUBLIC_DEV_ROOT}/images/uploads/${payment.thumbnail}`}
                        alt="thumbnail"
                        className="object-cover"
                        width={80}
                        height={36}
                      />
                    </div>
                    <p>
                      {payment.account_number
                        .toString()
                        .substring(0, 7)
                        .replace(/\d/g, "x") +
                        payment.account_number.toString().substring(8)}
                    </p>
                  </div>
                </div>
              ))}
            </ContentWrapper>
          </OptionWrapper>
        </div>
      </div>
      <OrderSummary data={items} checkoutDetail={checkoutDetail} />
    </>
  );
};

export default Checkout;
