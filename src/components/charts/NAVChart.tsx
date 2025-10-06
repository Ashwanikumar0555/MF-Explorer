import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import ChartWrapper from "../molecules/ChartWrapper";

interface NAVChartProps {
  history: { date: string; nav: string }[];
}

export default function NAVChart({ history }: NAVChartProps) {
  const data = history.map((item) => ({
    date: item.date,
    nav: Number(item.nav),
  })).reverse();

  return (
    <ChartWrapper>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey="date" hide />
          <YAxis domain={["dataMin", "dataMax"]} />
          <Tooltip />
          <Line type="monotone" dataKey="nav" stroke="#3f51b5" dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </ChartWrapper>
  );
}
