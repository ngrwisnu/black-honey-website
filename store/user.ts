import { getUserProfile } from "@/lib/utils";
import { create } from "zustand";

interface UserStateType {
  uid: string | undefined;
}

const user = getUserProfile();

const useUser = create<UserStateType>()((set) => ({
  uid: user?.id,
}));

export default useUser;
