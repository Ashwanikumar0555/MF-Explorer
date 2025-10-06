import React from "react";
import Paper from "@mui/material/Paper";

interface ChartWrapperProps {
  children: React.ReactNode;
}

export default function ChartWrapper({ children }: ChartWrapperProps) {
  return <Paper sx={{ p: 3, borderRadius: 2 }}>{children}</Paper>;
}
