import React from "react";

const ContentHeader = ({ title }: { title: string }) => {
  return (
    <h5 className="py-2 w-full font-semibold border-b-[1px] border-b-gray-200">
      {title}
    </h5>
  );
};

export default ContentHeader;
