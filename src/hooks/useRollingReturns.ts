import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { parseISO, subMonths, subYears } from "date-fns";
import { RollingReturn } from "../types/calculator";

const INTERVALS = ["1M", "1Y", "3Y", "5Y"] as const;
type Interval = typeof INTERVALS[number];

interface UseRollingReturnsProps {
  schemeCode: string;
  pageSize?: number; // number of points per page
}

export const useRollingReturns = ({ schemeCode, pageSize = 50 }: UseRollingReturnsProps) => {
  const [navHistory, setNavHistory] = useState<{ date: string; nav: number }[]>([]);
  const [page, setPage] = useState(1);
  const [rollingReturns, setRollingReturns] = useState<RollingReturn[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch NAV history
  const fetchNavHistory = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get(`/api/scheme/${schemeCode}`);
      const navData = res.data.nav.map((item: any) => ({
        date: item.date,
        nav: parseFloat(item.nav),
      })).sort((a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime());

      setNavHistory(navData);
    } catch (err: any) {
      setError(err.message || "Failed to fetch NAV data");
    } finally {
      setLoading(false);
    }
  }, [schemeCode]);

  // Calculate rolling returns for one interval
  const calculateRolling = useCallback((interval: Interval, navData: { date: string; nav: number }[]) => {
    const results: RollingReturn[] = [];
    for (let i = 0; i < navData.length; i++) {
      const start = parseISO(navData[i].date);
      let end: Date;
      switch (interval) {
        case "1M": end = subMonths(start, -1); break;
        case "1Y": end = subYears(start, -1); break;
        case "3Y": end = subYears(start, -3); break;
        case "5Y": end = subYears(start, -5); break;
        default: end = new Date();
      }
      const nearest = navData.find(n => new Date(n.date) >= end);
      if (!nearest) continue;
      const absReturn = ((nearest.nav - navData[i].nav) / navData[i].nav) * 100;
      results.push({ startDate: navData[i].date, endDate: nearest.date, interval, absoluteReturn: absReturn });
    }
    return results;
  }, []);

  // Compute current page
  const computePage = useCallback(() => {
    if (!navHistory.length) return;
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    const pageData = navHistory.slice(start, end);
    const pageResults: RollingReturn[] = [];
    INTERVALS.forEach(interval => pageResults.push(...calculateRolling(interval, pageData)));
    setRollingReturns(prev => [...prev, ...pageResults]);
    setHasMore(end < navHistory.length);
  }, [navHistory, page, pageSize, calculateRolling]);

  useEffect(() => fetchNavHistory(), [fetchNavHistory]);
  useEffect(() => { if (navHistory.length) computePage(); }, [navHistory, page, computePage]);

  const loadMore = () => { if (hasMore) setPage(prev => prev + 1); };

  return { rollingReturns, loadMore, hasMore, loading, error };
};
