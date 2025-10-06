"use client";
import { useState } from "react";
import { calculateSIP } from "../../lib/calculations/sip";
import SIPGrowthChart from "../charts/SIPGrowthChart";
import CalculatorForm from "../molecules/CalculatorForm";

export default function SIPCalculatorClient() {
  const [result, setResult] = useState<any>(null);

  const handleCalculate = (amount: number, years: number, rate: number) => {
    const res = calculateSIP(amount, years, rate);
    setResult(res);
  };

  return (
    <div>
      <CalculatorForm onCalculate={handleCalculate} />
      {result && <SIPGrowthChart data={result.graphData} />}
    </div>
  );
}
