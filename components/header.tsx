import { merienda } from "@/app/fonts";
import Link from "next/link";
import React from "react";

interface HeaderProps {
  logoCenter: boolean;
}

const Header: React.FC<HeaderProps> = ({ logoCenter }) => {
  return (
    <header
      className={`
      max-h-20 
      py-4 
      flex 
      items-center 
      self-stretch 
      justify-center 
      md:justify-between 
      ${logoCenter ? "" : "border-b-[1px] border-b-[#E4E4E4]"}
      `}
    >
      <div
        className={`
        logo 
        flex 
        flex-1 
        items-center 
        ${logoCenter ? "justify-center" : "justify-start"}
        `}
      >
        <Link
          as="/"
          href="/"
          className={`${merienda.className} text-4xl font-bold leading-[43.2px]`}
        >
          Black<span className="text-orange-primary font-normal">Honey</span>
        </Link>
      </div>
      {!logoCenter && <div className="nav"></div>}
    </header>
  );
};

export default Header;
