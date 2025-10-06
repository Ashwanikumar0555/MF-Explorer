"use client";
import { useState } from "react";
import { calculateSWP } from "../../lib/calculations/swp";
import SWPWithdrawalChart from "../charts/SWPWithdrawalChart";
import CalculatorForm from "../molecules/CalculatorForm";

export default function SWPCalculatorClient() {
  const [result, setResult] = useState<any>(null);

  const handleCalculate = (amount: number, years: number, rate: number) => {
    const res = calculateSWP(amount, years, rate);
    setResult(res);
  };

  return (
    <div>
      <CalculatorForm onCalculate={handleCalculate} />
      {result && <SWPWithdrawalChart data={result.graphData} />}
    </div>
  );
}
