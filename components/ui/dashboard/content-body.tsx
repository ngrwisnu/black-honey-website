import React from "react";
import { ContentSectionProps } from "./content-section";
import clsx from "clsx";

interface ContentBodyProps extends ContentSectionProps {
  className?: string;
}

const ContentBody: React.FC<ContentBodyProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div
      className={clsx(className, "flex flex-col items-start self-stretch")}
      {...props}
    >
      {children}
    </div>
  );
};

export default ContentBody;
