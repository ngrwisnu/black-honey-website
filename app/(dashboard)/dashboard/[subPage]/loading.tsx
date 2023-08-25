import React from "react";

const Loading = () => {
  return (
    <div className="flex w-full justify-center p-4">
      <span className="h-8 w-8 animate-spin rounded-full border-4 border-green-200 border-t-green-600"></span>
    </div>
  );
};

export default Loading;
