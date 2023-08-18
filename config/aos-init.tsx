"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const AOSInit = () => {
  useEffect(() => {
    AOS.init({
      offset: 150,
      duration: 450,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  return null;
};

export default AOSInit;
