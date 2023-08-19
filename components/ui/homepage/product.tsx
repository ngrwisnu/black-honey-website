"use client";

import React from "react";
import { Button } from "../button";
import Image from "next/image";
import { useModal } from "@/store/modal-slice";

const Product = () => {
  const modal = useModal();

  return (
    <section className="my-40 flex flex-col md:flex-row px-4 items-start w-full gap-10 md:gap-0">
      <div
        data-aos="fade-up"
        data-aos-delay="500"
        className="flex justify-center items-center flex-1 order-2 md:order-1 self-stretch"
      >
        <div
          className="w-full md:w-[472px] h-full flex flex-col justify-center gap-8"
          aria-label="Product's content"
        >
          <h3 className="text-5xl font-medium text-body-primary">
            Black Honey: Try It Today for Its Health Benefits
          </h3>
          <p className="text-lg font-normal text-body-secondary">
            Black honey is perfect for adding to your morning tea or coffee, or
            for using in recipes. This honey is packed with antioxidants,
            vitamins, and minerals that can help boost your immune system and
            improve your overall health.
          </p>
          <Button
            variant="outline"
            size="lg"
            className="w-full md:w-40"
            onClick={modal.onOpen}
          >
            Buy Now
          </Button>
        </div>
      </div>
      <div
        data-aos="fade-up"
        className="flex-1 h-full items-start order-1 md:order-2"
      >
        <div className="flex-1 self-stretch">
          <Image
            src="/images/default-image.webp"
            width={600}
            height={442}
            alt="Product"
          />
        </div>
      </div>
    </section>
  );
};

export default Product;
