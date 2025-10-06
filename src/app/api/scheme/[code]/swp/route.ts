import { NextRequest, NextResponse } from "next/server";
import { calculateSWP } from "../../../../lib/calculations/swp";

// POST /api/scheme/:code/swp
export async function POST(req: NextRequest, { params }: { params: { code: string } }) {
  const { code } = params;
  const body = await req.json();
  const { initial, years, rate } = body;

  const result = calculateSWP(initial, years, rate);
  return NextResponse.json({ schemeCode: code, result });
}
