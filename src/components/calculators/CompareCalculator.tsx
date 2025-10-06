"use client";
import { useState } from "react";
import { compareInvestments } from "../../lib/calculations/compare";

export default function CompareCalculator() {
  const [amount, setAmount] = useState(2000);
  const [years, setYears] = useState(10);
  const [rate, setRate] = useState(12);

  const result = compareInvestments(amount, years, rate);

  return (
    <div>
      <div className="grid gap-2 max-w-md mb-4">
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          placeholder="Monthly SIP"
          className="border p-2"
        />
        <input
          type="number"
          value={years}
          onChange={(e) => setYears(Number(e.target.value))}
          placeholder="Years"
          className="border p-2"
        />
        <input
          type="number"
          value={rate}
          onChange={(e) => setRate(Number(e.target.value))}
          placeholder="Expected Rate %"
          className="border p-2"
        />
      </div>

      <div>
        <p>SIP Total Value: ₹{result.sip.total}</p>
        <p>Lumpsum Total Value: ₹{result.lumpsum.total}</p>
      </div>
    </div>
  );
}
