export function calculateLumpsum(amount: number, years: number, rate: number) {
  const total = amount * Math.pow(1 + rate / 100, years);
  const returns = total - amount;

  return {
    invested: amount,
    returns: Math.round(returns),
    total: Math.round(total),
  };
}
