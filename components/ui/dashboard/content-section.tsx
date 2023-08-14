import React from "react";

export interface ContentSectionProps {
  children: React.ReactNode;
  props?: {
    [key: string]: any;
  };
}

const ContentSection: React.FC<ContentSectionProps> = ({
  children,
  ...props
}) => {
  return (
    <section
      className="flex p-4 w-full sm:w-4/5 flex-col items-center gap-14 rounded-lg bg-white text-body-primary text-lg"
      {...props}
    >
      {children}
    </section>
  );
};

export default ContentSection;
