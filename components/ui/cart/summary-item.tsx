import React from "react";
import { clsx as cx } from "clsx";

const SummaryItem = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col items-center gap-4 self-stretch">
      {children}
    </div>
  );
};

const SummaryTitle = ({ children }: { children: React.ReactNode }) => {
  return (
    <h4 className="w-full text-lg font-medium leading-[21.6px] text-center">
      {children}
    </h4>
  );
};

const SummaryList = ({
  children,
  classname,
}: {
  children: React.ReactNode;
  classname?: string;
}) => {
  return (
    <div
      className={cx(
        classname,
        "flex justify-between items-start self-stretch text-base leading-5"
      )}
    >
      {children}
    </div>
  );
};

export { SummaryItem, SummaryTitle, SummaryList };
