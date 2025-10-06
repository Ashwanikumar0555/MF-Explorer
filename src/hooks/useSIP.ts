"use client";
import { useState } from "react";

const useSIP = () => {
  const [result, setResult] = useState<number>(0);

  const calculateSIP = (monthly: number, rate: number, years: number) => {
    const r = rate / 100 / 12;
    const n = years * 12;
    const fv = monthly * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
    setResult(parseFloat(fv.toFixed(2)));
  };

  return { result, calculateSIP };
};

export default useSIP;
