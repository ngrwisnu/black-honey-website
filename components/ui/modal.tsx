import React, { ReactNode } from "react";

const Modal = ({ children }: { children: ReactNode }) => {
  return (
    <div className="fixed z-10 flex h-full w-full items-center justify-center px-4 before:absolute before:-inset-1 before:block before:bg-gray-900/20 md:px-0">
      <div
        data-aos="fade-up"
        className="relative flex w-full flex-col bg-white md:w-[769px] md:flex-row"
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
