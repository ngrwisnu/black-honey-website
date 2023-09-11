import React from "react";

const Jumbotron = () => {
  return (
    <section className="mt-20 flex min-h-[800px] w-full shrink items-center bg-[url('/images/hero.webp')] bg-cover bg-center bg-no-repeat px-4 sm:shrink-0 sm:px-[140px]">
      <h1
        data-aos="fade-up"
        className="text-6xl font-normal leading-[72px] text-body-primary sm:w-[740px] sm:text-[80px] sm:leading-[96px]"
      >
        Captivating Tastes of{" "}
        <span className="font-light italic">Black Honey</span>
      </h1>
    </section>
  );
};

export default Jumbotron;
