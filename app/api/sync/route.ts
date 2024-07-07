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
      createdAt: true,
      users: {
        select: { username: true, id: true },
        where: { NOT: { id: userid } },
      },
    },
  });
  const allConvos = await db.conversation.findMany({
    where: { userIds: { has: userid } },
    select: { id: true },
  });
  const messages = await db.message.findMany({
    where: {
      conversationId: { in: allConvos.map((convo) => convo.id) },
      createdAt: { gt: timeStamp },
    },
    select: {
      content: true,
      senderId: true,
      conversationId: true,
      createdAt: true,
      id: true,
    },
  });

  return NextResponse.json({ convos, messages });
}
