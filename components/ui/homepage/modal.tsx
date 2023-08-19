"use client";

import React from "react";
import { Button } from "../button";
import { X } from "lucide-react";
import { Input } from "../input";
import Image from "next/image";
import { useModal } from "@/store/modal-slice";

const Modal = () => {
  const modal = useModal();

  if (!modal.isOpen) {
    return;
  }

  return (
    <div className="fixed z-10 flex h-full w-full items-center justify-center px-4 before:absolute before:-inset-1 before:block before:bg-gray-900/20 md:px-0">
      <div
        data-aos="fade-up"
        className="relative flex w-full flex-col bg-white md:w-[769px] md:flex-row"
      >
        <div className="flex-1" aria-label="Product's preview">
          <div className="relative h-[240px] w-full md:h-full">
            <Image
              src="/images/default-image.webp"
              fill={true}
              alt="Product's preview"
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>
        <div
          className="flex flex-1 flex-col items-start gap-8 p-6 text-body-primary"
          aria-label="Modal's content"
        >
          <div
            className="flex items-center justify-end self-stretch"
            aria-label="Button to close the modal"
          >
            <Button variant="ghost" onClick={modal.onClose}>
              <X size={20} />
            </Button>
          </div>
          <div
            className="flex w-full flex-col items-start gap-4"
            aria-label="Product's detail"
          >
            <div className="w-full border-b border-b-gray-950 pb-4">
              <h4
                className="mb-1 text-lg font-medium"
                aria-label="Product's name"
              >
                Aripicia Black Honey - 750 mL
              </h4>
              <p className="text-2xl font-bold" aria-label="Price">
                Rp70.000
              </p>
            </div>
            <div className="w-full" aria-label="Stock of the product">
              <p className="text-sm">Stock: &gt; 10</p>
            </div>
            <div
              className="flex w-full flex-col items-start gap-1"
              aria-label="Product's size"
            >
              <p>Size</p>
              <div className="flex flex-wrap items-start gap-4">
                <div className="relative flex items-center justify-center rounded-full border border-gray-950 px-3 py-[6px]">
                  <Input
                    type="radio"
                    id="750"
                    name="size"
                    value={750}
                    className="absolute opacity-0"
                  />
                  <label htmlFor="750" className="font-medium">
                    750 mL
                  </label>
                </div>
                <div className="relative flex items-center justify-center rounded-full border border-gray-950 px-3 py-[6px]">
                  <Input
                    type="radio"
                    id="1000"
                    name="size"
                    value={1000}
                    className="absolute opacity-0"
                  />
                  <label htmlFor="1000">1000 mL</label>
                </div>
              </div>
            </div>
            <div
              className="flex w-full flex-col items-start gap-1"
              aria-label="Purchase quantity"
            >
              <p>Quantity</p>
              <Input
                type="number"
                name="quantity"
                defaultValue={1}
                className="w-full rounded-full border-gray-950 md:w-1/3"
              />
            </div>
          </div>
          <Button
            className="self-stretch rounded-full"
            aria-label="Button add to cart"
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
