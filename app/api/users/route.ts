import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const searchParams = new URLSearchParams(url.searchParams);
  const q = searchParams.get("q");
  if (!q) return NextResponse.json([], { status: 400 });
  const users = await db.user.findMany({
    where: { username: { contains: q } },
    select: { id: true, username: true },
  });
  return NextResponse.json(users);
}
