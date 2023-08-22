import callAPI from "./call-api";

const API_ROOT = process.env.NEXT_PUBLIC_DEV_ROOT;
const VERSION = process.env.NEXT_PUBLIC_VERSION;

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
