"use client";
import React, { useEffect } from "react";
import { toast } from "./use-toast";
import { useRouter } from "next/navigation";
import { removeAccessToken } from "@/lib/utils";

const ExpiredSession = () => {
  const { push } = useRouter();

  useEffect(() => {
    removeAccessToken();

    toast({
      variant: "destructive",
      title: "Your session is expired",
    });

    setTimeout(() => {
      push("/login");
    }, 1500);
  }, []);

  return <div></div>;
};

export default ExpiredSession;
