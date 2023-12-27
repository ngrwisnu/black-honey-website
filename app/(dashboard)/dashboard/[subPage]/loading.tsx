import React from "react";

const Loading = () => {
  return (
    <div className="flex w-full justify-center p-4">
      <span className="h-8 w-8 animate-spin rounded-full border-4 border-orange-200 border-t-[#CF933F]"></span>
    </div>
  );
};

export default Loading;
