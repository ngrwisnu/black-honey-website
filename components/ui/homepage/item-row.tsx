import clsx from "clsx";
import React from "react";

const ItemRow = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={clsx(
        className,
        "flex flex-col md:flex-row gap-10 w-full max-w-[1166px] items-center justify-between"
      )}
    >
      {children}
    </div>
  );
};

export default ItemRow;
