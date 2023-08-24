"use client";

import { postReview } from "@/lib/api/dashboard";
import { useMutation, useQueryClient } from "react-query";

const addReview = (data: { rating: number; message: string }) => {
  return postReview(data);
};

export const usePostReview = () => {
  const queryClient = useQueryClient();

  return useMutation(addReview, {
    onSuccess: () => {
      queryClient.invalidateQueries("reviews");
    },
  });
};
