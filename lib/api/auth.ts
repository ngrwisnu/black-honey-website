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

export const loginWithOauth = (query: string | null) => {
  const url = `${API_ROOT}/google/success?rid=${query}`;

  return callAPI({
    url,
    withCredentials: true,
  });
};

export const oauthLogout = () => {
  const url = `${API_ROOT}/logout`;

  return callAPI({
    url,
    withCredentials: true,
  });
};

export const sessionLogout = (token: string) => {
  const url = `${API_ROOT}/logout`;

  return callAPI({
    url,
    method: "PUT",
    token,
    withCredentials: true,
  });
};
