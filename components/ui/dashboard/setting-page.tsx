"use client";

import React from "react";
import { FetchResponse } from "@/types/types";
// import DeleteAccount from "./delete-account";
import UserProfile from "./user-profile";

const SettingPage = ({
  addresses,
}: {
  addresses: FetchResponse | undefined;
}) => {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-14">
      <UserProfile addresses={addresses} />
      {/* <DeleteAccount /> */}
    </div>
  );
};

export default SettingPage;
