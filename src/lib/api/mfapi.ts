export async function fetchAllFunds() {
  try {
    const res = await fetch("/api/mf");
    if (!res.ok) throw new Error("Failed to fetch funds");
    return res.json();
  } catch (err) {
    console.error("fetchAllFunds error:", err);
    return [];
  }
}
