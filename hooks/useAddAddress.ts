"use client";

import { createAddress } from "@/lib/api/address";
import { AddressType } from "@/types/types";
import { useMutation } from "react-query";

const addAddress = (data: Omit<AddressType, "id">) => {
  return createAddress(data);
};

export const useAddAddress = () => {
  return useMutation(addAddress);
};
