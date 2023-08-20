import callAPI from "./call-api";

const API_ROOT = process.env.NEXT_PUBLIC_DEV_ROOT;
const VERSION = process.env.NEXT_PUBLIC_VERSION;

export const getAllProducts = () => {
  const url = `${API_ROOT}/${VERSION}/products`;

  return callAPI({
    url,
  });
};
