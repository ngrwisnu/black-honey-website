"use client";

import { createAddress } from "@/lib/api/address";
import { AddressType } from "@/types/types";
import { useMutation } from "react-query";

const addAddress = ({
  data,
  token,
}: {
  data: Omit<AddressType, "id">;
  token: string;
}) => {
  return createAddress(data, token);
};

export const useAddAddress = () => {
  return useMutation(addAddress);
};
