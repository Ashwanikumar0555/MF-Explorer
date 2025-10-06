"use client";

import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from "chart.js";
import { RollingReturn } from "../../types/calculator";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

interface RollingReturnChartProps {
  data: RollingReturn[];
}

export const RollingReturnChart = ({ data }: RollingReturnChartProps) => {
  // Group data by interval
  const intervals = ["1M", "1Y", "3Y", "5Y"] as const;
  const datasets = intervals.map(interval => ({
    label: interval,
    data: data.filter(d => d.interval === interval).map(d => ({ x: d.startDate, y: d.absoluteReturn })),
    fill: false,
    borderColor: interval === "1M" ? "red" : interval === "1Y" ? "blue" : interval === "3Y" ? "green" : "orange",
    tension: 0.2,
  }));

  return (
    <div style={{ width: "100%", height: "400px" }}>
      <Line
        data={{ datasets }}
        options={{
          responsive: true,
          plugins: { legend: { position: "top" } },
          scales: {
            x: { type: "time", time: { unit: "month" } },
            y: { title: { display: true, text: "Return (%)" } }
          }
        }}
      />
    </div>
  );
};
