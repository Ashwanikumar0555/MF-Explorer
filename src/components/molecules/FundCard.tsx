import React from "react";
import { Card, CardContent } from "../atoms/Card";
import Link from "next/link";

interface FundCardProps {
  fund: any;
}

export default function FundCard({ fund }: FundCardProps) {
  return (
    <Card>
      <h3 className="font-semibold text-lg mb-2">{fund.schemeName || fund.scheme_name}</h3>
      <p className="text-sm mb-2">Fund House: {fund.fundHouse || fund.fund_house}</p>
      <Link href={`/funds/${fund.schemeCode || fund.scheme_code}`}>
        <span className="text-blue-600 underline cursor-pointer">View Details</span>
      </Link>
    </Card>
  );
}
