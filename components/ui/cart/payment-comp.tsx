"use client";

import { getPayment } from "@/lib/api/payment";
import useCheckout from "@/store/checkout";
import { ChangeEvent, FormEvent, useState } from "react";
import { useQuery } from "react-query";
import { toast } from "../use-toast";
import { SummaryItem, SummaryList, SummaryTitle } from "./summary-item";
import { currencyFormatter, subTotalCalculation } from "@/lib/utils";
import { Input } from "../input";
import { Button } from "../button";
import { Check } from "lucide-react";
import Swal from "sweetalert2";

const PaymentComp = () => {
  const [image, setImage] = useState<File>();

  const checkoutItem = useCheckout((state) => state.items);

  const payment = useQuery({
    queryKey: "payments",
    queryFn: () => getPayment(checkoutItem[0].payment_id!),
    staleTime: 3000,
    suspense: true,
  });

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const inputFile = e.target.files?.[0];

    if (inputFile) {
      setImage(inputFile);
    }
  };

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();

    if (!image) {
      toast({
        title: "Please insert the payment proof!",
        variant: "destructive",
      });
    }

    let checkoutData = [];

    for (let item of checkoutItem) {
      let requiredField = new FormData();
      requiredField.append("address_id", `${item.address_id}`);
      requiredField.append("payment_id", `${item.payment_id}`);
      requiredField.append("qty", `${item.qty}`);
      requiredField.append("image", image!);

      checkoutData.push(requiredField);
    }

    Swal.fire({
      icon: "success",
      title: "Payment complete",
      text: "Your order will be process",
      footer:
        '<a href="/dashboard/transactions" class="underline text-blue-600">See purchase history</a>',
    });

    console.log(checkoutData);
  };

  return (
    <>
      <div className="mx-auto">
        <section
          className="flex w-full flex-col items-start gap-3 rounded-lg bg-white p-4 shadow-section md:w-[506px]"
          aria-label="details"
        >
          <SummaryItem>
            <SummaryTitle>Purchase Detail</SummaryTitle>
            {checkoutItem.map((item: any) => (
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
              <span>freeshipping</span>
            </SummaryList>
            <SummaryList>
              <span>Shipping</span>
              <span>Rp0</span>
            </SummaryList>
            <SummaryList classname="font-semibold">
              <span>Total</span>
              <span>{subTotalCalculation(checkoutItem)}</span>
            </SummaryList>
          </SummaryItem>
          <span className="h-[1px] w-full bg-gray-200"></span>
          <SummaryItem>
            <SummaryTitle>Payment Info</SummaryTitle>
            <SummaryList>
              <span>Payment method</span>
              <span>
                {payment.data?.data.data.payment_name} -{" "}
                {payment.data?.data.data.account_number}
              </span>
            </SummaryList>
            <SummaryList>
              <span>Recipient name</span>
              <span>{payment.data?.data.data.recipient_name}</span>
            </SummaryList>
          </SummaryItem>
        </section>
        <form
          className="flex w-full flex-col items-start gap-6 p-4 md:w-[491px]"
          aria-label="Input transfer proof"
          onSubmit={submitHandler}
        >
          <div
            className="flex flex-col items-center gap-2 self-stretch text-center text-sm leading-[16.8px] text-orange-primary"
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
              className="text-xs leading-[14.4px] text-body-primary"
            >
              Payment proof
            </label>
            <Input
              id="payment-proof"
              name="payment-proof"
              type="file"
              onChange={changeHandler}
            />
          </div>
          <Button variant="success" className="w-full" type="submit">
            <Check size={18} aria-label="icon check" />
            <span className="ml-1" aria-label="button name">
              Payment Complete
            </span>
          </Button>
        </form>
      </div>
    </>
  );
};

export default PaymentComp;