import { AddressType } from "@/types/types";
import React from "react";

const AddressList = ({ item }: { item: AddressType }) => {
  return (
    <div
      className={`relative flex w-full items-start gap-2 rounded-lg border-[1px]  border-gray-200 bg-white p-4 sm:w-[390px]`}
    >
      <input
        type="radio"
        value={item.id}
        name="address"
        className="absolute inset-0 opacity-0"
      />
      <span
        className={`h-[18px] w-[18px] shrink-0 rounded-full border-[2px] border-gray-200 bg-gray-400/10`}
      ></span>
      <div className="flex flex-1 flex-col items-start gap-1 text-body-primary">
        <p className="font-medium">{item.recipient_name}</p>
        <p>{`${
          item.phone.substring(0, 7).replace(/\d/g, "x")! +
          item.phone.substring(8)
        }`}</p>
        <p>{item.full_address}</p>
      </div>
    </div>
  );
};

export default AddressList;
