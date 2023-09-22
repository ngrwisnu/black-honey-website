import React from "react";
import ItemRow from "./item-row";
import Image from "next/image";

const Benefits = () => {
  return (
    <section className="flex w-full flex-col items-center gap-32 px-4 py-40">
      <ItemRow>
        <div data-aos="fade-up" className="w-full flex-1 md:w-[458px]">
          <div className="relative h-[567px] w-full lg:w-4/5">
            <Image
              src="/images/image-1.webp"
              alt=""
              fill={true}
              style={{ objectFit: "cover" }}
            />
            <div className="absolute -bottom-[27px] -right-2 h-[55px] w-[360px] bg-[url('/images/wood-pattern.webp')] sm:-right-[275px] sm:w-[417px]"></div>
          </div>
        </div>
        <div data-aos="fade-up" data-aos-delay="350" className="flex-1">
          <div className="flex flex-col items-start gap-6 text-lg font-normal text-body-primary">
            <h3 className="text-5xl leading-[57.6px]">Good Quality</h3>
            <p className="bg-[#F9F7F3] p-6">
              Use only the finest ingredients and crafted with good materials to
              deliver an exceptional experience for our customers
            </p>
          </div>
        </div>
      </ItemRow>
      <ItemRow>
        <div
          data-aos="fade-up"
          className="w-full flex-1 md:order-2 md:w-[458px]"
        >
          <div className="relative h-[567px] w-full lg:w-4/5">
            <Image
              src="/images/image-2.webp"
              alt=""
              fill={true}
              style={{ objectFit: "cover" }}
            />
            <div className="absolute -bottom-[27px] -left-2 h-[55px] w-[360px] bg-[url('/images/wood-pattern.webp')] sm:-left-[292px] sm:w-[417px]"></div>
          </div>
        </div>
        <div
          data-aos="fade-up"
          data-aos-delay="350"
          className="flex-1 md:order-1"
        >
          <div className="flex flex-col items-start gap-6 text-lg font-normal text-body-primary">
            <h3 className="text-5xl leading-[57.6px]">Pure and Natural</h3>
            <p className="bg-[#F9F7F3] p-6">
              Our honey is free from harmful additives. We harness the bees’
              ability to provide you with a pure honey so you can get the full
              benefits of it
            </p>
          </div>
        </div>
      </ItemRow>
    </section>
  );
};

export default Benefits;
