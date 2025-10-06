"use client";
import { useState } from "react";

const useLumpsum = () => {
  const [result, setResult] = useState<number>(0);

  const calculateLumpsum = (principal: number, rate: number, years: number) => {
    const fv = principal * Math.pow(1 + rate / 100, years);
    setResult(parseFloat(fv.toFixed(2)));
  };

  return { result, calculateLumpsum };
};

export default useLumpsum;
