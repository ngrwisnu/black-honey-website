import FormContainer from "@/components/ui/auth/form-container";
import { Button } from "@/components/ui/button";
import { Facebook } from "lucide-react";
import Link from "next/link";
import React from "react";

const Register = () => {
  const header = (
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
        Create an Account
      </h3>
      <p className="w-full text-base text-body-secondary leading-5 text-center">
        Welcome to the Black Honey Website
      </p>
    </div>
  );

  const divider = (
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
  );

  const altButton = (
    <Button variant="facebook" className="w-full">
      <Facebook fill="white" size="18" strokeWidth={0} />
      Register with Facebook
    </Button>
  );

  const footer = (
    <p className="text-sm text-body-secondary leading-4">
      Already have an account?{" "}
      <Link
        as="/login"
        href="/login"
        className="text-orange-primary font-semibold"
      >
        Login here
      </Link>
    </p>
  );

  return (
    <>
      <FormContainer
        header={header}
        divider={divider}
        altButton={altButton}
        footer={footer}
      />
    </>
  );
};

export default Register;
