import { cookies } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";
import { jwtVerify } from "jose";
import { createSecretKey } from "crypto";
export async function middleware(req: NextRequest) {
  const token = cookies().get("token");
  const requestHeaders = new Headers(req.headers);

  if (token) {
    try {
      const { payload } = await jwtVerify(
        token.value,
        new TextEncoder().encode(process.env.JWT_SECRET as string)
      );

      requestHeaders.set("username", payload.username as string);
      requestHeaders.set("id", payload.id as string);
      return NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      });
    } catch (error) {
      return NextResponse.next();
    }
  }
}
