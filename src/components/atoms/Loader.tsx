"use client";
import React from "react";

const Loader: React.FC = () => (
  <div className="flex justify-center items-center p-4">
    <div className="loader border-t-4 border-blue-500 rounded-full w-8 h-8 animate-spin"></div>
  </div>
);

export default Loader;
