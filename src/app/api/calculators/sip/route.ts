import { NextRequest, NextResponse } from "next/server";
import { calculateSIP } from "../../../../lib/calculations/sip";

// POST /api/calculators/sip
export async function POST(req: NextRequest) {
  const body = await req.json();
  const { monthly, years, rate } = body;

  const result = calculateSIP(monthly, years, rate);
  return NextResponse.json(result);
}
