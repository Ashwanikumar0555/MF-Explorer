export function calculateSWP(initial: number, years: number, rate: number) {
  const months = years * 12;
  const r = rate / 12 / 100;
  let balance = initial;
  let totalWithdrawals = 0;
  const graphData: number[] = [];

  for (let i = 0; i < months; i++) {
    const withdrawal = initial / months;
    balance = balance * (1 + r) - withdrawal;
    totalWithdrawals += withdrawal;
    graphData.push(Math.round(balance));
  }

  return {
    invested: initial,
    withdrawals: Math.round(totalWithdrawals),
    balance: Math.round(balance),
    graphData,
  };
}
