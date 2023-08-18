"use client";

import { merienda } from "@/app/fonts";
import { X } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

interface HeaderProps {
  logoCenter?: boolean;
}

const Header: React.FC<HeaderProps> = ({ logoCenter }) => {
  const [isClicked, setIsClicked] = useState(false);

  const clickHandler = () => {
    setIsClicked(!isClicked);
  };

  return (
    <header
      className={`w-full max-h-20 py-4 flex px-4 items-center self-stretch justify-center md:justify-between ${
        logoCenter ? "" : "border-b-[1px] border-b-[#F2DC99]"
      }`}
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
      {!logoCenter && (
        <div className="nav flex items-center gap-10">
          <div
            className="
            cart
            fixed
            sm:relative
            bottom-8
            sm:bottom-0
            right-4
            sm:right-0
            shadow-section
            sm:shadow-none
            flex
            justify-center
            items-center
            p-3
            gap-[10px]
            rounded-full
            bg-gray-100
            hover:cursor-pointer
          "
          >
            <div className="cart-logo w-6 h-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <mask
                  id="mask0_475_6524"
                  style={{ maskType: "alpha" }}
                  maskUnits="userSpaceOnUse"
                  x="0"
                  y="0"
                  width="24"
                  height="24"
                >
                  <rect width="24" height="24" fill="#D9D9D9" />
                </mask>
                <g mask="url(#mask0_475_6524)">
                  <path
                    d="M6 22C5.45 22 4.97917 21.8042 4.5875 21.4125C4.19583 21.0208 4 20.55 4 20V8C4 7.45 4.19583 6.97917 4.5875 6.5875C4.97917 6.19583 5.45 6 6 6H8C8 4.9 8.39167 3.95833 9.175 3.175C9.95833 2.39167 10.9 2 12 2C13.1 2 14.0417 2.39167 14.825 3.175C15.6083 3.95833 16 4.9 16 6H18C18.55 6 19.0208 6.19583 19.4125 6.5875C19.8042 6.97917 20 7.45 20 8V20C20 20.55 19.8042 21.0208 19.4125 21.4125C19.0208 21.8042 18.55 22 18 22H6ZM6 20H18V8H16V10C16 10.2833 15.9042 10.5208 15.7125 10.7125C15.5208 10.9042 15.2833 11 15 11C14.7167 11 14.4792 10.9042 14.2875 10.7125C14.0958 10.5208 14 10.2833 14 10V8H10V10C10 10.2833 9.90417 10.5208 9.7125 10.7125C9.52083 10.9042 9.28333 11 9 11C8.71667 11 8.47917 10.9042 8.2875 10.7125C8.09583 10.5208 8 10.2833 8 10V8H6V20ZM10 6H14C14 5.45 13.8042 4.97917 13.4125 4.5875C13.0208 4.19583 12.55 4 12 4C11.45 4 10.9792 4.19583 10.5875 4.5875C10.1958 4.97917 10 5.45 10 6Z"
                    fill="#1C1B1F"
                  />
                </g>
              </svg>
            </div>
            <span className="w-[14px] h-[14px] absolute left-[17px] bottom-[-7px] rounded-full bg-orange-primary"></span>
          </div>
          <div
            id="user-avatar"
            className="
            sm:relative
            flex
            w-12
            h-12
            rounded-full
            bg-[url('/images/placeholder.webp')]
            bg-cover
            bg-no-repeat
            hover:cursor-pointer
            "
            onClick={clickHandler}
          >
            {isClicked && (
              <div
                className={`
                dropdown
                fixed
                sm:absolute
                bottom-0
                sm:-bottom-[171px]
                right-0
                left-0
                sm:left-auto
                flex
                flex-col
                items-start
                min-w-[180px]
                py-2
                gap-[10px]
                rounded-md
                bg-white
                shadow-section
                z-10
              `}
              >
                <ul className="w-full flex flex-col gap-[10px] order-2">
                  <li>
                    <Link
                      href={"/dashboard/setting"}
                      className="flex py-2 px-4 justify-center sm:justify-start items-center gap-2 self-stretch text-gray-800 hover:bg-gray-100"
                    >
                      <span className="w-6 h-6 bg-[url(/images/person.svg)] bg-no-repeat"></span>
                      <span>Profile</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={"/dashboard/transactions"}
                      className="flex py-2 px-4 justify-center sm:justify-start items-center gap-2 self-stretch text-gray-800 hover:bg-gray-100"
                    >
                      <span className="w-6 h-6 bg-[url(/images/contract.svg)] bg-no-repeat"></span>
                      <span>History</span>
                    </Link>
                  </li>
                  <li
                    className="h-[1px] w-full bg-gray-200"
                    aria-label="divider"
                  ></li>
                  <li>
                    <Link
                      href={"/login"}
                      className="flex py-2 px-4 justify-center sm:justify-start items-center gap-2 self-stretch text-red-500 hover:bg-gray-100"
                    >
                      <span className="w-6 h-6 bg-[url(/images/logout.svg)] bg-no-repeat"></span>
                      <span>Logout</span>
                    </Link>
                  </li>
                </ul>
                <button
                  className="w-full flex sm:hidden justify-end order-1 py-2 px-4"
                  onClick={() => setIsClicked(false)}
                >
                  <X size={18} />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
