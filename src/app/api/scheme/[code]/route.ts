import { NextRequest, NextResponse } from "next/server";

// GET /api/scheme/:code
export async function GET(req: NextRequest, { params }: { params: { code: string } }) {
  const { code } = params;

  try {
    const res = await fetch(`https://api.mfapi.in/mf/${code}`);
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch scheme" }, { status: 500 });
  }
}
