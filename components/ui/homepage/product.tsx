"use client";

import React from "react";
import { Button } from "../button";
import Image from "next/image";
import useModal from "@/store/modal-slice";

const Product = () => {
  const modal = useModal();

  return (
    <section id="products" className="my-40 w-full px-4">
      <div className="mx-auto flex h-max max-w-[1200px] flex-col items-start gap-10 lg:flex-row lg:gap-0">
        <div
          data-aos="fade-up"
          data-aos-delay="500"
          className="order-2 flex w-full items-center justify-center lg:order-1 lg:flex-1 lg:self-stretch"
        >
          <div
            className="flex h-full w-full flex-col justify-center gap-8 md:w-[472px]"
            aria-label="Product's content"
          >
            <h3 className="text-5xl font-medium text-body-primary">
              Black Honey: Try It Today for Its Health Benefits
            </h3>
            <p className="text-lg font-normal text-body-secondary">
              Black honey is perfect for adding to your morning tea or coffee,
              or for using in recipes. This honey is packed with antioxidants,
              vitamins, and minerals that can help boost your immune system and
              improve your overall health.
            </p>
            <div className="flex w-full justify-center sm:justify-start">
              <Button
                variant="main"
                size="xl"
                className="w-40 transition-all hover:-translate-y-1"
                onClick={modal.onOpen}
              >
                Buy Now
              </Button>
            </div>
          </div>
        </div>
        <div
          data-aos="fade-up"
          className="order-1 h-[400px] w-full items-start lg:order-2 lg:h-[800px] lg:flex-1"
        >
          <div className="relative h-full flex-1 overflow-hidden">
            <Image
              src="/images/products.webp"
              fill={true}
              alt="Product"
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Product;
