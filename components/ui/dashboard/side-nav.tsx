"use client";

import { AlignJustify } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { clsx as cx } from "clsx";
import { usePathname } from "next/navigation";
import { useGetPathname } from "@/hooks/useGetPathname";

const SideNav = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const pathname = usePathname();
  const path = useGetPathname(pathname);

  const navList = [
    { link: "/dashboard/transactions", name: "Transactions" },
    { link: "/dashboard/review", name: "Review" },
    { link: "/dashboard/setting", name: "Setting" },
  ];

  return (
    <>
      <div
        className="w-full flex sm:hidden p-4 absolute top-20 left-0 z-10"
        aria-label="Hamburger menu"
        onClick={() => setIsOpen(!isOpen)}
      >
        <AlignJustify />
      </div>
      <div
        className={cx(
          isOpen ? "-left-0" : "-left-full",
          "w-4/5 sm:w-full flex flex-col sm:flex-row justify-start sm:justify-center items-center absolute sm:relative top-20 sm:left-0 sm:top-0 sm:mt-20 bottom-0 shadow-xl sm:shadow-none bg-white sm:bg-transparent transition-all duration-300"
        )}
      >
        <nav className="flex flex-col sm:flex-row justify-center sm:justify-normal items-start sm:rounded-full sm:border-[1px] sm:border-gray-100 w-full flex-1 sm:flex-initial sm:h-auto sm:w-[1200px] overflow-hidden">
          {navList.map((item: { link: string; name: string }) => (
            <Link
              href={item.link}
              key={item.name}
              className={cx(
                path === item.name.toLowerCase() ? "bg-gray-200" : "bg-white",
                path === item.name.toLowerCase()
                  ? "sm:shadow-none"
                  : "sm:shadow-section",
                "w-full flex px-8 py-4 justify-center items-center sm:flex-1 text-lg font-normal text-body-primary"
              )}
              onClick={() => setIsOpen(false)}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
};

export default SideNav;
