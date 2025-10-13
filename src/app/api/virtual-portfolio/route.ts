// src/app/api/virtual-portfolio/route.ts
import dbConnect from "@/lib/mongodb";
import VirtualPortfolio from "@/models/VirtualPortfolio";
import Fund from "@/models/Fund";
import { NextResponse } from "next/server";

/**
 * GET ?userId=...
 * POST body { userId, name, sips: [...] }  (create)
 * PUT body { id, updates }  (update)
 * DELETE body { id } (delete)
 */

export async function GET(req: Request) {
  await dbConnect();
  const url = new URL(req.url);
  const userId = url.searchParams.get("userId");
  if (!userId) return NextResponse.json({ error: "userId required" }, { status: 400 });
  const items = await VirtualPortfolio.find({ userId }).lean();
  return NextResponse.json({ items });
}

export async function POST(req: Request) {
  await dbConnect();
  const body = await req.json();
  const { userId, name, sips } = body;
  if (!userId) return NextResponse.json({ error: "userId required" }, { status: 400 });
  const created = await VirtualPortfolio.create({ userId, name, sips });
  return NextResponse.json({ ok: true, item: created });
}

export async function PUT(req: Request) {
  await dbConnect();
  const body = await req.json();
  const { id, updates } = body;
  if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });
  const updated = await VirtualPortfolio.findByIdAndUpdate(id, updates, { new: true });
  return NextResponse.json({ ok: true, item: updated });
}

export async function DELETE(req: Request) {
  await dbConnect();
  const body = await req.json();
  const { id } = body;
  if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });
  await VirtualPortfolio.findByIdAndDelete(id);
  return NextResponse.json({ ok: true });
}
