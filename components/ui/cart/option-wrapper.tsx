import React from "react";
import { clsx as cx } from "clsx";

const OptionWrapper = ({ ...props }) => {
  return (
    <section
      className="flex flex-col items-start gap-4 self-stretch"
      {...props}
    >
      {props.children}
    </section>
  );
};

const ContentWrapper = ({
  className,
  ...props
}: {
  className?: string;
  [key: string]: any;
}) => {
  return (
    <div className={cx(className, "flex self-stretch")} {...props}>
      {props.children}
    </div>
  );
};

export { OptionWrapper, ContentWrapper };
