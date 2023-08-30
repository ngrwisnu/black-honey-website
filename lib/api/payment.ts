import callAPI from "./call-api";
import { API_ROOT, VERSION } from "./utils";

export const getAllPayments = () => {
  const url = `${API_ROOT}/${VERSION}/payments`;

  return callAPI({
    url,
  });
};

export const getPayment = (id: number) => {
  const url = `${API_ROOT}/${VERSION}/payments/${id}`;

  return callAPI({
    url,
  });
};
