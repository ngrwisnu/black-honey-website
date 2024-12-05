"use client";

import { useEffect, useState } from "react";
import { ContentWrapper, OptionWrapper } from "./option-wrapper";
import { AddressType, FetchResponse } from "@/types/types";
import useCart, { CartItems } from "@/store/cart";
import OrderSummary from "./order-summary";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import CartLoading from "@/app/(cart)/cart/[subPage]/loading";
import { findUserCart } from "@/lib/utils";
import { useUserProfile } from "@/hooks/useUserProfile";
import Link from "next/link";

interface CheckoutCompProps {
  addresses: FetchResponse | undefined;
}

const CheckoutComp = ({ addresses }: CheckoutCompProps) => {
  const [selectedAddress, setSelectedAddress] = useState("");
  const [existAddresses, setExistAddresses] = useState<AddressType[]>();
  const [userItems, setUserItems] = useState<CartItems[] | []>([]);

  const router = useRouter();

  const items = useCart((state) => state.items);
  const userProfile = useUserProfile();

  useEffect(() => {
    if (addresses) {
      if (!addresses.isError) {
        setExistAddresses(addresses.data.data);
      }
    }
  }, [addresses]);

  useEffect(() => {
    const userCart = findUserCart(items, userProfile?.id);

    setUserItems(userCart);
  }, [items, userProfile]);

  const checkoutDetail = {
    address_id: selectedAddress,
  };

  if (!addresses) {
    return <CartLoading />;
  }

  if (userItems.length === 0) {
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
    <div className="flex w-full max-w-[1440px] flex-col gap-4 md:flex-row">
      <div className="flex w-full flex-1 items-start justify-center self-stretch">
        <form className="flex w-full flex-col items-start gap-8 rounded-lg bg-white p-4 shadow-section sm:max-w-[830px]">
          <OptionWrapper aria-label="Address options">
            <h3 className="text-xl font-semibold">Delivery Address</h3>
            <ContentWrapper
              className="flex-row flex-wrap gap-4 self-stretch"
              aria-label="Content"
            >
              {existAddresses?.length === 0 && (
                <div
                  className="relative flex w-full items-center justify-center gap-2 rounded-lg border-[1px]  bg-white p-4 hover:cursor-pointer hover:bg-gray-200 sm:w-2/5"
                  onClick={() => router.push("/dashboard/setting")}
                  aria-label="add-address-button"
                >
                  <span className="flex items-center gap-1">
                    <Plus size={20} /> Add Address
                  </span>
                </div>
              )}
              {existAddresses?.map((address) => (
                <div
                  className={`relative flex w-full items-start gap-2 rounded-lg border-[1px]  bg-white p-4 sm:w-2/5 ${
                    selectedAddress === address.id
                      ? "border-green-600"
                      : "border-gray-200"
                  }`}
                  key={address.id}
                  aria-label="address-item"
                  data-testid={address.id}
                >
                  <input
                    type="radio"
                    value={address.id}
                    name="address"
                    className="absolute inset-0 opacity-0"
                    checked={selectedAddress === address.id}
                    onChange={(e) => setSelectedAddress(e.currentTarget.value)}
                  />
                  <span
                    className={`h-[18px] w-[18px] shrink-0 rounded-full border-[2px]  ${
                      selectedAddress === address.id
                        ? "border-green-600"
                        : "border-gray-200"
                    } ${
                      selectedAddress === address.id
                        ? "bg-green-100"
                        : "bg-gray-400/10"
                    }`}
                  ></span>
                  <div className="flex flex-1 flex-col items-start gap-1 text-body-primary">
                    <p className="font-medium">{address.recipient_name}</p>
                    <p>{`${
                      address.phone.substring(0, 7).replace(/\d/g, "x")! +
                      address.phone.substring(8)
                    }`}</p>
                    <p>{address.full_address}</p>
                  </div>
                </div>
              ))}
            </ContentWrapper>
          </OptionWrapper>
        </form>
      </div>
      <OrderSummary data={userItems} checkoutDetail={checkoutDetail} />
    </div>
  );
};

export default CheckoutComp;
