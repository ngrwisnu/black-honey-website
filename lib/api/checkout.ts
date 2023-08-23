import callAPI from "./call-api";

const API_ROOT = process.env.NEXT_PUBLIC_DEV_ROOT;

export const createOrder = (data: FormData) => {
  const url = `${API_ROOT}/checkout`;

  return callAPI({
    url,
    data,
    method: "POST",
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXN0b21lciI6eyJpZCI6IjNiMTU1OWJmLWIwYWQtNDFiNi1iYzRlLTc2YjMwNGM3MTM1ZSIsInVzZXJuYW1lIjoiQ3VzdG9tZXIgMSIsImVtYWlsIjoiY3VzdG9tZXIxQGVtYWlsLmNvbSIsInJvbGUiOiJVU0VSIiwiYXZhdGFyIjpudWxsfSwiaWF0IjoxNjkyNzUwOTQ3fQ.CtLkrX8Sd2pn0zHrz7-SJVQ9Q7ni80ymDc3vNeyDpVs",
  });
};
