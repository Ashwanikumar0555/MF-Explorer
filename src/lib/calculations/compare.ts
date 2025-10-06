import { calculateSIP } from "./sip";
import { calculateLumpsum } from "./lumpsum";

export function compareInvestments(monthly: number, years: number, rate: number) {
  const sipResult = calculateSIP(monthly, years, rate);
  const lumpsumAmount = monthly * 12 * years;
  const lumpsumResult = calculateLumpsum(lumpsumAmount, years, rate);

  return {
    sip: sipResult,
    lumpsum: lumpsumResult,
  };
}
