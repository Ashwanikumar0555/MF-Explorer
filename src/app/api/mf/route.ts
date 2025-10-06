import { NextRequest, NextResponse } from "next/server";

// GET /api/mf
export async function GET() {
  try {
    const res = await fetch("https://api.mfapi.in/mf"); // MFAPI public API
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch funds" }, { status: 500 });
  }
}
