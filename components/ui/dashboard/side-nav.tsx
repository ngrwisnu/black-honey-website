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
        className="absolute left-0 top-20 z-10 flex w-full p-4 sm:hidden"
        aria-label="hamburger-menu"
        onClick={() => setIsOpen(!isOpen)}
      >
        <AlignJustify />
      </div>
      <div
        className={cx(
          isOpen ? "-left-0" : "-left-full",
          "absolute bottom-0 top-20 flex w-4/5 flex-col items-center justify-start bg-white shadow-xl transition-all duration-300 sm:relative sm:left-0 sm:top-0 sm:mt-20 sm:w-full sm:flex-row sm:justify-center sm:bg-transparent sm:shadow-none",
        )}
        aria-label="nav-wrapper"
      >
        <nav className="flex w-full flex-1 flex-col items-start justify-center overflow-hidden sm:h-auto sm:w-[1200px] sm:flex-initial sm:flex-row sm:justify-normal sm:rounded-full sm:border-[1px] sm:border-gray-100">
          {navList.map((item: { link: string; name: string }) => (
            <Link
              href={item.link}
              key={item.name}
              className={cx(
                path === item.name.toLowerCase() ? "bg-gray-200" : "bg-white",
                path === item.name.toLowerCase()
                  ? "sm:shadow-none"
                  : "sm:shadow-section",
                "flex w-full items-center justify-center px-8 py-4 text-lg font-normal text-body-primary sm:flex-1",
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
