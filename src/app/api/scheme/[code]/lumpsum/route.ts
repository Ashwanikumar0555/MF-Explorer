import { NextRequest, NextResponse } from "next/server";
import { calculateLumpsum } from "../../../../../lib/calculations/lumpsum";

// POST /api/scheme/:code/lumpsum
export async function POST(req: NextRequest, { params }: { params: { code: string } }) {
  const { code } = params;
  const body = await req.json();
  const { amount, years, rate } = body;

  const result = calculateLumpsum(amount, years, rate);
  return NextResponse.json({ schemeCode: code, result });
}
