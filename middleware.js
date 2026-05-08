import { NextResponse } from "next/server";

export function middleware(req) {
  const token = req.cookies.get("token")?.value;
  const { pathname } = req.nextUrl;

  console.log("TOKEN:", token);
  console.log("PATH:", pathname);

  // ❌ No token → block
  if (!token) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // 🟢 allow access
  return NextResponse.next();
}

export const config = {
  matcher: ["/profile/:path*", "/admin/:path*"],
};