import { API_ROOT } from "./utils";
import callAPI from "./call-api";
import { RegisterField } from "@/types/types";

export const login = (data: { email: string; password: string }) => {
  const url = `${API_ROOT}/login`;

  return callAPI({
    url,
    method: "POST",
    data,
  });
};

export const register = (data: RegisterField) => {
  const url = `${API_ROOT}/signup`;

  return callAPI({
    url,
    method: "POST",
    data,
  });
};
