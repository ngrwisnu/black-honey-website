import { deleteAccount } from "@/lib/api/dashboard";
import { useMutation } from "react-query";

const deleteAccountHandler = (token: string) => {
  return deleteAccount(token);
};

export const useDeleteAccount = () => {
  return useMutation(deleteAccountHandler);
};
