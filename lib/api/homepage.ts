import callAPI from "./call-api";
import { API_ROOT, VERSION } from "./utils";

export const getAllProducts = () => {
  const url = `${API_ROOT}/${VERSION}/products`;

  return callAPI({
    url,
  });
};
