import React, { ReactNode } from "react";

const Container = ({ children }: { children: ReactNode }) => {
  return (
    <main className="flex min-h-full flex-col items-center justify-between px-4 py-14">
      {children}
    </main>
  );
};

export default Container;
