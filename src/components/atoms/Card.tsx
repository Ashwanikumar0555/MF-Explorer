import React from "react";
import clsx from "clsx";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Card: React.FC<CardProps> = ({ children, className, ...props }) => {
  return (
    <div
      className={clsx(
        "bg-white rounded-2xl shadow-md hover:shadow-lg transition p-6",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div className={clsx("text-center", className)} {...props}>
      {children}
    </div>
  );
};
