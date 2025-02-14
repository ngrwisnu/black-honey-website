"use client";

import { loginWithOauth } from "@/lib/api/auth";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import Cookies from "js-cookie";
import Swal from "sweetalert2";

const Page = () => {
  const { get } = useSearchParams();
  const { push } = useRouter();

  const search = get("rid");

  useEffect(() => {
    Swal.fire({
      icon: "success",
      title: "Success",
      text: "Checking your account ...",
      timer: 2000,
      showConfirmButton: false,
    })
      .then(() => {
        async function validateUser() {
          const result = await loginWithOauth(search);

          if (!result?.isError) {
            const uglyTk = window.btoa(result?.data.data.token.access);
            Cookies.set("tk", uglyTk, {
              expires: Date.now() + 6 * 60 * 60 * 1000,
            });
          }
        }

        validateUser();
      })
      .then(() => {
        push("/");
      });
  }, [push, search]);

  return <></>;
};

export default Page;
