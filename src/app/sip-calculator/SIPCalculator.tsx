"use client";
import { useState } from "react";
import { calculateSIP } from "@/lib/sip";
import { formatNumber } from "@/lib/format";
import ResultCard from "./ResultCard";

export default function SIPCalculator() {
  const [monthly, setMonthly] = useState(10000);
  const [rate, setRate] = useState(12);
  const [years, setYears] = useState(10);

  const result = calculateSIP(monthly, rate, years);

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded-lg space-y-6">
      <h1 className="text-2xl font-bold text-center">SIP Calculator</h1>

      {/* Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          type="number"
          value={monthly}
          onChange={(e) => setMonthly(Number(e.target.value))}
          placeholder="Monthly Investment"
          className="border p-2 rounded"
        />
        <input
          type="number"
          value={rate}
          onChange={(e) => setRate(Number(e.target.value))}
          placeholder="Expected Return (%)"
          className="border p-2 rounded"
        />
        <input
          type="number"
          value={years}
          onChange={(e) => setYears(Number(e.target.value))}
          placeholder="Years"
          className="border p-2 rounded"
        />
      </div>

      {/* Results */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <ResultCard label="Invested Amount" value={result.invested} />
        <ResultCard label="Estimated Value" value={result.futureValue} />
        <ResultCard label="Wealth Gain" value={result.gain} />
      </div>
    </div>
  );
}
