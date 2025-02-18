"use client";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";

export const useToken = () => {
  const [token, setToken] = useState<string>("");
  const [csrf, setCSRF] = useState<string>("");
  const [expired, setExpired] = useState<boolean>(false);

  useEffect(() => {
    const tk = Cookies.get("tk");

    if (tk) {
      const beautyTk = window.atob(tk);
      const decoded = jwtDecode(beautyTk);

      const expiration = decoded.exp! < Date.now() / 1000;

      setToken(beautyTk);
      setExpired(expiration);
    }
  }, []);

  useEffect(() => {
    const csrfToken = Cookies.get("_tk_csrf");

    if (csrfToken) {
      setCSRF(csrfToken);
    }
  }, []);

  return { token, csrf, expired };
};
