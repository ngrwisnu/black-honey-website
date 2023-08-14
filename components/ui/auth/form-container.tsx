"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Facebook } from "lucide-react";

interface FormContainerProps {
  title: string;
  description: string;
  formContent: React.ReactNode;
  footerText: string;
}

const FormContainer: React.FC<FormContainerProps> = ({
  title,
  description,
  formContent,
  footerText,
}) => {
  const [page, setPage] = useState("");
  const path = usePathname();

  useEffect(() => {
    const currentPage = path.match(/(?<=\/)\w+/g);

    if (currentPage) {
      setPage(currentPage[0]);
    }
  }, [path]);

  const handleClick = () => {
    console.log("Fb btn is clicked!");
  };

  return (
    <div
      className="
        flex
        sm:w-[344px]
        w-full
        p-4
        flex-col
        items-start
        gap-6
        rounded-md
        bg-white
        shadow-section
        "
    >
      <div className="header w-full">
        <div
          className="
        title
        flex
        flex-col
        items-start
        gap-1
        self-stretch
        "
        >
          <h3 className="w-full text-center text-2xl font-semibold leading-7 text-body-primary">
            {title}
          </h3>
          <p className="w-full text-base text-body-secondary leading-5 text-center">
            {description}
          </p>
        </div>
      </div>
      <div className="form-wrapper w-full">{formContent}</div>
      <div className="divider w-full">
        <div
          className="
          flex
          items-center
          gap-1
          self-stretch
          "
        >
          <span className="h-[1px] flex-1 bg-gray-border"></span>
          <span className="text text-base text-body-secondary">OR</span>
          <span className="h-[1px] flex-1 bg-gray-border"></span>
        </div>
      </div>
      <div className="alternative-btn w-full">
        <Button variant="facebook" className="w-full" onClick={handleClick}>
          <Facebook fill="white" size="18" strokeWidth={0} />
          {page === "login" ? "Login" : "Register"} with Facebook
        </Button>
      </div>
      <div className="footer w-full">
        <p className="text-sm text-body-secondary leading-4">
          {footerText}{" "}
          <Link
            as={page === "login" ? "/register" : "/login"}
            href={page === "login" ? "/register" : "/login"}
            className="text-orange-primary font-semibold"
          >
            {page === "login" ? "Register" : "Login"} here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default FormContainer;
