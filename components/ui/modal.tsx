import React, { ReactNode } from "react";

interface ModalProps {
  overlayHandler?: () => void;
  children: ReactNode;
}

const Modal = ({ children, overlayHandler }: ModalProps) => {
  return (
    <div className="fixed z-10 flex h-full w-full items-center justify-center px-4 md:px-0">
      <div
        className="absolute -inset-1 bg-gray-900/20"
        aria-label="modal overlay"
        onClick={overlayHandler}
      ></div>
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
