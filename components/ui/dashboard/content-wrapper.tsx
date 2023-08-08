import React from "react";
import { ContentSectionProps } from "./content-section";

interface ContentWrapperProps extends ContentSectionProps {}

const ContentWrapper: React.FC<ContentWrapperProps> = ({
  children,
  ...props
}) => {
  return (
    <div className="flex w-full flex-col items-start gap-4" {...props}>
      {children}
    </div>
  );
};

export default ContentWrapper;
