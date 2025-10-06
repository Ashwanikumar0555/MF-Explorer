export async function fetchSchemeByCode(code: string) {
  try {
    const res = await fetch(`/api/scheme/${code}`);
    if (!res.ok) throw new Error("Failed to fetch scheme");
    return res.json();
  } catch (err) {
    console.error("fetchSchemeByCode error:", err);
    return null;
  }
}

export async function fetchSIPCalculation(code: string, data: { monthly: number, years: number, rate: number }) {
  const res = await fetch(`/api/scheme/${code}/sip`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function fetchSWPCalculation(code: string, data: { initial: number, years: number, rate: number }) {
  const res = await fetch(`/api/scheme/${code}/swp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function fetchLumpsumCalculation(code: string, data: { amount: number, years: number, rate: number }) {
  const res = await fetch(`/api/scheme/${code}/lumpsum`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}
