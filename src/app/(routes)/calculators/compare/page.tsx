"use client";
import { useState } from "react";
import { calculateSIP } from "../../../../lib/calculations/sip";
import { calculateLumpsum } from "../../../../lib/calculations/lumpsum";

export default function CompareCalculatorPage() {
  const [amount, setAmount] = useState(2000);
  const [years, setYears] = useState(10);
  const [rate, setRate] = useState(12);

  const sipResult = calculateSIP(amount, years, rate);
  const lumpsumResult = calculateLumpsum(amount * 12 * years, years, rate);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">Compare SIP vs Lumpsum</h2>

      <div className="grid gap-4 max-w-md mb-6">
        <label>Monthly Investment (SIP):</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          className="border p-2"
        />
        <label>Years:</label>
        <input
          type="number"
          value={years}
          onChange={(e) => setYears(Number(e.target.value))}
          className="border p-2"
        />
        <label>Expected Annual Return (%):</label>
        <input
          type="number"
          value={rate}
          onChange={(e) => setRate(Number(e.target.value))}
          className="border p-2"
        />
      </div>

      <div className="mt-6">
        <h3 className="font-bold text-xl mb-4">Results</h3>
        <p>SIP Total Value: ₹{sipResult.total}</p>
        <p>Lumpsum Total Value: ₹{lumpsumResult.total}</p>
      </div>
    </div>
  );
}
