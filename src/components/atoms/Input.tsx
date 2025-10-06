"use client";
import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input: React.FC<InputProps> = ({ ...props }) => {
  return (
    <input
      className="border px-3 py-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
      {...props}
    />
  );
};

export default Input;
