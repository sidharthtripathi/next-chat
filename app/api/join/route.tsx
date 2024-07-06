import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import z, { ZodError } from "zod";
import { SignJWT } from "jose";
import { cookies } from "next/headers";
import { createSecretKey } from "crypto";
const payloadSchema = z.object({
  username: z.string(),
  password: z.string(),
});
export async function POST(req: NextRequest) {
  try {
    let payload = await req.json();
    const { username, password } = await payloadSchema.parseAsync(payload);
    const user = await db.user.findFirst({
      where: { username },
    });
    if (!user) {
      return NextResponse.json(
        await db.user.create({
          data: { username, password },
        }),
        {
          status: 201,
        }
      );
    } else {
      if (password !== user.password)
        return NextResponse.json(
          { msg: "Invalid credentials" },
          { status: 401 }
        );
      else {
        const token = await new SignJWT({ username, id: user.id })
          .setProtectedHeader({ alg: "HS256" })
          .sign(createSecretKey(process.env.JWT_SECRET as string, "utf-8"));
        cookies().set({
          name: "token",
          value: token,
          httpOnly: true,
          path: "/",
          expires: Date.now() + 24 * 60 * 60 * 7 * 1000,
        });
        return NextResponse.json({ token, username, id: user.id });
      }
    }
  } catch (error) {
    console.log(error);
    if (error instanceof ZodError)
      return NextResponse.json(
        { msg: "Invalid payload", error },
        { status: 400 }
      );
    return NextResponse.json({ msg: "Something went wrong" }, { status: 500 });
  }
}
