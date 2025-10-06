"use client";
import { formatNumber } from "@/lib/format";

export default function ResultCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="bg-gray-50 p-4 rounded-lg shadow text-center">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-xl font-bold text-indigo-600">₹ {formatNumber(value)}</p>
    </div>
  );
}
