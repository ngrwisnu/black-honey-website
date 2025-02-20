"use client";

import { login, register, sessionLogin } from "@/lib/api/auth";
import { RegisterField } from "@/types/types";
import { useMutation } from "react-query";

const setRegister = (data: RegisterField) => {
  return register(data);
};

const setLogin = (data: { email: string; password: string }) => {
  return login(data);
};

const setSessionLogin = (csrfToken: string) => {
  return sessionLogin(csrfToken);
};

export const useLogin = () => {
  return useMutation(setLogin);
};

export const useSessionLogin = () => {
  return useMutation(setSessionLogin);
};

export const useRegister = () => {
  return useMutation(setRegister);
};
