import React from "react";

const DashboardError = () => {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-5 py-20">
      <h1 className="text-6xl">Something went wrong!</h1>
      <p className="text-2xl">Cannot retrieve data from the server</p>
    </div>
  );
};

export default DashboardError;
