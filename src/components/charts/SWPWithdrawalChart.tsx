import React from "react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import ChartWrapper from "../molecules/ChartWrapper";

interface SWPWithdrawalChartProps {
  data: number[];
}

export default function SWPWithdrawalChart({ data }: SWPWithdrawalChartProps) {
  const chartData = data.map((v, i) => ({ month: i + 1, value: v }));

  return (
    <ChartWrapper>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={chartData}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Area type="monotone" dataKey="value" stroke="#82ca9d" fill="#82ca9d" />
        </AreaChart>
      </ResponsiveContainer>
    </ChartWrapper>
  );
}
