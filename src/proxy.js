import { NextResponse } from "next/server";
import { auth } from "./lib/auth";
import { headers } from "next/headers";

const protectedPaths = ["/my-ideas", "/my-interactions", "/add-idea", "/my-profile"];

export async function proxy(request) {
  const { pathname } = request.nextUrl;
  const isProtected =
    protectedPaths.some((p) => pathname === p || pathname.startsWith(`${p}/`)) ||
    pathname.startsWith("/idea/");

  if (!isProtected) {
    return NextResponse.next();
  }

  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (session) {
      return NextResponse.next();
    }
  } catch (error) {
    console.error("[proxy] session check failed:", error?.message || error);
    // DB down: avoid redirect loop — let the page load and show errors there
    return NextResponse.next();
  }

  const loginUrl = new URL("/login", request.url);
  loginUrl.searchParams.set("redirect", pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: [
    "/my-ideas",
    "/my-interactions",
    "/add-idea",
    "/my-profile",
    "/idea/:path*",
  ],
};
