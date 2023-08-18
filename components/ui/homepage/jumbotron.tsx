import React from "react";

const Jumbotron = () => {
  return (
    <section className="w-full min-h-[800px] px-4 sm:px-[140px] flex items-center bg-[url('/images/default-image.webp')] bg-no-repeat bg-cover bg-center shrink sm:shrink-0">
      <h1 className="sm:w-[740px] text-body-primary text-6xl sm:text-[80px] leading-[72px] sm:leading-[96px] font-normal">
        Captivating Tastes of{" "}
        <span className="italic font-light">Black Honey</span>
      </h1>
    </section>
  );
};

export default Jumbotron;
