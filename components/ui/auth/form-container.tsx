"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

interface FormContainerProps {
  title: string;
  description: string;
  formContent: React.ReactNode;
  footerText: string;
  loginValid?: {
    isError: boolean;
    message: string;
  };
}

const FormContainer: React.FC<FormContainerProps> = ({
  title,
  description,
  formContent,
  footerText,
  loginValid,
}) => {
  const [page, setPage] = useState("");
  const path = usePathname();

  useEffect(() => {
    const currentPage = path.match(/(?<=\/)\w+/g);

    if (currentPage) {
      setPage(currentPage[0]);
    }
  }, [path]);

  const handleClick = async () => {
    window.open("http://localhost:3000/auth/google", "_self");
  };

  return (
    <div className="flex w-full flex-col items-start gap-6 rounded-md bg-white p-4 shadow-section sm:w-[344px]">
      <div className="header w-full">
        <div className="title flex flex-col items-start gap-1 self-stretch">
          <h3 className="w-full text-center text-2xl font-semibold leading-7 text-body-primary">
            {title}
          </h3>
          <p className="w-full text-center text-base leading-5 text-body-secondary">
            {description}
          </p>
        </div>
      </div>
      {loginValid?.isError && (
        <div className="flex w-full justify-center rounded-lg border border-red-600 bg-red-100 p-4 text-red-600">
          <p>{loginValid.message}</p>
        </div>
      )}
      <div className="form-wrapper w-full">{formContent}</div>
      <div className="divider w-full">
        <div className="flex items-center gap-1 self-stretch">
          <span className="h-[1px] flex-1 bg-gray-border"></span>
          <span className="text text-base text-body-secondary">OR</span>
          <span className="h-[1px] flex-1 bg-gray-border"></span>
        </div>
      </div>
      <div className="alternative-btn w-full">
        <Button variant="outline" className="w-full" onClick={handleClick}>
          {page === "login" ? "Login" : "Register"} with Google
        </Button>
      </div>
      <div className="footer w-full">
        <p className="text-sm leading-4 text-body-secondary">
          {footerText}{" "}
          <Link
            as={page === "login" ? "/register" : "/login"}
            href={page === "login" ? "/register" : "/login"}
            className="font-semibold text-orange-primary"
          >
            {page === "login" ? "Register" : "Login"} here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default FormContainer;
