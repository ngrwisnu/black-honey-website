import React from "react";

const ContentBody = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col items-start self-stretch">{children}</div>
  );
};

export default ContentBody;
