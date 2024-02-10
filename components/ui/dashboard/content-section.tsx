import clsx from "clsx";
import React from "react";

export interface ContentSectionProps {
  children: React.ReactNode;
  props?: {
    [key: string]: any;
  };
  className?: string;
}

const ContentSection: React.FC<ContentSectionProps> = ({
  className,
  children,
  ...props
}) => {
  return (
    <section
      className={clsx(
        className,
        "flex w-full flex-col items-center gap-14 rounded-lg p-4 text-lg text-body-primary sm:w-4/5",
      )}
      {...props}
    >
      {children}
    </section>
  );
};

export default ContentSection;
