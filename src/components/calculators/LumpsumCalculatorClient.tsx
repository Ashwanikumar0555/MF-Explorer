"use client";
import { useState } from "react";
import { calculateLumpsum } from "../../lib/calculations/lumpsum";
import CalculatorForm from "../molecules/CalculatorForm";

export default function LumpsumCalculatorClient() {
  const [result, setResult] = useState<any>(null);

  const handleCalculate = (amount: number, years: number, rate: number) => {
    const res = calculateLumpsum(amount, years, rate);
    setResult(res);
  };

  return (
    <div>
      <CalculatorForm onCalculate={handleCalculate} />
      {result && (
        <div className="mt-4">
          <p>Invested: ₹{result.invested}</p>
          <p>Returns: ₹{result.returns}</p>
          <p>Total Value: ₹{result.total}</p>
        </div>
      )}
    </div>
  );
}
