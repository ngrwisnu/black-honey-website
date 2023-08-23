import callAPI from "./call-api";

const API_ROOT = process.env.NEXT_PUBLIC_DEV_ROOT;

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXN0b21lciI6eyJpZCI6IjNiMTU1OWJmLWIwYWQtNDFiNi1iYzRlLTc2YjMwNGM3MTM1ZSIsInVzZXJuYW1lIjoiQ3VzdG9tZXIgMSIsImVtYWlsIjoiY3VzdG9tZXIxQGVtYWlsLmNvbSIsInJvbGUiOiJVU0VSIiwiYXZhdGFyIjpudWxsfSwiaWF0IjoxNjkyNTkxNTc0fQ.OfLM2InPoUJm6T3tEu0uAnv2HCRcuwv0tddRZoHfw_Q";

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
