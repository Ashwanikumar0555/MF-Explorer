import React from "react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import ChartWrapper from "../molecules/ChartWrapper";

interface SIPGrowthChartProps {
  data: number[];
}

export default function SIPGrowthChart({ data }: SIPGrowthChartProps) {
  const chartData = data.map((value, index) => ({ month: index + 1, value }));

  return (
    <ChartWrapper>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={chartData}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Area type="monotone" dataKey="value" stroke="#8884d8" fill="#8884d8" />
        </AreaChart>
      </ResponsiveContainer>
    </ChartWrapper>
  );
}
