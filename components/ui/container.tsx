import React, { ReactNode } from "react";
import { clsx as cx } from "clsx";

const Container = ({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) => {
  return <main className={cx(className, "mt-14")}>{children}</main>;
};

export default Container;
