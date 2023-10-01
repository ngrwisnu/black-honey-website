import React from "react";

const StatusProof = () => {
  return (
    <section id="status-proof" className="flex w-full items-center py-40">
      <div className="flex h-[563px] w-full flex-col items-center gap-4 bg-[#212121] px-4 text-white md:flex-row">
        <div className="status flex h-[290px] w-full flex-1 flex-col items-center justify-center gap-4">
          <p className="text-6xl font-normal">6850 L</p>
          <p className="text-2xl uppercase">TOTAL SELLING</p>
        </div>
        <div className="status flex h-[290px] w-full flex-1 flex-col items-center justify-center gap-4 bg-[#292929]">
          <p className="text-6xl font-normal">4.8</p>
          <p className="text-2xl uppercase">RATINGS</p>
        </div>
        <div className="status flex h-[290px] w-full flex-1 flex-col items-center justify-center gap-4">
          <p className="text-6xl font-normal">20+</p>
          <p className="text-2xl uppercase">CUSTOMERS</p>
        </div>
      </div>
    </section>
  );
};

export default StatusProof;
