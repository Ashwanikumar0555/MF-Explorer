import { useEffect, useState } from "react";
import { calculateRollingReturns } from "@/lib/calculations/rolling";
import RollingReturnChart from "@/components/charts/RollingReturnChart";

export default function SchemePage({ params }: { params: { code: string } }) {
  const [navHistory, setNavHistory] = useState<{ date: string; nav: number }[]>([]);

  useEffect(() => {
    async function fetchNav() {
      const res = await fetch(`/api/scheme/${params.code}`);
      const data = await res.json();
      // Assuming data.navHistory is array [{date, nav}]
      setNavHistory(data.navHistory);
    }
    fetchNav();
  }, [params.code]);

  const rollingReturns = calculateRollingReturns(navHistory);

  return (
    <div className="max-w-5xl mx-auto py-10 space-y-8">
      <h1 className="text-2xl font-bold">Scheme {params.code}</h1>

      {navHistory.length > 0 && <RollingReturnChart data={rollingReturns} />}
    </div>
  );
}
