import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(req) {
  const token = req.cookies.get("token")?.value;

  const url = req.nextUrl.clone();

  if (url.pathname.startsWith("/profile")) {
    if (!token) {
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }

    try {
      jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
  } else if (
    url.pathname.startsWith("/login") ||
    url.pathname.startsWith("/signup")
  ) {
    if (token) {
      try {
        jwt.verify(token, process.env.JWT_SECRET);
        url.pathname = "/profile";
        return NextResponse.redirect(url);
      } catch (error) {
        // Invalid token, continue to login/signup
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile", "/login", "/signup"],
};
