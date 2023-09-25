import { NextResponse } from "next/server";

export function middleware(request) {
  console.log("Middleware");
  let cookie = request.cookies.get("token");
  if (cookie == undefined) {
    const redirectUrl = new URL("/login", request.nextUrl.origin);
    return NextResponse.redirect(redirectUrl.toString());
  }

  if (request.nextUrl.pathname.startsWith("/admin")) {
    let cookie = request.cookies.get("user");
    console.log(Date.now(), cookie);
    const jsonValue = cookie.value.slice(2);
    const jsonParse = JSON.parse(jsonValue);
    if (jsonParse.role !== "ADMIN") {
      const redirectUrl = new URL("/", request.nextUrl.origin);
      return NextResponse.redirect(redirectUrl.toString());
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/profile", "/admin"],
};
