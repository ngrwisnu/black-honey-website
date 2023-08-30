import { AddressType } from "@/types/types";
import callAPI from "./call-api";
import { API_ROOT } from "./utils";

export const getAddress = (id: string, token: string) => {
  const url = `${API_ROOT}/profile/addresses/${id}`;

  return callAPI({
    url,
    token,
  });
};

export const getAllAddresses = (token: string) => {
  const url = `${API_ROOT}/profile/addresses`;

  return callAPI({
    url,
    token,
  });
};

export const createAddress = (data: Omit<AddressType, "id">, token: string) => {
  const url = `${API_ROOT}/profile/addresses`;

  return callAPI({
    url,
    token,
    method: "POST",
    data,
  });
};
