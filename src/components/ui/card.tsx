import React from "react";
import clsx from "clsx";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function Card({ children, className, ...props }: CardProps) {
  return (
    <div
      className={clsx(
        "rounded-2xl border bg-white shadow-md p-6 transition hover:shadow-lg",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
