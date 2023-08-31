import React from "react";
import Logo from "./logo";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="flex h-52 w-full flex-col justify-between bg-[#3f3f3f] text-white sm:h-[160px] sm:flex-row">
      <div className="flex flex-1 items-center justify-center self-stretch">
        <div className="w-1/2">
          <Logo isCenter variant="light" />
        </div>
      </div>
      <div className="flex flex-1 items-center justify-center self-stretch">
        <div className="flex flex-col items-center justify-center gap-4 sm:w-[467px]">
          <ul className="flex items-start gap-4 self-stretch text-lg">
            <li className="hover:text-orange-500">
              <Link href={"#products"}>Products</Link>
            </li>
            <li className="hover:text-orange-500">
              <Link href={"#reviews"}>Reviews</Link>
            </li>
            <li className="hover:text-orange-500">
              <Link href={"#contact"}>Contact</Link>
            </li>
          </ul>
          <div className="flex flex-col items-center gap-2 self-stretch sm:items-start">
            <p className="text-xs">
              &copy; Black Honey 2023. All right reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
