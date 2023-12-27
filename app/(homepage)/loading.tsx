import React from "react";

const Loading = () => {
  return (
    <div className="absolute inset-0 z-[999] flex items-center justify-center rounded">
      <div className="flex h-20 w-20 justify-center bg-white p-4 shadow-md">
        <span className="h-8 w-8 animate-spin rounded-full border-4 border-orange-200 border-t-[#CF933F]"></span>
      </div>
    </div>
  );
};

export default Loading;
