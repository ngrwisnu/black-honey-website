"use client";

import { login, register } from "@/lib/api/auth";
import { RegisterField } from "@/types/types";
import { useMutation } from "react-query";

const setRegister = (data: RegisterField) => {
  return register(data);
};

const setLogin = (data: { email: string; password: string }) => {
  return login(data);
};

export const useLogin = () => {
  return useMutation(setLogin);
};

export const useRegister = () => {
  return useMutation(setRegister);
};
