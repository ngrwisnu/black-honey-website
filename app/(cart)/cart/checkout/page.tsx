"use client";

import LeftContent from "@/components/ui/cart/left-content";
import OrderSummary from "@/components/ui/cart/order-summary";
import React, { useEffect, useState } from "react";
import address from "@/data/addresses.json";
import payment from "@/data/payments.json";
import {
  ContentWrapper,
  OptionWrapper,
} from "@/components/ui/cart/option-wrapper";
import Image from "next/image";

interface AddressTypes {
  id: number;
  phone: string;
  recipient_name: string;
  full_address: string;
}

interface PaymentTypes {
  id: number;
  type: string;
  name: string;
  account_number: string;
  thumbnail: string;
}

const Payment = () => {
  const [addresses, setAddresses] = useState<AddressTypes[]>([]);
  const [payments, setPayments] = useState<PaymentTypes[]>([]);
  const [selectedAddress, setSelectedAddress] = useState(0);
  const [selectedPayment, setSelectedPayment] = useState(0);

  useEffect(() => {
    setAddresses(address.data);
    setPayments(payment.data);
  }, []);

  const dataSum = [
    {
      name: "Subtotal",
      value: "120.000",
    },
    {
      name: "Shipping fee",
      value: "9.000",
    },
  ];

  return (
    <>
      <div className="flex items-start justify-center flex-1 self-stretch w-full">
        <form
          action=""
          className="flex flex-col items-start w-full sm:max-w-[830px] gap-8 p-4 rounded-lg bg-white shadow-section"
        >
          <OptionWrapper aria-label="Address options">
            <h3 className="text-xl font-semibold">Delivery Address</h3>
            <ContentWrapper
              className="flex-row gap-4 flex-wrap self-stretch"
              aria-label="Content"
            >
              {addresses.map((item) => (
                <div
                  className={`flex w-full sm:w-[390px] p-4 items-start gap-2 rounded-lg  border-[1px] bg-white relative ${
                    selectedAddress === item.id
                      ? "border-green-600"
                      : "border-gray-200"
                  }`}
                  key={item.id}
                >
                  <input
                    type="radio"
                    value={item.id}
                    name="address"
                    className="absolute inset-0 opacity-0"
                    checked={selectedAddress === item.id}
                    onChange={(e) => setSelectedAddress(Number(e.target.value))}
                  />
                  <span
                    className={`w-[18px] h-[18px] rounded-full shrink-0 border-[2px]  ${
                      selectedAddress === item.id
                        ? "border-green-600"
                        : "border-gray-200"
                    } ${
                      selectedAddress === item.id
                        ? "bg-green-100"
                        : "bg-gray-400/10"
                    }`}
                  ></span>
                  <div className="flex flex-col gap-1 flex-1 items-start text-body-primary">
                    <p className="font-medium">{item.recipient_name}</p>
                    <p>
                      {item.phone.substring(0, 7).replace(/\d/g, "x") +
                        item.phone.substring(8)}
                    </p>
                    <p>{item.full_address}</p>
                  </div>
                </div>
              ))}
            </ContentWrapper>
          </OptionWrapper>

          <OptionWrapper aria-label="Payment options">
            <h3 className="text-xl font-semibold">Payment Method</h3>
            <ContentWrapper
              className="flex-row gap-4 flex-wrap self-stretch"
              aria-label="Content"
            >
              {payments.map((item) => (
                <div
                  className={`flex w-full sm:w-[390px] p-4 items-start gap-2 rounded-lg  border-[1px] bg-white relative ${
                    selectedPayment === item.id
                      ? "border-green-600"
                      : "border-gray-200"
                  }`}
                  key={item.id}
                >
                  <input
                    type="radio"
                    value={item.id}
                    name={item.name}
                    className="absolute inset-0 opacity-0"
                    checked={selectedPayment === item.id}
                    onChange={(e) => setSelectedPayment(Number(e.target.value))}
                  />
                  <span
                    className={`w-[18px] h-[18px] rounded-full shrink-0 border-[2px]  ${
                      selectedPayment === item.id
                        ? "border-green-600"
                        : "border-gray-200"
                    } ${
                      selectedPayment === item.id
                        ? "bg-green-100"
                        : "bg-gray-400/10"
                    }`}
                  ></span>
                  <div className="flex flex-col gap-1 flex-1 items-start text-body-primary">
                    <p className="font-medium">{item.name}</p>
                    <div className="w-20 h-9">
                      <Image
                        src={`/images/${item.thumbnail}`}
                        alt="thumbnail"
                        className="object-cover"
                        width={80}
                        height={36}
                      />
                    </div>
                    <p>
                      {item.account_number.substring(0, 7).replace(/\d/g, "x") +
                        item.account_number.substring(8)}
                    </p>
                  </div>
                </div>
              ))}
            </ContentWrapper>
          </OptionWrapper>
        </form>
      </div>
      <OrderSummary data={dataSum} />
    </>
  );
};

export default Payment;
