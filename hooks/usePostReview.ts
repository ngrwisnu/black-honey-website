"use client";

import { postReview } from "@/lib/api/dashboard";
import { useMutation, useQueryClient } from "react-query";

interface AddReview {
  data: {
    rating: number;
    message: string;
  };
  token: string;
}

const addReview = ({ data, token }: AddReview) => {
  return postReview(data, token);
};

export const usePostReview = () => {
  const queryClient = useQueryClient();

  return useMutation(addReview, {
    onSuccess: () => {
      queryClient.invalidateQueries("reviews");
    },
  });
};
