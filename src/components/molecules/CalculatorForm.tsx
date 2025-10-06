"use client";
import React, { useState } from "react";
import Input from "../atoms/Input";
import Button from "../atoms/Button";

interface CalculatorFormProps {
  onCalculate: (amount: number, years: number, rate: number) => void;
}

const CalculatorForm: React.FC<CalculatorFormProps> = ({ onCalculate }) => {
  const [amount, setAmount] = useState<number>(0);
  const [years, setYears] = useState<number>(0);
  const [rate, setRate] = useState<number>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCalculate(amount, years, rate);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <Input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
      />
      <Input
        type="number"
        placeholder="Years"
        value={years}
        onChange={(e) => setYears(Number(e.target.value))}
      />
      <Input
        type="number"
        placeholder="Rate (%)"
        value={rate}
        onChange={(e) => setRate(Number(e.target.value))}
      />
      <Button type="submit">Calculate</Button>
    </form>
  );
};

export default CalculatorForm;
