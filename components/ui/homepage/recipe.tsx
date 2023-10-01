"use client";

import Image from "next/image";
import React from "react";
import { Button } from "../button";
import useModal from "@/store/modal-slice";

const Recipe = () => {
  const modal = useModal();

  return (
    <section
      id="recipe"
      className="my-40 flex min-h-[800px] w-full items-center justify-center px-4"
    >
      <div className="relative flex h-[640px] w-full max-w-300 items-center justify-center">
        <div
          data-aos="fade-up"
          className="relative z-10 flex flex-col items-center gap-8"
        >
          <h3 className="text-center text-5xl font-normal">
            Elevate Your Recipe
          </h3>
          <p className="max-w-[558px] text-center text-lg">
            Use it as an ingredient or drizzle it as a finishing touch. Elevate
            your recipes to a whole new level of flavor
          </p>
          <Button
            variant="main"
            size="xl"
            className="text-base font-normal leading-[19.2px] transition-all hover:-translate-y-1"
            onClick={modal.onOpen}
          >
            See Products
          </Button>
        </div>
        <div className="absolute bottom-0 left-0 h-[288px] w-[220px] origin-bottom-left scale-50 sm:-left-[34px] sm:bottom-[100px] sm:scale-100">
          <Image
            src="/images/recipe-1.webp"
            width={220}
            height={288}
            alt="Cookies"
          />
        </div>
        <div className="absolute right-[108px] top-0 h-[288px] w-[288px] origin-top-right scale-50 sm:-top-[110px] sm:scale-100">
          <Image
            src="/images/recipe-2.webp"
            width={288}
            height={288}
            alt="Tea"
          />
        </div>
        <div className="absolute bottom-0 right-0 h-[288px] w-[220px] origin-bottom-right scale-50 sm:-bottom-[98px] sm:right-[155px] sm:scale-100">
          <Image
            src="/images/recipe-3.webp"
            width={220}
            height={288}
            alt="Pancakes"
          />
        </div>
      </div>
    </section>
  );
};

export default Recipe;
