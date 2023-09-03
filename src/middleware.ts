import { redirect } from "next/dist/server/api-utils";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // the below will monitor and get the path which the user is entering
  const path = request.nextUrl.pathname;
  const isPublicPath = path === "/login" || path === "/signup";
  const specificUser  = path ==="/profile/:path*"   //here /:pTH* means any path after /profile/

  // here we are grabbing the token and we are not sure whether the token is there or not. In case of not there we are providing an empty string
  const token = request.cookies.get("token")?.value || "";

  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }
  if (specificUser && !isPublicPath && !token) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/", "/profile", "/login", "/signup", "/profile/:path*"],
};
