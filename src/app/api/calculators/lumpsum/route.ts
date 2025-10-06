import { NextRequest, NextResponse } from "next/server";
import { calculateLumpsum } from "../../../../lib/calculations/lumpsum";

// POST /api/calculators/lumpsum
export async function POST(req: NextRequest) {
  const body = await req.json();
  const { amount, years, rate } = body;

  const result = calculateLumpsum(amount, years, rate);
  return NextResponse.json(result);
}
