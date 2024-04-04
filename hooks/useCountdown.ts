import { countdown } from "@/components/ui/cart/utils";
import { useEffect, useState } from "react";

const useCountdown = (expiredDateTime: number) => {
  const [timeGap, setTimeGap] = useState(
    expiredDateTime - new Date().getTime(),
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeGap(expiredDateTime - new Date().getTime());
    }, 1000);

    if (expiredDateTime - new Date().getTime() === 0) {
      return () => clearInterval(interval);
    }
  }, [expiredDateTime]);

  return countdown(timeGap);
};

export { useCountdown };
