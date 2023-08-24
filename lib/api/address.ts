import callAPI from "./call-api";
import { API_ROOT, token } from "./utils";

export const getAddress = () => {
  const url = `${API_ROOT}/profile/addresses/4421cace-28db-488c-932c-71957e3a39f4`;

  return callAPI({
    url,
    token,
  });
};

export const getAllAddresses = () => {
  const url = `${API_ROOT}/profile/addresses`;

  return callAPI({
    url,
    token,
  });
};
