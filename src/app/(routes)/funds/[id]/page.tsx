"use client";
import { useParams } from "next/navigation";
import useFetch from "../../../../hooks/useFetch";
import NAVChart from "../../../../components/charts/NAVChart";
import Loader from "../../../../components/atoms/Loader";

export default function FundDetailPage() {
  const { id } = useParams();
  const { data, loading } = useFetch(`https://api.mfapi.in/mf/${id}`);

  if (loading) return <Loader />;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">{data?.meta?.scheme_name}</h2>
      <p className="mb-2">Fund House: {data?.meta?.fund_house}</p>
      <p className="mb-6">Scheme Type: {data?.meta?.scheme_type}</p>

      <NAVChart history={data?.data || []} />
    </div>
  );
}
