"use client";

import { useEffect, useState } from "react";

export const useUserProfile = (username: string) => {
  const [userInitial, setUserInitial] = useState<string | undefined>();

  useEffect(() => {
    if (username) {
      const initial = username.match(/\b\w/g);

      if (initial && initial?.length > 1) {
        setUserInitial(`${initial[0]}${initial[1]}`);
      } else if (initial?.length === 1) {
        setUserInitial(`${initial[0]}`);
      } else {
        setUserInitial(undefined);
      }
    }
  }, []);

  return userInitial;
};
