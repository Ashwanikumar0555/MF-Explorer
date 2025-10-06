"use client";
import { useState } from "react";

const useSWP = () => {
  const [result, setResult] = useState<number>(0);

  const calculateSWP = (amount: number, rate: number, years: number) => {
    const r = rate / 100 / 12;
    const n = years * 12;
    const withdrawal = (amount * r) / (1 - Math.pow(1 + r, -n));
    setResult(parseFloat(withdrawal.toFixed(2)));
  };

  return { result, calculateSWP };
};

export default useSWP;
