import { differenceInDays, parseISO } from "date-fns";

export interface RollingReturn {
  date: string;
  return1M?: number;
  return1Y?: number;
  return3Y?: number;
  return5Y?: number;
}

// navHistory: [{ date: 'YYYY-MM-DD', nav: number }]
export function calculateRollingReturns(navHistory: { date: string; nav: number }[]): RollingReturn[] {
  const returns: RollingReturn[] = [];

  const navMap = new Map(navHistory.map(n => [n.date, n.nav]));

  const dates = navHistory.map(n => n.date).sort();

  for (let i = 0; i < dates.length; i++) {
    const currentDate = dates[i];
    const currentNAV = navMap.get(currentDate)!;

    const getReturn = (pastDays: number) => {
      const pastDateIndex = dates.findIndex(d => differenceInDays(parseISO(currentDate), parseISO(d)) >= pastDays);
      if (pastDateIndex !== -1) {
        const pastNAV = navMap.get(dates[pastDateIndex])!;
        return ((currentNAV - pastNAV) / pastNAV) * 100;
      }
      return undefined;
    };

    returns.push({
      date: currentDate,
      return1M: getReturn(30),
      return1Y: getReturn(365),
      return3Y: getReturn(365 * 3),
      return5Y: getReturn(365 * 5),
    });
  }

  return returns;
}
