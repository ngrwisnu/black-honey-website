import { updateUserProfile } from "@/lib/api/dashboard";
import { useMutation } from "react-query";

interface UpdateProfile {
  data: {
    username?: string;
    password?: string;
  };
  token: string;
}

const updateProfile = ({ data, token }: UpdateProfile) => {
  return updateUserProfile(data, token);
};

export const useUpdateProfile = () => {
  return useMutation(updateProfile);
};
