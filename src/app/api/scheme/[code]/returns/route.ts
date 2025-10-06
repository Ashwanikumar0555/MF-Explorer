import { NextRequest, NextResponse } from "next/server";
import { GET as getScheme } from "../route";

// GET /api/scheme/:code/returns
export async function GET(req: NextRequest, { params }: { params: { code: string } }) {
  const schemeRes: any = await getScheme(req, { params });
  const data = await schemeRes.json();

  if (data.data) {
    const navs = data.data.map((item: any) => Number(item.nav));
    const returns = {
      last1Year: navs.slice(-12).reduce((a: number, b: number) => a + b, 0), // sample calculation
    };
    return NextResponse.json(returns);
  }

  return NextResponse.json({ error: "No data found" }, { status: 404 });
}
