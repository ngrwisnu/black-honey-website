"use client";

import Link from "next/link";
import React from "react";
import { clsx as cx } from "clsx";
import { usePathname } from "next/navigation";
import { useGetPathname } from "@/hooks/useGetPathname";

const SideNav = () => {
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
        className="relative bottom-0 left-0 top-0 z-50 mt-20 flex w-full flex-row items-center justify-center bg-transparent bg-white px-4 shadow-none transition-all duration-300 max-sm:hidden"
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
