export function calculateSIP(monthly: number, years: number, rate: number) {
  const months = years * 12;
  const r = rate / 12 / 100; // monthly interest rate
  let total = 0;
  const graphData: number[] = [];

  for (let i = 0; i < months; i++) {
    total = (total + monthly) * (1 + r);
    graphData.push(Math.round(total));
  }

  const invested = monthly * months;
  const returns = Math.round(total - invested);

  return {
    invested,
    returns,
    total: Math.round(total),
    graphData,
  };
}
