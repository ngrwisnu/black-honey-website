"use client";

import { getAddress } from "@/lib/api/address";
import { getAllPayments } from "@/lib/api/payment";
import useCart from "@/store/cart";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { ContentWrapper, OptionWrapper } from "./option-wrapper";
import { AddressType, PaymentType } from "@/types/types";
import Image from "next/image";
import OrderSummary from "./order-summary";
import CheckoutLoading from "@/app/(cart)/cart/checkout/loading";

const CheckoutComp = () => {
  const [selectedAddress, setSelectedAddress] = useState("");
  const [selectedPayment, setSelectedPayment] = useState(0);
  const [payments, setPayments] = useState<PaymentType[]>();
  const [addresses, setAddresses] = useState<AddressType>();

  const items = useCart((state) => state.items);

  const paymentQuery = useQuery({
    queryKey: "payments",
    queryFn: () => getAllPayments(),
    staleTime: 5000,
    suspense: true,
  });
  const addressQuery = useQuery({
    queryKey: "address",
    queryFn: () => getAddress(),
    staleTime: 5000,
    suspense: true,
  });

  useEffect(() => {
    if (paymentQuery.status === "success") {
      setPayments(paymentQuery.data?.data.data);
    }

    if (addressQuery.status === "success") {
      setAddresses(addressQuery.data?.data.data);
    }
  }, [addressQuery, paymentQuery]);

  const checkoutDetail = {
    address_id: selectedAddress,
    payment_id: selectedPayment,
  };

  if (!payments || !addresses) {
    return <CheckoutLoading />;
  }

  return (
    <>
      <div className="flex w-full flex-1 items-start justify-center self-stretch">
        <form className="flex w-full flex-col items-start gap-8 rounded-lg bg-white p-4 shadow-section sm:max-w-[830px]">
          <OptionWrapper aria-label="Address options">
            <h3 className="text-xl font-semibold">Delivery Address</h3>
            <ContentWrapper
              className="flex-row flex-wrap gap-4 self-stretch"
              aria-label="Content"
            >
              <div
                className={`relative flex w-full items-start gap-2 rounded-lg border-[1px]  bg-white p-4 sm:w-[390px] ${
                  selectedAddress === addresses.id
                    ? "border-green-600"
                    : "border-gray-200"
                }`}
              >
                <input
                  type="radio"
                  value={addresses.id}
                  name="address"
                  className="absolute inset-0 opacity-0"
                  checked={selectedAddress === addresses.id}
                  onChange={(e) => setSelectedAddress(e.currentTarget.value)}
                />
                <span
                  className={`h-[18px] w-[18px] shrink-0 rounded-full border-[2px]  ${
                    selectedAddress === addresses.id
                      ? "border-green-600"
                      : "border-gray-200"
                  } ${
                    selectedAddress === addresses.id
                      ? "bg-green-100"
                      : "bg-gray-400/10"
                  }`}
                ></span>
                <div className="flex flex-1 flex-col items-start gap-1 text-body-primary">
                  <p className="font-medium">{addresses.recipient_name}</p>
                  <p>{`${
                    addresses.phone.substring(0, 7).replace(/\d/g, "x")! +
                    addresses.phone.substring(8)
                  }`}</p>
                  <p>{addresses.full_address}</p>
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
              {payments.map((payment: PaymentType) => (
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
        </form>
      </div>
      <OrderSummary data={items} checkoutDetail={checkoutDetail} />
    </>
  );
};

export default CheckoutComp;
