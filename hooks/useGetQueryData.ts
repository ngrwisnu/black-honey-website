"use client";

import { useQuery } from "react-query";

const useGetQueryData = (
  name: string,
  fn: () => Promise<{ isError: boolean; data: any } | undefined>,
) => {
  const result = useQuery(name, fn, { suspense: true });

  return result.data;
};

export default useGetQueryData;
