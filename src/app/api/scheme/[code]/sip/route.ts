import { NextRequest, NextResponse } from "next/server";
import { calculateSIP } from "../../../../lib/calculations/sip";

// POST /api/scheme/:code/sip
export async function POST(req: NextRequest, { params }: { params: { code: string } }) {
  const { code } = params;
  const body = await req.json();
  const { monthly, years, rate } = body;

  const result = calculateSIP(monthly, years, rate);
  return NextResponse.json({ schemeCode: code, result });
}
