import React from "react";
import Link from "next/link";
import { merienda } from "@/app/fonts";

const Logo = ({
  isCenter,
  variant,
}: {
  isCenter?: boolean;
  variant?: "dark" | "light";
}) => {
  return (
    <div
      data-testid="logo"
      className={`logo flex flex-1 items-center ${
        isCenter ? "justify-center" : "justify-start"
      }`}
    >
      <Link
        as="/"
        href="/"
        className={`${merienda.className} text-4xl font-bold leading-[43.2px] ${
          variant === "light" ? "text-white" : "text-body-primary"
        }`}
      >
        Black<span className="font-normal text-orange-primary">Honey</span>
      </Link>
    </div>
  );
};

export default Logo;
