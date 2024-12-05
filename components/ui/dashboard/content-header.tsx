import React from "react";

const ContentHeader = ({ title }: { title: string }) => {
  return (
    <h5 className="w-full border-b-[1px] border-b-gray-200 py-2 font-semibold">
      {title}
    </h5>
  );
};

export default ContentHeader;
