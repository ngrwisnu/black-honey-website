"use client";

import { loginWithOauth } from "@/lib/api/auth";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect } from "react";
import Cookies from "js-cookie";
import Swal from "sweetalert2";

const Page = () => {
  const { get } = useSearchParams();
  const { push } = useRouter();

  const search = get("rid");

  const checkUserFromOauth = useCallback(async () => {
    const result = await loginWithOauth();

    if (!result?.isError) {
      const uglyTk = window.btoa(result?.data.data.token);
      Cookies.set("tk", uglyTk, { expires: 5 });
    }
  }, []);

  useEffect(() => {
    if (search === "" || search === null || search.length !== 218) {
      push("/login");
    } else {
      checkUserFromOauth();

      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Welcome! We're redirecting you to the homepage now.",
        timer: 2000,
        showConfirmButton: false,
      }).then(() => {
        push("/");
      });
    }
  }, [search, checkUserFromOauth]);

  return <></>;
};

export default Page;
