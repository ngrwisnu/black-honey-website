import { getUserProfile } from "@/lib/utils";
import { UserProfile } from "@/types/types";
import { useEffect, useState } from "react";

export const useUserProfile = () => {
  const [user, setUser] = useState<UserProfile | undefined>();

  useEffect(() => {
    const response = getUserProfile();

    setUser(response);
  }, []);

  return user;
};
