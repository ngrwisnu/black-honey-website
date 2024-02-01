import React from "react";
import { ContentSectionProps } from "./content-section";
import clsx from "clsx";

interface ContentWrapperProps extends ContentSectionProps {}

const ContentWrapper: React.FC<ContentWrapperProps> = ({
  className,
  children,
  ...props
}) => {
  return (
    <div
      className={clsx(className, "flex w-full flex-col items-start gap-4")}
      {...props}
    >
      {children}
    </div>
  );
};

export default ContentWrapper;
