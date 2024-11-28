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
        "flex w-full max-w-[1166px] flex-col items-center justify-between gap-10 md:flex-row",
      )}
      aria-label="benefit-row"
    >
      {children}
    </div>
  );
};

export default ItemRow;
