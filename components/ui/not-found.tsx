import Image from "next/image";
import Link from "next/link";
import React from "react";

const NotFound = () => {
  return (
    <div className="flex w-full flex-col items-center justify-center py-20">
      <div className="h-auto w-1/3">
        <Image src="/images/not-found.png" width={1200} height={960} alt="" />
      </div>
    </div>
  );
};

export default NotFound;
