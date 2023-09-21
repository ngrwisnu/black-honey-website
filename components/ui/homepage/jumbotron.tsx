import React from "react";

const Jumbotron = () => {
  return (
    <section
      id="jumbotron"
      className="flex h-screen w-full shrink items-start overflow-hidden bg-[url('/images/hero-lg.webp')] bg-[right_-350px_top_0px] bg-no-repeat sm:mt-20 sm:shrink-0 md:h-[800px] md:items-center lg:bg-[right_0px_bottom_0px]"
    >
      <h1
        data-aos="fade-up"
        className="mt-20 px-4 text-5xl font-normal leading-[72px] text-body-primary sm:w-[485px] md:pl-[140px] md:text-6xl md:leading-[96px] lg:w-[740px]"
      >
        Captivating Tastes of{" "}
        <span className="font-light italic">Black Honey</span>
      </h1>
    </section>
  );
};

export default Jumbotron;
