import callAPI from "./call-api";
import { API_ROOT } from "./utils";

export const getTransactionsHistory = async (token: string) => {
  const url = `${API_ROOT}/transactions`;

  return callAPI({
    url,
    token,
  });
};

export const postReview = async (
  data: { rating: number; message: string },
  token: string,
) => {
  const url = `${API_ROOT}/review`;

  return callAPI({
    url,
    method: "POST",
    token,
    data,
  });
};

export const getAllReviews = async (token: string) => {
  const url = `${API_ROOT}/reviews`;

  return callAPI({
    url,
    token,
  });
};

export const updateUserProfile = async (
  data: {
    username?: string;
    password?: string;
  },
  token: string,
) => {
  const url = `${API_ROOT}/dashboard/profile`;

  return callAPI({
    url,
    method: "PUT",
    token,
    data,
  });
};
