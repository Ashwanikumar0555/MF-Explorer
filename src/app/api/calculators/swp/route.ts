import { NextRequest, NextResponse } from "next/server";
import { calculateSWP } from "../../../../lib/calculations/swp";

// POST /api/calculators/swp
export async function POST(req: NextRequest) {
  const body = await req.json();
  const { initial, years, rate } = body;

  const result = calculateSWP(initial, years, rate);
  return NextResponse.json(result);
}
