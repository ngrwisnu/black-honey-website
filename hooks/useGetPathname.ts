import { useEffect, useState } from "react";

export const useGetPathname = (url: string) => {
  const [pathname, setPathname] = useState<String[]>([]);

  useEffect(() => {
    const newArr = url.split("/");
    setPathname(newArr);
  }, [url]);

  return pathname[pathname.length - 1];
};
