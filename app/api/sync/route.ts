import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
export async function GET(req: NextRequest) {
  const userid = headers().get("id");
  if (!userid)
    return NextResponse.json({ msg: "unauthorized" }, { status: 401 });
  const timeStamp = req.nextUrl.searchParams.get("timeStamp") as string;
  const convos = await db.conversation.findMany({
    where: { userIds: { has: userid }, createdAt: { gt: timeStamp } },
    select: {
      id: true,
      users: { select: { username: true }, where: { NOT: { id: userid } } },
      messages: {
        where: { createdAt: { gt: timeStamp } },
        select: {
          id: true,
          senderId: true,
          content: true,
          conversationId: true,
        },
      },
    },
  });
  return NextResponse.json(convos);
}
