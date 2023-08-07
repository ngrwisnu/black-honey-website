import { AlignJustify } from "lucide-react";
import Link from "next/link";
import React from "react";

const SideNav = () => {
  const navList = [
    { link: "/dashboard", name: "Transactions" },
    { link: "/dashboard/review", name: "Review" },
    { link: "/dashboard/setting", name: "Setting" },
  ];

  return (
    <div className="w-4/5 sm:w-full flex flex-col sm:flex-row justify-start sm:justify-center  items-center absolute sm:relative left-0 top-20 bottom-0 shadow-xl sm:shadow-none bg-white sm:bg-none">
      <div className="w-full flex sm:hidden p-4" aria-label="Close sidebar">
        <AlignJustify />
      </div>
      <nav className="flex flex-col sm:flex-row justify-center sm:justify-normal items-start sm:rounded-full sm:border-[1px] sm:border-white sm:shadow-section w-full flex-1 sm:flex-initial sm:h-auto sm:w-[1200px]">
        {navList.map((item: { link: string; name: string }) => (
          <Link
            href={item.link}
            key={item.name}
            className="w-full flex px-8 py-4 justify-center items-center sm:flex-1 text-lg font-normal text-body-primary"
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default SideNav;
