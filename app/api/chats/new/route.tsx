import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { z } from "zod";
import { createClient } from "redis";
const msgSchema = z.object({
  msg: z.string(),
  to: z.string(),
});
export async function POST(req: NextRequest) {
  const userid = headers().get("id");
  if (!userid)
    return NextResponse.json({ msg: "unauthorized" }, { status: 401 });

  try {
    const { msg, to } = msgSchema.parse(await req.json());
    const receiver = await db.user.findUnique({
      where: { id: to },
      select: { id: true },
    });
    if (!receiver)
      return NextResponse.json({ msg: "Invalid Request" }, { status: 400 });
    const convo = await db.conversation.create({
      data: {
        userIds: [userid, to],
        messages: {
          create: {
            senderId: userid,
            content: msg,
          },
        },
      },
      select: { id: true },
    });
    const pubClient = createClient();
    if (!pubClient.isReady) await pubClient.connect();
    await pubClient.publish(
      "message",
      JSON.stringify({
        msg,
        to,
        from: userid,
        conversatinoId: convo.id,
      })
    );

    return NextResponse.json({ id: convo.id }, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ msg: "Invalid Request" }, { status: 400 });
  }
}
