"use client";
import { useState } from "react";

const useCompare = () => {
  const [results, setResults] = useState<{ [key: string]: number }>({});

  const calculateCompare = (data: { [key: string]: { amount: number; rate: number; years: number } }) => {
    const res: { [key: string]: number } = {};
    for (const key in data) {
      const { amount, rate, years } = data[key];
      res[key] = amount * Math.pow(1 + rate / 100, years);
    }
    setResults(res);
  };

  return { results, calculateCompare };
};

export default useCompare;
