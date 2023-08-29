import Cookies from "js-cookie";

export const useToken = () => {
  const tk = Cookies.get("tk");

  if (tk) {
    const beautyTk = window.atob(tk);
    return beautyTk;
  } else {
    return "";
  }
};
