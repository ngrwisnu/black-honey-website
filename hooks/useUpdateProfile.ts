import { updateUserProfile } from "@/lib/api/dashboard";
import { useMutation } from "react-query";

const updateProfile = (data: { username?: string; password?: string }) => {
  return updateUserProfile(data);
};

export const useUpdateProfile = () => {
  return useMutation(updateProfile);
};
